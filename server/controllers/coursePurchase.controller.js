import Razorpay from "razorpay";
import crypto from "crypto";
import { Course } from "../models/course.model.js";
import { CoursePurchase } from "../models/coursePurchase.model.js";
import { Lecture } from "../models/lecture.model.js";
import { User } from "../models/user.model.js";
import mongoose from "mongoose";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createCheckoutSession = async (req, res) => {
  try {
    const userId = req.id;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found!" });

    // Create a new course purchase record
    const purchased = await CoursePurchase.findOne({ userId, courseId, status: "completed" });
    if (purchased) {
      return res.status(404).json({ message: "Already Purchased" });
    }
    const newPurchase = new CoursePurchase({
      courseId,
      userId,
      amount: course.coursePrice,
      status: "pending",
    });

    const options = {
      amount: course.coursePrice * 100, // Amount in paise (lowest denomination)
      currency: "INR",
      receipt: `receipt_${newPurchase._id}`,
      notes: {
        courseId: courseId,
        userId: userId,
      },
    };

    const order = await razorpay.orders.create(options);
    console.log("order 215: ", order);

    if (!order) {
      return res.status(400).json({ success: false, message: "Error while creating order" });
    }

    // Save the purchase record
    newPurchase.paymentId = order.id;
    await newPurchase.save();

    return res.status(200).json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const stripeWebhook = async (req, res) => {
  try {
    console.log("body 239 ", req.body);

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    // console.log("1");

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    // console.log("2");
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(body.toString()).digest("hex");
    // console.log("3");
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: "Invalid Signature" });
    }
    // console.log("4");
    // Update the purchase status to completed
    const purchase = await CoursePurchase.findOne({ paymentId: razorpay_order_id }).populate({
      path: "courseId",
    });
    // console.log("5");
    if (!purchase) {
      return res.status(404).json({ message: "Purchase not found" });
    }
    // console.log("6");
    purchase.status = "completed";
    await purchase.save();

    // Make all lectures visible by setting `isPreviewFree` to true
    if (purchase.courseId && purchase.courseId.lectures.length > 0) {
      await Lecture.updateMany({ _id: { $in: purchase.courseId.lectures } }, { $set: { isPreviewFree: true } });
    }

    // Update user's enrolledCourses
    await User.findByIdAndUpdate(purchase.userId, { $addToSet: { enrolledCourses: purchase.courseId._id } }, { new: true });

    // Update course to add user ID to enrolledStudents
    await Course.findByIdAndUpdate(purchase.courseId._id, { $addToSet: { enrolledStudents: purchase.userId } }, { new: true });

    res.status(200).json({ success: true, message: "Payment verified successfully" });
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getCourseDetailWithPurchaseStatus = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.id;

    const course = await Course.findById(courseId).populate({ path: "creator" }).populate({ path: "lectures" });

    if (!course) {
      return res.status(404).json({ message: "Course not found!" });
    }

    const purchased = await CoursePurchase.findOne({ userId, courseId, status: "completed" });

    console.log("purchase", purchased);
    if (!purchased || purchased.status != "completed") {
      return res.status(200).json({
        course,
        purchased: false, // true if purchased, false otherwise
      });
    }
    // console.log("bhej diya");

    return res.status(200).json({
      course,
      purchased: true, // true if purchased, false otherwise
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllPurchasedCourse = async (req, res) => {
  try {
    const userId = req.id;
    const purchasedCourse = await CoursePurchase.aggregate([
      // Match documents with status "completed"
      {
        $match: {
          status: "completed",
        },
      },
      // Lookup to join with the Course collection
      {
        $lookup: {
          from: "courses", // Collection name of Course
          localField: "courseId", // Field in CoursePurchase schema
          foreignField: "_id", // Field in Course schema
          as: "courseDetails", // Output array field
        },
      },
      // Unwind the courseDetails array to work with individual courses
      {
        $unwind: "$courseDetails",
      },
      // Match courses created by the current user
      {
        $match: {
          "courseDetails.creator": new mongoose.Types.ObjectId(userId),
        },
      },
      // Project only necessary fields
      {
        $project: {
          _id: 1,
          userId: 1,
          amount: 1,
          paymentId: 1,
          "courseDetails.courseTitle": 1,
          "courseDetails.category": 1,
          "courseDetails.coursePrice": 1,
        },
      },
    ]);

    // console.log("Purchased courses ", purchasedCourse);

    if (!purchasedCourse) {
      return res.status(404).json({
        purchasedCourse: [],
      });
    }
    return res.status(200).json({
      purchasedCourse,
    });
  } catch (error) {
    console.log(error);
  }
};
