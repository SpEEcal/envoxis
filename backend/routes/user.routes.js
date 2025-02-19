import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getFriends, getRequests, getUsersForSidebar, senderinfo, sendRequest } from "../controllers/user.controller.js";

const router = express.Router();

// routes for getting things in the User database
router.get("/", protectRoute, getUsersForSidebar)
router.get("/getfriends", protectRoute, getFriends)
router.get("/getrequests", protectRoute, getRequests)
router.post("/sendrequest", protectRoute, sendRequest)
router.post("/senderinfo", protectRoute, senderinfo)

export default router;