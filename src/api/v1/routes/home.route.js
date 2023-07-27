import { Router, json } from 'express';
const router = Router();
import { getHomeData } from '../controllers/home.controller.js';


// Route to create a new customer
router.get('/', getHomeData);



export default router