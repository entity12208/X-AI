from flask import Flask, request, jsonify
import openai

app = Flask(__name__)

openai.api_key = 'YOUR_OPENAI_API_KEY'

@app.route('/chat', methods=['POST'])
def chat():
    user_input = request.json.get('message')
    response = generate_response(user_input)
    return jsonify({"response": response})

def generate_response(user_input):
    try:
        response = openai.Completion.create(
            engine="davinci",
            prompt=user_input,
            max_tokens=150
        )
        return response.choices[0].text.strip()
    except Exception as e:
        return str(e)

if __name__ == "__main__":
    app.run(port=5000)
