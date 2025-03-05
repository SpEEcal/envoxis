import protectRoute from "../middleware/protectRoute.js";
import express from "express";
import { signup, login, logout, deleteuser, updateusername, updateemail, changestatus, changepfp } from '../controllers/auth.controller.js';
import multer from "multer";

const storage = multer.diskStorage({
  // defines where files are stored
    destination: function (req, file, cb) {
      cb(null, 'frontend/dist/pfpuploads')
    },
    //defines the filename of the files to be stored
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
})
// function from multer library called to upload files
const upload = multer({ storage: storage })

const router = express.Router() // allows for functions to be run when user is re-directed

// runs function when path is called
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/deleteuser", protectRoute, deleteuser)
router.post("/updateusername", protectRoute, updateusername)
router.post("/updateemail", protectRoute, updateemail)
router.post("/changestatus", protectRoute, changestatus)
router.post("/changepfp", [upload.single("file"), protectRoute], changepfp);

export default router