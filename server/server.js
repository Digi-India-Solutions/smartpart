require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");
const app = express();

// built-in middlewares
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));
app.use(express.urlencoded({ limit: "50mb" }));
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));
app.use("/Public", express.static(path.join(__dirname + "/Public")));
// app.set(express.static("./Public"));


const categoryRoutes = require("./src/categorys/categorys.routes");
const brandCategoryRoutes = require("./src/brandCategory/brandCategory-routes")
const brandRoutes = require("./src/brand/brand-routers")
const productRoutes = require("./src/product/product-routes");
const enquiryRoutes = require("./src/enquiry/enquiry-routes");
const blogRoutes = require("./src/blog/blog-routes")
const cardEnquiryRoutes = require("./src/cardEnquiry/cardEnquiry-routes")
const bannerRoutes = require("./src/banner/banner-routes")
const bannerImageRoutes = require("./src/banner-image/banner-image-routes")


app.use("/api/category", categoryRoutes);
app.use("/api/brandCategory", brandCategoryRoutes)
app.use("/api/brand", brandRoutes)
app.use("/api/product", productRoutes)
app.use("/api/enquiry", enquiryRoutes)
app.use("/api/blog", blogRoutes)
app.use("/api/cardEnquiry", cardEnquiryRoutes)
app.use("/api/banner", bannerRoutes)
app.use("/api/banner-image", bannerImageRoutes)

// const connectDatabase = require("./db/database");

//connect db
// connectDatabase();
// sendBillingToClient();
app.use("/", (req, res) => {
  return res.send("app is running")
})

//create server//
const server = app.listen(process.env.PORT || 8000, () => {
  console.log("Server is running on port", process.env.PORT || 8000);
});
