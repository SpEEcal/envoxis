// libraries needed in the file are imported
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import userRoutes from "./routes/user.routes.js"

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";
import path from "path";

const PORT = process.env.PORT || 5000; // sets port to run the applcation to the global PORT variable in .env file or to 5000

dotenv.config(); // loads .env file contents

const __dirname = path.resolve() // sets __dirname as a path

app.use(express.json()) // runs express middleware so do not need to constantly import express.js
app.use(cookieParser()) // middleware for handling cookies

// initiates url for api so that functions in the backend can be called
app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)
app.use("/api/users", userRoutes)

// allows files to be stored to an internal folder
app.use(express.static(path.join(__dirname, "/frontend/dist")))
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"))
})

// server.js output to show that everything is working to standard
server.listen(PORT, () => {
    connectToMongoDB()
    console.log(`Server running on port ${PORT}`)
});