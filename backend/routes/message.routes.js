import express from "express";
import { decryptdata, getMessages, sendMessage, uploadFile } from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js"

import multer from "multer";
const storage = multer.diskStorage({
  // defines where files are stored
    destination: function (req, file, cb) {
      cb(null, 'frontend/dist/fileuploads')
    },
    //defines the filename of the files to be stored
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix)
    }
})
// function from multer library called to upload files
const upload = multer({ storage: storage })

const router = express.Router();

router.get("/M/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute,sendMessage);
//runs the function and middleware to store the file in a folder and to grab user information
router.post("/uploadfile/:id", [upload.single("file"), protectRoute], uploadFile);
router.post("/decrypt", protectRoute, decryptdata);

export default router;