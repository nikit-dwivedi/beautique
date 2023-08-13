import { randomBytes } from 'crypto';

export function dressFormatter(dressData) {
    const dressId = randomBytes(4).toString("hex")
    let { name, configIdList, price } = dressData
    return { dressId, name, configIdList, price }
}
export function updateDressFormatter(dressData) {
    let { name,configIdList, price  } = dressData
    return { name,configIdList, price  }
}