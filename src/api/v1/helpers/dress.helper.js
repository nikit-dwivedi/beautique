import dressModel from "../models/dress.model.js"
import { dressFormatter, updateDressFormatter } from "../formatter/dress.formatter.js"


// CRUD operations
export const createDress = async (dressData) => {
  // Create operation
  try {
    const formattedData = dressFormatter(dressData)
    const dress = new dressModel(formattedData);
    const savedDress = await dress.save();
    return savedDress;
  } catch (error) {
    console.error(error);
  }
};

export const getAllDresses = async () => {
  // Read operation
  try {
    const dresses = await dressModel.find().select("-_id dressId name configIdList").populate({ path: "configIdList", select: "-_id configId name isUnit unit" })
    return dresses;
  } catch (error) {
    console.error(error);
  }
};

export const getDressById = async (dressId, need) => {
  // Read operation
  try {
    const selectString1 = need ? "dressId name configIdList" : "-_id dressId name configIdList"
    const selectString2 = need ? "configId name isUnit unit" : "-_id configId name isUnit unit"
    const dresses = await dressModel.findOne({ dressId }).select(selectString1).populate({ path: "configIdList", select: selectString2 })
    return dresses;
  } catch (error) {
    console.error(error);
  }
};

export const updateDress = async (dressId, updateData) => {
  // Update operation
  try {
    const formattedData = updateDressFormatter(updateData)
    const updatedDress = await dressModel.findOneAndUpdate({ dressId }, formattedData, { new: true });
    return updatedDress;
  } catch (error) {
    console.error(error);
  }
};

export const deleteDress = async (dressId) => {
  // Delete operation
  try {
    const deletedDress = await dressModel.findOneAndDelete(dressId);
    return deletedDress;
  } catch (error) {
    console.error(error);
  }
};
