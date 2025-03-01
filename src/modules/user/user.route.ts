import express from "express";
import { UserController } from "./user.controller";

const route = express.Router();

route.post(
    '/',
    UserController.registerUser
  );


export const UserRoute = route;