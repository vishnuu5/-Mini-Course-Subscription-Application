import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
    promoCodeUsed: {
      type: String,
      default: null,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    subscribedAt: {
      type: Date,
      default: Date.now,
    },
    // Mock Payment Processing Fields
    paymentId: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "completed",
    },
    transactionId: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Subscription", subscriptionSchema);
