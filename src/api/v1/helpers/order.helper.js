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
    throw new Error(error.message)
  }
};

export const getAllOrders = async (need) => {
  let opt = need ? "" : "-_id"
  // Read operation
  try {
    const Orders = await orderModel.find()
      .select(`${opt} -createdAt -updatedAt -__v `)
      .populate({
        path: "customerId",
        select: `${opt} -isActive -createdAt -updatedAt -__v`
      })
      .populate({
        path: "dressList",
        populate: {
          path: 'dressId configList.configId',
          select: `${opt} dressId price name isUnit configId unit`,
        },
        select: `${opt} -__v`,
      })
      .populate({
        path: "dressList.dressId",
        select: `${opt} -__v`
      })
    return Orders;
  } catch (error) {
    console.error(error);
    throw new Error(error.message)
  }
};

export const updateOrderPayment = async (orderId, updateData) => {
  // Update operation
  try {
    const orderData = await orderModel.findOne({ orderId }).select("-_id amountPaid amountRemaining")
    const formattedData = updateOrderFormatter(updateData, orderData)
    const updatedOrder = await orderModel.findOneAndUpdate({ orderId }, formattedData, { new: true });
    return updatedOrder;
  } catch (error) {
    console.error(error);
    throw new Error(error.message)
  }
};

export const updateOrderStatus = async (orderId) => {
  // Update operation
  try {
    let updatedOrder = await orderModel.findOne({ orderId }).select("-_id orderStatus").lean()
    switch (updatedOrder.orderStatus) {
      case 'pending':
        updatedOrder = await orderModel.findOneAndUpdate({ orderId }, { orderStatus: "in progress" })
        return updatedOrder;
      case 'in progress':
        updatedOrder = await orderModel.findOneAndUpdate({ orderId }, { orderStatus: "completed" })
        return updatedOrder;
      default:
        throw new Error("Can't change Status")
    }
  } catch (error) {
    console.error(error);
    throw new Error(error.message)
  }
};

export const orderById = async (orderId) => {
  // Delete operation
  try {
    const deletedOrder = await orderModel.findOne({ orderId });
    return deletedOrder;
  } catch (error) {
    console.error(error);
    throw new Error(error.message)
  }
};

export const deleteOrder = async (orderId) => {
  // Delete operation
  try {
    const deletedOrder = await orderModel.findOneAndDelete({ orderId });
    return deletedOrder;
  } catch (error) {
    console.error(error);
    throw new Error(error.message)
  }
};


export async function thisMonthOrderList() {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
    const order = await orderModel.count({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    return order;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error(error.message)
  }
}

export async function thisMonthAmount() {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
    const result = await orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    if (result.length > 0) {
      return result[0].totalAmount;
    } else {
      return 0; 
    }
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error(error.message)
  }
}
