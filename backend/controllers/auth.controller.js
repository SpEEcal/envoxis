import User from '../models/user.model.js';
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from '../utils/generateToken.js';
import validator from 'validator'

export const signup = async (req,res) => {
    try {
        const {username, email, phonenumber, password, confirmPassword}= req.body; // data from frontend body

        if(password !== confirmPassword){ // checks if passwords match
            return res.status(400).json({error:"Passwords do not match"})
        }

        const user = await User.findOne({username}); // checks if username exists

        if(user){
            return res.status(400).json({error:"Username already exists"}) // outputs error if username already taken
        }

        // checks if the email or phone number have been already used
        const emailused = await User.findOne({email})
        if(emailused){
            return res.status(400).json({error:"Email already used"})
        }
        const phonenumberused = await User.findOne({phonenumber})
        if(phonenumberused){
            return res.status(400).json({error:"Phone number already used"})
        }

        // checks if email is valid
        if(!validator.isEmail(email)){
            return res.status(400).json({error:"Invalid Email"})
        }
        
        // checks if phone number is valid
        if(!validator.isMobilePhone(phonenumber)){
            return res.status(400).json({error:"Invalid Phone number"})
        }

        // checks if the password is in the valid format
        if (!validator.isStrongPassword(password, { 
            minLength: 8, minLowercase: 1, 
            minUppercase: 2, minNumbers: 1, minSymbols: 2 
        })) { 
            return res.status(400).json({error:"Invalid password"})
        } 

        // HASH PASSWORD
        const salt = await bcrypt.genSalt(16);
        const hashedPassword = await bcrypt.hash(password, salt);

        // sets default profile picture
        const ProfilePic = `../Messageimg/unknown.jpg`

        // sets default status
        const status = `../Messageimg/active1.png`
        
        // creates new user object
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

        // returns updated user information to be used for frontend
            res.status(201).json({
                _id: newUser._id,
                username: newUser.username,
                email: newUser.email,
                phonenumber: newUser.phonenumber,
                profilePic: newUser.profilePic,
                status: newUser.status,
            })
        } else {
            res.status(400).json({error: "Invalid user data"}) // error returned ot frontend
        }
    } catch (error) { // errors to be returned to frontend
        console.log("Error in signup controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const login = async (req,res) => {
    try {
        const {username, password} = req.body; // data from frontend body
        const user = await User.findOne({username}); // finds user in database
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // compares hash of inputted password vs database hash

        if(!user || !isPasswordCorrect){ // checks if username or password is wrong
            return res.status(400).json({error: "Invalid username or password"})
        }

        generateTokenAndSetCookie(user._id, res); // creates a token / cookie

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
        console.log("Error in login controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const logout = (req,res) => {
    try {
        res.cookie("jwt","", {maxAge:0}) // sets token age to 0
        // returns updated user information to be used for frontend
        res.status(200).json({message: "Logged out successfully"});
    } catch (error) {    // errors to be returned to frontend
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
        const Userid = req.user._id // userid from protectRoute middleware
        const { username } = req.body // data from frontend body

        const AlreadyUser = await User.findOne({username}) // checks if username exists
        if (AlreadyUser){
            return res.status(400).json({error: "Username already exists"}) // error if username exists
        }

        await User.findByIdAndUpdate(Userid, {username: username}) // updates username
        const user = await User.findOne(Userid) // gets updated user data
        
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
        console.log("Error in updateusername controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}

export const updateemail = async(req, res) => {
    try {
        const Userid = req.user._id // userid from protectRoute middleware
        const { email } = req.body // data from frontend body

        const AlreadyUser = await User.findOne({email}) // checks if someone is already using that email
        if (AlreadyUser){
            return res.status(400).json({error: "Email address has already been used"}) // error returned if email is currently in use
        }

        await User.findByIdAndUpdate(Userid, {email: email}) // updates user email
        const user = await User.findById(Userid) // gets updated user data

        if (!user){ // checks if user exists in database
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
        const Userid = req.user._id // userid from protectRoute middleware

        await User.findByIdAndUpdate(Userid, {profilePic: `../pfpuploads/${req.file.filename}`}) // updates user profile picture using their id
        const user = await User.findById(Userid) // finds the user in the database again

        if (!user){
            return res.status(400).json("User not found") // checks if user exists
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
    } catch (error){
        console.log("Error in changepfp controller", error.message)
        res.status(500).json({error:"Internal Server Error"})
    }
}