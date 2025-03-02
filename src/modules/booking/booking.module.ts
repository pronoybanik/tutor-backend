import mongoose, { Schema } from 'mongoose';
import { IBooking } from './booking.interface';

const BookingSchema = new Schema<IBooking>(
  {
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'completed', 'canceled'],
      default: 'pending',
    },
  },
  { timestamps: true },
);

export const Booking = mongoose.model<IBooking>('Booking', BookingSchema);
