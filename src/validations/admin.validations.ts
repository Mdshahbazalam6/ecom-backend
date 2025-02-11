import Joi from "joi";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { Logger } from "../common/logger";
import { REGEX } from "../constants/Regex";


const MODULE = "USER"

export const createUserValidation = (req: Request, res: Response, next: NextFunction): any => {
    try {
        const payload = Joi.object({
            firstName: Joi.string().pattern(REGEX.firstName).required(),
            lastName: Joi.string().pattern(REGEX.lastName).required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(REGEX.password).required(),
            role: Joi.string().valid('admin', 'user').default('user'),
            mobile: Joi.string().pattern(REGEX.mobile).required(),
        });

        const result = payload.validate(req.body)

        if (result.error) {
            Logger.error(`[${MODULE}]: validation error - ${result.error.message}`)
            return res.status(400).json({ message: `validation failed` });
        }

        next();
    } catch (error: any) {
        Logger.error(`Error in create user validation: ${error.message}`);
        return res.status(400).json({ message: "validation failed" });
    }
}

