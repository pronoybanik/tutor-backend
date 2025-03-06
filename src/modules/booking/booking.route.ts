import express from 'express';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const routes = express.Router();

routes.post(
    '/',
    auth(USER_ROLE.student),
    BookingControllers.createBooking,
);

routes.get("/request-tutor",
    auth(USER_ROLE.tutor),
    BookingControllers.getTutorBookingRequest)

routes.get("/request-Student",
    auth( USER_ROLE.student),
    BookingControllers.getStudentBookingRequest)

routes.patch("/:id",
    auth(USER_ROLE.tutor),
    BookingControllers.updateBookingRequest)

routes.delete("/:id",
    auth(),
    BookingControllers.deleteBooking)


export const BookingRoute = routes;
