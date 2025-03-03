import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from '../utils/generateToken.js';

export const signup = async (req,res) => {
    try {
        const {username, email, phonenumber, password, confirmPassword}= req.body;

        if(password !== confirmPassword){
            return res.status(400).json({error:"Passwords do not match"})
        }

        const user = await User.findOne({username});

        if(user){
            return res.status(400).json({error:"Username already exists"})
        }

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, salt);

        // https://avatar-placeholder.iran.liara.run/avatar/200/200/any
        const ProfilePic = `../Messageimg/unknown.jpg`

        const status = `../Messageimg/active1.png`

        const newUser = new User({
            username,
            email,
            phonenumber,
            password: hashedPassword,
            profilePic: ProfilePic,
            status: status,
        })

        if(newUser) {
            // Generate JWT token 
            generateTokenAndSetCookie(newUser._id, res)
            await newUser.save()

            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phonenumber: newUser.phonenumber,
                profilePic: newUser.profilePic,
                status: newUser.status,
            })
        } else {
            res.status(400).json({error: "Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const login = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");

        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            profilePic: user.profilePic,
            status: user.status
        })

    } catch (error) {
        console.log("Error in login controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","", {maxAge:0})
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {
        console.log("Error in logout controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const deleteuser = async(req, res) => {
    try {
        // gets user id from protectRoute middleware
        const Userid = req.user._id
        // waits until user has been found and deleted
        const user = await User.findByIdAndDelete(Userid)

        // checks if the user even exists in the database
        if (!user){
            return res.status(400).json("User not found") // error returned 
        }
        
        res.cookie("jwt","", {maxAge:0}) // removes authorisation cookie
        res.status(200).json({message: "Deleted user successfully"}); // data to be returned to frontend
    // errors to be returned to frontend
    } catch (error) {
        console.log("Error in deleteuser controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const updateusername = async(req, res) => {
    try {
        const Userid = req.user._id
        const { username } = req.body

        const AlreadyUser = await User.findOne({username})
        if (AlreadyUser){
            return res.status(400).json({error: "Username already exists"})
        }

        await User.findByIdAndUpdate(Userid, {username: username})
        const user = await User.findOne(Userid)
        
        if (!user){
            return res.status(400).json("User not found")
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            profilePic: user.profilePic,
            status: user.status
        })

    } catch (error) {
        console.log("Error in updateusername controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const updateemail = async(req, res) => {
    try {
        const Userid = req.user._id
        const { email } = req.body

        const AlreadyUser = await User.findOne({email})
        if (AlreadyUser){
            return res.status(400).json({error: "Email address has already been used"})
        }

        await User.findByIdAndUpdate(Userid, {email: email})
        const user = await User.findById(Userid)

        if (!user){
            return res.status(400).json("User not found")
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            profilePic: user.profilePic,
            status: user.status
        })
    
    } catch (error) {
        console.log("Error in updateemail controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const changestatus = async(req, res) => {
    try {
        const Userid = req.user._id // userid from protectRoute middleware
        const { status } = req.body // data from frontend body

        await User.findByIdAndUpdate(Userid, {status: status}) // updates user status
        const user = await User.findById(Userid) // finds updated user information

        // checks if user exists in database
        if (!user){
            return res.status(400).json("User not found")
        }

        // returns updated user information to be used for frontend
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            profilePic: user.profilePic,
            status: user.status
        })
    // errors to be returned to frontend
    } catch (error) {
        console.log("Error in changestatus controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const changepfp = async(req, res) => {
    try{
        console.log(req.file)
        const Userid = req.user._id

        await User.findByIdAndUpdate(Userid, {profilePic: `../pfpuploads/${req.file.filename}`})
        const user = await User.findById(Userid)

        if (!user){
            return res.status(400).json("User not found")
        }

        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            phonenumber: user.phonenumber,
            profilePic: user.profilePic,
            status: user.status
        })
    } catch (error){
        console.log("Error in changepfp controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}