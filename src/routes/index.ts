import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CategoryRoute } from '../modules/category/category.route';
import { SubjectRoute } from '../modules/subject/subject.route';
import { ProfileRoute } from '../modules/profile/profile.route';
const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    router: UserRoute,
  },
  {
    path: '/auth',
    router: AuthRoute,
  },
  {
    path: '/category',
    router: CategoryRoute,
  },
  {
    path: '/subject',
    router: SubjectRoute,
  },
  {
    path: '/profile',
    router: ProfileRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
