import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
const CartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    default: 1,
  },
});

// Virtual field to populate product details
CartItemSchema.virtual('productDetails', {
  ref: 'Product', // Reference the Product model
  localField: 'productId', // Match productId in CartItem
  foreignField: '_id', // Match _id in Product
  justOne: true, // Return a single product
});

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a First name']
      },
      lastName:{
        type: String,
        required: [true, 'Please add a Last name']
      },
      email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
      },
      cart: {
        items: [CartItemSchema], 
      },
      password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false
      },
      resetPasswordToken: String,
      resetPasswordExpire: Date,
      createdAt: {
        type: Date,
        default: Date.now
      }
    },{
      toJSON: { virtuals: true },
        toObject: { virtuals: true },
    });
    // Get JWT token
    userSchema.methods.getSignedJwtToken = function() {
      return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
      });
    };

    userSchema.methods.getResetPasswordToken=async function(){
      const resetToken=crypto.randomBytes(20).toString('hex')
      this.resetPasswordToken=crypto.createHash('sha256').update(resetToken).digest('hex')
      this.resetPasswordExpire=Date.now()+10*60*1000
      await this.save()
      return resetToken;
    }

    // Match user entered password to hashed password in database
   userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password)
   }
    

    //Encrypt password using bcrypt
    userSchema.pre('save',async function(next){
      if(!this.isModified('password')){
        next();
      }
      const salt=await bcrypt.genSaltSync(10);
      this.password=await bcrypt.hash(this.password,salt);

    },
    )

const userModel = mongoose.model('User', userSchema);
export default userModel;