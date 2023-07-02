import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const configListSchema = new Schema({
  configId: {
    type: Schema.Types.ObjectId,
    ref: 'measurementConfig',
    default: null,
  },
  value: {
    type: String,
  },
})

const measurementSchema = new Schema(
  {
    measurementId: {
      type: String,
      unique: true,
    },
    customerId: {
      type: Schema.Types.ObjectId,
      ref: 'customer',
    },
    dressId: {
      type: Schema.Types.ObjectId,
      ref: 'dress',
    },
    configList: [{
      type: configListSchema
    }],
    description: {
      type: String,
    },
    tag: {
      type: String
    }
  },
  { timestamps: true }
);


const measurementModel = model("measurement", measurementSchema);
export default measurementModel;