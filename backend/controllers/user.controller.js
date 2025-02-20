import User from "../models/user.model.js";
import friendRequest from "../models/friendrequest.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: loggedInUserId}).select("friends")
        const friends = await User.findById(loggedInUserId).populate("friends", "_id username status profilePic")
        console.log(filteredUsers)
        console.log("/////////////////////")
        console.log(friends)

        res.status(200).json(friends);

    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export const sendRequest = async (req, res) => {
    try {
        // set information from middleware and body into constants
        const { username } = req.body;
        const senderId = req.user._id;

        // finds the user in the database
        const userToBeFound = await User.findOne({username})
        // if no user return an error message
        if (!userToBeFound){
            return res.status(400).json({error: "Username does not exist"})
        }
        
        const receiverId = userToBeFound._id
        // finds if there has already been a request
        const alreadyRequest = await friendRequest.findOne({"receiverId": receiverId, "senderId": senderId})
        // if there is already a request return an error message
        if (alreadyRequest){
            return res.status(400).json({error: "Request has already been sent"})
        }

        //if the user is already the persons friend
        const alreadyFriend = await User.findOne({"friends": [senderId]})
        if (alreadyFriend){
            return res.status(400).json({error: "User has been already added"})
        }

        // creates a request to be accepted by the receiving user
        const newRequest = new friendRequest({
            senderId,
            receiverId
        })

        await newRequest.save();

        res.status(201).json(newRequest)
    } catch (error) {
        console.log("Error in sendRequest controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const senderinfo = async (req, res) => {
    const senderid = req.body

    const user = await User.findById(senderid)
    if(!user){
        return res.status(400).json("User not found")
    }

    res.json(200).json(user)
}

export const getRequests = async (req, res) => {
    const requests = await friendRequest.find({receiverId: req.user._id}).populate("senderId", "_id username profilePic")

    res.status(200).json(requests)
}

export const getFriends = async (req, res) => {
    const friends = await User.findById(req.user._id).populate("friends", "_id username profilePic status")

    res.status(200).json(friends)
}

export const deleteRequest = async (req, res) => {
    try {
        const receiverId = req.user._id
        const {senderid} = req.body
        const request = await friendRequest.findOneAndDelete({"receiverId": receiverId, "senderId": senderid})

        if (!request){
            return res.status(400).json("Request not found")
        }

        res.status(200).json({message: "Deleted request successfully"});
    } catch (error) {
        console.log("Error in deleteRequest controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const addFriend = async (req, res) => {
    try {
        const receiverId = req.user._id
        const {senderid} = req.body

        const updatedfriendslistforreceiver = await User.findOneAndUpdate({ "_id": receiverId }, { $set: { friends: [senderid] }})
        const updatedfriendslistforsender = await User.findOneAndUpdate({ "_id": senderid }, { $set: { friends: [receiverId] }})

        if (!updatedfriendslistforreceiver || !updatedfriendslistforsender){
            return res.status(400).json("Friend not added")
        }

        res.status(200).json({message: "Added friend successfully"});
    } catch (error) {
        console.log("Error in addFriend controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}