const pool = require("../../db/pool");

// ✅ Create a banner
exports.createBanner = async (req, res) => {
    try {
        console.log("BODY:-", req.body);
        const { name, heading, sub_heading, slider_link, status } = req.body;

        const sql = `
            INSERT INTO cyb_banner (name, heading, sub_heading, slider_link, status) 
            VALUES (?, ?, ?, ?, ?)
        `;
        const values = [
            name || null, heading || null,
            sub_heading || null, slider_link || null, status === "true" || status === true ? 1 : 0,
        ];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error", error });
            }
            return res.status(200).json({ status: true, message: "Banner created successfully!", data: result.insertId });
        });
    } catch (error) {
        console.error("Create Banner error:", error);
        return res.status(500).json({ status: false, message: "Server error", error });
    }
};

// ✅ Get all banners
exports.getAllBanner = (req, res) => {
    const sql = `SELECT * FROM cyb_banner ORDER BY id DESC`;

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
    const sql = `SELECT * FROM cyb_banner WHERE id = ?`;

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
    const id = req.params.id;
    const { name, heading, sub_heading, slider_link, status } = req.body;

    const sql = `
        UPDATE cyb_banner 
        SET name = ?, heading = ?, sub_heading = ?, slider_link = ?, status = ?
        WHERE id = ?
    `;

    const values = [
        name || null,
        heading || null,
        sub_heading || null,
        slider_link || null,
        status === "true" || status === true ? 1 : 0,
        id
    ];

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
    const sql = `DELETE FROM cyb_banner WHERE id = ?`;

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


exports.updateBannerStatus = (req, res) => {
    const { id, status } = req.body;

    if (!id || typeof status === 'undefined') {
        return res.status(400).json({ status: false, message: "ID and status are required" });
    }

    const newStatus = status === "true" || status === "1" || status === 1 ? 1 : 0;

    const sql = `
        UPDATE cyb_banner 
        SET status = ?
        WHERE id = ?
    `;

    pool.query(sql, [newStatus, id], (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Banner not found" });
        }
        return res.status(200).json({ status: true, message: "Status updated successfully" });
    });
};