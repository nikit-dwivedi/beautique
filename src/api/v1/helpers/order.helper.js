import orderModel from "../models/order.model.js"

// CRUD operations
export const createOder = async (orderData) => {
  // Create operation
  try {
    const Order = new orderModel(orderData);
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
    const updatedOrder = await orderModel.findOneAndUpdate(orderId, updateData, { new: true });
    return updatedOrder;
  } catch (error) {
    console.error(error);
  }
};

export const deleteOrder = async (orderId) => {
  // Delete operation
  try {
    const deletedOrder = await orderModel.findOneAndDelete(orderId);
    return deletedOrder;
  } catch (error) {
    console.error(error);
  }
};
