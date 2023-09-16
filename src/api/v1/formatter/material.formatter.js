import { randomBytes } from 'crypto';

export function materialFormatter(materialData) {
    const materialId = randomBytes(4).toString("hex")
    let { name, price } = materialData
    return { materialId, name, price }
}
export function updateMaterialFormatter(materialData) {
    let { name, price } = materialData
    return { name, price }
}