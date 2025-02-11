import express, { Router } from 'express';
import * as Validation from '../../validations/admin.validations';
import * as Controller from '../../controller/admin.controller';
import { uuidValidation } from '../../validations/commonValidations';

const router: Router = express.Router();

router
    .route('')
    .post(
        Validation.createUserValidation,
        Controller.createUser
    )

router
    .route('/:uuid')
    .put(
        uuidValidation,
        Validation.createUserValidation,
        Controller.updateAdmin
    )
    .delete(
        uuidValidation,
        Controller.deleteAdmin
    )

export { router as userRoutes };