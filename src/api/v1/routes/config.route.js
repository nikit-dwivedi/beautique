import { Router, json } from 'express';
const router = Router();
import { addMeasurementConfig, getAllMeasurementConfig, changeMeasurementConfig, getMeasurementById, addNewDress, getAllDress, getDress, editDress, removeMeasurementConfig, removeDress, addMaterial, getAllMaterial, getMaterialDataById, changeMaterial, removeMaterial } from '../controllers/config.controller.js';


// -----------------------------------------------------------------Measurement config Routes----------------------------------------------------------------- //

// Route to create a new measurement config
router.post('/measurement', addMeasurementConfig);

// Route to get all measurement config
router.get('/measurement', getAllMeasurementConfig);

// Route to get a measurement config by ID
router.get('/measurement/:configId', getMeasurementById);

// Route to update a measurement config
router.post('/measurement/:configId', changeMeasurementConfig);

// Route to delete a measurement config by ID
router.get('/measurement/remove/:configId', removeMeasurementConfig);


// -----------------------------------------------------------------Dress Routes----------------------------------------------------------------- //

// Route to create a new dress
router.post('/dress', addNewDress);

// Route to  get all dresses
router.get('/dress', getAllDress);

// Route to get a dress by ID
router.get('/dress/:dressId', getDress);

// Route to update a dress
router.post('/dress/:dressId', editDress);

// Route to delete a dress by ID
router.get('/dress/remove/:dressId', removeDress);


// -----------------------------------------------------------------Material Routes----------------------------------------------------------------- //

// Route to create a new material
router.post('/material', addMaterial);

// Route to get all material
router.get('/material', getAllMaterial);

// Route to get a material by ID
router.get('/material/:materialId', getMaterialDataById);

// Route to update a material
router.post('/material/:materialId', changeMaterial);

// Route to delete a material by ID
router.get('/material/remove/:materialId', removeMaterial);


export default router