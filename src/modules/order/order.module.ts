import { Schema, Types, model } from "mongoose";
import { IOrder } from "./order.interface";
import { Subject } from "../subject/subject.module";


const orderSchema = new Schema<IOrder>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },


        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },


        finalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["Pending", "Processing", "Completed", "Cancelled"],
            default: "Pending",
        },

        paymentMethod: {
            type: String,
            enum: ["COD", "Online"],
            default: "Online",
        },
        paymentStatus: {
            type: String,
            enum: ["Pending", "Paid", "Failed"],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

// Pre-save hook to calculate total, discount, delivery charge, and final price
// orderSchema.pre("validate", async function (next) {
//   const order = this;

//   // Step 1: Initialize total amount
//   let totalAmount = 0;
//   let finalDiscount = 0;
//   let shopId: Schema.Types.ObjectId | null = null;

//   // Step 2: Calculate total amount for products
//   for (let item of order.subject) {
//     const product = await Subject.findById(item.product).populate("shop");

//     if (!product) {
//       return next(new Error(`Product not found!.`));
//     }
//     if (shopId && String(shopId) !== String(product.shop._id)) {
//       return next(new Error("Products must be from the same shop."));
//     }

//     //@ts-ignore
//     shopId = product.shop._id;

//     const offerPrice = (await product?.calculateOfferPrice()) || 0;

//     let productPrice = product.price;
//     if (offerPrice) productPrice = Number(offerPrice);

//     item.unitPrice = productPrice;
//     const price = productPrice * item.quantity;
//     console.log(price);
//     totalAmount += price;
//   }




export const Order = model<IOrder>("Order", orderSchema);
