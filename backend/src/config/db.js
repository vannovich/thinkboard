import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected!");
    }catch (e) {
        console.log(e.message)
        process.exit(1); // exit with success
    }
}