import { createCustomer, deleteCustomerById, findCustomerById, getAllCustomers, updateCustomerContact } from "../helpers/customer.helper.js";
import { orderOfCustomer } from "../helpers/order.helper.js";
import { badRequest, success } from "../helpers/response.helper.js";

// Function to create a new customer
export async function createCustomerAPI(req, res) {
  try {
    const customer = await createCustomer(req.body);
    return success(res, "customer Added")
  } catch (error) {
    return badRequest(res, error.message)
  }
}

// Function to get all customers
export async function getAllCustomersAPI(req, res) {
  try {
    const customers = await getAllCustomers();
    return success(res, "customer List", customers)
  } catch (error) {
    return badRequest(res, error.message)
  }
}

// Function to get a customer by ID
export async function getCustomerByIdAPI(req, res) {
  try {
    const customer = await findCustomerById(req.params.customerId);
    return customer ? success(res, "Customer details", customer) : badRequest(res, 'Customer not found');
  } catch (error) {
    return badRequest(res, error.message)
  }
}

// Function to update a customer's contact
export async function updateCustomerContactAPI(req, res) {
  try {
    const updatedCustomer = await updateCustomerContact(req.params.customerId, req.body);
    return updatedCustomer ? success(res, "Customer updated") : badRequest(res, 'Customer not found');
  } catch (error) {
    return badRequest(res, error.message)
  }
}

// Function to delete a customer by ID
export async function deleteCustomerByIdAPI(req, res) {
  try {

    const deletedCustomer = await deleteCustomerById(req.params.customerId);
    if (!deletedCustomer) {
      badRequest(res, 'Customer not found');
    }
    success(res,"order of customer",deletedCustomer)
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
}

