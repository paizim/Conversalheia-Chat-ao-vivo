const login = document.querySelector(".login")
const loginForm = document.querySelector(".login__form")
const loginInput = document.querySelector(".login__input")

const chat = document.querySelector(".chat")
const chatForm = document.querySelector(".chat__form")
const chatInput = document.querySelector(".chat__input")
const chatMessages = document.querySelector(".chat__messages")

const color = "gold"
const user = {id:"", name:"", color:""}

let websocket
let isWebSocketReady = false;

const creatMesssageSelfElement = (content) => {
    const div = document.createElement("div")

    div.classList.add("message__self")
    div.innerHTML = content
    return div
}

const creatMesssageOtherElement = (content,sender,senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message__other")
    div.classList.add("message__sender")
   
    span.style.color = senderColor
    
    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content
    return div
}
const scrollScreen = () =>{
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}
const processMessage = ({data}) => {
    const {userID,userName,userColor} = JSON.parse(data)
    const message = userId == user.id 
        ? creatMesssageSelfElement = (content) 
        : creatMesssageOtherElement(content,userName,userColor)
    chatMessages.appendChild(message)
    scrollScreen()
}

const handleLogin = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.name = loginInput.value
    user.color = color
    
    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("wss://conversalheia-chat-ao-vivo.onrender.com")
    websocket.onopen = () => {
        console.log("✅ WebSocket conectado.");
        isWebSocketReady = true;
    };
    websocket.onmessage = processMessage
}    

const sendMessage = (event) =>{
    event.preventDefault()

    if (!websocket || !isWebSocketReady || websocket.readyState !== WebSocket.OPEN) {
        console.warn("⛔ WebSocket ainda não está pronto.");
        return;
    }
    
    const message = {
        userId: user.id,
        userName: user.name,
        userColor: user.color,
        content: chatInput.value
    }
    websocket.send(JSON.stringify(message))
    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit",sendMessage)
