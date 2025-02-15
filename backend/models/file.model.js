import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
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
    file:{
        type: String,
        required: true
    },
    filetype:{
        type: String,
        required: true       
    },
    filename:{
        type: String,
        required: true,
        default: ""
    }
    // createdAt, updatedAt
}, {timestamps: true});

const File = mongoose.model("File", fileSchema);

export default File;