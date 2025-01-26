import materialModel from "../models/material.model.js"
import { materialFormatter, updateMaterialFormatter } from "../formatter/material.formatter.js"

// Create a new measurement material
export async function createMaterial(materialData) {
    try {
        const formattedData = materialFormatter(materialData)
        const material = new materialModel(formattedData);
        const savedMaterial = await material.save();
        return savedMaterial;
    } catch (error) {
        // Handle error
        console.error(error);
        throw new Error(error.message)
    }
};

// Read measurement material by name
export async function getMaterialByName(name) {
    try {
        const materialData = await materialModel.findOne({ name, isActive: true })
        return materialData
    } catch (error) {
        // Handle error
        console.error(error);
        throw new Error(error.message)
    }
}

// Read measurement material by Id
export async function getMaterialById(materialId, need) {
    try {
        let fieldOption = need ? "materialId name price" : "-_id materialId name price"
        const updatedMaterial = await materialModel.findOne({ materialId, isActive: true }).select(fieldOption);
        return updatedMaterial;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Filter measurement materials
export async function materialCheck(IdList) {
    try {
        const materials = await materialModel.find({ materialId: IdList, isActive: true }).select("materialId").lean()
        const filteredList = materials.map(material => material._id)
        return filteredList;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Read all measurement materials
export async function getAllMaterials() {
    try {


        
        const materials = await materialModel.find({ isActive: true }).select("-_id materialId name price");
        return materials;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Update a measurement material
export async function updateMaterial(materialId, updateData) {
    try {
        const formattedData = updateMaterialFormatter(updateData)
        const updatedMaterial = await materialModel.findOneAndUpdate({ materialId }, formattedData, { new: true });
        return updatedMaterial;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};

// Delete a measurement material
export async function deleteMaterial(materialId) {
    try {
        const deletedMaterial = await materialModel.findOneAndUpdate({ materialId }, { isActive: false });
        return deletedMaterial;
    } catch (error) {
        console.error(error);
        throw new Error(error.message)
    }
};
