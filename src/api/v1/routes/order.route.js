import { Router, json } from 'express';
import { createOrderAPI,getAllOrdersAPI, updateOrderPaymentAPI, updateOrderStatusAPI } from '../controllers/order.controller.js';
const router = Router();


// Route to create a new order
router.post('/', createOrderAPI);

// Route to get all orders
router.get('/', getAllOrdersAPI);

// Route to get a order by ID
// router.get('/:orderId', getorderByIdAPI);

// Route to update a order's status
router.post('/status/:orderId', updateOrderStatusAPI);

// Route to update a order's payment status
router.post('/payment/:orderId', updateOrderPaymentAPI);

export default router