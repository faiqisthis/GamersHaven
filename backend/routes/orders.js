import express from 'express'
import { authorize, protect } from '../middleware/auth.js';
import { deleteOrder, getOrders, createOrder, getMyOrders } from '../controllers/orders.js';
import getAdvancedResults from '../middleware/advancedResults.js';
import Order from '../models/Orders.js'

const router = express.Router()

// Authenticated users can create orders
router.post('/', protect, createOrder)
router.get('/my', protect, getMyOrders)

// Admin-only endpoints
router.use(protect, authorize('admin'))
router.get('/', getAdvancedResults(Order), getOrders)
router.delete('/:id', deleteOrder)

export default router;