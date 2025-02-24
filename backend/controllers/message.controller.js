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

        // convert the initialisation vector to base64 string
        const base64data = Buffer.from(iv, "binary").toString("base64")
        iv = base64data

        const newMessage = new Message({
            iv,
            message,
            senderId,
            receiverId,
    
        })
        console.log(`newMessage: ${newMessage}`)
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
        data.map((message) => { // loops through all encrypted messages
            // encryption alogrithm
            const algorithm = 'aes-256-cbc'
            // private key
            const key = "anastasiascatwascalledmaxbutdead"
    
            //convert initialise vector from base64 to buffer
            const originaldata = Buffer.from(message.iv, 'base64') // decrypts to base64 using intialisation vector
    
            // decrypt string using aes and private key
            const decipher = crypto.createDecipheriv(algorithm, key, originaldata)
            // changes message from hex to unicode
            let decrypted = decipher.update(message.message, "hex", "utf-8")
            // adds on unicode message
            decrypted += decipher.final("utf8")
            message.message = decrypted // makes sure that messsage can be read by user when seen
            console.log(message.message)
        })
    
        res.status(200).json(data) // returns data
    }
    catch (error){
        console.log("Error in decryptdata controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export const uploadFile = async (req,res) => {
    try {
        const { id: receiverId } = req.params // gets other users id from id in api path
        const senderId = req.user._id // gets current user id form protectRoute middleware
        let filetype = "" // sets filetype to empty string
        let message = `../fileuploads/${req.file.filename}` // sets file path
        const filename = req.file.originalname // sets filename

        // set encryption alogrithm
        const algorithm = 'aes-256-cbc'
        // private key
        const key = "anastasiascatwascalledmaxbutdead"
        // random 16 bit initialization vector
        let iv = crypto.randomBytes(16)

        // gets the conversation between the two users
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        // creates a conversation for the users
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        // sets filetype
        if(req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg'){
            filetype = "image"
        }
        else{
            filetype = "document"
        }

        // creates the message using model
        const filetobesent = new Message({
            message,
            filetype,
            filename,
            senderId,
            receiverId,
        })

        //encrypt message using AES, Private key and initialisation vector
        const cipher = crypto.createCipheriv(algorithm, key, iv)
        let encrytedData = cipher.update(message, "utf-8", "hex")
        encrytedData += cipher.final("hex")
        message = encrytedData

        // convert the initialisation vector to base64 string
        const base64data = Buffer.from(iv, "binary").toString("base64")
        iv = base64data

        const newMessage = new Message({
            iv,
            message,
            senderId,
            receiverId,
            filetype,
            filename,
        })

        // saves new message in coversation database
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO FUNCTIONALITY
        // emits a new message 
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }

        // //will run in parallel for saving the data
        await Promise.all([conversation.save(), newMessage.save()]);

        // returns message sent
        res.status(201).json(filetobesent);

    // displays errors if found
    } catch (error) {
        console.log("Error in uploadFile controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};