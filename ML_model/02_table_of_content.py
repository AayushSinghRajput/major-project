import os
import json
from typing import Dict, List, Optional
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain.schema.runnable import RunnableSerializable
from pathlib import Path
import re

class TextbookChapterExtractor:
    """
    Extracts chapters and subtopics from textbook content using Gemini API
    with precise mapping to table of contents structure.
    """
    
    def __init__(self, api_key: str, model: str = "gemini-1.5-flash", temperature: float = 0.1):
        """
        Initialize the extractor with Gemini configuration.
        
        Args:
            api_key: Google AI Studio API key
            model: Gemini model version (default: gemini-1.5-flash)
            temperature: Lower temperature for more focused extraction
        """
        os.environ["GOOGLE_API_KEY"] = api_key
        self.model_name = model
        self.temperature = temperature
        self.llm = self._initialize_llm()
        self.chain = self._build_chain()
        
        # Define keywords to filter out non-academic content
        self.exclude_keywords = {
            'license', 'contributor', 'copyright', 'gnu', 'external link', 
            'website', 'original note', 'further reading', 'practice question',
            'glossary', 'getting started', 'list of figures', 'users'
        }

    def _initialize_llm(self, max_retries: int = 3) -> ChatGoogleGenerativeAI:
        """Initialize LLM with retry logic"""
        for attempt in range(max_retries):
            try:
                return ChatGoogleGenerativeAI(
                model=self.model_name,
                temperature=self.temperature,
                max_retries=2,
                timeout=60,
                convert_system_message_to_human=True  # ← ADD THIS LINE
            )
            except Exception as e:
                if attempt == max_retries - 1:
                    raise RuntimeError(f"Failed to initialize LLM after {max_retries} attempts: {str(e)}")
                print(f"Retrying LLM initialization (attempt {attempt + 1})...")

    def _build_chain(self) -> RunnableSerializable:
        """Build processing chain focused on table of contents mapping"""
        prompt_template = """
        You are analyzing a biology textbook's table of contents. Extract chapters and their subtopics EXACTLY as they appear in the table of contents.

        STRICT RULES:
        1. Use EXACT chapter names from the table of contents (preserve original formatting and numbers)
        2. Extract subtopics EXACTLY as listed under each chapter
        3. Maintain the hierarchical structure: Chapter -> Subtopics
        4. Skip non-academic sections: licenses, contributors, glossaries, external links
        5. If a chapter has no subtopics listed, use empty array []
        6. Preserve original capitalization and formatting
        7. Output must be valid JSON

        EXAMPLE FORMAT:
        {{
            "2 Biology - The Life Science": [
                "Characteristics of life",
                "Nature of science",
                "Scientific method"
            ],
            "3 The Nature of Molecules": [
                "Matter",
                "The atom",
                "Mass and isotopes"
            ]
        }}

        TABLE OF CONTENTS:
        {text}

        Extract the exact chapter structure as JSON:
        """
        
        return (
            ChatPromptTemplate.from_template(prompt_template)
            | self.llm
            | StrOutputParser()
        )

    def _preprocess_table_of_contents(self, text: str) -> str:
        """
        Extract and clean table of contents from the text
        """
        # Look for "Contents" section
        contents_match = re.search(r'Contents\s*\n(.*?)(?=\n\n|\Z)', text, re.DOTALL | re.IGNORECASE)
        if contents_match:
            toc_text = contents_match.group(1)
        else:
            # If no explicit "Contents" section, use the whole text
            toc_text = text
        
        # Clean up the text
        lines = toc_text.split('\n')
        cleaned_lines = []
        
        for line in lines:
            line = line.strip()
            if line and not line.startswith('...') and len(line) > 3:
                # Remove page numbers at the end
                line = re.sub(r' \d+$', '', line)
                # Remove excessive dots
                line = re.sub(r'\.{3,}', '', line)
                cleaned_lines.append(line)
        
        return '\n'.join(cleaned_lines)

    def _filter_academic_content(self, data: Dict[str, List[str]]) -> Dict[str, List[str]]:
        """
        Filter out non-academic chapters and topics while preserving structure
        """
        filtered_data = {}
        
        for chapter, subtopics in data.items():
            # Skip chapters that are clearly non-academic
            chapter_lower = chapter.lower()
            if any(keyword in chapter_lower for keyword in self.exclude_keywords):
                continue
                
            # Skip empty chapters that are likely just section headers
            if not subtopics and any(word in chapter_lower for word in ['tissue', 'system', 'cell', 'genetic']):
                # These might be important chapters even if empty in TOC
                filtered_data[chapter] = []
                continue
            
            # Filter subtopics
            filtered_subtopics = []
            for topic in subtopics:
                topic_lower = topic.lower()
                # Keep only academic topics
                if not any(keyword in topic_lower for keyword in self.exclude_keywords):
                    filtered_subtopics.append(topic)
            
            # Include chapter if it has content or is academically relevant
            if filtered_subtopics or self._is_academic_chapter(chapter):
                filtered_data[chapter] = filtered_subtopics
        
        return filtered_data

    def _is_academic_chapter(self, chapter: str) -> bool:
        """Check if a chapter is academically relevant even if it has no listed subtopics"""
        academic_keywords = [
            'biology', 'cell', 'dna', 'gene', 'protein', 'molecule', 'tissue', 
            'system', 'evolution', 'photosynthesis', 'respiration', 'mutation',
            'reproduction', 'classification', 'chordate', 'metabolism', 'energy'
        ]
        chapter_lower = chapter.lower()
        return any(keyword in chapter_lower for keyword in academic_keywords)

    def extract_from_text(self, text: str, max_retries: int = 3) -> Dict[str, List[str]]:
        """
        Extract chapters from table of contents with precise mapping.
        
        Args:
            text: Table of contents text to analyze
            max_retries: Number of retry attempts
            
        Returns:
            Dictionary of chapters with exact subtopics from TOC
        """
        # Preprocess to extract table of contents
        toc_text = self._preprocess_table_of_contents(text)
        
        for attempt in range(max_retries):
            try:
                result = self.chain.invoke({"text": toc_text})
                raw_data = self._validate_output(result)
                
                # Filter for academic content only
                filtered_data = self._filter_academic_content(raw_data)
                
                print(f"Extracted {len(filtered_data)} academic chapters from table of contents")
                return filtered_data
                
            except json.JSONDecodeError:
                print(f"Invalid JSON format, retrying (attempt {attempt + 1})...")
            except Exception as e:
                print(f"Error during extraction (attempt {attempt + 1}): {str(e)}")
                if attempt == max_retries - 1:
                    raise RuntimeError(f"Extraction failed after {max_retries} attempts")
        
        return {}

    def extract_from_file(self, file_path: str) -> Dict[str, List[str]]:
        """
        Extract chapters from a text file containing table of contents.
        
        Args:
            file_path: Path to textbook file
            
        Returns:
            Dictionary of chapters with subtopics from TOC
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            return self.extract_from_text(content)
        except FileNotFoundError:
            raise ValueError(f"File not found: {file_path}")
        except UnicodeDecodeError:
            try:
                # Try different encodings
                with open(file_path, 'r', encoding='latin-1') as f:
                    content = f.read()
                return self.extract_from_text(content)
            except:
                raise ValueError("Cannot decode file. Please ensure it's in UTF-8 or Latin-1 encoding")

    def save_results(self, data: Dict[str, List[str]], output_path: str) -> None:
        """
        Save extracted chapters to JSON file with summary.
        
        Args:
            data: Chapter data to save
            output_path: Destination file path
        """
        try:
            # Create summary
            total_topics = sum(len(topics) for topics in data.values())
            summary = {
                "summary": {
                    "total_chapters": len(data),
                    "total_topics": total_topics,
                    "extraction_type": "table_of_contents_mapping"
                },
                "chapters": data
            }
            
            with open(output_path, 'w', encoding='utf-8') as f:
                json.dump(summary, f, indent=2, ensure_ascii=False)
            
            print(f"✓ Results saved to {output_path}")
            print(f"✓ {len(data)} chapters with {total_topics} study topics extracted")
            
        except Exception as e:
            raise IOError(f"Failed to save results: {str(e)}")

    def _validate_output(self, output: str) -> Dict[str, List[str]]:
        """
        Validate and clean the LLM output.
        
        Args:
            output: Raw LLM output string
            
        Returns:
            Validated chapter dictionary
        """
        try:
            # Remove markdown code blocks if present
            cleaned = output.replace('```json', '').replace('```', '').strip()
            
            # Find JSON in the response if wrapped in text
            json_match = re.search(r'\{.*\}', cleaned, re.DOTALL)
            if json_match:
                cleaned = json_match.group()
            
            data = json.loads(cleaned)
            
            # Validate structure
            if not isinstance(data, dict):
                raise ValueError("Output must be a dictionary")
                
            for chapter, subtopics in data.items():
                if not isinstance(subtopics, list):
                    raise ValueError(f"Subtopics for '{chapter}' must be a list")
                    
            return data
            
        except json.JSONDecodeError as e:
            raise ValueError(f"Invalid JSON format: {str(e)}")
        except Exception as e:
            raise ValueError(f"Output validation failed: {str(e)}")

    def print_summary(self, data: Dict[str, List[str]]) -> None:
        """Print a formatted summary of extracted content"""
        print("\n" + "="*50)
        print("TABLE OF CONTENTS EXTRACTION SUMMARY")
        print("="*50)
        
        for chapter, topics in data.items():
            print(f"\n📚 {chapter}")
            if topics:
                print(f"   ({len(topics)} subtopics):")
                for topic in topics[:5]:  # Show first 5 topics
                    print(f"   • {topic}")
                if len(topics) > 5:
                    print(f"   ... and {len(topics) - 5} more")
            else:
                print("   (No subtopics listed)")
        
        total_topics = sum(len(topics) for topics in data.values())
        print(f"\n📊 Total: {len(data)} chapters, {total_topics} study topics")

    def compare_with_original(self, original_structure: Dict[str, List[str]]) -> None:
        """Compare extracted structure with original for validation"""
        print("\n" + "="*50)
        print("COMPARISON WITH ORIGINAL STRUCTURE")
        print("="*50)
        
        # This would be used to compare with your original JSON structure
        # to identify any discrepancies
        pass


if __name__ == "__main__":
    try:
        # Configuration
        API_KEY = "AIzaSyCh0giL2GgH7DloEnqanSeGvq4cAg-2uuE"  # Replace with your key
        INPUT_FILE = "01_raw_book.txt"  # File containing the table of contents
        OUTPUT_FILE = "precise_biology_structure_1.json"
        
        # Initialize extractor with focus on TOC mapping
        print("🚀 Initializing Table of Contents Extractor...")
        extractor = TextbookChapterExtractor(api_key=API_KEY)
        
        # Process table of contents
        print(f"📖 Processing table of contents: {INPUT_FILE}")
        chapters = extractor.extract_from_file(INPUT_FILE)
        
        if chapters:
            # Save results
            extractor.save_results(chapters, OUTPUT_FILE)
            
            # Print summary
            extractor.print_summary(chapters)
            
            print("\n✅ Extraction completed successfully!")
            print("📝 The output should now match the original table of contents structure")
        else:
            print("❌ No content found or extraction failed")
        
    except Exception as e:
        print(f"💥 Fatal error: {str(e)}")
        exit(1)