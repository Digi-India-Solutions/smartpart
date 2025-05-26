import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import JoditEditor from "jodit-react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getData, postData } from "../../services/FetchNodeServices";

const fieldConfig = [
  { name: "name", label: "Product Name", type: "text", required: true },
  { name: "model", label: "Model", type: "text" },
  { name: "part_no", label: "Part No", type: "text" },
  { name: "warranty", label: "Warranty", type: "text" },
  { name: "price", label: "Price", type: "number" },
  { name: "special_price", label: "Special Price", type: "number" },
  { name: "image", label: "Image", type: "file" },
  { name: "product_description", label: "Product Description", type: "editor" },
  { name: "meta_title", label: "Meta Title", type: "text" },
  { name: "meta_description", label: "Meta Description", type: "textarea" },
  { name: "meta_keyword", label: "Meta Keyword", type: "text" },
  { name: "status", label: "Status", type: "checkbox" },
  { name: "trending", label: "Trending", type: "checkbox" },

];

const AddProduct = () => {
  const navigate = useNavigate();
  const editor = useRef(null);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brandFilter, setBrandFilter] = useState([]);

  const [data, setData] = useState({
    name: "", category: "", brand: "", trending: false, warranty: "", product_description: "", meta_title: "",
    meta_description: "", meta_keyword: "", model: "", part_no: "", price: "", special_price: "", status: false,
    image: null,
  });

  useEffect(() => {
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await getData("category/get-all-categorys");
      setCategoryList(res.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await getData("brand/get-all-brand");
      setBrandList(res.data);
    } catch (err) {
      console.error("Error fetching brands:", err);
    }
  };

  useEffect(() => {
    // Filter categories based on selected brand
    if (data.category) {
      const filtered = brandList.filter(cat => cat?.cat_id == data?.category);
      setBrandFilter(filtered);
    } else {
      setBrandFilter([]);
    }
  }, [data.category, brandList]);
  // console.log("DDDDDDD:--", data.brand);
  // console.log("DDDDDDD:--", data.brand);
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === "checkbox" ? checked : type === "file" ? files[0] : value;

    setData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleEditorChange = (content) => {
    setData((prev) => ({ ...prev, product_description: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.image && data.image.size > 2 * 1024 * 1024) {
      toast.error("File size should be less than 2MB");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if (data.image) formData.append('image', data.image.file);

    try {
      setLoading(true);
      const res = await postData("product/create-product", formData);
      console.log("DATA:-", res);
      if (res.status === true) {
        toast.success("Product created successfully!");
        navigate("/all-products");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log("DATADATA:-", data);
  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Add Product</h4>
        </div>
        <div className="links">
          <Link to="/all-products" className="add-new">
            Back <i className="fa-regular fa-circle-left"></i>
          </Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">
            {/* Category Dropdown */}
            <div className="col-md-4 mb-3">
              <label>Category <sup className="text-danger">*</sup></label>
              <select name="category" className="form-control" value={data.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categoryList.map((cat) => (
                  <option key={cat._id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="col-md-4 mb-3">
              <label>Brand <sup className="text-danger">*</sup></label>
              <select name="brand" className="form-control" value={data.brand} onChange={handleChange} required>
                <option value="">Select Brand</option>
                {brandFilter?.map((brand) => (
                  <option key={brand?._id} value={brand?.id}>
                    {brand?.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Other fields */}
            {fieldConfig?.map((field) => {
              if (field?.name === "category" || field.name === "brand") return null;

              return (
                <div className={field.type === "editor" ? `col-md-12 mb-12` : `col-md-4 mb-3`} key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}{" "}
                    {field.required && <sup className="text-danger">*</sup>}
                  </label>
                  {field.type === "textarea" ? (

                    <textarea className="form-control" name={field.name} value={data[field.name] || ""} onChange={handleChange} required={field.required} />

                  ) : field.type === "checkbox" ? (

                    <input type="checkbox" className="form-check-input" name={field.name} checked={data[field.name] || false} onChange={handleChange} />

                  ) : field.type === "editor" ? (

                    <JoditEditor ref={editor} value={data[field.name] || ""} onChange={handleEditorChange} />

                  ) : field.type === "file" ? (

                    <input type="file" name={field.name} onChange={handleChange} className="form-control" />

                  ) : (

                    <input type={field.type} className="form-control" name={field.name} value={data[field.name] || ""} onChange={handleChange} required={field.required} />

                  )}
                </div>
              );
            })}
          </div>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <div style={{ width: "30%" }}>
              <button type="submit" className="mybtnself mt-4" style={{ marginBottom: 100, }}>
                {loading ? "Please wait..." : "Add New Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
