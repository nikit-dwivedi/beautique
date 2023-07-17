import { Router } from 'express';
const router = Router();

import customerRouter from "./routes/customer.route.js";
import configRouter from "./routes/config.route.js";
import measurementRouter from "./routes/measurement.route.js";
import orderRouter from "./routes/order.route.js";

router.use("/customer", customerRouter)
router.use("/config", configRouter)
router.use("/measurement", measurementRouter)
router.use("/order", orderRouter)

export default router;