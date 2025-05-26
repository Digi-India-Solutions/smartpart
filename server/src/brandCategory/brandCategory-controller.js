const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const pool = require("../../db/pool")
const fs = require("fs");
const path = require("path");


exports.createBrandCategory = catchAsyncErrors(async (req, res, next) => {
    console.log("DDDDD:-", req.body)
    console.log("file:-", req.file)
    const {
        name, show_home, meta_title, meta_description, meta_keyword, seo_url, status
    } = req.body;

    const image = req.file?.filename || null;

    if (!name || !seo_url) {
        return res.status(400).json({ success: false, message: "Name and SEO URL are required" });
    }

    const insertQuery = `
        INSERT INTO cyb_brand_category
        (name, image, show_home,  meta_title, meta_description, meta_keyword, seo_url, status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
        name, image, show_home === 'true' || show_home === 1 ? 1 : 0, meta_title || '', meta_description || '', meta_keyword || '', seo_url, status === 'true' || status === 1 ? 1 : 0
    ];

    pool.query(insertQuery, values, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error, please contact the administrator.", });
        }
        return res.status(200).json({ status: true, message: "Brand Category created successfully.", data: result, });
    });
});


exports.getBrandCategoryById = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    pool.query("SELECT * FROM cyb_brand_category WHERE id = ?", [id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ status: false, message: "Brand Category not found." });
        }

        console.log("RESULT:-", results)
        return res.status(200).json({ status: true, data: results[0] });
    });
});


exports.getAllBrandCategory = catchAsyncErrors(async (req, res, next) => {

    pool.query("SELECT * FROM cyb_brand_category ORDER BY id DESC", (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error." });
        } else {
            console.log("DATA:", results)
            return res.status(200).json({ status: true, message: 'Fetch Data', data: results });
        }
    });
});

exports.changeStatus = catchAsyncErrors(async (req, res, next) => {
    const { id, status } = req.body;
    const query = `UPDATE cyb_brand_category SET status = ? WHERE id = ?`;
    pool.query(query, [status, id], (error, result) => {
        if (error) return res.status(500).json({ status: false, message: "Database error" });
        return res.status(200).json({ status: true, message: "Status updated" });
    });
});

exports.changeShowHome = catchAsyncErrors(async (req, res, next) => {
    const { id, show_home } = req.body;
    const query = `UPDATE cyb_brand_category SET show_home = ? WHERE id = ?`;
    pool.query(query, [show_home, id], (error, result) => {
        if (error) return res.status(500).json({ status: false, message: "Database error" });
        return res.status(200).json({ status: true, message: "Show home updated" });
    });
});

exports.updateBrandCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { name, show_home, meta_title, meta_description, meta_keyword, seo_url, status } = req.body;
    console.log("BODY:-", req.body)
    console.log("FILE:-", req.file)

    const image = req.file?.filename || null;

    if (!id) {
        return res.status(400).json({ status: false, message: "ID is required" });
    }

    if (!name || !seo_url) {
        return res.status(400).json({ status: false, message: "Name and SEO URL are required" });
    }

    const updateFields = [
        "name = ?",
        "show_home = ?",
        "meta_title = ?",
        "meta_description = ?",
        "meta_keyword = ?",
        "seo_url = ?",
        "status = ?"
    ];
    const values = [
        name,
        show_home === 'true' || show_home === 1 ? 1 : 0,
        meta_title || '',
        meta_description || '',
        meta_keyword || '',
        seo_url,
        status === 'true' || status === 1 ? 1 : 0
    ];

    // Conditionally include image field
    if (image) {
        updateFields.push("image = ?");
        values.push(image);
    }

    values.push(id); // for WHERE clause

    const updateQuery = `
        UPDATE cyb_brand_category
        SET ${updateFields.join(", ")}
        WHERE id = ?
    `;

    pool.query(updateQuery, values, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error, please contact the administrator." });
        }
        return res.status(200).json({ status: true, message: "Brand Category updated successfully.", data: result });
    });
});


exports.deleteBrandCategory = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    pool.query("SELECT image FROM cyb_brand_category WHERE id = ?", [id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error." });
        }

        if (results.length === 0) {
            return res.status(404).json({ status: false, message: "Brand Category not found." });
        }

        const imageName = results[0].image;

        // Delete image file if exists
        if (imageName) {
            const imagePath = path.join(__dirname, "../uploads/brand-category", imageName);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        pool.query("DELETE FROM cyb_brand_category WHERE id = ?", [id], (err) => {
            if (err) {
                console.error("Database error:", err);
                return res.status(500).json({ status: false, message: "Failed to delete brand category." });
            }

            return res.status(200).json({ status: true, message: "Brand Category deleted successfully." });
        });
    });
});