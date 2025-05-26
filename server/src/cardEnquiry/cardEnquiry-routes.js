const { Router } = require("express");
const router = Router();

const { createEnquiry, getAllEnquiry, getAllEnquiryById, updateEnquiry, deleteEnquiry } = require("./cardEnquiry-controller")

router.post("/create-card-enquiry", createEnquiry)

router.get("/get-all-card-enquiry", getAllEnquiry)

router.get("/get-all-enquiry-by-id/:id", getAllEnquiryById)

router.post("/update-card-enquiry/:id", updateEnquiry)

router.get('/delete-card-enquiry/:id', deleteEnquiry);


module.exports = router;