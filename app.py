from flask import Flask, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure Google Generative AI
genai.configure(api_key="AIzaSyBjgyCqCP9gpBhtiBNUY8_0OoETo0Fszps")
model = genai.GenerativeModel('gemini-1.5-flash')

# Initialize context
context = ""

def generate_context(previous_context: str, user_message: str, ai_message: str):
    prompt = f"on the basis of the below context, the message from the user and the reply by the disaster precaution helper, create a summary context of all the information that the disaster precaution helper knows about the user in general\nContext : {previous_context}\nUser: {user_message}\nTherapists: {ai_message}"
    response = model.generate_content(prompt)
    content = response.candidates[0].content
    text_content = content.parts[0].text
    return text_content

def chat(context: str, user_message: str):
    prompt = f"Context: {context}\nAct like a professional disaster precaution helper. The above content gives you information about what all you know about the user. On the basis of same information reply to the below conversation\nUser Message: {user_message}"
    response = model.generate_content(prompt)
    content = response.candidates[0].content
    text_content = content.parts[0].text
    return text_content

@app.route('/chat', methods=['POST'])
def chat_endpoint():
    global context
    data = request.get_json()
    user_message = data.get('user_message', '')
    
    ai_reply = chat(context, user_message)
    context = generate_context(context, user_message, ai_reply)
    
    return jsonify({
        'reply': ai_reply,
        'new_context': context
    })

if __name__ == '__main__':
    app.run(debug=True)
