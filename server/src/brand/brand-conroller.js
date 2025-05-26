const catchAsyncErrors = require('../../middleware/catchAsyncErrors');
const fs = require('fs');
const path = require('path');
const pool = require('../../db/pool');
// const { error } = require('../../uploads/images');

// exports.createBrand = catchAsyncErrors(async (req, res) => {
//     try {
//         const {
//             brand_cat_id, name, seo_url, meta_title, meta_description,
//             meta_keyword, top_title, top_des, b_des, status
//         } = req.body;

//         if (!name) {
//             return res.status(400).json({ status: false, message: 'Brand name is required' });
//         }

//         const image = req.file || null;
//         const imagePath = image ? image.filename : null;

//         const banner = req.file || null;
//         const bannerPath = banner ? banner.filename : null;

//         const sql = `
//             INSERT INTO cyb_brands (
//                 brand_cat_id, name, image, seo_url, meta_title,banner,
//                 meta_description, meta_keyword, top_title, top_des, b_des, status
//             )
//             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
//         `;

//         const values = [
//             JSON.parse(brand_cat_id) || null,
//             name,
//             imagePath,
//             bannerPath,
//             seo_url || null,
//             meta_title || null,
//             meta_description || null,
//             meta_keyword || null,
//             top_title || null,
//             top_des || null,
//             b_des || null,
//             status ? 1 : 0
//         ];

//         await pool.query(sql, values, (error, results) => {
//             if (error) {
//                 console.log("error", error)
//                 return res.status(401).json({ status: false, message: error.sqlMessage });
//             } else {
//                 return res.status(201).json({ status: true, message: 'Brand created successfully' });
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ status: false, message: 'Server Error', error: error.message });
//     }
// });

exports.createBrand = catchAsyncErrors(async (req, res) => {
    try {
        const {
            brand_cat_id, name, seo_url, meta_title, meta_description,
            meta_keyword, top_title, top_des, b_des, status,cat_id,
        } = req.body;

        // Validation
        if (!name || !brand_cat_id) {
            return res.status(400).json({ status: false, message: 'Brand name and category are required' });
        }

        // File handling
        const image = req.files?.image?.[0] || null;
        const banner = req.files?.banner?.[0] || null;

        const imagePath = image ? image.filename : null;
        const bannerPath = banner ? banner.filename : null;

        const sql = `
            INSERT INTO cyb_brands (
                brand_cat_id,cat_id, name, image, banner, seo_url, meta_title,
                meta_description, meta_keyword, top_title, top_des, b_des, status
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
        `;

        const values = [
            brand_cat_id,
            name,
            imagePath,
            bannerPath,
            cat_id,
            seo_url || null,
            meta_title || null,
            meta_description || null,
            meta_keyword || null,
            top_title || null,
            top_des || null,
            b_des || null,
            status === 'true' || status === true ? 1 : 0
        ];

        pool.query(sql, values, (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: error.sqlMessage });
            }
            return res.status(201).json({ status: true, message: 'Brand created successfully' });
        });

    } catch (error) {
        console.error("Server error:", error);
        res.status(500).json({ status: false, message: 'Internal Server Error', error: error.message });
    }
});

exports.getAllBrand = catchAsyncErrors(async (req, res) => {
    const sql = `
        SELECT 
            b.*, 
            bc.name AS brand_category_name
        FROM cyb_brands b
        LEFT JOIN cyb_brand_category bc ON b.brand_cat_id = bc.id
        ORDER BY b.id DESC
    `;

    pool.query(sql, (error, results) => {
        if (error) {
            return res.status(500).json({ status: false, message: error.message });
        } else {
            res.status(200).json({ status: true, data: results });
        }
    });
});

exports.getAllBrandById = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    pool.query('SELECT * FROM cyb_brands WHERE id = ?', [id], (error, results) => {
        if (error) {
            console.log("ERROR:-", results)
            return res.status(500).json({ status: false, message: error.message });
        }
        if (results.length === 0) {
            console.log("RESULTS:-", results)
            return res.status(404).json({ status: false, message: 'Brand not found' });
        }
        console.log("RESULTS:-", results)
        return res.status(200).json({ status: true, data: results[0] });
    })
})

