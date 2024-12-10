import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    firstName: {
      type: String,
      required: [true, "Please Enter First Name"],
    },
    lastName: {
      type: String,
      required: [true, "Please Enter Last Name"],
    },
    apartment: {
      type: String,
      required: [true, "Please Enter a valid address"],
    },
    nearestLandmark: {
      type: String,
    },
    city: {
      type: String,
      required: [true, "Please Enter a City"],
    },
    postalCode: {
      type: String,
      required: [true, "Please Enter a postal code"],
      match: [
        /^\d{5}$/, // Pakistani postal code regex
        "Please enter a valid 5-digit postal code",
      ],
    },
    phone: {
      type: String,
      required: [true, "Please enter a phone number"],
      match: [
        /^(?:\+92|92|0)?(3\d{2}|4\d{2})\d{7}$/, // Pakistani phone number regex
        "Please enter a valid Pakistani phone number",
      ],
    },
    cart: {
      items: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product", // Reference to the Product model
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          price: {
            type: Number,
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            min: 1,
          },
        },
      ],
      subtotal: {
        type: Number,
        required: [true, "Please Enter Subtotal"],
      },
    },
    billingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: {
        type: String,
        match: [
          /^\d{5}$/, // Pakistani postal code regex
          "Please Enter a Valid Postal Code",
        ],
      },
      phone: {
        type: String,
        match: [
          /^(?:\+92|92|0)?(3\d{2}|4\d{2})\d{7}$/, // Pakistani phone number regex
          "Please enter a valid Pakistani phone number",
        ],
      },
    },
  },
  { timestamps: true }
);
// Middleware to copy primary address to billing address if not provided
orderSchema.pre("save", function (next) {
  if (!this.billingAddress || !this.billingAddress.fullName) {
    this.billingAddress = {
      fullName: `${this.firstName} ${this.lastName}`,
      address: this.apartment,
      city: this.city,
      postalCode: this.postalCode,
      phone: this.phone,
    };
  }
  next();
});
const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;
