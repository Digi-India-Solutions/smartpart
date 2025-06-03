import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../Slice/Category/categorySlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCategory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.category);

  const [data, setData] = useState({
    categoryname: "",
    metaTagTitle: "",
    metaTagDescription: "",
    metaTagKeywords: "",
    keywords: "",
    image: null,
    thumbnail: null,
  });

  const [active, setActive] = useState(false); // checkbox for status

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length) {
      setData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const validateImage = (file, name) => {
    if (!file) {
      toast.error(`Please select a ${name}`);
      return false;
    }
    if (file.size > 2 * 1024 * 1024) {
      toast.error(`${name} size should be less than 2MB`);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateImage(data.image, "Category Banner Image")) return;
    if (!validateImage(data.thumbnail, "Category Thumbnail Image")) return;

    const formData = new FormData();
    formData.append("name", data.categoryname);
    formData.append("meta_title", data.metaTagTitle);
    formData.append("meta_description", data.metaTagDescription);
    formData.append("meta_keyword", data.metaTagKeywords);
    formData.append("keyword", data.keywords);
    formData.append("image", data.image);
    formData.append("thumbnail", data.thumbnail);
    formData.append("status", active);

    try {
      await dispatch(addCategory(formData)).unwrap();
      toast.success("Category added successfully!");
      navigate("/all-category");
    } catch (error) {
      toast.error(`Failed to add category: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Category</h4>
        </div>
        <div className="links">
          <Link to="/all-category" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">

            <div className="col-md-6 mt-2">
              <label htmlFor="categoryname" className="form-label">
                Category Name <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="categoryname"
                name="categoryname"
                className="form-control"
                value={data.categoryname}
                onChange={handleInputChange}
                placeholder="Category Name"
                required
              />
            </div>

            <div className="col-md-6 mt-2">
              <label htmlFor="metaTagTitle" className="form-label">
                Meta Tag Title <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="metaTagTitle"
                name="metaTagTitle"
                className="form-control"
                value={data.metaTagTitle}
                onChange={handleInputChange}
                placeholder="Meta Tag Title"
                required
              />
            </div>

            <div className="col-md-12 mt-2">
              <label htmlFor="metaTagDescription" className="form-label">
                Meta Tag Description <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="metaTagDescription"
                name="metaTagDescription"
                className="form-control"
                value={data.metaTagDescription}
                onChange={handleInputChange}
                placeholder="Meta Tag Description"
                required
              />
            </div>

            <div className="col-md-6 mt-2">
              <label htmlFor="metaTagKeywords" className="form-label">
                Meta Tag Keywords <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="metaTagKeywords"
                name="metaTagKeywords"
                className="form-control"
                value={data.metaTagKeywords}
                onChange={handleInputChange}
                placeholder="Meta Tag Keywords"
                required
              />
            </div>

            <div className="col-md-6 mt-2">
              <label htmlFor="keywords" className="form-label">
                Keywords <sup className="text-danger">*</sup>
              </label>
              <input
                type="text"
                id="keywords"
                name="keywords"
                className="form-control"
                value={data.keywords}
                onChange={handleInputChange}
                placeholder="Keywords"
                required
              />
            </div>

            <div className="col-md-6 mt-2">
              <label htmlFor="image" className="form-label">
                Category Banner Image <sup className="text-danger">*</sup>
              </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="col-md-6 mt-2">
              <label htmlFor="thumbnail" className="form-label">
                Category Thumbnail Image <sup className="text-danger">*</sup>
              </label>
              <input
                type="file"
                id="thumbnail"
                name="thumbnail"
                className="form-control"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="col-md-6 d-flex align-items-center mt-3">
              <input
                type="checkbox"
                id="active"
                checked={active}
                onChange={(e) => setActive(e.target.checked)}
                style={{ width: "18px", height: "18px", marginRight: "8px" }}
              />
              <label htmlFor="active" className="form-label mb-0">Active</label>
            </div>
          </div>

          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? "Adding..." : "Add Category"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
