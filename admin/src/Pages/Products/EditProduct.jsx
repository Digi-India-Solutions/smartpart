import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import JoditEditor from "jodit-react";
import { getData, postData } from "../../services/FetchNodeServices";

const fieldConfig = [
  { name: "name", label: "Product Name", type: "text", required: true },
  { name: "warranty", label: "Warranty", type: "text", required: false },
  { name: "model", label: "Model", type: "text", required: false },
  { name: "part_no", label: "Part No", type: "text", required: false },
  { name: "price", label: "Price", type: "number", required: true },
  { name: "special_price", label: "Special Price", type: "number", required: false },
  { name: "status", label: "Active", type: "checkbox", required: false },
  { name: "trending", label: "Trending", type: "checkbox", required: false },
  { name: "product_description", label: "Description", type: "editor", required: true },
  { name: "meta_title", label: "Meta Title", type: "text", required: false },
  { name: "meta_description", label: "Meta Description", type: "textarea", required: false },
  { name: "meta_keyword", label: "Meta Keywords", type: "textarea", required: false },
  { name: "image", label: "Product Image", type: "file", required: false },
];

const EditProduct = () => {
  const { id } = useParams();
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
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const [productRes, categoryRes, brandRes] = await Promise.all([
        getData(`product/get-all-product-by-id/${id}`),
        getData("category/get-all-categorys"),
        getData("brand/get-all-brand"),
      ]);
      if (productRes.status) {
        setData(productRes.data);
      } else {
        toast.error("Product not found");
      }
      setCategoryList(categoryRes.data);
      setBrandList(brandRes.data);
    } catch (error) {
      toast.error("Error loading data");
      console.error(error);
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
    console.log("DDDDDDD:--", data.brand);
    console.log("DDDDDDD:--", data.brand);


  const handleChange = (e) => {
    const { name, type, checked, files, value } = e.target;
    const val = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setData((prev) => ({ ...prev, [name]: val }));
  };

  const handleEditorChange = (content) => {
    setData((prev) => ({ ...prev, product_description: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.image && data.image.size > 2 * 1024 * 1024) {
      toast.error("Image should be less than 2MB");
      return;
    }

    const formData = new FormData();
    for (let [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    try {
      setLoading(true);
      const res = await postData(`product/update-product/${id}`, formData); // Assuming this is an update
      if (res.status) {
        toast.success("Product updated successfully!");
        navigate("/all-products");
      } else {
        toast.error("Failed to update product");
      }
    } catch (err) {
      console.error("Update error:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>Edit Product</h4>
        </div>
        <div className="links">
          <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
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
                {categoryList?.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="col-md-4 mb-3">
              <label>Brand <sup className="text-danger">*</sup></label>
              <select name="brand" className="form-control" value={data.brand} onChange={handleChange} required>
                <option value="">Select Brand</option>
                {brandFilter?.map((brand) => (
                  <option key={brand._id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Fields */}
            {fieldConfig?.map((field) => {
              if (["category", "brand"].includes(field.name)) return null;
              return (
                <div className={`col-md-${field.type === "editor" ? "12" : "4"} mb-3`} key={field.name}>
                  <label htmlFor={field.name}>
                    {field.label}
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
              <button type="submit" className="mybtnself mt-4" disabled={loading}>
                {loading ? "Please wait..." : "Update Product"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
