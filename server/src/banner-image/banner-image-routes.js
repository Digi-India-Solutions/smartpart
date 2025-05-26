const { Router } = require("express");
const router = Router();
const multer = require('multer');
const fs = require("fs");
const path = require('path');

const { createBanner, getAllBanner, updateBanner, getAllBannerById, deleteBanner, getAllBannerForHome } = require("./banner-image-controller")

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

router.post("/create-banner-image", upload.single('image'), createBanner)

router.get("/get-all-banner-image", getAllBanner)

router.get("/get-banner-image-by-id/:id", getAllBannerById)

router.post("/update-banner-image/:id", upload.single('image'), updateBanner)

router.get("/delete-banner-image/:id", deleteBanner);

router.get("/get-all-banner-for-home", getAllBannerForHome)

module.exports = router;