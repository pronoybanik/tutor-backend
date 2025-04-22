import express from 'express';
import auth from '../../middlewares/auth';
import { ProfileController } from './profile.controller';
import { USER_ROLE } from '../user/user.constant';

const route = express.Router();

route.get('/', ProfileController.getAllUserProfile);
route.put('/:id', auth(), ProfileController.updateProfile);
route.get('/me', auth(), ProfileController.getUserProfile);

route.get('/tutor', ProfileController.getAllTutorProfile);

route.get('/:id', ProfileController.getUserSingleProfile);
route.put('/:id/feedback',auth(), ProfileController.updateFeedBack);


route.patch(
  '/:id/role',
  auth(USER_ROLE.admin, USER_ROLE.student),
  ProfileController.updateUserRole,
);

export const ProfileRoute = route;
