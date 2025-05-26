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
  });

  const [active, setActive] = useState(false); // for setting status

  const getInputData = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const getFileData = (e) => {
    const { name, files } = e.target;
    setData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const postData = (e) => {
    e.preventDefault();

    const { image } = data;
    if (!image) {
      toast.error("Please select an image");
      return;
    }
    if (image.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.categoryname);
    formData.append("meta_title", data.metaTagTitle);
    formData.append("meta_description", data.metaTagDescription);
    formData.append("meta_keyword", data.metaTagKeywords);
    formData.append("keyword", data.keywords);
    formData.append("image", data.image);
    formData.append("status", active);

    dispatch(addCategory(formData))
      .unwrap()
      .then((res) => {
        toast.success("Category added successfully");
        navigate("/all-category");
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      });
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
        <form onSubmit={postData}>
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="categoryname" className="form-label">
                Category Name <sup className="text-danger">*</sup>
              </label>
              <input type="text" name="categoryname" id="categoryname" className="form-control" value={data.categoryname} onChange={getInputData} placeholder="Category Name" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="metaTagTitle" className="form-label">
                Meta Tag Title <sup className="text-danger">*</sup>
              </label>
              <input type="text" name="metaTagTitle" id="metaTagTitle" className="form-control" value={data.metaTagTitle} onChange={getInputData} placeholder="Meta Tag Title" required />
            </div>

            <div className="mb-2">
              <label htmlFor="metaTagDescription" className="form-label">
                Meta Tag Description <sup className="text-danger">*</sup>
              </label>
              <input type="text" name="metaTagDescription" id="metaTagDescription" className="form-control" value={data.metaTagDescription} onChange={getInputData} placeholder="Meta Tag Description" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="metaTagKeywords" className="form-label">
                Meta Tag Keywords <sup className="text-danger">*</sup>
              </label>
              <input type="text" name="metaTagKeywords" id="metaTagKeywords" className="form-control" value={data.metaTagKeywords} onChange={getInputData} placeholder="Meta Tag Keywords" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="keywords" className="form-label">
                Keywords <sup className="text-danger">*</sup>
              </label>
              <input type="text" name="keywords" id="keywords" className="form-control" value={data.keywords} onChange={getInputData} placeholder="Keywords" required />
            </div>

            <div className="col-md-6">
              <label htmlFor="image" className="form-label">
                Category Image <sup className="text-danger">*</sup>
              </label>
              <input type="file" name="image" id="image" className="form-control" onChange={getFileData} accept="image/*" required />
            </div>

            <div style={{ marginTop: 20, marginBottom: 20, display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: "500", color: "#333", }} className="col-md-6">
              <input type="checkbox" name="active" id="active" checked={active} onChange={(e) => setActive(e.target.checked)} style={{ width: "16px", height: "16px" }} />
              <label htmlFor="active">Active</label>
            </div>
          </div>

          <button type="submit" className="mybtnself" disabled={loading}>
            {loading ? "Loading..." : "Add Category"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCategory;
