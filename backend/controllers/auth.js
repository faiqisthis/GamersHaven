import User from "../models/Users.js";
import Order from "../models/Orders.js";
import Product from "../models/Products.js";
import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from 'crypto'
export const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const { firstName,lastName, email, password, role } = req.body;
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    role,
  });
  if(!user){
    return next(new ErrorResponse('User not created', 400))
  }
  sendTokenResponse(user, 200, res);
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorResponse("Email and password are required", 400));
  }
  const user = await User.findOne({ email }).select("+password")
  if (!user) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse("Invalid Credentials", 401));
  }
  sendTokenResponse(user, 200, res);
});

export const logout=asyncHandler(async(req,res,next) => {
  res.cookie('token','none',{
    expires:new Date(Date.now()+10*1000),
    httpOnly:true
  })
  res.status(200).json({success:true,data:{}})
})


export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate({path:'cart.items.productId',
    select:'name price brand images'
  });
  res.status(200).json({ success: true, data: user });
});

export const resetPassword=asyncHandler(async (req,res,next)=>{

    
    const resetPasswordToken=crypto.createHash('sha256').update(req.params.resetToken).digest('hex')

    const user=await User.findOne({resetPasswordToken, resetPasswordExpire:{$gt: Date.now()}})
    if(!user){
        return next(new ErrorResponse('Invalid token',400))
    }
    user.password=req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire=undefined
    await user.save()
   sendTokenResponse(user,200,res)
})

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse("Email not found", 404));
  }
  const resetToken = await user.getResetPasswordToken();
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/auth/resetpassword/${resetToken}`;
  const message = `You are receiving this mail because you requested to reset your password. Please make a PUT Request to this URL\n\n${resetUrl}.`;
  try {
    sendEmail({
      email: user.email,
      subject: "Reset Password",
      message,
    });
    res.status(200).json({ success: true, data: "Email Sent" });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorResponse("Email could not be sent", 500));
  }
});

export const updateUser=asyncHandler(async(req,res,next)=>{
    const fieldsToUpdate={
        name:req.body.name,
        email:req.body.email
    }
    const user=await User.findByIdAndUpdate(req.user.id,fieldsToUpdate)
    if(!user){
        return next(new ErrorResponse('User not found',404))
    }
    res.status(201).json({success:true,data:{}})
})
export const updatePassword=asyncHandler(async(req,res,next)=>{
    const user=await User.findById(req.user).select('+password')
    if(!user){
        return next(new ErrorResponse('User not found',404))
    }
    const isMatch=await user.matchPassword(req.body.currentPassword)
    if(!isMatch){
        return next(new ErrorResponse('Wrong password',401))
    }
    user.password=req.body.newPassword
    await user.save()
    res.status(201).json({success:true,data:{}})
})
export const submitOrder=asyncHandler(async(req,res,next) => {
  const response=await Order.create(req.body)
  if(response){
    res.status(200).json({success:true,data:response})
  }
})
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  if (process.env.NODE_ENVIRONEMNT === "production") {
    options.secure = true;
  }
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_EXPIRE_COOKIE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token });
};

export const addToCart = asyncHandler(async (req, res, next) => {
  const { id } = req.user; // Destructure `id` directly
  const { productId, quantity } = req.body;

  // Find the user and the product
  const user = await User.findById(id);
  const product = await Product.findById(productId);

  if (!user) {
    return next(new ErrorResponse("No user found", 401));
  }

  if (!product) {
    return next(new ErrorResponse("No product found", 404)); // Handle product not found
  }

  // Ensure user.cart exists and items is an array
  if (!user.cart) {
    user.cart = { items: [] }; // Initialize empty cart if not present
  }

  if (!Array.isArray(user.cart.items)) {
    user.cart.items = []; // Ensure cart.items is always an array
  }

  // Find existing item in the cart
  const existingItem = user.cart.items.find(item => item.productId.toString() === productId);

  if (existingItem) {
    existingItem.quantity += quantity; // Update quantity
  } else {
    user.cart.items.push({ productId, quantity }); // Add new item to cart
  }

  try {
    await user.save(); // Save the user with the updated cart

    // Re-fetch the user with populated product details
    const updatedUser = await User.findById(id).populate({
      path: 'cart.items.productId',
      select: 'name price brand images'
    });

    res.status(200).json({ success: true, data: updatedUser }); // Return updated user
  } catch (error) {
    next(error); // Handle errors during save or population
  }
});


export const updateCart=asyncHandler(async(req,res,next)=>{
const id=req.user.id
const {data}=req.body
const user = await User.findById(id).populate({path:'cart.items.productId',
  select:'name price brand images'
});

if(!user){
  return(next(new ErrorResponse("No user found",401)))
}
user.cart.items=data
await user.save()
res.status(201).json({
  success:true,
  data:null
})

})