import { Request, Response } from "express";
import { Logger } from "../common/logger";
import productModel from "../models/product.model";
import { responseFormatter } from "../utils/express";
import productVariantsModels from "../models/productVariants.models";

const MODULE = "PRODUCT"

export const createProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const productExists = await productModel.findOne({ url_slug: req.body.url_slug }).lean();
        if (productExists) {
            return res.status(409).json(responseFormatter({ data: null, success: false, error_code: 409, message: "Product with this slug already exists" }))
        }

        let result = await new productModel(req.body).save();
        if (!result) {
            return res.status(400).json(responseFormatter({ data: null, success: false, error_code: 400, message: "failed to create Product" }));
        }

        return res.status(200).json(responseFormatter({ data: result, success: true, message: "Product created successfully" }));

    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in creating the Product ${error.message}`)
        return res.status(400).json({ message: "failed to create Product" });
    }
}

export const getAllProducts = async (req: Request, res: Response): Promise<any> => {
    try {
        const products = await productModel.find({ status: "active" });

        return res.status(200).json(responseFormatter({ data: products, success: true, message: "Ok" }));
    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in getting the Products ${error.message}`)
        return res.status(400).json({ message: "failed to get products" });
    }
}

export const getProductDetailsById = async (req: Request, res: Response): Promise<any> => {
    try {
        const product: any = await productModel.findById(req.params.id, { status: 'active' }).populate({
            path: 'category',
            model: 'Category',
            select: 'category url_slug parent_category',
            populate: {
                path: 'parent_category',
                model: 'Category',
                select: 'category url_slug parent_category'
            }
        }).lean();
        if (!product) {
            return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 404, message: "Product not found" }));
        }

        const variantsData = await productVariantsModels.find({ product_id: req.params.id, status: "active" }).lean();
        if (variantsData?.length > 0) {
            product.variants = variantsData;
        }

        return res.status(200).json(responseFormatter({ data: product, success: true, message: "Ok" }));
    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in getting the Products ${error.message}`)
        return res.status(400).json({ message: "failed to get products" });
    }
}


export const updateProduct = async (req: Request, res: Response): Promise<any> => {
    try {
        const result = await productModel.findOneAndUpdate({ _id: req.params.id }, { $set: { ...req.body } }, { new: true }).lean();
        if (!result) {
            return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 404, message: "failed to update the Product" }));
        }

        return res.status(200).json(responseFormatter({ data: result, success: true, message: "Product updated successfully" }));
    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in updating the Product ${error.message}`)
        return res.status(400).json({ message: "failed to update the Product" });
    }
}

export const addProductvariant = async (req: Request, res: Response): Promise<any> => {
    try {
        const productExists = await productModel.findById(req.body.product_id).lean();
        if (!productExists) {
            return res.status(404).json(responseFormatter({ data: null, success: false, error_code: 400, message: "Product not found" }));
        }

        const productVariantExists = await productVariantsModels.findOne({ url_slug: req.body.url_slug }).lean();
        if (productVariantExists) {
            return res.status(409).json(responseFormatter({ data: null, success: false, error_code: 409, message: "Product variant with this slug already exists" }))
        }

        let result = await new productVariantsModels(req.body).save();
        if (!result) {
            return res.status(400).json(responseFormatter({ data: null, success: false, error_code: 400, message: "failed to add the Product variant" }));
        }

        return res.status(200).json(responseFormatter({ data: result, success: true, message: "Product variant created successfully" }));

    } catch (error: any) {
        Logger.error(`[${MODULE}]: Error in adding the Product variant ${error.message}`)
        return res.status(400).json({ message: "failed to add the Product variant" });
    }
}
