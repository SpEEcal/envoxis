import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    messages:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message',
            defalut:[],
        }
    ],
    type:{
        type: String,
        defalut: "solo",
    },
    groupchatname:{
        type: String,
        default: "Group chat"
    },
    groupchatpfp:{
        type: String,
        default: "../Messageimg/groupchatdefault.png"
    },
}, {timestamps:true})

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;