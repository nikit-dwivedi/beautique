import customerModel from '../models/customer.model.js';
import { customerFormatter, updateCustomerFormatter } from "../formatter/customer.formatter.js"


export async function createCustomer(customerData) {
  try {
    const formattedData = customerFormatter(customerData)
    const customer = await customerModel.create(formattedData);
    return customer;
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error(error.message)
  }
}

export async function getAllCustomers() {
  try {
    const customers = await customerModel.find().select("-_id customerId name contact altContact mail");
    return customers;
  } catch (error) {
    console.error("Error retrieving customers:", error);
    throw new Error(error.message)
  }
}


export async function findCustomerById(customerId, need) {
  try {
    let selectString = need ? "customerId name contact altContact mail" : "-_id customerId name contact altContact mail"
    const customer = await customerModel.findOne({ customerId }).select(selectString);
    return customer;
  } catch (error) {
    console.error("Error finding customer:", error);
    throw new Error(error.message)
  }
}


export async function deleteCustomerById(customerId) {
  try {
    const deletedCustomer = await customerModel.findOneAndDelete({ customerId });
    return deletedCustomer;
  } catch (error) {
    console.error("Error deleting customer:", error);
    throw new Error(error.message)
  }
}


export async function updateCustomerContact(customerId, updatedData) {
  try {
    const formattedData = updateCustomerFormatter(updatedData)
    const updatedCustomer = await customerModel.findOneAndUpdate({ customerId }, formattedData, { new: true });
    return updatedCustomer;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error(error.message)
  }
}

export async function thisMonthCustomerList() {
  try {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59);
    const customers = await customerModel.count({
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    return customers;
  } catch (error) {
    console.error("Error updating customer:", error);
    throw new Error(error.message)
  }
}
