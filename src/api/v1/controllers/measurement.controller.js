import { findCustomerById } from "../helpers/customer.helper.js";
import { getDressById } from "../helpers/dress.helper.js";
import { createMeasurements, getAllMeasurements, updateMeasurement, getMeasurementById, getCustomerMeasurementByDressId, getCustomerMeasurement } from "../helpers/measurement.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";

// Function to create a new customer
export async function createMeasurementAPI(req, res) {
    try {
        let { customerId, dressId, configList, description, tag } = req.body
        console.log(customerId, dressId, configList, description, tag);
        const customerData = await findCustomerById(customerId, true)
        customerId = customerData._id
        const dressData = await getDressById(dressId, true)
        dressId = dressData._id
        let configError = false
        const configMap = new Map(configList.map(configData => [configData.configId, configData.value]))
        let newList = dressData.configIdList.map((config) => {
            if (!configMap.get(config.configId)) {
                configError = true
                console.log(configMap.get(config.configId));
            }
            return { configId: config._id, value: configMap.get(config.configId) }
        })
        if (configError) {
            return badRequest(res, "please provide all measurement")
        }
        configList = newList
        let measurementData = { customerId, dressId, configList, description, tag }
        const measurement = await createMeasurements(measurementData);
        return success(res, "measurement Added")
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get all measurements
export async function getAllMeasurementsAPI(req, res) {
    try {
        const measurements = await getAllMeasurements();
        return success(res, "measurement List", measurements)
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get a measurement by ID
export async function getMeasurementByIdAPI(req, res) {
    try {
        const measurement = await getMeasurementById(req.params.measurementId);
        return measurement ? success(res, "measurement details", measurement) : badRequest(res, 'measurement not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get a measurement by ID
export async function customerMeasurementByDressAPI(req, res) {
    try {
        const { _id:cId } = await findCustomerById(req.params.customerId, true)
        const { _id:dId } = await getDressById(req.body.dressId, true)
        const measurement = await getCustomerMeasurementByDressId(cId, dId);
        return measurement ? success(res, "measurement list", measurement) : badRequest(res, 'measurement not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get a measurement by ID
export async function customerMeasurementsAPI(req, res) {
    try {
        const { _id:cId } = await findCustomerById(req.params.customerId, true)
        const measurement = await getCustomerMeasurement(cId);
        return measurement ? success(res, "measurement list", measurement) : badRequest(res, 'measurement not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to update a measurement
export async function updateMeasurementAPI(req, res) {
    try {
        const updatedMeasurement = await updateMeasurement(req.params.measurementId, req.body);
        return updatedMeasurement ? success(res, "measurement updated") : badRequest(res, 'measurement not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to delete a measurement by ID
export async function deleteMeasurementByIdAPI(req, res) {
    try {
        const deletedMeasurement = await deleteMeasurementById(req.params.measurementId);
        if (deletedMeasurement) {
            res.json(deletedMeasurement);
        } else {
            res.status(404).json({ error: 'measurement not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete measurement' });
    }
}

