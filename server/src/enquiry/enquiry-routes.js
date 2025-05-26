const { Router } = require("express");
const router = Router();

const { createEnquiry, getAllEnquiry, getAllEnquiryById, updateEnquiry, deleteEnquiry } = require("./enquiry-controller")

router.post("/create-enquiry", createEnquiry)

router.get("/get-all-enquiry", getAllEnquiry)

router.get("/get-all-enquiry-by-id/:id", getAllEnquiryById)

router.post("/update-enquiry/:id", updateEnquiry)

router.get('/delete-enquiry/:id', deleteEnquiry);


module.exports = router;