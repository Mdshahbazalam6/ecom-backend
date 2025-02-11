import { Request, Response } from "express";
import { Logger } from "../common/logger";
import CategoryModel from "../models/category.model";
import { responseFormatter } from "../utils/express";

const MODULE = "CATEGORY"

export const createCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        if (req.body.parent_category) {
            const parentCategory = await CategoryModel.findById(req.body.parent_category).lean();
            if (!parentCategory) {
                return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 404, message: "Parent category not found" }));
            }
        }
        const categoryExists = await CategoryModel.findOne({ url_slug: req.body.url_slug }).lean();
        if (categoryExists) {
            return res.status(409).json(responseFormatter({ data: null, success: false, error_code: 409, message: "Category with this slug already exists" }))
        }

        let result = await new CategoryModel(req.body).save();
        if (!result) {
            return res.status(400).json(responseFormatter({ data: null, success: false, error_code: 400, message: "failed to create category" }));
        }

        return res.status(200).json(responseFormatter({ data: result, success: true, message: "Category created successfully" }));

    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in creating the category ${error.message}`)
        return res.status(400).json({ message: "failed to create category" });
    }
}

export const getAllCategories = async (req: Request, res: Response): Promise<any> => {
    try {

        const categoryList = await CategoryModel.find({ status: 'active' })
            .populate({
                path: 'parent_category',
                model: 'Category',
                select: 'category url_slug parent_category'
            }).lean();

        if (!categoryList) {
            return res.status(400).json(responseFormatter({ data: null, success: false, error_code: 400, message: "failed to get categories" }));
        }

        return res.status(200).json(responseFormatter({ data: categoryList, success: true, message: "Ok" }));
    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in getting the categories ${error.message}`)
        return res.status(400).json({ message: "failed to get Categories" });
    }
}

export const updateCategory = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await CategoryModel.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true }).lean();
        if (!result) {
            return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 404, message: "failed to update the Category" }));
        }

        return res.status(200).json(responseFormatter({ data: result, success: true, message: "Category updated successfully" }));

    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in updating the category ${error.message}`)
        return res.status(400).json({ message: "failed to update the Category" });
    }
}