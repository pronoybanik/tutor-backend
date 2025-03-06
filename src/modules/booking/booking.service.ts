import AppError from "../../middlewares/AppError";
import { Subject } from "../subject/subject.module";
import { User } from "../user/user.module";
import httpStatus from "http-status";
import { Booking } from "./booking.module";
import { IBooking } from "./booking.interface";

const createBookingIntoDB = async (payload: IBooking) => {
    // Check if the student exists
    const UserInfo = await User.findOne({ _id: payload.studentId });
    if (!UserInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "Student ID not found");
    }

    // Check if the tutor exists
    const TutorInfo = await User.findOne({ _id: payload.tutorId });
    if (!TutorInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "Tutor ID not found");
    }

    // Check if the subject exists
    const subjectInfo = await Subject.findOne({ _id: payload.subjectId });
    if (!subjectInfo) {
        throw new AppError(httpStatus.NOT_FOUND, "Subject ID not found");
    }

    const bookingDate = new Date(payload.date);
    bookingDate.setHours(0, 0, 0, 0);

    const existingBooking = await Booking.findOne({
        studentId: payload.studentId,
        date: {
            $gte: bookingDate,
            $lt: new Date(bookingDate.getTime() + 24 * 60 * 60 * 1000), // Within the same day
        },
    });

    if (existingBooking) {
        throw new AppError(
            httpStatus.CONFLICT,
            "You already have a booking on this date"
        );
    }

    const result = await Booking.create(payload);
    return result;
};

const getTutorBookingRequestFromDB = async (id: string) => {
    const result = await Booking.find({ tutorId: id }).populate("studentId").populate("tutorId").populate("subjectId")
    return result;
}
const getStudentBookingRequestFromDB = async (id: string) => {
    const result = await Booking.find({ studentId: id }).populate("studentId").populate("tutorId").populate("subjectId")
    return result;
}

const updateBookingRequestIntoDB = async (id: string, payload: IBooking) => {
    const result = await Booking.findOneAndUpdate({ _id: id }, payload, {
        new: true,
        runValidators: true,
    });

    if (!result) {
        throw new AppError(httpStatus.FORBIDDEN, 'Booking Info not found');
    }
    return result;
}

const deleteBookingIntoDB = async (id: string) => {

    const result = await Booking.deleteOne({ _id: id });
    return result;
};



export const BookingServices = {
    createBookingIntoDB,
    getTutorBookingRequestFromDB,
    updateBookingRequestIntoDB,
    getStudentBookingRequestFromDB,
    deleteBookingIntoDB,
};
