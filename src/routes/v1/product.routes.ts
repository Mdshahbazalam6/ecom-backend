import express, { Router } from 'express';
import * as Validation from '../../validations/product.validations';
import * as Controller from '../../controller/product-controller';
import { objectIdValidation } from '../../validations/commonValidations';

const router: Router = express.Router();

router
    .route('')
    .get(
        Controller.getAllProducts
    )
    .post(
        Validation.createProductValidation,
        Controller.createProduct
    )

router
    .route('/variants/add')
    .post(
        Validation.addProductVariantValidation,
        Controller.addProductvariant
    )

router
    .route('/:id')
    .get(
        objectIdValidation,
        Controller.getProductDetailsById
    )
    .put(
        objectIdValidation,
        Validation.createProductValidation,
        Controller.updateProduct
    )


export { router as productRoutes };