import dotenv from "dotenv";
import { Logger } from "../common/logger";

const result = dotenv.config({ path: "environment/.env.local" });
if (result.error) {
    Logger.error(`Error in resolving environment variables: ${result.error}`)
}

export const Config = {
    PORT: process.env.PORT,
    MONGODB: {
        USERNAME: process.env.USERNAME,
        PASSWORD: process.env.PASSWORD,
    }
}