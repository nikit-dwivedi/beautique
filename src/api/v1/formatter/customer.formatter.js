import { randomBytes } from 'crypto';

export function customerFormatter(customerData) {
    const customerId = randomBytes(4).toString("hex")
    let { name, contact, altContact, mail } = customerData
    return { customerId, name, contact, altContact, mail }
}
export function updateCustomerFormatter(customerData) {
    let { name, contact, altContact, mail } = customerData
    return { name, contact, altContact, mail }
}