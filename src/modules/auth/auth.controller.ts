// import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponst";
import httpStatus from 'http-status';
import { AuthService } from "./auth.service";


const loginUser = catchAsync(async (req, res) => {
    const result = await AuthService.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    // res.cookie("refreshToken", refreshToken, {
    //     secure: config.NODE_ENV === "production",
    //     httpOnly: true,
    //     sameSite: "none",
    //     maxAge: 1000 * 60 * 60 * 24 * 365,
    // });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User logged in successfully!",
        data: {
            accessToken,
            refreshToken
        },
    });
});

export const AuthController = {
    loginUser,
}