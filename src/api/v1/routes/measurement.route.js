import { Router, json } from 'express';
import { createMeasurementAPI,customerMeasurementByDressAPI,customerMeasurementsAPI,getAllMeasurementsAPI,getMeasurementByIdAPI,updateMeasurementAPI } from '../controllers/measurement.controller.js';
const router = Router();


// Route to create a new measurement
router.post('/', createMeasurementAPI);

// Route to get all measurements
router.get('/', getAllMeasurementsAPI);

// Route to get a measurement by ID
router.get('/:measurementId', getMeasurementByIdAPI);

// Route to get a measurement by ID
router.get('/customer/:customerId', customerMeasurementsAPI);

// Route to update a measurement's contact
router.post('/:measurementId', updateMeasurementAPI);

// Route to get customer measurement by dress ID
router.post('/dress/:customerId', customerMeasurementByDressAPI);

export default router