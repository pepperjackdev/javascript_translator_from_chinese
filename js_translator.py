import argparse
import re
import os
import googletrans

js_string_regex = re.compile(r"""(?:".{0,}")|(?:'.{0,}')|(?:`.{0,}`)""")
chinese_string_regex = re.compile(r"""(?:[\u4e00-\u9fff]+)""")

translator = googletrans.Translator()

def extract_js_strings(text) -> list:
    return js_string_regex.findall(text)

def extract_chinese_strings(text) -> list:
    return chinese_string_regex.findall(text)

def translate_js_file(file_path, dest='en'):
    # read the javascript file
    with open(file_path, 'r', encoding='utf-8') as file:
        javascript_file_str = file.read()

    # extract all the strings from the javascript file
    javascript_file_strings = extract_js_strings(javascript_file_str)

    chinese_file_strings = list()
    for js_file_string in javascript_file_strings:
        if (extract_chinese_strings(js_file_string) != None):
            for chinese_string in extract_chinese_strings(js_file_string):
                chinese_file_strings.append(chinese_string)
        
    translated_file_strings = list()
    for chinese_string in chinese_file_strings:
        translated_file_strings.append(translator.translate(chinese_string).text)

    for i in range(len(chinese_file_strings)):
        print(f"translating {chinese_file_strings[i]} to {translated_file_strings[i]}")
        javascript_file_str = javascript_file_str.replace(chinese_file_strings[i], translated_file_strings[i], 1)

    os.makedirs(os.path.dirname("translated/" + file_path), exist_ok=True)
    with open("translated/" + file_path, 'w', encoding='utf-8') as file:
        file.write(javascript_file_str)

def main():
    # call translate js file over all the files in the directory
    for root, dirs, files in os.walk("js_files"):
        for file in files:
            if file.endswith(".js"):
                translate_js_file(os.path.join(root, file))

if __name__ == "__main__":
    main()