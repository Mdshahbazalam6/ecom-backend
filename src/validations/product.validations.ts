import Joi from "joi";
import { Request, Response, NextFunction } from "express";
import { Logger } from "../common/logger";
import { REGEX } from "../constants/Regex";

const MODULE = "PRODUCT";

export const createProductValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const payload = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.number().required(),
            quantity: Joi.number().required(),
            url_slug: Joi.string().required(),
            category: Joi.string().pattern(REGEX.objectId).required(),
            tags: Joi.array().items(Joi.string()).optional(),
            status: Joi.string().valid('active', 'inactive').default('active'),
        });

        const result = payload.validate(req.body)

        if (result.error) {
            Logger.error(`[${MODULE}]: validation error - ${result.error.message}`)
            return res.status(400).json({ message: `validation failed` });
        }

        next();
    } catch (error: any) {
        Logger.error(`Error in create product validation: ${error.message}`);
        return res.status(400).json({ message: "validation failed" });
    }
}

export const addProductVariantValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const payload = Joi.object({
            product_id: Joi.string().pattern(REGEX.objectId).required(),
            color: Joi.string().optional(),
            size: Joi.string().optional(),
            price: Joi.number().required(),
            stock_quantity: Joi.number().required(),
            url_slug: Joi.string().required(),
            status: Joi.string().valid('active', 'inactive').default('active'),
        })

        const result = payload.validate(req.body)

        if (result.error) {
            Logger.error(`[${MODULE}]: validation error - ${result.error.message}`)
            return res.status(400).json({ message: `validation failed` });
        }

        next();
    } catch (error: any) {
        Logger.error(`Error in create product validation: ${error.message}`);
        return res.status(400).json({ message: "validation failed" });
    }
}