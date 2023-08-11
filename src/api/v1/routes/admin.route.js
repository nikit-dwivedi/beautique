import { Router, json } from 'express';
const router = Router();
import { createAdminAPI,  getAdminByIdAPI, updateAdminContactAPI, deleteAdminByIdAPI, loginAdmin } from '../controllers/admin.controller.js';

router.use(json());

// Route to create a new Admin
router.post('/', createAdminAPI);

// Route to Login Admin
router.post('/login', loginAdmin);

// Route to get a Admin by ID
router.get('/', getAdminByIdAPI);

// Route to update a Admin's contact
router.post('/update/:adminId', updateAdminContactAPI);

// Route to delete a Admin by ID
router.delete('/remove/:adminId', deleteAdminByIdAPI);

export default router