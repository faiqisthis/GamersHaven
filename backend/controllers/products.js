import asyncHandler from "../middleware/async.js";
import ErrorResponse from "../utils/errorResponse.js";
import Product from "../models/Products.js";
export const getProducts = asyncHandler(async (req, res, next) => {
  res.status(200).json({ success: true, data: res.advancedResults });
});

export const getProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(
      new ErrorResponse(`Product with id ${req.params.id} was not Found`, 404)
    );
  }
  res.status(200).json({ success: true, data: product });
});

export const addProduct = asyncHandler(async (req, res, next) => {
  const {
    name,
    category,
    price,
    description,
    stock,
    availability,
    brand,
    features,
    consoleSpecs,
    gamePlatform,
    accessoryType,
    slug,images

  } = req.body;
  let productData = {
    name,
    category,
    price,
    description,
    stock,
    availability,
    brand,
    features,
    slug,
    images
  };

  // Add fields based on category
  if (category === "console") {
    productData.consoleSpecs = consoleSpecs;
  } else if (category === "game") {
    productData.gamePlatform = gamePlatform;
  } else if (category === "accessory") {
    productData.accessoryType = accessoryType;
  } else {
    return res.status(400).json({ message: "Invalid product category" });
  }
  try {
    const product = await Product.create(productData);
    res.status(201).json({ success: true, data: product });
  } catch (error) {
    return next(new ErrorResponse(`${error.message}`, 500));
  }
});

export const updateProduct=asyncHandler(async(req,res,next) => {
  const product = await Product.findByIdAndUpdate(req.params.id,req.body);
  if(!product){
    return next(new ErrorResponse("Product was not found.",404))
  }
  res.status(201).json({success:true})
})

export const deleteProduct=asyncHandler(async (req,res,next) => {
  const product=await Product.findByIdAndDelete(req.params.id)
  if(!product){
    return next(new ErrorResponse("Product was not found.",404))
  }
  res.status(201).json({success:true})
}
)