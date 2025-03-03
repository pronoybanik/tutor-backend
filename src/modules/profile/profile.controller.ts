import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { ProfileService } from './profile.service';


const updateProfile = catchAsync(async (req, res) => {
    const { userId } = req.user;
    const { id: paramsId } = req.params;
    const data = req.body;

    const result = await ProfileService.updateProfileIntoDB(userId, paramsId, data);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'update Profile successfully',
        data: result,
    });
});

const getUserProfile = catchAsync(async (req, res) => {
    const { userId } = req.user;

    const result = await ProfileService.getUserProfileIntoDB(userId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'get user Profile successfully',
        data: result,
    });
});

export const ProfileController = {
    updateProfile,
    getUserProfile
};