import mongoose from "mongoose";
import { type } from "os";

const messageSchema = new mongoose.Schema({
    // stores the ID of the sender of the message
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // stores the ID of the receiver of the message
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    // stores iinitialisation vector for later decryption
    iv:{
        type: String
    },
    // stores message sent / file path
    message:{
        type: String,
        required: true
    },
    // stores file type - if the message is a file
    filetype:{
        type: String, 
    },
    // stores file name to be used when displaying message
    filename:{
        type: String,
        default: "",   
    }
    // createdAt, updatedAt - time
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;