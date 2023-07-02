import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const customerSchema = new Schema({
    customerId: {
        type: String,
    },
    name: {
        type: String
    },
    contact: {
        type: String
    },
    altContact: {
        type: String
    },
    mail: {
        type: String
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


const customerModel = model("customer", customerSchema);
export default customerModel;