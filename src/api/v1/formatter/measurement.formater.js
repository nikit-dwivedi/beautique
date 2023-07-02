import { randomBytes } from 'crypto';

export function measurementFormatter(measurementData) {
    const measurementId = randomBytes(4).toString("hex")
    let { customerId, dressId, configList, description, tag } = measurementData

    return { measurementId, customerId, dressId, configList, description, tag }
}
export function updateMeasurementFormatter(measurementData) {
    let { name, isUnit, unit } = measurementData
    return { name, isUnit, unit }
}