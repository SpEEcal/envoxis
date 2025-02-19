import mongoose from "mongoose";

const friendrequestSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    // createdAt, updatedAt
}, {timestamps: true});

const friendRequest = mongoose.model("friendRequest", friendrequestSchema);

export default friendRequest;