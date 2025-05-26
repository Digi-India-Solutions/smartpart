const { Router } = require("express");
const router = Router();

const { createBanner, getAllBanner, updateBannerStatus, updateBanner, getAllBannerById, deleteBanner } = require("./banner-controller")

router.post("/create-banner", createBanner)

router.get("/get-all-banner", getAllBanner)

router.post('/update-status', updateBannerStatus);

router.get("/get-all-banner-by-id/:id", getAllBannerById)

router.post("/update-banner/:id", updateBanner)

router.get("/delete-banner/:id", deleteBanner);

module.exports = router;