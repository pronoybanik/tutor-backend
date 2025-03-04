import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';

const route = express.Router();

route.put('/:id', auth(), ProfileController.updateProfile);
route.get('/me', auth(), ProfileController.getUserProfile);
route.get('/:id', ProfileController.getUserSingleProfile);
route.get('/', ProfileController.getAllUserProfile);


export const ProfileRoute = route;
