import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import crypto from "crypto";

export const sendMessage = async (req, res) => {
    try {
        let { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;
        // set encryption alogrithm
        const algorithm = 'aes-256-cbc'
        // private key
        const key = "anastasiascatwascalledmaxbutdead"
        // random 16 bit initialization vector
        let iv = crypto.randomBytes(16)

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const messagetobesent = Message({
            message,
            senderId,
            receiverId,
        })

        //encrypt message using AES, Private key and initialisation vector
        const cipher = crypto.createCipheriv(algorithm, key, iv)
        let encrytedData = cipher.update(message, "utf-8", "hex")
        encrytedData += cipher.final("hex")
        message = encrytedData
        console.log(message)

        // convert the initialisation vector to base64 string
        const base64data = Buffer.from(iv, "binary").toString("base64")
        iv = base64data

        const newMessage = new Message({
            iv,
            message,
            senderId,
            receiverId,
    
        })
        console.log(newMessage)
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO FUNCTIONALITY

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        //will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(messagetobesent);

    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        const {id:userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId] },
        }).populate("messages"); // NOT REF BUT ACTUAL MESSAGES

        if(!conversation) return res.status(200).json([])

        const messages = conversation.messages

        res.status(200).json(messages)
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};

export const decryptdata = async (req, res) => {
    try{
        const { data } = req.body
        console.log(data)
        const decryptedmessages = data.map((message) => {
            console.log(message.message)
            // encryption alogrithm
            const algorithm = 'aes-256-cbc'
            // private key
            const key = "anastasiascatwascalledmaxbutdead"
    
            //convert initialise vector from base64 to buffer
            const originaldata = Buffer.from(message.iv, 'base64')
    
            // decrypt string using aes and private key
            const decipher = crypto.createDecipheriv(algorithm, key, originaldata)
            let decrypted = decipher.update(message.message, "hex", "utf-8")
            decrypted += decipher.final("utf8")
            message.message = decrypted
        })
    
        res.status(200).json(decryptedmessages)
    }
    catch (error){
        console.log("Error in decryptdata controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export const uploadFile = async (req,res) => {
    try {
        const { id: receiverId } = req.params
        const senderId = req.user._id
        let filetype = ""
        const message = `../fileuploads/${req.file.filename}`
        const filename = req.file.originalname
        console.log(req.file)
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        if(req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg'){
            filetype = "image"
        }
        else{
            filetype = "document"
        }

        const newMessage = new Message({
            message,
            filetype,
            filename,
            senderId,
            receiverId,
        })

        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO FUNCTIONALITY

        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        // //will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]);

        res.status(201).json(newMessage);

    } catch (error) {
        console.log("Error in uploadFile controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};