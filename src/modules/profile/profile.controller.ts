import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { ProfileService } from './profile.service';
import { IJwtPayload } from '../auth/auth.interface';
import { JwtPayload } from 'jsonwebtoken';

const updateProfile = catchAsync(async (req, res) => {
  const { userId } = req.user as IJwtPayload;
  const { id: paramsId } = req.params;
  const data = req.body;

  const result = await ProfileService.updateProfileIntoDB(
    userId,
    paramsId,
    data,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Profile successfully',
    data: result,
  });
});

const getUserProfile = catchAsync(async (req, res) => {
  const { userId } = req.user as JwtPayload;

  const result = await ProfileService.getUserProfileIntoDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get user Profile successfully',
    data: result,
  });
});

const getUserSingleProfile = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await ProfileService.getUserSingleProfileIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get user Profile successfully',
    data: result,
  });
});

const getAllUserProfile = catchAsync(async (req, res) => {
  const result = await ProfileService.getAllUserProfileIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get user Profile successfully',
    data: result,
  });
});

const getAllTutorProfile = catchAsync(async (req, res) => {
  const result = await ProfileService.getAllTutorProfileIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'get tutor Profile successfully',
    data: result,
  });
});

const updateUserRole = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  const result = await ProfileService.updateUserRoleIntoDB(id, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'update Profile successfully',
    data: result,
  });
});

export const ProfileController = {
  updateProfile,
  getUserProfile,
  getUserSingleProfile,
  getAllUserProfile,
  updateUserRole,
  getAllTutorProfile,
};
