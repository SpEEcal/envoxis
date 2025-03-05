import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    // stores the ID of the sender of the message
    senderId:{
        type: mongoose.Schema.Types.ObjectId, // saves user id
        ref: "User", // gets data about each user from their User model
        required: true
    },
    // stores the ID of the receiver of the message
    receiverId:{
        type: mongoose.Schema.Types.ObjectId, // saves user id
        ref: "User" // gets data about each user from their User model
    },
    // stores IDs of all receivers of the message
    receiversIds:[
        { 
            type: mongoose.Schema.Types.ObjectId, // saves user id
            ref: "User" // gets data about each user from their User model
        }
    ],
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

// saves model as a constant to be used in backend to create / modify / delete messages
const Message = mongoose.model("Message", messageSchema);

export default Message;