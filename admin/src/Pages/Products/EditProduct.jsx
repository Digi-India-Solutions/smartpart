import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import JoditEditor from "jodit-react";
import "react-toastify/dist/ReactToastify.css";
import { getData, postData } from "../../services/FetchNodeServices";

const fieldConfig = [
  { name: "name", label: "Product Name", type: "text", required: true },
  { name: "model", label: "Model", type: "text" },
  { name: "part_no", label: "Part No", type: "text" },
  { name: "image", label: "Product Image", type: "file" },
  { name: "product_description", label: "Description", type: "editor", required: true },
  { name: "meta_title", label: "Meta Title", type: "text" },
  { name: "meta_description", label: "Meta Description", type: "textarea" },
  { name: "meta_keyword", label: "Meta Keywords", type: "textarea" },
  { name: "status", label: "Active", type: "checkbox" },
  { name: "trending", label: "Trending", type: "checkbox" },

];

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const editor = useRef(null);

  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [brandList, setBrandList] = useState([]);
  const [brandCategoryList, setBrandCategoryList] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  const [data, setData] = useState({
    brand_category: '',
    name: "", category: "", brand: "", trending: false, warranty: "",
    product_description: "", meta_title: "", meta_description: "",
    meta_keyword: "", model: "", part_no: "", price: "", special_price: "",
    status: false, image: null,
  });

  const [existingImage, setExistingImage] = useState("");

  // Initial Fetch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [catRes, brandRes, brandCatRes] = await Promise.all([
          getData("category/get-all-categorys"),
          getData("brand/get-all-brand"),
          getData("brandCategory/get-all-brand-category"),
        ]);

        setCategoryList(catRes.data || []);
        setBrandList(brandRes.data || []);
        setBrandCategoryList(brandCatRes.data || []);
      } catch (err) {
        toast.error("Failed to fetch dropdown data");
        console.error(err);
      }
    };

    fetchInitialData();
    fetchProductDetails();
  }, []);

  // Fetch product by ID
  const fetchProductDetails = async () => {
    try {
      const res = await getData(`product/get-all-product-by-id/${id}`);
      // console.log("XXXXXXXXXXXXXXXX:==", res, id)
      if (res.status) {
        const product = res.data;
        setData({
          ...product,
          image: null, // Set image to null for form upload
          brand: product.brand?.toString() || "",
          category: product.category?.toString() || "",
          brand_category: product.brand_category?.toString() || "",
          status: !!product.status,
          trending: !!product.trending,
        });
        setExistingImage(product.image);
      } else {
        toast.error("Product not found");
        // navigate("/all-products");
      }
    } catch (err) {
      toast.error("Error fetching product");
      console.error(err);
    }
  };

  // Filter categories based on brand
  useEffect(() => {
    if (data.brand) {
      const selectedBrand = brandList?.find(b => b?.id === JSON.parse(data?.brand));
      // console.log('XXXXXXXXXXXXX:=>', selectedBrand?.cat_id?.split(",").map(id => id?.trim()))

      if (selectedBrand?.cat_id?.split(",").map(id => id?.trim())?.length > 0) {
        const filtered = categoryList?.filter(cat => selectedBrand?.cat_id.includes(cat.id));
        setFilteredCategories(filtered);
      } else {
        setFilteredCategories([]);
      }
    } else {
      setFilteredCategories([]);
    }
  }, [data.brand, categoryList]);


  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    const val = type === "checkbox" ? checked : type === "file" ? files[0] : value;
    setData(prev => ({ ...prev, [name]: val }));
  };

  const handleEditorChange = (content) => {
    setData(prev => ({ ...prev, product_description: content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.image && data.image.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, val]) => {
      if (key === "image") {
        if (val) formData.append("image", val);
      } else {
        formData.append(key, val);
      }
    });

    try {
      setLoading(true);
      const res = await postData(`product/update-product/${id}`, formData);
      console.log("RESPONSE:=", res)
      if (res.status) {
        toast.success("Product updated successfully!");
        navigate("/all-products");
      } else {
        toast.error(res.message || "Failed to update product.");
      }
    } catch (err) {
      toast.error("Error while updating.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head"><h4>Edit Product</h4></div>
        <div className="links">
          <Link to="/all-products" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
        </div>
      </div>

      <div className="d-form">
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="row">

            {/* Brand Category Dropdown */}
            <div className="col-md-4 mb-3">
              <label>Brand Category <sup className="text-danger">*</sup></label>
              <select name="brand_category" className="form-control" value={data.brand_category} onChange={handleChange} required>
                <option value="">Select Brand Category</option>
                {brandCategoryList.map((bc) => (
                  <option key={bc._id} value={bc.id}>{bc.name}</option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="col-md-4 mb-3">
              <label>Brand <sup className="text-danger">*</sup></label>
              <select name="brand" className="form-control" value={data.brand} onChange={handleChange} required>
                <option value="">Select Brand</option>
                {brandList.map((brand) => (
                  <option key={brand._id} value={brand.id}>{brand.name}</option>
                ))}
              </select>
            </div>

            {/* Filtered Category Dropdown */}
            <div className="col-md-4 mb-3">
              <label>Category <sup className="text-danger">*</sup></label>
              <select name="category" className="form-control" value={data.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {filteredCategories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>

            {/* Dynamic Form Fields */}
            {fieldConfig.map((field) => {
              if (["brand", "category"].includes(field.name)) return null;

              return (
                <div key={field.name} className={field.type === "editor" ? "col-md-12 mb-3" : "col-md-4 mb-3"}>
                  <label>{field.label}{field.required && <sup className="text-danger">*</sup>}</label>

                  {field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      className="form-control"
                      value={data[field.name] || ""}
                      onChange={handleChange}
                      required={field.required}
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      name={field.name}
                      className="form-check-input"
                      checked={data[field.name] || false}
                      onChange={handleChange}
                    />
                  ) : field.type === "editor" ? (
                    <JoditEditor
                      ref={editor}
                      value={data[field.name] || ""}
                      onChange={handleEditorChange}
                    />
                  ) : field.type === "file" ? (
                    <>
                      <input
                        type="file"
                        name={field.name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {existingImage && (
                        <img
                          src={existingImage}
                          alt="existing"
                          className="img-thumbnail mt-2"
                          style={{ width: 100, height: 100 }}
                        />
                      )}
                    </>
                  ) : (
                    <input type={field.type} name={field.name} value={data[field.name] || ""} onChange={handleChange} className="form-control" required={field.required} />
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center">
            <button type="submit" className="mybtnself mt-4" style={{ width: "30%", marginBottom: 100 }}>
              {loading ? "Please wait..." : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProduct;
