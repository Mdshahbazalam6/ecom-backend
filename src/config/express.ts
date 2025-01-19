import express, { Express, Request, Response } from "express";
import cors from "cors";
import { getAllImagesFromCloudinary } from "../utils/cloudinary.methods";
import { Logger } from "../common/logger";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});
app.get('/check', async (req: Request, res: Response) => {
    try {

        const images = await getAllImagesFromCloudinary();
        if (!images) {
            res.status(404).json({ message: 'No images found' })
        }

        res.status(200).json(images);
    } catch (error: any) {
        Logger.error(`Error getting images from cloudinary ${error.message}`)
    }
})

export default app;