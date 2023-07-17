import { Router, json } from 'express';
import { createOrderAPI,getAllOrdersAPI } from '../controllers/order.controller.js';
const router = Router();


// Route to create a new measurement
router.post('/', createOrderAPI);

// Route to get all measurements
router.get('/', getAllOrdersAPI);

// Route to get a measurement by ID
// router.get('/:measurementId', getMeasurementByIdAPI);

// // Route to update a measurement's contact
// router.post('/:measurementId', updateMeasurementAPI);

// // Route to get customer measurement by dress ID
// router.post('/dress/:customerId', customerMeasurementByDressAPI);

export default router