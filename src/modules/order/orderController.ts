// import catchAsync from "../../utils/catchAsync";
// import sendResponse from "../../utils/sendResponst";
// import { IJwtPayload } from "../auth/auth.interface";
// import httpStatus from 'http-status';
// import { OrderService } from "./order.service";





// const createOrder = catchAsync(async (req, res) => {
//     const result = await OrderService.createOrder(
//       req.body,
//       req.user as IJwtPayload
//     );
  
//     sendResponse(res, {
//         statusCode: httpStatus.OK,
//         success: true,
//         message: 'order create successfully',
//         data: result,
//       });
//   });

// export const OrderController = {
//     createOrder,
 
//   };