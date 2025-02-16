import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        })

        if(!conversation){
            conversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
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

        res.status(201).json(newMessage);

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