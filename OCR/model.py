import requests
import sys
import json

API_URL = "https://api-inference.huggingface.co/models/jinhybr/OCR-Donut-CORD"
headers = {"Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}

def query(filename):
    with open(filename, "rb") as f:
        data = f.read()
    response = requests.post(API_URL, headers=headers, data=data)
    return response.json()

if __name__ == "__main__":
    filename = sys.argv[1]
    output = query(filename)
    print(json.dumps(output)) 