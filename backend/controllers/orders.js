import asyncHandler from "../middleware/async.js";
import Order from "../models/Orders.js";
import Product from "../models/Products.js";
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
  const userId = req.user.id;

  const {
    email,
    firstName,
    lastName,
    apartment,
    nearestLandmark,
    city,
    postalCode,
    phone,
    cart,
    billingAddress,
    paymentMethod,
    paymentStatus,
    paymentReference,
    paymentProvider,
    paidAt,
  } = req.body;

  if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
    return next(new ErrorResponse("Cart is empty", 400));
  }

  if (!paymentMethod || !["cod", "card"].includes(paymentMethod)) {
    return next(new ErrorResponse("Invalid or missing payment method", 400));
  }

  // Validate products and compute subtotal from DB prices
  const productIds = cart.items.map((i) => i.productId);
  const products = await Product.find({ _id: { $in: productIds } });
  const productMap = new Map(products.map((p) => [p._id.toString(), p]));

  // Rebuild items for stock check and subtotal calc; ensure quantities are valid
  let computedSubtotal = 0;
  for (const item of cart.items) {
    const p = productMap.get(item.productId);
    if (!p) {
      return next(new ErrorResponse(`Product not found: ${item.productId}`, 404));
    }
    if (!item.quantity || item.quantity < 1) {
      return next(new ErrorResponse("Invalid item quantity", 400));
    }
    computedSubtotal += p.price * item.quantity;
  }

  // Attempt to decrement stock atomically for each item
  const bulkUpdates = cart.items.map((item) => ({
    updateOne: {
      filter: { _id: item.productId, stock: { $gte: item.quantity } },
      update: { $inc: { stock: -item.quantity } },
    },
  }));

  const stockUpdateResult = await Product.bulkWrite(bulkUpdates);
  if (stockUpdateResult.matchedCount !== cart.items.length) {
    return next(new ErrorResponse("Some items are out of stock", 400));
  }

  // Build order payload
  const orderPayload = {
    userId,
    email,
    firstName,
    lastName,
    apartment,
    nearestLandmark,
    city,
    postalCode,
    phone,
    cart: {
      items: cart.items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
      subtotal: Number.isFinite(computedSubtotal) ? Number(computedSubtotal.toFixed(2)) : 0,
    },
    billingAddress,
    paymentMethod,
    paymentStatus: paymentStatus || (paymentMethod === "card" ? "succeeded" : "pending"),
    paymentReference,
    paymentProvider: paymentProvider || (paymentMethod === "card" ? "stripe" : "cod"),
    paidAt: paidAt || (paymentMethod === "card" ? new Date() : undefined),
  };

  const order = await Order.create(orderPayload);
  return res.status(201).json({ success: true, data: order });
});
export const updateOrder=asyncHandler(async (req,res,next)=>{
    const order =await Order.findByIdAndUpdate(req.params.id,req.body)
    if(order){
        res.status(201).json({success:true,data:{order}})
    }
})
