import mongoose from "mongoose";

// creates a model to how user details must be displayed and what user details must be needed for the websote to function
const userSchema = new mongoose.Schema({
    // set each attribute to a particular data type so that users do not input the wrong data
    username:{
        type:String, // saved information as a string
        required:true, // must be filled
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true // makes sure that another user does not have the same email
    },
    phonenumber:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8 // checks the length of the password so that users do not make a weak password
    },
    profilePic:{
        type:String,
        default: "", // makes sure that the default setting for a profile picture is an empty string which can be updated later
    },
    status:{
        type:String,
        default: "",
    },
    friends: [
        {
            type: mongoose.Schema.ObjectId, // saves user id
            ref: "User" // gets data about each user from their User model
        }
    ],
    // createdAt updatedAt
}, {timestamps:true})

// saves model as a constant to be used in backend to create / modify / delete users
const User = mongoose.model("User", userSchema)

export default User