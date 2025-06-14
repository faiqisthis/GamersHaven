import asyncHandler from "../middleware/async.js";
import Order from "../models/Orders.js";
import ErrorResponse from "../utils/errorResponse.js";

export const getOrders = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});
export const deleteOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) {
    return next(
      new ErrorResponse(`No Order with ID ${req.params.id} was found`, 404)
    );
  }
  res.status(200).json({ success: true, data: {} });
});
export const createOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.create(req.body);
  if (order) {
    res.status(200).json({ success: true, data: { order } });
  }
});
export const updateOrder=asyncHandler(async (req,res,next)=>{
    const order =await Order.findByIdAndUpdate(req.params.id,req.body)
    if(order){
        res.status(201).json({success:true,data:{order}})
    }
})
