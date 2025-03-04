import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import httpStatus from 'http-status';
import { SubjectService } from './subject.service';
import { IImageFile } from '../../interface/IImageFile';
import { IJwtPayload } from '../auth/auth.interface';
import { ISubject } from './subject.interface';


const createSubject = catchAsync(async (req: Request, res: Response) => {

    const result = await SubjectService.createSubjectIntoDB(
        req.body,
        req.file as IImageFile,
        req.user as IJwtPayload
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject created successfully',
        data: result,
    });
});


const getAllSubject = catchAsync(async (req, res) => {
    const result = await SubjectService.getAllSubjects();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject are retrieved successfully',
        // meta: result.meta,
        data: result,
    });
});

const getTutorCreatedSubject = catchAsync(async (req, res) => {
    

    const result = await SubjectService.getTutorCreatedSubjectIntoDB(req.user as IJwtPayload);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject are retrieved successfully',
        // meta: result.meta,
        data: result,
    });
});

const updateSubject = catchAsync(async (req, res) => {
    const { id } = req.params;

    const payload: Partial<ISubject> = req.body;
    const result = await SubjectService.updateSubjectIntoDB(id, payload, req.file as IImageFile);

    // Send response
    res.status(httpStatus.OK).json({
        success: true,
        message: "Subject updated successfully",
        data: result,
    });
});


const deleteSubject = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SubjectService.deleteSubjectFromDB(
        id,
        req.user as IJwtPayload
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Subject is deleted successfully',
        data: result,
    });
});

export const SubjectController = {
    createSubject,
    getAllSubject,
    updateSubject,
    deleteSubject,
    getTutorCreatedSubject
};
