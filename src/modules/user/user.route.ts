import express from 'express';
import { UserController } from './user.controller';

const route = express.Router();

route.post('/', UserController.registerUser);
route.get('/:id', UserController.getSingleUser);

export const UserRoute = route;
