const fs = require("fs");
const path = require("path");
const pool = require("../../db/pool");

// Create product
exports.createProduct = async (req, res) => {
    try {
        // console.log("file:-", req.file);
        console.log("BODY:-", req.body);

        const {
            name, brand, trending, category,
            product_description, meta_title,
            meta_description, meta_keyword, model,
            part_no, status, brand_category
        } = req.body;

        const image = req.file ? req.file.filename : null;


        console.log("FIELE:-", req.file);

        // Validate required fields
        if (!name || !brand || !image) {
            return res.status(400).json({
                success: false,
                message: "Required fields are missing (name, brand,   image)"
            });
        }

        const create_date = new Date();
        const modify_date = new Date();

        const sql = `
            INSERT INTO cyb_product 
            (
                name, trending, brand_category, product_description, 
                meta_title, meta_description, meta_keyword,
                model, part_no,  brand, image,category,
                 status, create_date, modify_date
            ) 
            VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            name,
            trending === "true" || trending === true ? 1 : 0,
            brand_category,
            product_description || "",
            meta_title || "",
            meta_description || "",
            meta_keyword || "",
            model || "",
            part_no || "",
            brand,
            image,
            category,
            status === "true" || status === true ? 1 : 0,
            create_date,
            modify_date
        ];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error", error });
            }
            return res.status(200).json({ status: true, message: "Product created successfully!", productId: result.insertId });
        });
    } catch (error) {
        console.error("Create product error:", error);
        return res.status(500).json({ success: false, message: "Server error", error });
    }
};

exports.getAllProduct = async (req, res) => {
    try {
        const search = req.query.search?.trim() || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;
        console.log("search:---", search);

        let searchSql = "";
        const searchParams = [];

        if (search) {
            searchSql = `
          WHERE 
            cyb_product.name LIKE ? OR
            cyb_product.part_no LIKE ? OR
            cyb_product.brand LIKE ? OR
            cyb_brands.id LIKE ? OR
            CAST(cyb_brands.brand_cat_id AS CHAR) LIKE ? OR
            CAST(cyb_product.brand AS CHAR) LIKE ?
        `;
            const likeSearch = `%${search}%`;
            searchParams.push(likeSearch, likeSearch, likeSearch, likeSearch, likeSearch, likeSearch);
        }

        // Count query with JOIN so we can filter by brand category or brand name
        const countQuery = `
        SELECT COUNT(*) AS total
        FROM cyb_product
        JOIN cyb_brands ON cyb_product.brand = cyb_brands.id
        ${searchSql}
      `;

        pool.query(countQuery, searchParams, (countErr, countResult) => {
            if (countErr) {
                console.error("Count error:", countErr);
                return res.status(500).json({ status: false, message: "Database count error" });
            }

            const total = countResult[0]?.total || 0;
            const totalPages = Math.ceil(total / limit);

            const dataQuery = `
          SELECT
            cyb_product.*,
            cyb_brands.name AS brand_name,
            cyb_brands.image AS brand_image
          FROM cyb_product
          JOIN cyb_brands ON cyb_product.brand = cyb_brands.id
          ${searchSql}
          ORDER BY cyb_product.id DESC
          LIMIT ? OFFSET ?
        `;

            pool.query(dataQuery, [...searchParams, limit, offset], (dataErr, results) => {
                if (dataErr) {
                    console.error("Data fetch error:", dataErr);
                    return res.status(500).json({ status: false, message: "Database data fetch error" });
                }

                return res.status(200).json({
                    status: true,
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                    data: results,
                });
            });
        });
    } catch (error) {
        console.error("Fetch all products error:", error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};


exports.getAllProductForFilter = async (req, res) => {
    try {
        const search = req.query.search?.trim() || "";
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const offset = (page - 1) * limit;

        const searchPattern = `%${search}%`;

        console.log("search:a---", search);

        // Count query (search across brand, part_no, name)


        pool.query(`SELECT COUNT(*) AS total FROM cyb_product WHERE brand = ${search} `, (countErr, countResult) => {
            if (countErr) {
                console.error("Count error:", countErr);
                return res.status(500).json({ status: false, message: "Database count error" });
            }

            const total = countResult[0]?.total || 0;
            const totalPages = Math.ceil(total / limit);

            // Data query with same filters

            pool.query(`SELECT * FROM cyb_product WHERE brand=${search} LIMIT ? OFFSET ?`, [limit, offset], (dataErr, dataResult) => {
                if (dataErr) {
                    console.error("Data fetch error:", dataErr);
                    return res.status(500).json({ status: false, message: "Database fetch error" });
                } else {
                    console.log("dataResult:-", dataResult)
                    return res.status(200).json({
                        status: true,
                        currentPage: page,
                        totalPages,
                        totalItems: total,
                        data: dataResult,
                    });
                }

            });
        });

    } catch (error) {
        console.error("Fetch all products error:", error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};
// Get product by ID
exports.getAllProductById = async (req, res) => {
    try {
        const q = `
  SELECT 
    cyb_product.*, 
    cyb_brands.name AS brand_name, 
    cyb_brands.image AS brand_image 
  FROM 
    cyb_product 
  JOIN 
    cyb_brands ON cyb_product.brand = cyb_brands.id 
  WHERE 
    cyb_product.id = ?
`;

        await pool.query(q, [req.params.id], (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error" });
            }
            if (results?.length === 0) {
                return res.status(404).json({ status: false, message: "Product not found" });
            }
            return res.status(200).json({ status: true, data: results[0] });
        });

    } catch (error) {
        console.error("Get product by ID error:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const {
            name, brand, trending, brand_category,
            product_description, meta_title,
            meta_description, meta_keyword,
            model, part_no, status, category
        } = req.body;

        const newImage = req.file ? req.file.filename : null;

        // Step 1: Get existing product
        pool.query("SELECT image FROM cyb_product WHERE id = ?", [id], (error, rows) => {
            if (error) {
                console.error("Database fetch error:", error);
                return res.status(500).json({ success: false, message: "Database error", error });
            }

            if (rows.length === 0) {
                return res.status(404).json({ success: false, message: "Product not found" });
            }

            const existingImage = rows[0].image;
            let imageToUse = existingImage;

            // Step 2: Delete old image if new one uploaded
            if (newImage) {
                const oldImagePath = path.join(__dirname, "../../uploads/images", existingImage);
                if (fs.existsSync(oldImagePath)) {
                    fs.unlinkSync(oldImagePath);
                }
                imageToUse = newImage;
            }

            // Step 3: Update product
            const sql = `
                UPDATE cyb_product SET
                    name = ?, trending = ?, brand_category = ?, product_description = ?,
                    meta_title = ?, meta_description = ?, meta_keyword = ?,
                    model = ?, part_no = ?, brand = ?, image = ?, category = ?,
                    status = ?, modify_date = NOW()
                WHERE id = ?
            `;

            const values = [
                name || "", trending === "true" || trending === true ? 1 : 0, brand_category || "", product_description || "", meta_title || "",
                meta_description || "", meta_keyword || "", model || "", part_no || "", brand || "",
                imageToUse, category || "", status === "true" || status === true ? 1 : 0, id
            ];

            pool.query(sql, values, (updateError, result) => {
                if (updateError) {
                    console.error("Update error:", updateError);
                    return res.status(500).json({ status: false, message: "Database error", error: updateError });
                }

                return res.status(200).json({ status: true, message: "Product updated successfully!" });
            });
        });
    } catch (error) {
        console.error("Update product error:", error);
        return res.status(500).json({ status: false, message: "Server error", error });
    }
};

// Delete product
exports.deleteProduct = async (req, res) => {
    const id = req.params.id;

    // Step 1: Get product image to delete file
    pool.query("SELECT image FROM cyb_product WHERE id = ?", [id], (error, rows) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ status: false, message: "Product not found" });
        }

        const imagePath = path.join(__dirname, "../../uploads/images", rows[0].image);

        // Delete image file if exists
        if (fs.existsSync(imagePath)) {
            try {
                fs.unlinkSync(imagePath);
            } catch (err) {
                console.error("Failed to delete image file:", err);
            }
        }

        // Step 2: Delete product record from database
        pool.query("DELETE FROM cyb_product WHERE id = ?", [id], (deleteError, deleteResult) => {
            if (deleteError) {
                console.error("Delete product error:", deleteError);
                return res.status(500).json({ status: false, message: "Server error" });
            }
            return res.status(200).json({ status: true, message: "Product deleted successfully!" });
        });
    });
};



exports.searchProduct = async (req, res) => {
    try {
        const search = req.query.search?.trim() || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const brand = req.query.brand || "";
        const brandCategory = req.query.brandCategory || "";
        const category = req.query.category || "";

        let filterSql = [];
        let filterParams = [];

        // Only search by brand name
        if (search) {
            filterSql.push(`cyb_brands.name LIKE ?`);
            filterParams.push(`%${search}%`);
        }

        // Brand filter (by brand ID)
        if (brand) {
            const brandIds = brand.split(',').map(id => parseInt(id));
            filterSql.push(`cyb_product.brand IN (${brandIds.map(() => '?').join(',')})`);
            filterParams.push(...brandIds);
        }

        // Brand Category filter
        if (brandCategory) {
            const catIds = brandCategory.split(',').map(id => parseInt(id));
            filterSql.push(`cyb_brands.brand_cat_id IN (${catIds.map(() => '?').join(',')})`);
            filterParams.push(...catIds);
        }

        // Product Category filter
        if (category) {
            const catIds = category.split(',').map(id => parseInt(id));
            filterSql.push(`cyb_product.category IN (${catIds.map(() => '?').join(',')})`);
            filterParams.push(...catIds);
        }

        const whereClause = filterSql.length ? `WHERE ${filterSql.join(" AND ")}` : "";

        // Count query
        const countQuery = `
            SELECT COUNT(*) AS total
            FROM cyb_product
            JOIN cyb_brands ON cyb_product.brand = cyb_brands.id
            ${whereClause}
        `;

        pool.query(countQuery, filterParams, (countErr, countResult) => {
            if (countErr) {
                console.error("Count error:", countErr);
                return res.status(500).json({ status: false, message: "Database count error" });
            }

            const total = countResult[0]?.total || 0;
            const totalPages = Math.ceil(total / limit);

            const dataQuery = `
                SELECT
                    cyb_product.*,
                    cyb_brands.name AS brand_name,
                    cyb_brands.image AS brand_image
                FROM cyb_product
                JOIN cyb_brands ON cyb_product.brand = cyb_brands.id
                ${whereClause}
                ORDER BY cyb_product.id DESC
                LIMIT ? OFFSET ?
            `;

            pool.query(dataQuery, [...filterParams, limit, offset], (dataErr, results) => {
                if (dataErr) {
                    console.error("Data fetch error:", dataErr);
                    return res.status(500).json({ status: false, message: "Database data fetch error" });
                }

                return res.status(200).json({
                    status: true,
                    currentPage: page,
                    totalPages,
                    totalItems: total,
                    data: results,
                });
            });
        });

    } catch (error) {
        console.error("Search product error:", error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};


exports.getAllProductWithoutPagination = async (req, res) => {
    try {
        // Promisify the pool.query using async/await
        pool.query('SELECT * FROM cyb_product', (err, results) => {
            if (err) {
                console.error("Database query error:", err);
                return res.status(500).json({ status: false, message: "Database data fetch error" });
            }
            return res.status(200).json({ status: true, message: "Products fetched successfully", data: results });
        });
    } catch (error) {
        console.error("Unexpected error:", error);
        return res.status(500).json({ status: false, message: "Server error" });
    }
};


exports.getAllFILTEREDProduct = async (req, res) => {
    try {
        const {
            search = '',
            page = 1,
            limit = 10,
            brandCategory = [],
            brand = [],
        } = req.query;

        const offset = (parseInt(page) - 1) * parseInt(limit);
        const searchPattern = `%${search}%`;

        let baseQuery = `SELECT * FROM cyb_product WHERE name LIKE ? OR part_no LIKE ? `;
        const queryParams = [searchPattern, searchPattern];

        pool.query(baseQuery, queryParams, (err, results) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ status: false, message: 'Database error' });
            }

            const total = results.length;
            const totalPages = Math.ceil(total / limit);
            const paginatedResults = results.slice(offset, offset + parseInt(limit));
            console.log("paginatedResults:-", paginatedResults)
            res.status(200).json({
                status: true,
                currentPage: parseInt(page),
                totalPages,
                totalItems: total,
                data: paginatedResults,
            });
        });

    } catch (error) {
        console.error('Unhandled error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};
