import fitz  # PyMuPDF

def extract_text_from_pdf(file_path):
    doc = fitz.open(file_path)
    full_text = ""
    for page in doc:
        full_text += page.get_text()
    return full_text

text = extract_text_from_pdf("GeneralBiology.pdf")


with open('01_raw_book.txt','w'):
    f = open('01_raw_book.txt', 'w', encoding='utf-8')
    f.write(text)
    f.close()
