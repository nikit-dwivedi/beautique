import { Router, json } from 'express';
const router = Router();
import { createCustomerAPI, getAllCustomersAPI, getCustomerByIdAPI, updateCustomerContactAPI, deleteCustomerByIdAPI } from '../controllers/customer.controller.js';

router.use(json());

// Route to create a new customer
router.post('/', createCustomerAPI);

// Route to get all customers
router.get('/', getAllCustomersAPI);

// Route to get a customer by ID
router.get('/:customerId', getCustomerByIdAPI);

// Route to update a customer's contact
router.post('/:customerId', updateCustomerContactAPI);

// Route to delete a customer by ID
router.delete('/remove/:customerId', deleteCustomerByIdAPI);

export default router