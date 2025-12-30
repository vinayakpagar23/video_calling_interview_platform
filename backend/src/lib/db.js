import mongoose from "mongoose";
import { ENV } from "./env.js";

export const connectDB = async () => {
    try {
       const conn = await mongoose.connect(ENV.DB_URI);
       console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error Connecting to MongoDB: ${error.message}`);
        process.exit(1);  //0 for success, 1 for failure
    }
}