const { Router } = require("express");
const router = Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const {
  createProduct,
  getAllProduct,
  getAllProductById,
  updateProduct,
  deleteProduct,
  searchProduct,
  getAllProductWithoutPagination,
} = require("./product-controller");

const uploadDir = path.join(__dirname, "../../uploads/product");

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
  },
});

const upload = multer({ storage });

router.post("/create-product", upload.single("image"), createProduct);

router.get("/get-all-product", getAllProduct);

router.get("/get-all-product-by-id/:id", getAllProductById);

router.post("/update-product/:id", upload.single("image"), updateProduct);

router.get("/delete-product/:id", deleteProduct);

router.get("/search-product", searchProduct);

router.get(
  "/get-all-product-without-pagination",
  getAllProductWithoutPagination
);

module.exports = router;
