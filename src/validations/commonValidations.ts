import Joi from "joi";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Logger } from "../common/logger";
import { REGEX } from "../constants/Regex";

export const uuidValidation = async (req: Request, res: Response, next: NextFunction): Promise<any> => {

    try {
        const Object = Joi.object({
            uuid: Joi.string().uuid().required()
        });

        const result = Object.validate(req.params)

        if (result.error) {
            Logger.error(`[UUID]: validation error - ${result.error.message}`)
            return res.status(400).json({ message: `validation failed` });
        }

        next();
    } catch (error: any) {
        Logger.error(`Error in UUID validation: ${error.message}`);
        return res.status(400).json({ message: "validation failed" });
    }
};

export const objectIdValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const Object = Joi.object({
            id: Joi.string().pattern(REGEX.objectId).required()
        });

        const result = Object.validate(req.params)

        if (result.error) {
            Logger.error(`[Object Id]: validation error - ${result.error.message}`)
            return res.status(400).json({ message: `validation failed` });
        }

        next();
    } catch (error: any) {
        Logger.error(`Error in Object id validation: ${error.message}`);
        return res.status(400).json({ message: "validation failed" });
    }
}