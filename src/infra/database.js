import mongoose from "mongoose";    

async function ct () {
    try {
        mongoose.connect(process.env.DB)
        console.log("Database on !");
        return mongoose.connection;
    } catch (e) {
        console.error(e);
    }
};

export default ct;