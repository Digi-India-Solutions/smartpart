const express = require("express");
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const {
    createBrandCategory,
    getAllBrandCategory,
    getBrandCategoryById,
    changeStatus,
    deleteBrandCategory,
    changeShowHome,
    updateBrandCategory,
} = require("./brandCategory-controller");

const router = express.Router();

// Ensure upload directory exists
const uploadDir = path.join(__dirname, '../../uploads/brand-category');

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Create directory if not exists
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Use timestamp + original filename
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({ storage });

// Routes
router.post("/create-brand-category", upload.single("image"), createBrandCategory);
router.get("/get-all-brand-category", getAllBrandCategory);
router.post("/change-status", changeStatus);
router.post("/change-show-home", changeShowHome);
router.get("/single-brand-category/:id", getBrandCategoryById);
router.post('/update-brand-category/:id', upload.single('image'), updateBrandCategory);
router.get("/delete-brand-category/:id", deleteBrandCategory);

module.exports = router;
