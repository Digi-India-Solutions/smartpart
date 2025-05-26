import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { getData, postData, serverURL } from "../../services/FetchNodeServices";


const EditBlogs = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    link: "",
    category_id: "",
    brand_id: "",
    descri: "",
    note: "",
    description2: "",
    related: "",
    meta_title: "",
    meta_keyword: "",
    meta_description: "",
    status: true,
    featured: false,
    sort_order: 1,
  });
  const [image, setImage] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);

  // Fetch blog data by id and populate form
  const fetchBlogById = async () => {
    try {
      setLoading(true);
      const res = await getData(`blog/get-all-blog-by-id/${id}`);
      console.log("DATA:-", res);
      if (res.status) {
        const blog = res.data;
        setFormData({
          title: blog.title || "",
          link: blog.link || "",
          category_id: blog.category_id || "",
          brand_id: blog.brand_id || "",
          descri: blog.descri || "",
          note: blog.note || "",
          description2: blog.description2 || "",
          related: blog.related || "",
          meta_title: blog.meta_title || "",
          meta_keyword: blog.meta_keyword || "",
          meta_description: blog.meta_description || "",
          status: blog.status ?? true,
          featured: blog.featured ?? false,
          sort_order: blog.sort_order || 1,
          // image: blog.image || "",
        });
        setExistingImageUrl(`${serverURL}/uploads/images/${blog?.image}` || `${serverURL}/${blog?.image}`);
      } else {
        toast.error("Failed to fetch blog details");
      }
    } catch (error) {
      toast.error("Error fetching blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  // const fetchCategories = async () => {
  //   try {
  //     const res = await getData("category/get-all");
  //     if (res.status) setCategories(res.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch categories");
  //   }
  // };

  // const fetchBrands = async () => {
  //   try {
  //     const res = await getData("brand/get-all");
  //     if (res.status) setBrands(res.data);
  //   } catch (error) {
  //     toast.error("Failed to fetch brands");
  //   }
  // };

  useEffect(() => {
    fetchBlogById();
  }, [id]);

  // useEffect(() => {
  //   fetchCategories();
  //   fetchBrands();
  // }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }
      setImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const requiredFields = ["title", "descri", "description2", "meta_title"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        toast.error(`Field "${field}" is required`);
        return;
      }
    }

    // Image is required only if no existing image and no new one selected
    if (!existingImageUrl && !image) {
      toast.error("Image is required");
      return;
    }

    setLoading(true);

    try {
      const submitData = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        submitData.append(key, value);
      });

      if (image) {
        submitData.append("image", image);
      }
      submitData.append("modify_date", new Date().toISOString());

      // Use PUT or PATCH for update
      const res = await postData(`blog/update-blog/${id}`, submitData);

      if (res?.status) {
        toast.success("Blog updated successfully!");
        navigate("/all-blog");
      } else {
        toast.error(res.message || "Failed to update blog");
      }
    } catch (error) {
      toast.error("Failed to update blog: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Blog</h4>
        </div>
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
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          {/* <div className="mb-2">
            <label className="form-label">Link</label>
            <input
              type="text"
              name="link"
              className="form-control"
              value={formData.link}
              onChange={handleChange}
              disabled={loading}
            />
          </div> */}

          {/* Select Category */}
          {/* <div className="mb-2">
            <label className="form-label">Category</label>
            <select
              name="category_id"
              className="form-select"
              value={formData.category_id}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

         
          <div className="mb-2">
            <label className="form-label">Brand</label>
            <select
              name="brand_id"
              className="form-select"
              value={formData.brand_id}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="">Select Brand</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div> */}

          {/* Rich Text Fields */}
          <div className="mb-2">
            <label className="form-label">Short Description *</label>
            <JoditEditor
              ref={editorRef}
              value={formData.descri}
              onChange={(v) => setFormData((prev) => ({ ...prev, descri: v }))}
              disabled={loading}
            />
          </div>

          {/* <div className="mb-2">
            <label className="form-label">Note</label>
            <JoditEditor
              value={formData.note}
              onChange={(v) => setFormData((prev) => ({ ...prev, note: v }))}
              disabled={loading}
            />
          </div> */}

          <div className="mb-2">
            <label className="form-label">Full Description *</label>
            <JoditEditor
              value={formData.description2}
              onChange={(v) => setFormData((prev) => ({ ...prev, description2: v }))}
              disabled={loading}
            />
          </div>

          {/* Meta Fields */}
          <div className="mb-2">
            <label className="form-label">Meta Title *</label>
            <input
              type="text"
              name="meta_title"
              className="form-control"
              value={formData.meta_title}
              onChange={handleChange}
              required
              disabled={loading}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Meta Keyword</label>
            <input
              type="text"
              name="meta_keyword"
              className="form-control"
              value={formData.meta_keyword}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          <div className="mb-2">
            <label className="form-label">Meta Description</label>
            <input
              type="text"
              name="meta_description"
              className="form-control"
              value={formData.meta_description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>

          {/* <div className="mb-2">
            <label className="form-label">Related</label>
            <input
              type="text"
              name="related"
              className="form-control"
              value={formData.related}
              onChange={handleChange}
              disabled={loading}
            />
          </div> */}

          <div className="mb-2">
            <label className="form-label">Image {existingImageUrl ? "(Current Image Below)" : "*"} </label>
            <input
              type="file"
              name="image"
              className="form-control"
              onChange={handleImageChange}
              disabled={loading}
              accept="image/*"
            />
            {existingImageUrl && !image && (
              <div style={{ marginTop: "10px" }}>
                <img
                  src={existingImageUrl}
                  alt="Current Blog"
                  style={{ maxWidth: "200px", maxHeight: "150px", objectFit: "contain" }}
                />
              </div>
            )}
          </div>

          {/* Checkboxes */}
          <div className="mb-2 d-flex gap-3">
            <div>
              <label>Status</label>
              <br />
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
            <div>
              <label>Featured</label>
              <br />
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          {/* <div className="mb-2">
            <label className="form-label">Sort Order</label>
            <input
              type="number"
              name="sort_order"
              className="form-control"
              value={formData.sort_order}
              onChange={handleChange}
              disabled={loading}
            />
          </div> */}

          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? "Updating..." : "Update Blog"}
          </button>
        </form>
      </div>
    </>
  );
};

export default EditBlogs;
