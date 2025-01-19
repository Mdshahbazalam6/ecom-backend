import { cloudinary } from "../config/cloudinary";
import { Logger } from "../common/logger";

export const getAllImagesFromCloudinary = async () => {
    try {
        const images = await cloudinary.api
            .resources()
            .then((result: any) => {
                return result;
            });

        return images;
    } catch (error: any) {
        Logger.error(`Error in getting all images from cloudinary: ${error.message}`);
    }
}
