import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const dressListSchema = new Schema(
    {
        dressId: {
            type: String,
            ref: 'dress',
            unique: true,
        },
        measurementIdList: [{
            type: String,
            ref: 'measurement',
        }],
    },
    { timestamps: true }
);

const orderSchema = new Schema(
    {
        orderId: {
            type: String,
            unique: true,
        },
        customerId: {
            type: String,
            ref: 'customer',
        },
        dressList: [{
            type: dressListSchema,
        }],
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);


const orderModel = model("order", orderSchema);
export default orderModel;