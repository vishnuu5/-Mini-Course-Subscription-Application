import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      default: "/placeholder.svg",
    },
    instructor: {
      type: String,
      default: "Expert Instructor",
    },
    duration: {
      type: String,
      default: "4 weeks",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Course", courseSchema);
