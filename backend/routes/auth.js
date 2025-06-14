import express from 'express'
import{registerUser,login,getMe,forgotPassword,resetPassword,updateUser,updatePassword,logout,addToCart,updateCart,submitOrder} from '../controllers/auth.js'
import {protect} from '../middleware/auth.js'
const router=express.Router();

router.post('/register',registerUser)
router.post('/login',login)
router.get('/logout',logout)
router.get('/me',protect,getMe)
router.post('/forgotpassword',forgotPassword)
router.put('/updatecredentials',protect,updateUser)
router.put('/resetpassword/:resetToken',resetPassword)
router.put('/updatepassword',protect,updatePassword)
router.post('/cart',protect,addToCart)
router.put('/cart',protect,updateCart)
router.post('/checkout',protect,submitOrder)
export default router;