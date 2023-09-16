import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const materialSchema = new Schema({
    materialId: {
        type: String,
    },
    name: {
        type: String
    },
    price: {
        type: Number
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


const materialModel = model("material", materialSchema);
export default materialModel;