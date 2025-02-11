import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../common/logger";
import { REGEX } from "../constants/Regex";

const MODULE = "CATEGORY"

export const createCategoryValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const payload = Joi.object({
            category: Joi.string().required(),
            url_slug: Joi.string().required(),
            status: Joi.string().valid('active', 'inactive').default('active'),
            parent_category: Joi.string().pattern(REGEX.objectId).optional(),
        })

        const result = payload.validate(req.body)

        if (result.error) {
            Logger.error(`[${MODULE}]: validation error - ${result.error.message}`)
            return res.status(400).json({ message: `validation failed` });
        }

        next();

    } catch (error: any) {
        Logger.error(`Error in create category validation: ${error.message}`);
        return res.status(400).json({ message: "validation failed" });
    }
}