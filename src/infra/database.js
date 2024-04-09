import mongoose from "mongoose";  
  
async function ct() {
    try {
        await mongoose.connect(process.env.DB);
        console.log("Database connected!");
        return mongoose.connection;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

export default ct;