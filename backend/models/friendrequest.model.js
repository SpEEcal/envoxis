import mongoose from "mongoose"; // MongoDB library 

const friendrequestSchema = new mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId, // saves id of the sender
        ref: "User" // info about sender through user model
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId, // saves id of the receiver
        ref: "User" // info about receiver through user model
    }
    // createdAt, updatedAt
}, {timestamps: true});

const friendRequest = mongoose.model("friendRequest", friendrequestSchema); // allows for model to be called and used to create new objects in backend

export default friendRequest;