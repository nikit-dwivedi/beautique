import { randomBytes } from 'crypto';

export function orderFormatter(orderData) {
    const orderId = randomBytes(4).toString("hex")
    let { customerId, dressList, orderStatus, amount, paymentStatus, paymentType, amountPaid, amountRemaining } = orderData
    return { orderId, customerId, dressList, orderStatus, amount, paymentStatus, paymentType, amountPaid, amountRemaining }
}
export function updateOrderFormatter(updateData, orderData) {
    let paymentStatus = 'Paid'
    let { paymentType } = updateData
    let { amountPaid, amountRemaining } = orderData
    if (amountRemaining != 0) {
        amountPaid += amountRemaining
        amountRemaining = 0
    }
    return { paymentStatus, paymentType, amountPaid, amountRemaining }
}