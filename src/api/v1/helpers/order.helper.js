import { orderFormatter, updateOrderFormatter } from "../formatter/order.formatter.js";
import orderModel from "../models/order.model.js"

// CRUD operations
export const createOrder = async (orderData) => {
  // Create operation
  try {
    const formattedData = orderFormatter(orderData)
    const Order = new orderModel(formattedData);
    const savedOrder = await Order.save();
    return savedOrder;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrders = async () => {
  // Read operation
  try {
    const Orders = await orderModel.find();
    return Orders;
  } catch (error) {
    console.error(error);
  }
};

export const updateOrder = async (orderId, updateData) => {
  // Update operation
  try {
    const formattedData = updateOrderFormatter(updateData)
    const updatedOrder = await orderModel.findOneAndUpdate({ orderId }, formattedData, { new: true });
    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
};

export const orderById = async (orderId) => {
  // Delete operation
  try {
    const deletedOrder = await orderModel.findOne({ orderId });
    return deletedOrder;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = async (orderId) => {
  // Delete operation
  try {
    const deletedOrder = await orderModel.findOneAndDelete({ orderId });
    return deletedOrder;
  } catch (error) {
    console.error(error);
  }
};
