import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const adminSchema = new Schema({
    adminId: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


const adminModel = model("admin", adminSchema);
export default adminModel;