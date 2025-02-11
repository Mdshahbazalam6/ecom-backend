import express from 'express';
import { userRoutes } from './admin.routes';
import { categoryRoutes } from './category.routes';
import { productRoutes } from './product.routes';

const Router = express.Router();



Router.use("/admin", userRoutes)
Router.use("/category", categoryRoutes)
Router.use("/product", productRoutes)


export { Router as routes }