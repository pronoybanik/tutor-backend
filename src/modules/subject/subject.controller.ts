import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import { SubjectService } from './subject.service';
import { IImageFile } from '../../interface/IImageFile';


const createSubject = catchAsync(async (req: Request, res: Response) => {

    const result = await SubjectService.createSubjectIntoDB(
        req.body,
        req.file as IImageFile
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject created successfully',
        data: result,
    });
});


const getAllSubject = catchAsync(async (req, res) => {
    const result = await SubjectService.getAllSubject();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject are retrieved successfully',
        // meta: result.meta,
        data: result,
    });
});

// const updateBrand = catchAsync(async (req, res) => {
//    const { id } = req.params;
//    const result = await BrandService.updateBrandIntoDB(
//       id,
//       req.body,
//       req.file as IImageFile,
//    );

//    sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Brand is updated successfully',
//       data: result,
//    });
// });

// const deleteBrand = catchAsync(async (req, res) => {
//    const { id } = req.params;
//    const result = await BrandService.deleteBrandIntoDB(
//       id,
//       req.user as IJwtPayload
//    );

//    sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: 'Brand is deleted successfully',
//       data: result,
//    });
// });

export const SubjectController = {
    createSubject,
    getAllSubject
    // updateBrand,
    // deleteBrand
};
