import { randomBytes } from 'crypto';

export function measurementConfigFormatter(configData) {
    const configId = randomBytes(4).toString("hex")
    let { name, isUnit = false, unit } = configData
    if (!isUnit) {
        unit = null
    }
    return { configId, name, isUnit, unit }
}
export function updateMeasurementConfigFormatter(configData) {
    let { name, isUnit, unit } = configData
    return { name, isUnit, unit }
}