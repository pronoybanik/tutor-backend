// Ensure this interface is correctly defined

import { IImageFile } from "../../interface/IImageFile";
import { ISubject } from "./subject.interface";
import { Subject } from "./subject.module";

const createSubjectIntoDB = async (
    subjectData: Partial<ISubject>,
    image: IImageFile
) => {
    try {
        // Assign image path to the subject data
        if (image && image.path) {
            subjectData.image = image.path;
        }

        // Create a new Subject instance
        const subject = new Subject({
            ...subjectData,
        });

        // Save to the database
        const result = await subject.save();

        return result;
    } catch (error) {
        console.error("Error creating subject:", error);
        throw new Error("Failed to create subject.");
    }
};


const getAllSubject = async () => {
    const result = await Subject.find()
    return result;
};

// const updateBrandIntoDB = async (
//    id: string,
//    payload: Partial<IBrand>,
//    file: IImageFile,
//    authUser: IJwtPayload
// ) => {
//    const isBrandExist = await Brand.findById(id);
//    if (!isBrandExist) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'Brand not found!');
//    }

//    if (
//       authUser.role === UserRole.USER &&
//       isBrandExist.createdBy.toString() !== authUser.userId
//    ) {
//       throw new AppError(
//          StatusCodes.BAD_REQUEST,
//          'You are not able to edit the category!'
//       );
//    }

//    if (file && file.path) {
//       payload.logo = file.path;
//    }

//    const result = await Brand.findByIdAndUpdate(id, payload, { new: true });

//    return result;
// };

// const deleteBrandIntoDB = async (
//    id: string,
//    authUser: IJwtPayload
// ) => {
//    const isBrandExist = await Brand.findById(id);
//    if (!isBrandExist) {
//       throw new AppError(StatusCodes.NOT_FOUND, 'Brand not found!');
//    }

//    if (
//       authUser.role === UserRole.USER &&
//       isBrandExist.createdBy.toString() !== authUser.userId
//    ) {
//       throw new AppError(
//          StatusCodes.BAD_REQUEST,
//          'You are not able to delete the brand!'
//       );
//    }

//    const product = await Product.findOne({ brand: id })
//    if (product) throw new AppError(StatusCodes.BAD_REQUEST, "You can not delete the brand. Because the brand is related to products.");

//    const deletedBrand = await Brand.findByIdAndDelete(id);
//    return deletedBrand;
// };

export const SubjectService = {
    createSubjectIntoDB,
    getAllSubject,
    //    updateBrandIntoDB,
    //    deleteBrandIntoDB
};
