import adminModel from '../models/admin.model.js';
import { adminFormatter, updateAdminFormatter } from "../formatter/admin.formatter.js"
import { checkEncryption, encryption } from '../middleware/authToken.js';


export async function createAdmin(adminData) {
    try {
        console.log(adminData);
        adminData.password = await encryption(adminData.password)
        const formattedData = adminFormatter(adminData)
        const admin = await adminModel.create(formattedData);
        return admin;
    } catch (error) {
        console.error("Error creating admin:", error);
        throw new Error(error.message)
    }
}

export async function adminLogin(email, password) {
    try {
        const adminData = await findAdminByEmail(email)
        if (!adminData) {
            throw new Error("invalid credentials")
        }
        if (! await checkEncryption(password, adminData.password)) {
            throw new Error("invalid credentials")
        }
        return adminData;
    } catch (error) {
        console.error("Error creating admin:", error);
        throw new Error(error.message)
    }
}

export async function getAllAdmins() {
    try {
        const admins = await adminModel.find().select("-_id adminId name email");
        return admins;
    } catch (error) {
        console.error("Error retrieving admins:", error);
        throw new Error(error.message)
    }
}


export async function findAdminById(adminId, need) {
    try {
        let selectString = need ? "adminId name email" : "-_id adminId name email"
        const admin = await adminModel.findOne({ adminId }).select(selectString);
        return admin;
    } catch (error) {
        console.error("Error finding admin:", error);
        throw new Error(error.message)
    }
}

export async function findAdminByEmail(email) {
    try {
        const admin = await adminModel.findOne({ email }).select("adminId email password");
        return admin;
    } catch (error) {
        console.error("Error finding admin:", error);
        throw new Error(error.message)
    }
}


export async function deleteAdminById(adminId) {
    try {
        const deletedAdmin = await adminModel.findOneAndDelete({ adminId });
        return deletedAdmin;
    } catch (error) {
        console.error("Error deleting admin:", error);
        throw new Error(error.message)
    }
}


export async function updateAdminData(adminId, updatedData) {
    try {
        if (updatedData.password) {
            updatedData.password = await encryption(updatedData.password)
        }
        const formattedData = updateAdminFormatter(updatedData)
        const updatedAdmin = await adminModel.findOneAndUpdate({ adminId }, formattedData, { new: true });
        return updatedAdmin;
    } catch (error) {
        console.error("Error updating admin:", error);
        throw new Error(error.message)
    }
}