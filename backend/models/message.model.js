import mongoose from "mongoose";
import { type } from "os";

const messageSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    iv:{
        type: String
    },
    message:{
        type: String,
        required: true
    },
    filetype:{
        type: String, 
    },
    filename:{
        type: String,
        default: "",   
    }
    // createdAt, updatedAt
}, {timestamps: true});

const Message = mongoose.model("Message", messageSchema);

export default Message;