import measurementConfigModel from "../models/measurementConfig.model.js"
import { measurementConfigFormatter, updateMeasurementConfigFormatter } from "../formatter/measurementConfig.formatter.js"

// Create a new measurement config
export async function createMeasurementConfig(configData) {
    try {
        const formattedData = measurementConfigFormatter(configData)
        const measurementConfig = new measurementConfigModel(formattedData);
        const savedConfig = await measurementConfig.save();
        return savedConfig;
    } catch (error) {
        // Handle error
        console.error(error);
        throw new Error(error.message)
    }
};

// Read measurement config by Id
export async function getMeasurementConfigById(configId) {
    try {
        const updatedConfig = await measurementConfigModel.findOne({ configId }).select("-_id configId name isUnit unit");
        return updatedConfig;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Filter measurement configs
export async function configListCheck(IdList) {
    try {
        const measurementConfigs = await measurementConfigModel.find({ configId: IdList }).select("configId").lean()
        const filteredList = measurementConfigs.map(measurementConfig => measurementConfig._id)
        return filteredList;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Read all measurement configs
export async function getAllMeasurementConfigs() {
    try {
        const measurementConfigs = await measurementConfigModel.find().select("-_id configId name isUnit unit");
        return measurementConfigs;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Update a measurement config
export async function updateMeasurementConfig(configId, updateData) {
    try {
        const formattedData = updateMeasurementConfigFormatter(updateData)
        const updatedConfig = await measurementConfigModel.findOneAndUpdate({ configId }, formattedData, { new: true });
        return updatedConfig;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Delete a measurement config
export async function deleteMeasurementConfig(configId) {
    try {
        const deletedConfig = await measurementConfigModel.findOneAndDelete(configId);
        return deletedConfig;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};
