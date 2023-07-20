import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const measurementConfigSchema = new Schema({
    configId: {
        type: String,
    },
    name: {
        type: String
    },
    isUnit: {
        type: Boolean
    },
    unit: {
        type: String,
        default:"NA"
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })


const measurementConfigModel = model("measurementConfig", measurementConfigSchema);
export default measurementConfigModel;