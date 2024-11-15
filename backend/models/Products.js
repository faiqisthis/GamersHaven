import mongoose from 'mongoose'
import slugify from "slugify";
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please Enter the Product's name"],
  },
 
  category: {
    type: String,
    enum: ['console', 'game', 'accessory'],
    required: [true,"Please choose a category"],
  },
  price: {
    type:Number,
    required: [true,"Please enter the Product's price"],
  },
  description: String,
  stock: {
    type: Number,
    default: 0,
  },
  availability:Boolean,
  brand: {
    type: String,
    required:[true,"Please Enter the Product's brand"],
  },
  features: {
    type: [String],
  },
  images: {
    type:[String],
},

  // Specific fields for each category
  consoleSpecs: {
    type: Map,
    of: String,
  },
  gamePlatform: {
    type: [String],
  },
  accessoryType: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  slug: String,
});
productSchema.pre('save',function(next){
  this.slug=slugify(this.name,{lower:true})
   next()
 })

const productModel = mongoose.model('Product', productSchema);
export default productModel
