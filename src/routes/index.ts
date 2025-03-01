import { Router } from "express";
import { UserRoute } from "../modules/user/user.route";
import { AuthRoute } from "../modules/auth/auth.route";
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
];


moduleRoutes.forEach((route) => router.use(route.path, route.router));


export default router;