
import catchAsync from "../utils/catchAsync";
import { NextFunction, Request, Response } from "express";
import AppError from "./AppError";
import httpStatus from 'http-status';

export const parseBody = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    if (!req.body.data) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Please provide data in the body under data key');
    }
    req.body = JSON.parse(req.body.data);
    console.log("res", req.body);

    next();
});