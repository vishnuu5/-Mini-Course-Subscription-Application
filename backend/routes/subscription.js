import express from "express";
import {
  subscribe,
  getUserCourses,
} from "../controllers/subscriptionController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/subscribe", auth, subscribe);
router.get("/my-courses", auth, getUserCourses);

export default router;
