import express from 'express';
import { CategoryController } from './category.controller';

const route = express.Router();

route.post('/', CategoryController.createCategory);
route.get('/', CategoryController.allCategoryData);
route.delete('/:id', CategoryController.deleteCategoryData);

export const CategoryRoute = route;
