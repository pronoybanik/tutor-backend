import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import { UserService } from './user.service';

const registerUser = catchAsync(async (req, res) => {
  const result = await UserService.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User create successfully',
    data: result,
  });
});

export const UserController = {
  registerUser,
};
