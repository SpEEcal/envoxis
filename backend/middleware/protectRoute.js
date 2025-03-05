import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt; // grabs token from jwt
        
        if(!token){ // checks if token exists
            return res.status(401).json({error: "Unauthorised - No Token Provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); // decodes token to be used in backend

        if(!decoded) { // checks if the decoded token is valid
            return res.status(401).json({error: "Unauthorised - Invalid Token"});
        }

        // finds the user in the database through user id in token
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){ // checks if user exists
            return res.status(404).json({error: "User not found"});
        }

        req.user = user; // sets user id to be used in backend

        next(); // Passes control to the next middleware function
    // errors to be returned to frontend
    } catch (error) {
        console.log("Error in protectRoute middleware", error.message)
        res.status(500).json({error:"Internal server error"});
    }
}

export default protectRoute