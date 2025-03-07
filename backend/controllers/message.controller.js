import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
import crypto from "crypto";
import {ObjectId} from "mongodb"

export const sendMessage = async (req, res) => {
    try {
        let { message } = req.body; // data from frontend body
        const { id: receiverId } = req.params; // data from api url
        const senderId = req.user._id; // data from ProtectRoute middleware
        // set encryption alogrithm
        const algorithm = 'aes-256-cbc'
        // private key
        const key = "anastasiascatwascalledmaxbutdead"
        // random 16 bit initialization vector
        let iv = crypto.randomBytes(16)

        // finds the conversation to add the message to
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        // creates a conversation if there is no previous messages between two users
        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const base64message = message

        // stores the message to be sent in base 64 using message model
        const messagetobesent = Message({
            message: base64message,
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

        // stores encrypted message using message model
        const newMessage = new Message({
            iv,
            message,
            senderId,
            receiverId,
    
        })
        
        // puts message into conversation
        if(newMessage) {
            conversation.messages.push(newMessage._id);
        }

        //SOCKET TO FUNCTIONALITY - tells live application that a new message has been sent 
        const receiverSocketId = getReceiverSocketId(receiverId)
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", messagetobesent)
        }

        //will run in parallel - saves the message and conversation 
        await Promise.all([conversation.save(), newMessage.save()]);

        // returns the base64 message (NOT ENCRYPTED)
        console.log(messagetobesent)
        res.status(201).json(messagetobesent);

    } catch (error) { // errors to be returned to frontend
        console.log("Error in sendMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};

export const getMessages = async (req, res) => {
    try {
        // gets receiver id from api url
        const {id:userToChatId} = req.params;
        // gets sender id from protectRoute middleware
        const senderId = req.user._id;

        // finds the conversation between the two users
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, userToChatId]},
        }).populate("messages"); // NOT REF BUT ACTUAL MESSAGES

        // checks if there is no conversation
        if(!conversation) return res.status(200).json([])
        
        // gets messages from conversation
        const messages = conversation.messages

        // returns array of messages
        res.status(200).json(messages)
    // errors to be returned to frontend
    } catch (error) {
        console.log("Error in getMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};

export const decryptdata = async (req, res) => {
    try{
        const { data } = req.body // gets encrypted message from "body" in fetch function
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
        })
    
        res.status(200).json(data) // returns data
    }
    // gets backend error and sends it to frontend
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
        if(req.file.mimetype == 'image/png' || req.file.mimetype == 'image/jpeg' || req.file.mimetype == 'image/gif'){
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

        // creates file to be stored in database where the encrypted message is used
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

export const getGroupMessages = async (req, res) => {
    try {
        const {participants} = req.body; // data from api url
        const users = participants
        // finds a conversation between the users
        const conversation = await Conversation.findOne({
            groupchatparticipants: {$all: [users[0], users[1], users[2], users[3], users[4], users[5], users[6], users[7], users[8], users[9]]},
            typeofchat: "group"
        }).populate("messages"); // NOT REF BUT ACTUAL MESSAGES

        if(!conversation) return res.status(200).json([]) // checks if there are no messages sent between them
            
        // gets the messages array
        const messages = conversation.messages

        res.status(200).json(messages) // returns the messages array to the frontend to be displayed
    } catch (error) { // errors to be returned to frontend
        console.log("Error in getGroupMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};

export const sendGroupMessage = async (req, res) => {
    try {
        let { message ,participants } = req.body; // data from frontend
        const receiversIds = participants; // data from api url
        const senderId = req.user._id; // data from middleware ProtectRoute
        // set encryption alogrithm
        const algorithm = 'aes-256-cbc'
        // private key
        const key = "anastasiascatwascalledmaxbutdead"
        // random 16 bit initialization vector
        let iv = crypto.randomBytes(16)

        // finds a conversation between the users
        let conversation = await Conversation.findOne({
            groupchatparticipants: { $all: [receiversIds[0], receiversIds[1], receiversIds[2], receiversIds[3], receiversIds[4], receiversIds[5], receiversIds[6], receiversIds[7], receiversIds[8], receiversIds[9]] },
            typeofchat: "group"
        })

        if(!conversation){
            conversation = await Conversation.create({
                groupchatparticipants: [receiversIds[0], receiversIds[1], receiversIds[2], receiversIds[3], receiversIds[4], receiversIds[5], receiversIds[6], receiversIds[7], receiversIds[8], receiversIds[9]],
                typeofchat: "group"
            })
        }

        // creates a message through the model (UNENCRYPTED)
        const messagetobesent = Message({
            message,
            senderId,
            receiversIds: [receiversIds[0], receiversIds[1], receiversIds[2], receiversIds[3], receiversIds[4], receiversIds[5], receiversIds[6], receiversIds[7], receiversIds[8], receiversIds[9]],
        })

        //encrypt message using AES, Private key and initialisation vector
        const cipher = crypto.createCipheriv(algorithm, key, iv)
        let encrytedData = cipher.update(message, "utf-8", "hex")
        encrytedData += cipher.final("hex")
        message = encrytedData

        // convert the initialisation vector to base64 string
        const base64data = Buffer.from(iv, "binary").toString("base64")
        iv = base64data

        // creates a message through the model to be stored in database (ENCRYPTED)
        const newMessage = new Message({
            iv,
            message,
            senderId,
            receiversIds: [receiversIds[0], receiversIds[1], receiversIds[2], receiversIds[3], receiversIds[4], receiversIds[5], receiversIds[6], receiversIds[7], receiversIds[8], receiversIds[9]],
        })

        const receivers = []
        receiversIds.map((user) => {
            if (user != null){
                receivers.push(ObjectId.createFromHexString(user))
            }
        })
        if(newMessage) { // checks for a new message sent
            conversation.messages.push(newMessage._id);
        }
        //SOCKET IO FUNCTIONALITY
        receivers.map((receiver) => {
            if (senderId != receiver){
                const receiverSocketId = getReceiverSocketId(receiver)
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("newGroupMessage", messagetobesent) // sends message to be displayed in real time
                }
            }
        })

        //will run in parallel
        await Promise.all([conversation.save(), newMessage.save()]); // saves the messages and conversation status

        res.status(201).json(messagetobesent); // sends message to frontend
    // errors to be returned to frontend
    } catch (error) {
        console.log("Error in sendGroupMessage controller: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
};