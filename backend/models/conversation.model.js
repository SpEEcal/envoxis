import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId, // saves user id
            ref: 'User', // gets data about each user from their User model
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId, // saves user id
            ref: 'Message', // gets data about each user from the Message model
            defalut:[], // sets array as empty with no messages
        }
    ],
    typeofchat:{
        type: String,
        defalut: "solo", // if 1 to 1 conversation
    },
    groupchatname:{
        type: String,
        default: "Group chat" // sets groupchat name
    },
    groupchatpfp:{
        type: String,
        default: "../Messageimg/groupchatdefault.png" // sets group chat image
    },
    // createdAt, updatedAt - time
}, {timestamps:true})

// saves model as a constant to be used in backend to create / modify / delete conversations
const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;