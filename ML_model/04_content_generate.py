import os
import json
import google.generativeai as genai

# ========== CONFIGURATION ==========
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY") or "AIzaSyCh0giL2GgH7DloEnqanSeGvq4cAg-2uuE"
DAY_NUMBER = 1  # Change this to process another day
MODEL_NAME = "gemini-2.0-flash"

# ========== SETUP GEMINI ==========
genai.configure(api_key=GOOGLE_API_KEY)
model = genai.GenerativeModel(MODEL_NAME)

# ========== LOAD DAILY TOPICS ==========
with open("study_schedule.json", "r", encoding="utf-8") as f:
    schedule = json.load(f)

if DAY_NUMBER < 1 or DAY_NUMBER > len(schedule):
    raise ValueError(f"Invalid DAY_NUMBER: {DAY_NUMBER}")

topics = schedule[DAY_NUMBER - 1]["topics"]

# ========== FUNCTION TO QUERY GEMINI ==========
def get_topic_content(chapter, topic):
    prompt = (
        f"You are a biology teacher creating clear and concise study notes for students.\n\n"
        f"Chapter: {chapter}\n"
        f"Topic: {topic}\n\n"
        f"Please explain the topic in simple, structured language with subheadings, examples, and key points.\n"
        f"Use markdown-style formatting."
    )
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"⚠️ Error generating content for: {chapter} → {topic}")
        print(e)
        return ""

# ========== GENERATE & SAVE CONTENT ==========
output_data = {}

for i, item in enumerate(topics, 1):
    chapter = item["chapter"]
    topic = item["topic"]

    print(f"📘 Generating content for: {chapter} → {topic} ({i}/{len(topics)})")
    content = get_topic_content(chapter, topic)

    if chapter not in output_data:
        output_data[chapter] = {}

    output_data[chapter][topic] = content


# ========== SAVE TO FILE ==========
output_file = f"day_{DAY_NUMBER}_content.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(output_data, f, ensure_ascii=False, indent=4)

print(f"\n✅ Content saved to {output_file}")
