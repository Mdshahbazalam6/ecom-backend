import express, { Router } from 'express';
import * as Validation from '../../validations/category.validations';
import * as Controller from '../../controller/category.controller';
import { objectIdValidation } from '../../validations/commonValidations';

const router: Router = express.Router();

router
    .route('')
    .get(
        Controller.getAllCategories
    )
    .post(
        Validation.createCategoryValidation,
        Controller.createCategory
    )

router
    .route('/:id')
    .put(
        objectIdValidation,
        Validation.createCategoryValidation,
        Controller.updateCategory
    )

export { router as categoryRoutes };