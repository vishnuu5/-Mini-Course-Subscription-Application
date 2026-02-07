import Subscription from "../models/Subscription.js";
import Course from "../models/Course.js";

// Mock Payment Processing Function
const processMockPayment = async (originalPrice, finalPrice, promoCode) => {
  // Simulate payment processing delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  const paymentId = `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  // Simulate occasional payment failures (5% failure rate for demo)
  if (Math.random() < 0.05) {
    return {
      success: false,
      error: "Payment declined. Please try again.",
      paymentId: null,
      paymentMethod: null,
      status: "failed"
    };
  }
  
  return {
    success: true,
    paymentId,
    paymentMethod: promoCode ? "Card (Promo Applied)" : "Card",
    status: "completed",
    amount: finalPrice,
    currency: "USD",
    processedAt: new Date().toISOString()
  };
};

export const subscribe = async (req, res) => {
  try {
    const { courseId, promoCode } = req.body;
    const userId = req.userId;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    const existingSubscription = await Subscription.findOne({
      userId,
      courseId,
    });
    if (existingSubscription) {
      return res
        .status(400)
        .json({ message: "You are already subscribed to this course" });
    }

    let pricePaid = course.price;
    let discountPercentage = 0;
    let promoCodeUsed = null;
    if (course.price > 0) {
      if (!promoCode) {
        return res.status(400).json({
          message: "Promo code required for paid courses",
          data: { originalPrice: course.price },
        });
      }

      if (promoCode === "BFSALE25") {
        discountPercentage = 50;
        pricePaid = course.price * (1 - discountPercentage / 100);
        promoCodeUsed = promoCode;
      } else {
        return res.status(400).json({ message: "Invalid promo code" });
      }
    }

    // Mock Payment Processing
    const paymentResult = await processMockPayment(course.price, pricePaid, promoCodeUsed);
    
    if (!paymentResult.success) {
      return res.status(400).json({ 
        message: "Payment processing failed",
        error: paymentResult.error 
      });
    }

    const subscription = new Subscription({
      userId,
      courseId,
      pricePaid,
      promoCodeUsed,
      discountPercentage,
      paymentId: paymentResult.paymentId,
      paymentMethod: paymentResult.paymentMethod,
      paymentStatus: paymentResult.status,
    });

    await subscription.save();

    res.status(201).json({
      message: "Subscription successful",
      data: {
        subscriptionId: subscription._id,
        courseTitle: course.title,
        originalPrice: course.price,
        pricePaid,
        discountPercentage,
        subscribedAt: subscription.subscribedAt,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getUserCourses = async (req, res) => {
  try {
    const userId = req.userId;

    const subscriptions = await Subscription.find({ userId })
      .populate("courseId", "title description price image")
      .sort({ subscribedAt: -1 });

    const courses = subscriptions.map((sub) => ({
      courseId: sub.courseId._id,
      title: sub.courseId.title,
      description: sub.courseId.description,
      originalPrice: sub.courseId.price,
      pricePaid: sub.pricePaid,
      image: sub.courseId.image,
      subscribedAt: sub.subscribedAt,
      discountPercentage: sub.discountPercentage,
    }));

    res.status(200).json({
      message: "User courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
