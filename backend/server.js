import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorHandler.js";
import Course from "./models/Course.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/course.js";
import subscriptionRoutes from "./routes/subscription.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-frontend.onrender.com']
    : ['http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "public/images")));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.get("/api/health", (req, res) => {
  res.status(200).json({ message: "Server is running" });
});

const seedCourses = async () => {
  try {
    const courseCount = await Course.countDocuments();
    const PORT = process.env.PORT || 5000;
    const BASE_URL = `http://localhost:${PORT}`;

    if (courseCount === 0) {
      const courses = [
        {
          title: "Web Development Fundamentals",
          description:
            "Learn the basics of web development including HTML, CSS, and JavaScript.",
          price: 0,
          instructor: "Raju",
          duration: "4 weeks",
          level: "Beginner",
          image: "/placeholder.svg",
        },
        {
          title: "Advanced React Patterns",
          description:
            "Master advanced React patterns, hooks, and state management.",
          price: 49,
          instructor: "Ramu",
          duration: "6 weeks",
          level: "Advanced",
          image: "/placeholder.svg",
        },
        {
          title: "Node.js & Express Backend",
          description:
            "Build scalable backend applications with Node.js and Express.",
          price: 39,
          instructor: "Mike",
          duration: "5 weeks",
          level: "Intermediate",
          image: "/placeholder.svg",
        },
        {
          title: "MongoDB Database Design",
          description: "Learn NoSQL database design with MongoDB.",
          price: 29,
          instructor: "Manu",
          duration: "3 weeks",
          level: "Intermediate",
          image: "/placeholder.svg",
        },
        {
          title: "Full Stack JavaScript Development",
          description: "Complete full-stack development course.",
          price: 79,
          instructor: "Alex",
          duration: "10 weeks",
          level: "Advanced",
          image: "/placeholder.svg",
        },
        {
          title: "CSS & UI/UX Design",
          description: "Master CSS, responsive design, and UI/UX principles.",
          price: 0,
          instructor: "Devid",
          duration: "4 weeks",
          level: "Beginner",
          image: "/placeholder.svg",
        },
      ];

      await Course.insertMany(courses);
      console.log("Sample courses seeded successfully");
    } else {
      const courses = await Course.find({
        image: { $regex: "via.placeholder.com" },
      });
      if (courses.length > 0) {
        console.log(`Updating ${courses.length} courses with placeholder images...`);
        for (const course of courses) {
          course.image = "/placeholder.svg";
          await course.save();
        }
        console.log("Courses updated successfully");
      }
    }
  } catch (error) {
    console.error("Error seeding courses:", error);
  }
};

setTimeout(seedCourses, 1000);

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
