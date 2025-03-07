// import mongoose from "mongoose";
// import { IJwtPayload } from "../auth/auth.interface";
// import { IOrder } from "./order.interface";
// import { Subject } from "../subject/subject.module";
// import { Order } from "./order.module";
// import { generateTransactionId } from "../payment/payment.utils";
// import { Payment } from "../payment/paymen.module";
// import { sslService } from "../sslcommerz/sslcommerz.service";



// const createOrder = async (
//     orderData: Partial<IOrder>,
//     authUser: IJwtPayload
// ) => {
//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         // if (orderData.subject) {


//         //     const product = await Subject.findById(productItem.product)
//         //         .populate("shop")
//         //         .session(session);

//         //     if (product) {
//         //         if (product.isActive === false) {
//         //             throw new Error(`Product ${product?.name} is inactive.`);
//         //         }

//         //         if (product.stock < productItem.quantity) {
//         //             throw new Error(`Insufficient stock for product: ${product.name}`);
//         //         }
//         //         // Decrement the product stock
//         //         product.stock -= productItem.quantity;
//         //         await product.save({ session });
//         //     } else {
//         //         throw new Error(`Product not found: ${productItem.product}`);
//         //     }

//         // }

//         // Handle coupon and update orderData
//         // if (orderData.coupon) {
//         //     const coupon = await Coupon.findOne({ code: orderData.coupon }).session(
//         //         session
//         //     );
//         //     if (coupon) {
//         //         const currentDate = new Date();

//         //         // Check if the coupon is within the valid date range
//         //         if (currentDate < coupon.startDate) {
//         //             throw new Error(`Coupon ${coupon.code} has not started yet.`);
//         //         }

//         //         if (currentDate > coupon.endDate) {
//         //             throw new Error(`Coupon ${coupon.code} has expired.`);
//         //         }

//         //         orderData.coupon = coupon._id as Types.ObjectId;
//         //     } else {
//         //         throw new Error("Invalid coupon code.");
//         //     }
//         // }

//         // Create the order
       
       
//         const order = new Order({
//             ...orderData,
//             user: authUser.userId,
//         });

//         const createdOrder = await order.save({ session });
//         await createdOrder.populate("user subject");

//         const transactionId = generateTransactionId();

//         const payment = new Payment({
//             user: authUser.userId,
//             order: createdOrder._id,
//             method: orderData.paymentMethod,
//             transactionId,
//             amount: createdOrder.finalAmount,
//         });

//         await payment.save({ session });

//         let result;

//         if (createdOrder.paymentMethod == "Online") {
//             result = await sslService.initPayment({
//                 total_amount: createdOrder.finalAmount,
//                 tran_id: transactionId,
//             });
//             result = { paymentUrl: result };
//         } else {
//             result = order;
//         }

//         await session.commitTransaction();
//         session.endSession();

//         return result;
//     } catch (error) {
//         console.log(error);
//         await session.abortTransaction();
//         session.endSession();
//         throw error;
//     }
// };

// export const OrderService = {
//     createOrder,

// };