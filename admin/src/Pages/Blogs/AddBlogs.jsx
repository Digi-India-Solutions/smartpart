import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import JoditEditor from 'jodit-react';
import { addBlog } from '../../Slice/Blog/blogSlice';
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData } from '../../services/FetchNodeServices';
import 'react-toastify/dist/ReactToastify.css';

const AddBlogs = () => {
  const [formData, setFormData] = useState({
    title: '',
    link: '',
    category_id: '',
    brand_id: '',
    descri: '',
    note: '',
    description2: '',
    related: '',
    meta_title: '',
    meta_keyword: '',
    meta_description: '',
    status: true,
    featured: false,
    sort_order: 1,
  });

  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const loading = useSelector((state) => state.blog.loading);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    const res = await getData('category/get-all');
    if (res.status) setCategories(res.data);
  };

  const fetchBrands = async () => {
    const res = await getData('brand/get-all');
    if (res.status) setBrands(res.data);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ['title', 'descri', 'description2', 'meta_title',];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Field "${field}" is required`);
        return;
      }
    }

    if (!image) {
      toast.error("Image is required");
      return;
    }

    if (image.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const submitData = new FormData();
    Object.entries(formData).forEach(([key, value]) => submitData.append(key, value));
    submitData.append('image', image);
    submitData.append('create_date', new Date().toISOString());
    submitData.append('modify_date', new Date().toISOString());

    try {
      const res = await postData("blog/create-blog", submitData);
      if (res?.status) { 
        toast.success("Blog added successfully!");
        navigate('/all-blog');
      }
    } catch (error) {
      toast.error("Failed to add blog: " + error.message);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head"><h4>Add Blog</h4></div>
        <div className="links">
          <Link to="/all-blog" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Title *</label>
            <input type="text" name="title" className="form-control" value={formData.title} onChange={handleChange} required />
          </div>

          {/* <div className="mb-2">
            <label className="form-label">Link *</label>
            <input type="text" name="link" className="form-control" value={formData.link} onChange={handleChange} required />
          </div> */}

          {/* Select Category */}
          {/* <div className="mb-2">
            <label className="form-label">Category *</label>
            <select name="category_id" className="form-select" value={formData.category_id} onChange={handleChange} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div> */}

          {/* Select Brand */}
          {/* <div className="mb-2">
            <label className="form-label">Brand</label>
            <select name="brand_id" className="form-select" value={formData.brand_id} onChange={handleChange}>
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>{brand.name}</option>
              ))}
            </select>
          </div> */}

          {/* Rich Text Fields */}
          <div className="mb-2">
            <label className="form-label">Short Description *</label>
            <JoditEditor value={formData.descri} onChange={(v) => setFormData(prev => ({ ...prev, descri: v }))} />
          </div>

          {/* <div className="mb-2">
            <label className="form-label">Note *</label>
            <JoditEditor value={formData.note} onChange={(v) => setFormData(prev => ({ ...prev, note: v }))} />
          </div> */}

          <div className="mb-2">
            <label className="form-label">Full Description *</label>
            <JoditEditor value={formData.description2} onChange={(v) => setFormData(prev => ({ ...prev, description2: v }))} />
          </div>

          {/* Meta Fields */}
          <div className="mb-2">
            <label className="form-label">Meta Title *</label>
            <input type="text" name="meta_title" className="form-control" value={formData.meta_title} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label">Meta Keyword</label>
            <input type="text" name="meta_keyword" className="form-control" value={formData.meta_keyword} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label className="form-label">Meta Description</label>
            <input type="text" name="meta_description" className="form-control" value={formData.meta_description} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label className="form-label">Related</label>
            <input type="text" name="related" className="form-control" value={formData.related} onChange={handleChange} />
          </div>

          <div className="mb-2">
            <label className="form-label">Image *</label>
            <input type="file" name="image" className="form-control" onChange={handleImageChange} required />
          </div>

          {/* Checkboxes */}
          <div className="mb-2 d-flex gap-3">
            <div>
              <label>Status</label><br />
              <input type="checkbox" name="status" checked={formData.status} onChange={handleChange} />
            </div>
            <div>
              <label>Featured</label><br />
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label">Sort Order</label>
            <input type="number" name="sort_order" className="form-control" value={formData.sort_order} onChange={handleChange} />
          </div>

          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? 'Adding...' : 'Add Blog'}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddBlogs;
