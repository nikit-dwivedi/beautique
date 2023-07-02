import { Router } from 'express';
const router = Router();

import customerRouter from "./routes/customer.route.js";
import configRouter from "./routes/config.route.js";
import measurementRouter from "./routes/measurement.route.js";

router.use("/customer", customerRouter)
router.use("/config", configRouter)
router.use("/measurement", measurementRouter)

export default router;