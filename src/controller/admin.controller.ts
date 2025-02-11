
import { Request, Response } from "express";
import { Logger } from "../common/logger";
import adminModel from "../models/admin.models";
import { responseFormatter } from "../utils/express";

const MODULE = "ADMIN"

export const createUser = async (req: Request, res: Response): Promise<any> => {
    try {
        const userExists = await adminModel.findOne({ email: req.body.email }).lean();
        if (userExists) {
            return res.status(409).json(responseFormatter({ data: null, success: false, error_code: 409, message: "Email already exists" }))
        }

        let result = await new adminModel(req.body).save();
        if (!result) {
            res.status(400).json(responseFormatter({ data: null, success: false, error_code: 400, message: "failed to create user" }));
            return;
        }

        return res.status(200).json(responseFormatter({ data: result, success: false, message: "User created successfully" }));
    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in creating user ${error.message}`)
        return res.status(400).json({ message: "failed to create user" });
    }
}

export const updateAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const duplicateAdmin = await adminModel.findOne({ uuid: req.body.uuid, email: { $ne: req.body.email } }).lean();
        if (duplicateAdmin) {
            return res.status(409).json(responseFormatter({ data: null, success: false, error_code: 409, message: "Duplicate User" }));
        }


        let result = await adminModel.findOneAndUpdate({ uuid: req.body.uuid }, { $set: { ...req.body } }, { new: true }).lean();
        if (!result) {
            return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 404, message: "failed to update Admin" }));

        }

        return res.status(200).json(responseFormatter({ data: result, success: true, message: "Admin updated successfully" }));


    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in creating user ${error.message}`)
        return res.status(400).json(responseFormatter({ success: false, data: null, error_code: 400, message: "failed to create user" }));

    }
}

export const deleteAdmin = async (req: Request, res: Response): Promise<any> => {
    try {
        const userDeleted = await adminModel.findOneAndDelete({ uuid: req.params.uuid }).lean();
        if (userDeleted) {
            return res.status(200).json(responseFormatter({ data: userDeleted, success: true, message: "Admin was deleted" }))
        }

        return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 404, message: "failed to delete user" }))
    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in deleting user ${error.message}`)
        return res.status(400).json(responseFormatter({ success: false, data: null, error_code: 400, message: "failed to delete user" }));

    }
}