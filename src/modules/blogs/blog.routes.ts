import express from 'express';
import { blogsControllers } from './blog.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const routes = express.Router();

routes.post('/', auth(USER_ROLE.tutor), blogsControllers.createBlogs);
routes.get('/', blogsControllers.getAllBlogs);
routes.get('/:id', blogsControllers.getSingleBlog);
routes.patch('/:id', auth(USER_ROLE.tutor), blogsControllers.updateBlogs);
routes.delete(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.tutor),
  blogsControllers.deleteBlogs,
);

export const BlogsRoute = routes;
