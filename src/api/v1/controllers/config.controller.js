import { createMeasurementConfig, deleteMeasurementConfig, getAllMeasurementConfigs, updateMeasurementConfig, getMeasurementConfigById, configListCheck } from "../helpers/measurementConfig.helper.js";
import { createDress, deleteDress, getAllDresses, getDressById, updateDress } from "../helpers/dress.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";


// --------------------------------------measurement config-------------------------------------- //

export async function addMeasurementConfig(req, res) {
    try {
        const measurementConfig = await createMeasurementConfig(req.body);
        return success(res, "Measurement Added")
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function getAllMeasurementConfig(req, res) {
    try {
        const measurementConfigList = await getAllMeasurementConfigs();
        return success(res, "Measurement config List", measurementConfigList)
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function getMeasurementById(req, res) {
    try {
        const measurement = await getMeasurementConfigById(req.params.configId);
        return measurement ? success(res, "Measurement config List", measurement) : badRequest(res, 'Measurement config not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function changeMeasurementConfig(req, res) {
    try {
        const updatedMeasurement = await updateMeasurementConfig(
            req.params.configId,
            req.body
        );
        return updatedMeasurement ? success(res, "Measurement config Updated") : badRequest(res, 'Measurement config not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function removeMeasurementConfig(req, res) {
    try {
        const deletedCustomer = await deleteMeasurementConfig(req.params.customerId);
        if (deletedCustomer) {
            res.json(deletedCustomer);
        } else {
            res.status(404).json({ error: 'Customer not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete customer' });
    }
}


// --------------------------------------Dress config-------------------------------------- //


export async function addNewDress(req, res) {
    try {
        const filterList = await configListCheck(req.body.configIdList)
        if (!filterList[0]) {
            return badRequest(res, "invalid measurement config")
        }
        req.body.configIdList = filterList
        const newDress = await createDress(req.body);
        return success(res, "Dress Added")
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function getAllDress(req, res) {
    try {
        const dressList = await getAllDresses();
        return success(res, "Dress List", dressList)
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function getDress(req, res) {
    try {
        const dress = await getDressById(req.params.dressId);
        return dress ? success(res, "Dress details", dress) : badRequest(res, 'Dress not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function editDress(req, res) {
    try {
        const dress = await updateDress(req.params.dressId, req.body);
        return dress ? success(res, "Dress updated") : badRequest(res, 'Dress not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}