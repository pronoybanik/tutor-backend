import { IImageFile } from '../../interface/IImageFile';
import AppError from '../../middlewares/AppError';
import { IJwtPayload } from '../auth/auth.interface';
import { UserRole } from '../user/user.interface';
import { ISubject } from './subject.interface';
import httpStatus from 'http-status';
import { Subject } from './subject.module';

const createSubjectIntoDB = async (
  subjectData: Partial<ISubject>,
  image?: IImageFile,
  authUser?: IJwtPayload,
) => {
  try {
    if (!authUser?.userId) {
      throw new AppError(httpStatus.BAD_REQUEST, 'User ID is required.');
    }
    // Assign image path if exists
    if (image && image.path) {
      subjectData.image = image.path;
    }

    // Create a new Subject instance
    const subject = new Subject({ userId: authUser.userId, ...subjectData });

    // Save to the database
    const result = await subject.save();

    return result;
  } catch (error) {
    console.error('Error creating subject:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create subject.',
    );
  }
};

const getAllSubjects = async () => {
  try {
    const result = await Subject.find();
    return result;
  } catch (error) {
    console.error('Error fetching subjects:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to retrieve subjects.',
    );
  }
};

const getTutorCreatedSubjectIntoDB = async (authUser: IJwtPayload) => {
  if (!authUser?.userId) {
    throw new AppError(httpStatus.BAD_REQUEST, 'User ID is required.');
  }

  const result = await Subject.find({ userId: authUser.userId });

  return result;
};

const updateSubjectIntoDB = async (
  id: string,
  payload: Partial<ISubject>,
  file?: IImageFile,
) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found!');
  }

  // If an image is uploaded, update the image field
  if (file && file.path) {
    payload.image = file.path;
  }

  // Update subject in the database
  const updatedSubject = await Subject.findByIdAndUpdate(id, payload, {
    new: true,
  });

  return updatedSubject;
};

const deleteSubjectFromDB = async (id: string, authUser: IJwtPayload) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found!');
  }

  // // Prevent students from deleting subjects
  if (authUser.role === UserRole.STUDENT) {
    throw new AppError(
      httpStatus.FORBIDDEN,
      'You are not allowed to delete this subject.',
    );
  }

  // Delete subject
  const deletedSubject = await Subject.findByIdAndDelete(id);
  return deletedSubject;
};

const getSingleSubjectIntoDB = async (id: string) => {
  const subject = await Subject.findById(id);
  if (!subject) {
    throw new AppError(httpStatus.NOT_FOUND, 'Subject not found!');
  }

 
  const result = await Subject.findById(id).populate("userId");
  return result;
};

export const SubjectService = {
  createSubjectIntoDB,
  getAllSubjects,
  updateSubjectIntoDB,
  deleteSubjectFromDB,
  getTutorCreatedSubjectIntoDB,
  getSingleSubjectIntoDB,
};
