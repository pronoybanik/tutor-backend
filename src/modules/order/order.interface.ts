import { Types } from "mongoose";
import { IPayment } from "../payment/payment.interface";

export interface IOrder extends Document {
    user: Types.ObjectId;
    subject: Types.ObjectId;
    totalAmount: number;
    finalAmount: number;
    status: 'Pending' | 'Processing' | 'Completed' | 'Cancelled';
    paymentMethod: 'Cash' | 'Card' | 'Online';
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    createdAt?: Date;
    updatedAt?: Date;
    payment?: IPayment | null;
  }