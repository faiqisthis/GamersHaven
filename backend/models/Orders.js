import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    // User placing the order
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Contact and shipping address (collected on checkout)
    email: {
      type: String,
      required: [true, "Please add an email"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please add a valid email",
      ],
    },
    firstName: { type: String, required: [true, "Please Enter First Name"] },
    lastName: { type: String, required: [true, "Please Enter Last Name"] },
    apartment: { type: String, required: [true, "Please Enter a valid address"] },
    nearestLandmark: { type: String },
    city: { type: String, required: [true, "Please Enter a City"] },
    postalCode: {
      type: String,
      required: [true, "Please Enter a postal code"],
      match: [/^\d{5}$/, "Please enter a valid 5-digit postal code"],
    },
    phone: {
      type: String,
      required: [true, "Please enter a phone number"],
      match: [/^(?:\+92|92|0)?(3\d{2}|4\d{2})\d{7}$/, "Please enter a valid Pakistani phone number"],
    },

    // Cart snapshot (ids + quantities) and computed subtotal
    cart: {
      items: [
        {
          productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
          quantity: { type: Number, required: true, min: 1 },
        },
      ],
      subtotal: { type: Number, required: [true, "Please Enter Subtotal"] },
    },

    // Optional billing address; if missing we will pre-fill in a pre-save hook
    billingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: { type: String, match: [/^\d{5}$/, "Please Enter a Valid Postal Code"] },
      phone: { type: String, match: [/^(?:\+92|92|0)?(3\d{2}|4\d{2})\d{7}$/, "Please enter a valid Pakistani phone number"] },
    },

    // Payment info and order lifecycle
    paymentMethod: { type: String, enum: ["cod", "card"], required: true },
    paymentStatus: { type: String, enum: ["pending", "succeeded", "failed"], default: "pending" },
    paymentReference: { type: String }, // e.g., Stripe paymentIntent id
    paymentProvider: { type: String, enum: ["cod", "stripe", "mock"], default: "cod" },
    paidAt: { type: Date },

    status: {
      type: String,
      enum: ["placed", "processing", "shipped", "delivered", "cancelled"],
      default: "placed",
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
