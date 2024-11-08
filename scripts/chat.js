import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyBjgyCqCP9gpBhtiBNUY8_0OoETo0Fszps");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox")

let userMessage;
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`
    chatLi.innerHTML = chatContent;
    return chatLi;
}

async function generateResponse(incomingChatLi) {
    const messageElement = incomingChatLi.querySelector("p");

    const result = await model.generateContent(userMessage);
    console.log(result.response.text());
    
    messageElement.textContent = result.response.text();
    chatBox.scrollTo(0, chatBox.scrollHeight)
}
const handleChat = () => {
    userMessage = chatInput.value.trim();
    console.log(userMessage)
    if(!userMessage) return;
    chatInput.value = ""
    chatBox.appendChild(createChatLi(userMessage, "outgoing"));
    chatBox.scrollTo(0, chatBox.scrollHeight)

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatBox.appendChild(incomingChatLi);
        chatBox.scrollTo(0, chatBox.scrollHeight)
        generateResponse(incomingChatLi);
    }, 600);
}
sendChatBtn.addEventListener("click", handleChat)