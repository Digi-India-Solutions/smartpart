const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require("fs");
const path = require('path');

const { createCategory, getAllCategorys, changeStatus, getCategoryById, updateCategoryByID, deleteCategoryByID } = require('./categorys-controller');

const uploadDir = path.join(__dirname, '../../uploads/images');

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

router.post("/create-categoey", upload.single('image'), createCategory);

router.get("/get-all-categorys", getAllCategorys);

router.post("/change-category-status/:id", changeStatus)

router.get("/get-category-by-id/:id", getCategoryById);

router.post("/update-category/:id", upload.single('image'), updateCategoryByID);

router.get("/delete-category/:id", deleteCategoryByID);


module.exports = router;