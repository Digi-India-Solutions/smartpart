const pool = require("../../db/pool");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const { deleteLocalFile } = require("../../middleware/DeleteImageFromLoaclFolder");
const ErrorHandler = require("../../utils/ErrorHandler");
const fs = require('fs');
const path = require("path");
const ShortUniqueId = require("short-unique-id");



exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, keyword, meta_title, meta_description, meta_keyword, status } = req.body;

        if (!name || !meta_title || !meta_description || !meta_keyword || !keyword) {
            return res.status(400).json({
                status: false,
                message: "All required fields must be filled.",
            });
        }

        const image = req.file || null;
        const imagePath = image ? image.filename : null;

        const create_date = new Date();
        const modify_date = new Date();

        const sql = `
            INSERT INTO cyb_category 
            (name, keyword, image, meta_title, meta_description, meta_keyword, status, create_date, modify_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name, keyword, imagePath || '', meta_title, meta_description, meta_keyword, JSON.parse(status), create_date, modify_date
        ];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error, please contact the administrator.", });
            }

            return res.status(200).json({ status: true, message: "Category submitted successfully.", data: result, });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ status: false, message: "Internal Server Error", });
    }
});

exports.getAllCategorys = catchAsyncErrors(async (req, res, next) => {
    pool.query("SELECT * FROM cyb_category ORDER BY id DESC", (error, result) => {
        if (error) {
            return res.status(500).json({ status: false, message: "Database error." });
        } else {
            // console.log("result",result)
            return res.status(200).json({ status: true, data: result });
        }

    });
});


exports.changeStatus = catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const fields = req.body; // { fieldName: value }
    console.log('DATA:-DATA:-', req.body)
    if (!id || !fields || Object.keys(fields).length === 0) {
        return res.status(400).json({ status: false, message: "Invalid request" });
    }

    // Build dynamic SET clause for SQL
    const field = Object.keys(fields)[0];
    const value = fields[field];

    const sql = `UPDATE cyb_category SET ${field} = ? WHERE id = ?`;

    pool.query(sql, [value, id], (error, result) => {
        if (error) {
            return res.status(500).json({ status: false, message: "Database error." });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Category not found." });
        }
        console.log('Database:-', result)
        return res.status(200).json({ status: true, message: "Category updated successfully." });
    });
})

exports.getCategoryById = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    console.log("DATA:-DATA:-", id)
    pool.query("SELECT * FROM cyb_category WHERE id = ?", [id], (error, result) => {
        if (error) return res.status(500).json({ status: false, message: "Database error." });
        if (result.length === 0) return res.status(404).json({ status: false, message: "Category not found." });
        return res.status(200).json({ status: true, data: result[0] });
    });
});

exports.updateCategoryByID = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const {
        name,
        keyword,
        meta_title,
        meta_description,
        meta_keyword,
        status,
        existingImage
    } = req.body;

    const newImage = req.file ? req.file.filename : null;
    const imageUrl = newImage || existingImage || null;

    // Validation
    if (!name || !keyword || !meta_title || !meta_description || !meta_keyword) {
        return res.status(400).json({
            status: false,
            message: "All required fields must be filled.",
        });
    }

    try {
        if (newImage) {
            // Fetch old image from DB
            const [oldCategory] = await new Promise((resolve, reject) => {
                pool.query(`SELECT image FROM cyb_category WHERE id = ?`, [id], (err, result) => {
                    if (err) return reject(err);
                    resolve(result);
                });
            });

            const oldImage = oldCategory?.image;

            // Delete old image from file system
            if (oldImage) {
                const oldImagePath = path.join(__dirname, "../../uploads/images", oldImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                    console.log("Old image deleted:", oldImagePath);
                }
            }
        }

        const modify_date = new Date();

        const sql = `
            UPDATE cyb_category SET 
                name = ?, keyword = ?, image = ?, 
                meta_title = ?, meta_description = ?, meta_keyword = ?, 
                status = ?, modify_date = ?
            WHERE id = ?
        `;

        const values = [
            name,
            keyword,
            imageUrl,
            meta_title,
            meta_description,
            meta_keyword,
            JSON.parse(status),
            modify_date,
            id
        ];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("DB error:", error);
                return res.status(500).json({ status: false, message: "Database error." });
            }

            return res.status(200).json({
                status: true,
                message: "Category updated successfully.",
                data: result
            });
        });

    } catch (err) {
        console.error("Error:", err);
        return res.status(500).json({ status: false, message: "Internal server error." });
    }
});

exports.deleteCategoryByID = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    console.log("GGGG",id)
    pool.query('SELECT image FROM cyb_category WHERE id = ?', [id], (err, result) => {
        if (err) return res.status(500).json({ status: false, message: err.message });

        const oldImage = result[0]?.image;
        if (oldImage) {
            const imagePath = path.join(__dirname, '../../uploads/images', oldImage);
            if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
        }

        pool.query("DELETE FROM cyb_category WHERE id = ?", [id], (error, result) => {
            if (error) return res.status(500).json({ status: false, message: "Database error." });

            return res.status(200).json({ status: true, message: "Category deleted successfully." });
        });
    })
});

