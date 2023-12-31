import { createMeasurementConfig, deleteMeasurementConfig, getAllMeasurementConfigs, updateMeasurementConfig, getMeasurementConfigById, configListCheck, getMeasurementConfigByName } from "../helpers/measurementConfig.helper.js";
import { createDress, deleteDress, getAllDresses, getDressById, getDressByName, updateDress } from "../helpers/dress.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";
import { createMaterial, deleteMaterial, getAllMaterials, getMaterialById, getMaterialByName, updateMaterial } from "../helpers/material.helper.js";


// --------------------------------------measurement config-------------------------------------- //

export async function addMeasurementConfig(req, res) {
    try {
        const nameCheck = await getMeasurementConfigByName(req.body.name)
        if (nameCheck) {
            return badRequest(res, "Measurement already exist")
        }
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
        const nameCheck = await getMeasurementConfigByName(req.body.name)
        if (nameCheck && nameCheck.configId != req.params.configId) {
            return badRequest(res, "Measurement already exist")
        }
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
        const deletedMeasurement = await deleteMeasurementConfig(req.params.configId);
        return deletedMeasurement ? success(res, "Measurement config Deleted") : badRequest(res, 'Measurement config not found');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete Measurement' });
    }
}


// --------------------------------------Dress config-------------------------------------- //


export async function addNewDress(req, res) {
    try {
        const nameCheck = await getDressByName(req.body.name)
        if (nameCheck) {
            return badRequest(res, "dress already exist")
        }
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
        const nameCheck = await getDressByName(req.body.name)
        if (nameCheck && nameCheck.dressId != req.params.dressId) {
            return badRequest(res, "Measurement already exist")
        }
        const filterList = await configListCheck(req.body.configIdList)
        if (!filterList[0]) {
            return badRequest(res, "invalid measurement config")
        }
        req.body.configIdList = filterList
        const dress = await updateDress(req.params.dressId, req.body);
        return dress ? success(res, "Dress updated") : badRequest(res, 'Dress not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function removeDress(req, res) {
    try {
        const dress = await deleteDress(req.params.dressId);
        return dress ? success(res, "Dress deleted") : badRequest(res, 'Dress not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}


// --------------------------------------material-------------------------------------- //

export async function addMaterial(req, res) {
    try {
        const nameCheck = await getMaterialByName(req.body.name)
        if (nameCheck) {
            return badRequest(res, "Material already exist")
        }
        const material = await createMaterial(req.body);
        return success(res, "Material Added")
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function getAllMaterial(req, res) {
    try {
        const materialList = await getAllMaterials();
        return success(res, "material List", materialList)
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function getMaterialDataById(req, res) {
    try {
        const material = await getMaterialById(req.params.materialId);
        return material ? success(res, "Material Detail", material) : badRequest(res, 'Material not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function changeMaterial(req, res) {
    try {
        const nameCheck = await getMaterialByName(req.body.name)
        if (nameCheck && nameCheck.materialId != req.params.materialId) {
            return badRequest(res, "Material already exist")
        }
        const updatedMaterial = await updateMaterial(
            req.params.materialId,
            req.body
        );
        return updatedMaterial ? success(res, "Material Updated") : badRequest(res, 'Material not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function removeMaterial(req, res) {
    try {
        const deletedMaterial = await deleteMaterial(req.params.materialId);
        return deletedMaterial ? success(res, "Material Deleted") : badRequest(res, 'Material not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}
