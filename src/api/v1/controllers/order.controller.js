import { findCustomerById } from "../helpers/customer.helper.js";
import { getDressById } from "../helpers/dress.helper.js";
import { createOrder, getAllOrders, orderById, updateOrder } from "../helpers/order.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";

// Function to create a new customer
export async function createOrderAPI(req, res) {
    try {
        let { customerId, dressId, configList, description, tag } = req.body
        console.log(customerId, dressId, configList, description, tag);
        const customerData = await findCustomerById(customerId, true)
        customerId = customerData._id
        const dressData = await getDressById(dressId, true)
        dressId = dressData._id
        let configError = false
        const configMap = new Map(configList.map(configData => [configData.configId, configData.value]))
        let newList = dressData.configIdList.map((config) => {
            if (!configMap.get(config.configId)) {
                configError = true
                console.log(configMap.get(config.configId));
            }
            return { configId: config._id, value: configMap.get(config.configId) }
        })
        if (configError) {
            return badRequest(res, "please provide all order")
        }
        configList = newList
        let orderData = { customerId, dressId, configList, description, tag }
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
export async function updateOrderAPI(req, res) {
    try {
        const updatedOrder = await updateOrder(req.params.orderId, req.body);
        return updatedOrder ? success(res, "order updated") : badRequest(res, 'order not found');
    } catch (error) {
        return badRequest(res, error.message)
    }
}

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

