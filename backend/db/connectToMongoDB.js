import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,) // connects backend to cluster in mongoDB
        console.log("Connected to MongoDB") // states that they are connected
    } catch (error) {
        console.log("Error connecting to MongoDB", error.message) // states that they are not connected
    }
    
}
export default connectToMongoDB;