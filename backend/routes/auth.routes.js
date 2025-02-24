import protectRoute from "../middleware/protectRoute.js";
import express from "express";
import { signup, login, logout, deleteuser, updateusername, updateemail, changestatus, changepfp } from '../controllers/auth.controller.js';
import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'frontend/public/pfpuploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + file.originalname)
    }
})
const upload = multer({ storage: storage })

const router = express.Router()
router.post("/signup", signup)

router.post("/login", login)

router.post("/logout", logout)

// runs function when path is called
router.post("/deleteuser", protectRoute, deleteuser)

router.post("/updateusername", protectRoute, updateusername)

router.post("/updateemail", protectRoute, updateemail)

// runs function when path is called
router.post("/changestatus", protectRoute, changestatus)

router.post("/changepfp", [upload.single("file"), protectRoute], changepfp);

export default router