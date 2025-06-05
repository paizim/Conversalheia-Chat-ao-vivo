const{WebSocketServer} = require ("ws")
const dotenv = require("dotenv")

dotenv.config()

const wss = new WebSocketServer({ port: process.env.PORT})

wss.on("connection",(ws) => {
    ws.on("erro",console.error)
    
    ws.on("menssagem",(data) => {
        console.log(data.toString())
        wss.clients.forEach((client) => client.send(data.toString()))
    })
    console.log("client connected")
})