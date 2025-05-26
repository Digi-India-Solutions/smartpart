const fs = require('fs');
const path = require('path');
const pool = require('../../db/pool'); // Your mysql pool instance
const catchAsyncErrors = require('../../middleware/catchAsyncErrors');

const uploadDir = path.join(__dirname, '../../uploads/images');

// Helper to delete files if exists
const deleteFileIfExists = (filename) => {
  if (!filename) return;
  const filePath = path.join(uploadDir, filename);
  if (fs.existsSync(filePath)) {
    fs.unlink(filePath, (err) => {
      if (err) console.error(`Failed to delete file ${filename}:`, err);
      else console.log(`Deleted file: ${filePath}`);
    });
  }
};

exports.createBlog = catchAsyncErrors(async (req, res) => {
  const {
    title,
    descri,
    description2,
    meta_title,
    meta_keyword,
    meta_description,
    status,
    featured,
  } = req.body;

  if (!title) {
    return res.status(400).json({ status: false, message: 'Title is required' });
  }

  const imageFile = req.file ? req.file.filename : null;
  const create_date = new Date();
  const modify_date = new Date();

  const sql = `
    INSERT INTO cyb_blogs
      (title, descri, description2, image, meta_title, meta_keyword, meta_description, status, featured, create_date, modify_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    descri || null,
    description2 || null,
    imageFile,
    meta_title || null,
    meta_keyword || null,
    meta_description || null,
    status === 'true' || status === true ? 1 : 0,
    featured === 'true' || featured === true ? 1 : 0,
    create_date,
    modify_date,
  ];

  pool.query(sql, values, (err, result) => {
    if (err) {
      if (imageFile) deleteFileIfExists(imageFile);
      console.error('Database error:', err);
      return res.status(500).json({ status: false, message: 'Database error', error: err.message });
    }
    return res.status(201).json({ status: true, message: 'Blog created successfully', id: result.insertId });
  });
});

// exports.getAllBlog = catchAsyncErrors(async (req, res) => {
//   const sql = 'SELECT * FROM cyb_blogs ORDER BY id DESC';

//   pool.query(sql, (err, results) => {
//     if (err) {
//       return res.status(500).json({ status: false, message: err.message });
//     }
//     return res.status(200).json({ status: true, data: results });
//   });
// });

exports.getAllBlog = catchAsyncErrors(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 6;
  const offset = (page - 1) * limit;

  const countSql = 'SELECT COUNT(*) AS total FROM cyb_blogs';
  const dataSql = 'SELECT * FROM cyb_blogs ORDER BY id DESC LIMIT ? OFFSET ?';

  pool.query(countSql, (countErr, countResult) => {
    if (countErr) {
      return res.status(500).json({ status: false, message: countErr.message });
    }

    const total = countResult[0].total;

    pool.query(dataSql, [limit, offset], (dataErr, results) => {
      if (dataErr) {
        return res.status(500).json({ status: false, message: dataErr.message });
      }

      return res.status(200).json({
        status: true,
        data: {
          blogs: results,
          total, // total number of blogs (used for calculating total pages)
          currentPage: page,
          totalPages: Math.ceil(total / limit),
        },
      });
    });
  });
});

exports.getAllBlogById = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  pool.query('SELECT * FROM cyb_blogs WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ status: false, message: err.message });
    }
    if (results.length === 0) {
      return res.status(404).json({ status: false, message: 'Blog not found' });
    }
    return res.status(200).json({ status: true, data: results[0] });
  });
});

exports.updateBlog = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    descri,
    description2,
    meta_title,
    meta_keyword,
    meta_description,
    status,
    featured,
  } = req.body;

  const newImageFile = req.file ? req.file.filename : null;
  const modify_date = new Date();

  // Get existing blog to delete old image if needed
  pool.query('SELECT image FROM cyb_blogs WHERE id = ?', [id], (err, results) => {
    if (err) {
      if (newImageFile) deleteFileIfExists(newImageFile);
      return res.status(500).json({ status: false, message: 'Database error' });
    }
    if (results.length === 0) {
      if (newImageFile) deleteFileIfExists(newImageFile);
      return res.status(404).json({ status: false, message: 'Blog not found' });
    }

    const oldImage = results[0].image;

    if (newImageFile && oldImage) {
      deleteFileIfExists(oldImage);
    }

    const sql = `
      UPDATE cyb_blogs SET
        title = ?,
        descri = ?,
        description2 = ?,
        image = COALESCE(?, image),
        meta_title = ?,
        meta_keyword = ?,
        meta_description = ?,
        status = ?,
        featured = ?,
        modify_date = ?
      WHERE id = ?
    `;

    const values = [
      title,
      descri || null,
      description2 || null,
      newImageFile,
      meta_title || null,
      meta_keyword || null,
      meta_description || null,
      status === 'true' || status === true ? 1 : 0,
      featured === 'true' || featured === true ? 1 : 0,
      modify_date,
      id,
    ];

    pool.query(sql, values, (updateErr) => {
      if (updateErr) {
        if (newImageFile) deleteFileIfExists(newImageFile);
        console.error('Update error:', updateErr);
        return res.status(500).json({ status: false, message: 'Failed to update blog' });
      }
      return res.status(200).json({ status: true, message: 'Blog updated successfully' });
    });
  });
});

exports.deleteBlog = catchAsyncErrors(async (req, res) => {
  const { id } = req.params;

  pool.query('SELECT image FROM cyb_blogs WHERE id = ?', [id], (err, results) => {
    if (err) {
      return res.status(500).json({ status: false, message: 'Database error' });
    }
    if (results.length === 0) {
      return res.status(404).json({ status: false, message: 'Blog not found' });
    }

    const { image } = results[0];
    deleteFileIfExists(image);

    pool.query('DELETE FROM cyb_blogs WHERE id = ?', [id], (deleteErr) => {
      if (deleteErr) {
        return res.status(500).json({ status: false, message: 'Failed to delete blog' });
      }
      return res.status(200).json({ status: true, message: 'Blog deleted successfully' });
    });
  });
});
