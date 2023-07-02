import { randomBytes } from 'crypto';

export function dressFormatter(dressData) {
    const dressId = randomBytes(4).toString("hex")
    let { name, configIdList } = dressData
    return { dressId, name, configIdList }
}
export function updateDressFormatter(dressData) {
    let { name } = dressData
    return { name }
}