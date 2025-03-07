import { Server } from "socket.io";
import http from 'http'
import express from 'express'

const app = express()

const server = http.createServer(app) // initiates website
const io = new Server(server, { // creates a local host to see the website running LOCALLY
    cors:{
        origin:["https://envoxis.onrender.com"], // link to website
        methods: ["GET","POST"] // methods that are allowed to be used
    }
})

// returns the user in the userSocketMap array
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId]
}

// initiates array to store online users
const userSocketMap = {}

//checks who has connected by using the array userSocketMap
io.on('connection',(socket) => {
    console.log("a user connected", socket.id) // shows that user is using application

    const userId = socket.handshake.query.userId
    if(userId != "undefined") userSocketMap[userId] = socket.id // saves user in userSocketmap array

    io.emit("getOnlineUsers", Object.keys(userSocketMap)) // sets online user list

    //socket.on() is used to listen to the events. can be used by client and server
    socket.on("disconnect",()=>{
        console.log("a user disconnected", socket.id) // shows that user is no longer using application
        delete userSocketMap[userId] // deletes them from array of online users
        io.emit("getOnlineUsers", Object.keys(userSocketMap)) // updates online user list
    })
})

export {app, io, server}