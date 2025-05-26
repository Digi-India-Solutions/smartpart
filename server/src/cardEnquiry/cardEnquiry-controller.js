const pool = require("../../db/pool");

// Create product
exports.createEnquiry = async (req, res) => {
    try {
        console.log("BODY:-", req.body);

        const {
            name,
            email,
            phone,
            message,
            totalPrice,
            productId,  // this is the actual key in your request
            userId,
        } = req.body;
        // console.log("Missing required fields: name, email, phone, or productId", req.body);
        const create_date = new Date();

        // if (!email || !phone || !name || !productId) {
        //     console.log("Missing required fields: name, email, phone, or productId");
        //     return res.status(400).json({ status: false, message: "Missing required fields: name, email, phone, or productId", });
        // }

        const sql = `
        INSERT INTO cyb_card_enquiry 
        (name, email, phone, message, totalPrice, product, userId, create_date) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

        const values = [name, email, phone, message || "", totalPrice || 0, JSON.stringify(productId), userId || null, create_date,];

        pool.query(sql, values, (error, result) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error", error, });
            }
            return res.status(200).json({ status: true, message: "Enquiry created successfully!", data: result.insertId, });
        });
    } catch (error) {
        console.error("Create Enquiry error:", error);
        return res.status(500).json({ status: false, message: "Server error", error, });
    }
};

exports.getAllEnquiry = async (req, res) => {
    try {
        const sql = `SELECT * FROM cyb_card_enquiry ORDER BY create_date DESC`;
        console.log("SQL:-");
        pool.query(sql, (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error", error });
            }
            return res.status(200).json({ status: true, message: "Enquiries fetched successfully", data: results });
        });
    } catch (error) {
        console.error("Get All Enquiries error:", error);
        return res.status(500).json({ status: false, message: "Server error", error });
    }
};


// Get Enquiry by ID
exports.getAllEnquiryById = async (req, res) => {
    const id = req.params.id;

    try {
        const sql = `SELECT * FROM cyb_card_enquiry WHERE id = ?`;

        pool.query(sql, [id], (error, results) => {
            if (error) {
                console.error("Database error:", error);
                return res.status(500).json({ status: false, message: "Database error", error });
            }

            if (results.length === 0) {
                return res.status(404).json({ status: false, message: "Enquiry not found" });
            }

            return res.status(200).json({ status: true, message: "Enquiry fetched successfully", data: results[0] });
        });
    } catch (error) {
        console.error("Get Enquiry By ID error:", error);
        return res.status(500).json({ status: false, message: "Server error", error });
    }
};



exports.updateEnquiry = (req, res) => {
    const id = req.params.id;
    const { name, phone, subject, email, message, city, status } = req.body;

    const sql = `
        UPDATE cyb_card_enquiry 
        SET name = ?, phone = ?, subject = ?, email = ?, message = ?, city = ?, status = ?
        WHERE id = ?
    `;

    const values = [
        name || null,
        phone || null,
        subject || null,
        email || null,
        message || null,
        city || null,
        status === "true" || status === true ? 1 : 0,
        id
    ];

    pool.query(sql, values, (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Enquiry not found" });
        }

        return res.status(200).json({ status: true, message: "Enquiry updated successfully" });
    });
};


exports.deleteEnquiry = (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM cyb_card_enquiry WHERE id = ?`;

    pool.query(sql, [id], (error, result) => {
        if (error) {
            console.error("Database error:", error);
            return res.status(500).json({ status: false, message: "Database error", error });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ status: false, message: "Enquiry not found" });
        }

        return res.status(200).json({ status: true, message: "Enquiry deleted successfully" });
    });
};

