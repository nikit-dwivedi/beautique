import mongoose from 'mongoose';
const { Schema: _Schema, model } = mongoose;
const Schema = _Schema;


const dressSchema = new Schema(
  {
    dressId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
    },
    configIdList: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'measurementConfig',
    }],
    price: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);


const dressModel = model("dress", dressSchema);
export default dressModel;