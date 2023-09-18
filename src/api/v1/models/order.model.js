import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            unique: true,
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: 'customer',
        },
        dressList: [
            {
                measurementId: {
                    type: Schema.Types.ObjectId,
                    ref: 'measurement',
                },
                materialId: {
                    type: Schema.Types.ObjectId,
                    ref: 'material',
                    default: null
                }
            }],
        orderStatus: {
            type: String,
            enum: ["pending", "in progress", "completed"],
            default: "pending"
        },
        amount: {
            type: Number,
        },
        amountPaid: {
            type: Number
        },
        amountRemaining: {
            type: Number
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "Paid"],
            default: "pending"
        },
        paymentType: {
            type: String,
            enum: ["cash", "online"],
            default: "cash"
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);


const orderModel = model("order", orderSchema);
export default orderModel;