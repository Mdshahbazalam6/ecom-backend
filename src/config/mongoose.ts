import mongoose from "mongoose";
import { Logger } from "../common/logger";
import { Config } from "./env";

export const connectToDB = () => {

    try {
        const MONGODB_URI = `mongodb+srv://${Config.MONGODB.USERNAME}:${Config.MONGODB.PASSWORD}@cluster0.k4xu2.mongodb.net/devTinder`;

        mongoose.connect(MONGODB_URI, {
            appName: 'Ecommerce'
        });
        return mongoose.connection;
    } catch (error: any) {
        Logger.error(`[database]: Failed to connect to MongoDB: ${error.message}`)
        process.exit(-1);
    }
}