exports.updateBrand = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;
    const {
        brand_cat_id, cat_id, name, seo_url, meta_title,
        meta_description, meta_keyword, top_title,
        top_des, b_des, status
    } = req.body;

    const newImage = req.files?.image?.[0]?.filename || null;
    const newBanner = req.files?.banner?.[0]?.filename || null;

    // Step 1: Get existing brand to delete old image/banner if needed
    pool.query('SELECT image, banner FROM cyb_brands WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ status: false, message: 'Internal server error' });
        }

        if (!results.length) {
            return res.status(404).json({ status: false, message: 'Brand not found' });
        }

        const existing = results[0];

        // Step 2: Delete old image if a new image was uploaded
        if (newImage && existing.image) {
            const oldImagePath = path.join(__dirname, '../../uploads/images', existing.image);
            if (fs.existsSync(oldImagePath)) {
                fs.unlinkSync(oldImagePath);
                console.log('Deleted old image:', oldImagePath);
            }
        }

        // Step 3: Delete old banner if a new banner was uploaded
        if (newBanner && existing.banner) {
            const oldBannerPath = path.join(__dirname, '../../uploads/images', existing.banner);
            if (fs.existsSync(oldBannerPath)) {
                fs.unlinkSync(oldBannerPath);
                console.log('Deleted old banner:', oldBannerPath);
            }
        }

        // Step 4: Update brand with new values
        const sql = `
            UPDATE cyb_brands SET
                brand_cat_id = ?,
                cat_id = ?,
                name = ?,
                image = COALESCE(?, image),
                banner = COALESCE(?, banner),
                seo_url = ?,
                meta_title = ?,
                meta_description = ?,
                meta_keyword = ?,
                top_title = ?,
                top_des = ?,
                b_des = ?,
                status = ?
            WHERE id = ?
        `;

        const values = [
            brand_cat_id || null,
            cat_id || null,
            name,
            newImage,
            newBanner,
            seo_url || null,
            meta_title || null,
            meta_description || null,
            meta_keyword || null,
            top_title || null,
            top_des || null,
            b_des || null,
            status === "true" || status === true ? 1 : 0,
            id
        ];

        pool.query(sql, values, (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Update error:', updateErr);
                return res.status(500).json({ status: false, message: 'Failed to update brand' });
            }

            return res.status(200).json({ status: true, message: 'Brand updated successfully' });
        });
    });
});

// exports.deleteBrand = catchAsyncErrors(async (req, res) => {

//     const { id } = req.params;

//     pool.query('SELECT image FROM cyb_brands WHERE id = ?', [id], (err, result) => {
//         if (err) return res.status(500).json({ status: false, message: err.message });

//         const oldImage = result[0]?.image;
//         if (oldImage) {
//             const imagePath = path.join(__dirname, '../../uploads/images', oldImage);
//             if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
//         }

//         pool.query('DELETE FROM cyb_brands WHERE id = ?', [id], (error, results) => {
//             if (error) return res.status(500).json({ status: false, message: error.message });

//             res.status(200).json({ status: true, message: 'Brand deleted successfully' });
//         });
//     });
// });

exports.deleteBrand = catchAsyncErrors(async (req, res) => {
    const { id } = req.params;

    // Step 1: Get brand info to delete associated files
    pool.query('SELECT image, banner FROM cyb_brands WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error('DB Error (fetch brand):', err);
            return res.status(500).json({ status: false, message: 'Database error' });
        }

        if (!result.length) {
            return res.status(404).json({ status: false, message: 'Brand not found' });
        }

        const { image, banner } = result[0];

        // Step 2: Delete image and banner files if they exist
        const deleteFileIfExists = (filename) => {
            if (filename) {
                const filePath = path.join(__dirname, '../../uploads/images', filename);
                if (fs.existsSync(filePath)) {
                    fs.unlink(filePath, (unlinkErr) => {
                        if (unlinkErr) {
                            console.error(`Failed to delete file (${filename}):`, unlinkErr);
                        } else {
                            console.log(`Deleted file: ${filePath}`);
                        }
                    });
                }
            }
        };

        deleteFileIfExists(image);
        deleteFileIfExists(banner);

        // Step 3: Delete brand from DB
        pool.query('DELETE FROM cyb_brands WHERE id = ?', [id], (deleteErr, deleteResult) => {
            if (deleteErr) {
                console.error('DB Error (delete brand):', deleteErr);
                return res.status(500).json({ status: false, message: 'Failed to delete brand' });
            }

            return res.status(200).json({ status: true, message: 'Brand deleted successfully' });
        });
    });
});