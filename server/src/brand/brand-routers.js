const { Router } = require("express");
const router = Router();
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const { createBrand, getAllBrand, getAllBrandById, updateBrand, deleteBrand } = require("./brand-conroller")

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

router.post("/create-brand", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), createBrand)

router.get("/get-all-brand", getAllBrand)

router.get("/get-all-brand-by-id/:id", getAllBrandById)

router.post("/update-brand/:id", upload.fields([{ name: 'image', maxCount: 1 }, { name: 'banner', maxCount: 1 }]), updateBrand)

router.get('/delete-brand/:id', deleteBrand);

// router.get("/get-all-card", getAllCard)

// router.post("/apply-coupon/:id", applyCoupon)

// router.get("/get-card-by-subProduct-id", getCardBySubProductId)

module.exports = router;