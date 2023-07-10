import { randomBytes } from 'crypto';

export function orderFormatter(orderData) {
    const orderId = randomBytes(4).toString("hex")
    let { customerId, dressList, orderStatus, amount, paymentStatus, paymentType } = orderData
    return { orderId, customerId, dressList, orderStatus, amount, paymentStatus, paymentType }
}
export function updateOrderFormatter(orderData) {
    let { orderStatus, paymentStatus, paymentType } = orderData
    return { orderStatus, paymentStatus, paymentType }
}