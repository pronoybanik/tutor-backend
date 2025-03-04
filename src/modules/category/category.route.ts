import express from 'express';
import { CategoryController } from './category.controller';
import validateZodRequest from '../../middlewares/validateZodRequest';
import { categoryValidations } from './category.validation';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const route = express.Router();

route.post(
  '/',
  auth(USER_ROLE.admin),
  validateZodRequest(categoryValidations.createCategoryValidationSchema),
  CategoryController.createCategory,
);
route.get('/', auth(), CategoryController.allCategoryData);
route.delete('/:id', CategoryController.deleteCategoryData);

export const CategoryRoute = route;
