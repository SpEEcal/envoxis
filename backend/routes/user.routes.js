import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { addFriend, createGroupChat, deleteFriend, deleteRequest, getFriends, getGroupChatsForSidebar, getRequests, getUsersForSidebar, objectID, senderinfo, sendRequest } from "../controllers/user.controller.js";

const router = express.Router(); // allows for functions to be run when user is re-directed

// routes for getting things from or to the User database
router.get("/", protectRoute, getUsersForSidebar)
router.get("/getfriends", protectRoute, getFriends)
router.get("/getrequests", protectRoute, getRequests)
router.post("/sendrequest", protectRoute, sendRequest)
router.post("/senderinfo", protectRoute, senderinfo)
router.post("/deleterequest", protectRoute, deleteRequest)
router.post("/addfriend", protectRoute, addFriend)
router.post("/deletefriend", protectRoute, deleteFriend)
router.post("/creategroupchat", protectRoute, createGroupChat)
router.get("/getgroupchatsforsidebar", protectRoute, getGroupChatsForSidebar)
router.post("/objectID", protectRoute, objectID)

export default router;