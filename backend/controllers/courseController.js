import Course from "../models/Course.js";

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({
      message: "Courses retrieved successfully",
      data: courses,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({
      message: "Course retrieved successfully",
      data: course,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
