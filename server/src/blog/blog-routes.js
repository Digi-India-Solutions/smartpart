const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  createBlog,
  getAllBlog,
  getAllBlogById,
  updateBlog,
  deleteBlog,
} = require("./blog-controller");

const router = express.Router();

const uploadDir = path.join(__dirname, "../../uploads/images");

// Ensure upload directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

/**
 * Routes
 */

// Create blog with image upload
router.post("/create-blog", upload.single("image"), createBlog);

// Get all blogs
router.get("/get-all-blog", getAllBlog);

// // Get blog by ID
router.get("/get-all-blog-by-id/:id", getAllBlogById);

// // Update blog with optional new image
router.post("/update-blog/:id", upload.single("image"), updateBlog);

// // Delete blog
router.get("/delete-blog/:id", deleteBlog);

module.exports = router;
