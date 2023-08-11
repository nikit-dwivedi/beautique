import { adminLogin, createAdmin, deleteAdminById, findAdminById, getAllAdmins ,updateAdminData} from "../helpers/admin.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";
import { generateAdminToken, parseJwt } from "../middleware/authToken.js";

// Function to create a new admin
export async function createAdminAPI(req, res) {
    try {
        const admin = await createAdmin(req.body);
        return success(res, "admin Added")
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get all admins
export async function loginAdmin(req, res) {
    try {
        const { email, password } = req.body
        const admin = await adminLogin(email, password );
        const token = await generateAdminToken(admin)
        return success(res, "Login successful", token)
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get a admin by ID
export async function getAdminByIdAPI(req, res) {
    try {
        const token = parseJwt(req.headers.authorization)
        const admin = await findAdminById(token.adminId);
        return admin ? success(res, "admin details", admin) : badRequest(res, 'admin not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to update a admin's contact
export async function updateAdminContactAPI(req, res) {
    try {
        const updatedAdmin = await updateAdminData(req.params.adminId, req.body);
        return updatedAdmin ? success(res, "admin updated") : badRequest(res, 'admin not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to delete a admin by ID
export async function deleteAdminByIdAPI(req, res) {
    try {
        const deletedAdmin = await deleteAdminById(req.params.adminId);
        if (deletedAdmin) {
            res.json(deletedAdmin);
        } else {
            res.status(404).json({ error: 'admin not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete admin' });
    }
}

