const pool = require("../../db/pool");
const catchAsyncErrors = require("../../middleware/catchAsyncErrors");
const { deleteLocalFile } = require("../../middleware/DeleteImageFromLoaclFolder");
const ErrorHandler = require("../../utils/ErrorHandler");
const fs = require('fs');
const path = require("path");
const ShortUniqueId = require("short-unique-id");



exports.createCategory = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, keywords, metaTagTitle, metaTagDescription, metaTagKeywords, status } = req.body;

        // Validate required fields
        // if (!categoryname || !keywords || !metaTagTitle || !metaTagDescription || !metaTagKeywords || typeof status === 'undefined'

        // ) {
        //     return res.status(400).json({ status: false, message: "All required fields must be filled.", });
        // }

        // Validate file uploads
        const imageFile = req.files?.image?.[0];
        const thumbnailFile = req.files?.thumbnail?.[0];

        if (!imageFile || !thumbnailFile) {
            return res.status(400).json({ status: false, message: "Both image and thumbnail are required.", });
        }

        const imagePath = imageFile.filename;
        const thumbnailPath = thumbnailFile.filename;

        const create_date = new Date();
        const modify_date = new Date();

        const sql = `
            INSERT INTO cyb_category 
            (name, keyword, image, thumbnail, meta_title, meta_description, meta_keyword, status, create_date, modify_date)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name, keywords, imagePath, thumbnailPath, metaTagTitle, metaTagDescription,
            metaTagKeywords, JSON.parse(status), create_date, modify_date
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
        existingImage,
        existingThumbnail
    } = req.body;

    const newImage = req.files?.image?.[0]?.filename || null;
    const newThumbnail = req.files?.thumbnail?.[0]?.filename || null;

    // Final image and thumbnail paths to save
    const imagePath = newImage || existingImage || null;
    const thumbnailPath = newThumbnail || existingThumbnail || null;

    // Validation
    // if (!name || !keyword || !meta_title || !meta_description || !meta_keyword || !imagePath || !thumbnailPath) {
    //     return res.status(400).json({
    //         status: false,
    //         message: "All required fields must be filled including image and thumbnail.",
    //     });
    // }

    try {
        // Fetch old data to delete old image/thumbnail if needed
        const [oldCategory] = await new Promise((resolve, reject) => {
            pool.query(`SELECT image, thumbnail FROM cyb_category WHERE id = ?`, [id], (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });

        const oldImage = oldCategory?.image;
        const oldThumbnail = oldCategory?.thumbnail;

        // Delete old image if replaced
        if (newImage && oldImage && oldImage !== newImage) {
            const oldImagePath = path.join(__dirname, "../../uploads/images", oldImage);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log("Old image deleted:", oldImagePath);
            }
        }

        // Delete old thumbnail if replaced
        if (newThumbnail && oldThumbnail && oldThumbnail !== newThumbnail) {
            const oldThumbPath = path.join(__dirname, "../../uploads/images", oldThumbnail);
            if (fs.existsSync(oldThumbPath)) {
                fs.unlinkSync(oldThumbPath);
                console.log("Old thumbnail deleted:", oldThumbPath);
            }
        }

        const modify_date = new Date();

        const sql = `
            UPDATE cyb_category SET 
                name = ?, keyword = ?, image = ?, thumbnail = ?,
                meta_title = ?, meta_description = ?, meta_keyword = ?, 
                status = ?, modify_date = ?
            WHERE id = ?
        `;

        const values = [
            name,
            keyword,
            imagePath,
            thumbnailPath,
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

exports.deleteCategoryByID = catchAsyncErrors((req, res, next) => {
    const id = req.params.id;

    // Step 1: Get image and thumbnail file names for the category
    pool.query('SELECT image, thumbnail FROM cyb_category WHERE id = ?', [id], (err, rows) => {
        if (err) {
            console.error('DB error fetching category:', err);
            return res.status(500).json({ status: false, message: 'Database error.' });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: 'Category not found.' });
        }

        const { image, thumbnail } = rows[0];

        // Delete image file if exists
        if (image) {
            const imagePath = path.join(__dirname, '../../uploads/images', image);
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (fsErr) {
                    console.error('Error deleting image file:', fsErr);
                    // Proceed anyway, do not fail API because of file deletion error
                }
            }
        }

        // Delete thumbnail file if exists
        if (thumbnail) {
            const thumbPath = path.join(__dirname, '../../uploads/images', thumbnail);
            if (fs.existsSync(thumbPath)) {
                try {
                    fs.unlinkSync(thumbPath);
                } catch (fsErr) {
                    console.error('Error deleting thumbnail file:', fsErr);
                }
            }
        }

        // Step 2: Delete the category from DB
        pool.query('DELETE FROM cyb_category WHERE id = ?', [id], (deleteErr, result) => {
            if (deleteErr) {
                console.error('DB error deleting category:', deleteErr);
                return res.status(500).json({ status: false, message: 'Database error.' });
            }

            if (result.affectedRows === 0) {
                return res.status(400).json({ status: false, message: 'Failed to delete category.' });
            }

            return res.status(200).json({ status: true, message: 'Category deleted successfully.' });
        });
    });
});
