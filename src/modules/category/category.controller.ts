import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponst';
import { CategoryService } from './category.service';
import httpStatus from 'http-status';

const createCategory = catchAsync(async (req, res) => {
    const result = await CategoryService.createCategoryIntoDB(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'category create successfully',
        data: result,
    });
});

const allCategoryData = catchAsync(async (req, res) => {

    const result = await CategoryService.allCategoryDataIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'All Category Data successfully',
        data: result,
    });
});

const deleteCategoryData = catchAsync(async (req, res) => {

    const { id } = req.params;

    const result = await CategoryService.deleteCategoryDataIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Delete category successfully',
        data: result,
    });
});

export const CategoryController = {
    createCategory,
    allCategoryData,
    deleteCategoryData
};
