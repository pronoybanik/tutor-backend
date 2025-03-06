import { Router } from 'express';
import { UserRoute } from '../modules/user/user.route';
import { AuthRoute } from '../modules/auth/auth.route';
import { CategoryRoute } from '../modules/category/category.route';
import { SubjectRoute } from '../modules/subject/subject.route';
import { ProfileRoute } from '../modules/profile/profile.route';
import { BlogsRoute } from '../modules/blogs/blog.routes';
import { BookingRoute } from '../modules/booking/booking.route';
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
  {
    path: '/blogs',
    router: BlogsRoute,
  },
  {
    path: '/booking',
    router: BookingRoute,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
