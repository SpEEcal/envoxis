import User from "../models/user.model.js";
import friendRequest from "../models/friendrequest.model.js";
import Conversation from "../models/conversation.model.js";

export const getUsersForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: {$ne: loggedInUserId}}).select("-password")


        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar: ", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export const getGroupChatsForSidebar = async (req, res) => {
    try {

        const loggedInUserId = req.user._id;
        const filteredUsers = await Conversation.find({ _id: {$ne: loggedInUserId}, typeofchat: "group"}).select("-password")

        console.log(filteredUsers)
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getGroupChatsForSidebar: ", error.message)
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
            console.log(alreadyRequest)
            return res.status(400).json({error: "Request has already been sent"})
        }

        //if the user is already the persons friend
        const alreadyFriend = await User.findOne({"_id": senderId,"friends": receiverId})
        if (alreadyFriend){
            console.log(senderId)
            console.log(alreadyFriend)
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
    try {
        const loggedInUser = req.user._id
        const friends = await User.findById(loggedInUser).populate("friends", "_id username profilePic status")
    
        res.status(200).json(friends)
    } catch (error) {
        console.log("Error in getFriends controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const deleteRequest = async (req, res) => {
    try {
        const receiverId = req.user._id // gets user id from protectRoute middleware 
        const {senderid} = req.body // gets the sender id from the body in fetch func

        // finds request and deletes it from friendrequest collection
        const request = await friendRequest.findOneAndDelete({"receiverId": receiverId, "senderId": senderid})

        // checks if there is no request
        if (!request){
            return res.status(400).json("Request not found")
        }

        // returns status that everything worked
        res.status(200).json({message: "Deleted request successfully"});
        // checks for any errors that have occured
    } catch (error) {
        console.log("Error in deleteRequest controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const addFriend = async (req, res) => {
    try {
        const receiverId = req.user._id // gets user id from protectRoute middleware
        const {senderid} = req.body // gets the sender id from the body in fetch func

        // updates both friend lists for both users using the id of both users
        const updatedfriendslistforreceiver = await User.findOneAndUpdate({ "_id": receiverId }, { $addToSet: { friends: [senderid] }})
        const updatedfriendslistforsender = await User.findOneAndUpdate({ "_id": senderid }, { $addToSet: { friends: [receiverId] }})

        // checks if any errors occured when adding users to friends lists
        if (!updatedfriendslistforreceiver || !updatedfriendslistforsender){
            return res.status(400).json("Friend not added")
        }

        // returns status that everything worked
        res.status(200).json({message: "Added friend successfully"});
        // checks for any errors that have occured
    } catch (error) {
        console.log("Error in addFriend controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const deleteFriend = async (req,res) => {
    try {
        const userid = req.user._id
        const {friendid} = req.body
        {console.log(friendid)}

        const updatedfriendslistforuser = await User.findOneAndUpdate({ "_id": userid }, { $pull: { friends: friendid }})
        const updatedfriendslistforfriend = await User.findOneAndUpdate({ "_id": friendid }, { $pull: { friends: userid }})

        if (!updatedfriendslistforuser || !updatedfriendslistforfriend){
            return res.status(400).json("Friend has not been deleted")
        }

        res.status(200).json({message: "Added friend successfully"});
    } catch (error) {
        console.log("Error in deleteFriend controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const createGroupChat = async (req, res) => {
    try {
        const {listofuserids} = req.body

        const newGroupchat = await Conversation.create({
            participants: listofuserids,
            typeofchat: "group",
        })

        if (!newGroupchat){
            return res.status(400).json("Group Chat not made")
        }

        res.status(200).json(newGroupchat);
    } catch (error) {
        console.log("Error in createGroupChat controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}