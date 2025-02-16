import express from "express";
import { getMessages, sendMessage, uploadFile } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js"

import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'frontend/public/fileuploads')
      cb(null, 'frontend/dist/fileuploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix)
    }
})
const upload = multer({ storage: storage })

const router = express.Router();

router.get("/M/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute,sendMessage);
router.post("/uploadfile/:id", [upload.single("file"), protectRoute], uploadFile);

export default router;