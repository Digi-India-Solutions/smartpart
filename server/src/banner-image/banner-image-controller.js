const pool = require("../../db/pool");
const path = require('path');

// ✅ Create a banner
exports.createBanner = async (req, res) => {
    try {
        const { banner_id, title, link } = req.body;

        const image = req.file ? req.file.filename : null;

        const sql = `
            INSERT INTO cyb_banner_image (banner_id, title, link, image) 
            VALUES ( ?, ?, ?, ?)
        `;
        const values = [banner_id, title, link, image];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error", error });
            }
            return res.status(200).json({ status: true, message: "Banner created successfully!", data: { banner_id: result.insertId } });
        });
    } catch (error) {
        console.error("Create Banner error:", error);
        return res.status(500).json({ status: false, message: "Server error", error });
    }
};

// ✅ Get all banners
exports.getAllBanner = (req, res) => {
    const sql = `SELECT * FROM cyb_banner_image ORDER BY id DESC`;
    pool.query(sql, (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }
        return res.status(200).json({ status: true, message: "Banners fetched successfully", data: results });
    });
};

// ✅ Get banner by ID
exports.getAllBannerById = (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM cyb_banner_image WHERE id = ?`;

    pool.query(sql, [id], (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }
        if (results.length === 0) {
            return res.status(404).json({ status: false, message: "Banner not found" });
        }

        return res.status(200).json({ status: true, message: "Banner fetched successfully", data: results[0] });
    });
};

// ✅ Update banner
exports.updateBanner = (req, res) => {
    const id = req.params.id; // primary key of banner image
    const { banner_id, title, link } = req.body;
    const image = req.file ? req.file.filename : null;

    // Base SQL and values
    let sql = `UPDATE cyb_banner_image SET banner_id = ?, title = ?, link = ?`;
    const values = [banner_id || null, title || null, link || null];

    // Add image update only if a new image is uploaded
    if (image) {
        sql += `, image = ?`;
        values.push(image);
    }

    sql += ` WHERE id = ?`; // Use primary key 'id' for WHERE clause
    values.push(id);

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Banner not found" });
        }

        return res.status(200).json({ status: true, message: "Banner updated successfully" });
    });
};


// ✅ Delete banner
exports.deleteBanner = (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM cyb_banner_image WHERE id = ?`;

    pool.query(sql, [id], (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Banner not found" });
        }
        return res.status(200).json({ status: true, message: "Banner deleted successfully" });
    });
};


// ✅ Get all banners
exports.getAllBannerForHome = (req, res) => {
    const sql = `SELECT bi.*, b.name as banner_name, b.heading, b.sub_heading, b.slider_link, b.status
FROM cyb_banner_image bi
JOIN cyb_banner b ON bi.banner_id = b.id
ORDER BY bi.id DESC`;
    pool.query(sql, (error, results) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }
        return res.status(200).json({ status: true, message: "Banners fetched successfully", data: results });
    });
};