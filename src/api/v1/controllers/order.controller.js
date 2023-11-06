import { createCustomer, findCustomerById } from "../helpers/customer.helper.js";
import { getDressById } from "../helpers/dress.helper.js";
import { getMaterialById } from "../helpers/material.helper.js";
import { createMeasurements, getMeasurementById } from "../helpers/measurement.helper.js";
import { createOrder, getAllOrders, orderById, updateOrderPayment, updateOrderStatus } from "../helpers/order.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";

// Function to create a new customer
export async function createOrderAPI(req, res) {
    try {
        let { customerDetail, dressCollection, paymentData } = req.body
        // console.log(customerId, dressId, configList, description, tag);
        // if (!customerDetail.customerId) {
        //     await createCustomer(customerDetail)
        // }
        let { _id: customerId } = customerDetail.customerId ? await findCustomerById(customerDetail.customerId, true) : await createCustomer(customerDetail)
        paymentData.amount = 0
        console.log({ customerDetail, dressCollection, paymentData });
        let dressList = await Promise.all(dressCollection.map(async dress => {
            const dressData = await getDressById(dress.dressId, true)
            console.log(dressData);
            let materialList = dress.materialList[0] ? await Promise.all(dress.materialList.map(async (material) => {
                let materialData = await getMaterialById(material.materialId, true)
                paymentData.amount += material.price * parseFloat(material.length)
                return materialData._id ? { materialId: materialData._id, length: material.length } : null
            })) : []
            materialList = materialList.filter((id) => id != null)
            dress.dressId = dressData._id
            dress.customerId = customerId
            paymentData.amount += dress.price
            let configError = false
            console.log("dress.measurementId",dress.measurementId);
            if (dress.measurementId === "") {
                const configMap = new Map(dress.configList.map(configData => [configData.configId, configData.value]))
                let configList = dressData.configIdList.map((config) => {
                    if (!configMap.get(config.configId)) {
                        configError = true
                        console.log(configMap.get(config.configId));
                    }
                    return { configId: config._id, value: configMap.get(config.configId) }
                })
                dress.configList = configList
                if (configError) {
                    return badRequest(res, "please provide all order")
                }
                let newMeasurement = await createMeasurements(dress)
                console.log("newMeasurement",newMeasurement);
                return{ measurementId: newMeasurement._id, materialList}
            }
            let newMeasurement = await getMeasurementById(dress.measurementId, true)
            return { measurementId: newMeasurement._id, materialList }
        }))
        paymentData.amountRemaining = paymentData.amount - paymentData.amountPaid
        let orderData = { customerId, dressList, ...paymentData }
        const order = await createOrder(orderData);
        return success(res, "order Added")
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get all orders
export async function getAllOrdersAPI(req, res) {
    try {
        const orders = await getAllOrders();
        return success(res, "order List", orders)
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to get a order by ID
export async function getOrderByIdAPI(req, res) {
    try {
        const order = await orderById(req.params.orderId);
        return order ? success(res, "order details", order) : badRequest(res, 'order not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

// Function to update a order
export async function updateOrderPaymentAPI(req, res) {
    try {
        const updatedOrder = await updateOrderPayment(req.params.orderId, req.body);
        return updatedOrder ? success(res, "order updated") : badRequest(res, 'order not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

export async function updateOrderStatusAPI(req, res) {
    try {
        const updatedOrder = await updateOrderStatus(req.params.orderId);
        return updatedOrder ? success(res, "order updated") : badRequest(res, 'order not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}
updateOrderStatus

// Function to delete a order by ID
export async function deleteOrderByIdAPI(req, res) {
    try {
        const deletedOrder = await deleteOrderById(req.params.orderId);
        if (deletedOrder) {
            res.json(deletedOrder);
        } else {
            res.status(404).json({ error: 'order not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
}

