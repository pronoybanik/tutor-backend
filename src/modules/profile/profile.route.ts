import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.put('/:id', auth(), ProfileController.updateProfile);
route.get('/me', auth(), ProfileController.getUserProfile);
route.get('/:id', ProfileController.getUserSingleProfile);
route.get('/', ProfileController.getAllUserProfile);
route.patch(
  '/:id/role',
  auth(USER_ROLE.admin),
  ProfileController.updateUserRole,
);

export const ProfileRoute = route;
