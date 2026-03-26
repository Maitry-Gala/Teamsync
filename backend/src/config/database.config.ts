import mongoose from "mongoose";
import { config } from "./app.config";

const connectDatabase = async () => {
    try {
        await mongoose.connect(config.MONGO_URL);
        console.log("Connected to Mongo Database");
    } catch (e) {
        console.log(e);
        console.log("Error connecting to Mongo Database");
        process.exit(1);
    }
};

export default connectDatabase;
