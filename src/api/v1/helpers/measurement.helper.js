import mongoose from "mongoose";
import { measurementFormatter } from "../formatter/measurement.formater.js";
import measurementModel from "../models/measurement.model.js"

// CRUD operations
export const createMeasurements = async (measurementData) => {
  // Create operation
  try {
    const formattedData = measurementFormatter(measurementData)
    const measurement = new measurementModel(formattedData);
    const savedMeasurement = await measurement.save();
    return savedMeasurement;
  } catch (error) {
    console.error(error);
  }
};

export const getAllMeasurements = async () => {
  // Read operation
  try {
    const measurements = await measurementModel.find()
      .select("-_id -createdAt -updatedAt -configList._id -__v")
      .populate({
        path: "customerId",
        select: "-_id -isActive -createdAt -updatedAt -__v"
      })
      .populate({
        path: "dressId",
        select: "-_id dressId name"
      })
      .populate({
        path: "configList.configId",
        select: "-_id configId name isUnit unit"
      })
    return measurements;
  } catch (error) {
    console.error(error);
  }
};

export const getMeasurementById = async (measurementId, need) => {
  // Read operation
  let opt = need ? "" : "-_id"
  try {
    const measurements = await measurementModel.findOne({ measurementId })
      .select(`${opt} -createdAt -updatedAt -configList._id -__v `)
      .populate({
        path: "customerId",
        select: `${opt} -isActive -createdAt -updatedAt -__v`
      })
      .populate({
        path: "dressId",
        select: `${opt} dressId name`
      })
      .populate({
        path: "configList.configId",
        select: `${opt} configId name isUnit unit`
      })
    return measurements;
  } catch (error) {
    console.error(error);
  }
};

export const getCustomerMeasurementByDressId = async (customerId, dressId) => {
  // Read operation
  try {
    const measurements = await measurementModel.find({ dressId, customerId })
      .select("-_id -createdAt -updatedAt -configList._id -__v")
      .populate({
        path: "customerId",
        select: "-_id -isActive -createdAt -updatedAt -__v"
      })
      .populate({
        path: "dressId",
        select: "-_id dressId name"
      })
      .populate({
        path: "configList.configId",
        select: "-_id configId name isUnit unit"
      })
    return measurements;
  } catch (error) {
    console.error(error);
  }
};

export const getCustomerMeasurement = async (customerId) => {
  // Read operation
  try {
    const measurements = await measurementModel.find({ customerId })
      .select("-_id -createdAt -updatedAt -configList._id -__v")
      .populate({
        path: "customerId",
        select: "-_id -isActive -createdAt -updatedAt -__v"
      })
      .populate({
        path: "dressId",
        select: "-_id dressId name"
      })
      .populate({
        path: "configList.configId",
        select: "-_id configId name isUnit unit"
      })
    return measurements;
  } catch (error) {
    console.error(error);
  }
};

export const updateMeasurement = async (measurementId, updateData) => {
  // Update operation
  try {
    const updatedMeasurement = await measurementModel.findOneAndUpdate({ measurementId }, updateData, { new: true });
    return updatedMeasurement;
  } catch (error) {
    console.error(error);
  }
};

export const deleteMeasurement = async (measurementId) => {
  // Delete operation
  try {
    const deletedMeasurement = await measurementModel.findOneAndDelete(measurementId);
    return deletedMeasurement;
  } catch (error) {
    console.error(error);
  }
};
