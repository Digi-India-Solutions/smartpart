import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { postData, getData } from '../../services/FetchNodeServices';

const AddBrand = () => {
    const [formData, setFormData] = useState({
        brand_cat_id: '',
        name: '',
        seo_url: '',
        meta_title: '',
        cat_ids: [],
        meta_description: '',
        meta_keyword: '',
        top_title: '',
        top_des: '',
        b_des: '',
        status: false,
    });

    const [categories, setCategories] = useState([]);
    const [brandCategories, setBrandCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [banner, setBanner] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const categoryRes = await getData('category/get-all-categorys');
            const brandCatRes = await getData('brandCategory/get-all-brand-category');
            if (categoryRes.status) setCategories(categoryRes.data || []);
            if (brandCatRes.status) setBrandCategories(brandCatRes.data || []);
        } catch (error) {
            toast.error("Failed to load data.");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBanner(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleCategorySelect = (e) => {
        const value = e.target.value;
        if (value && !formData.cat_ids.includes(value)) {
            setFormData((prev) => ({
                ...prev,
                cat_ids: [...prev.cat_ids, value],
            }));
        }
    };

    const removeCategory = (id) => {
        setFormData((prev) => ({
            ...prev,
            cat_ids: prev.cat_ids.filter((cid) => cid !== id),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.name || !formData.brand_cat_id || formData.cat_ids.length === 0) {
            toast.error("Please fill in all required fields.");
            setIsLoading(false);
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((val) => data.append(`${key}[]`, val));
                } else {
                    data.append(key, value);
                }
            });

            if (image) data.append('image', image);
            if (banner) data.append('banner', banner);

            const res = await postData('brand/create-brand', data);
            if (res.status) {
                toast.success("Brand added successfully!");
                resetForm();
                navigate('/all-brand');
            } else {
                toast.error(res.message || "Failed to add brand.");
            }
        } catch (error) {
            toast.error("Server error. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({
            brand_cat_id: '',
            name: '',
            seo_url: '',
            meta_title: '',
            cat_ids: [],
            meta_description: '',
            meta_keyword: '',
            top_title: '',
            top_des: '',
            b_des: '',
            status: false,
        });
        setImage(null);
        setImagePreview('');
        setBanner(null);
        setBannerPreview('');
    };

    console.log("DDDDDDDDDDD:-", formData)
    return (
        <>
            <ToastContainer />
            <div className="bread d-flex justify-content-between align-items-center mb-4">
                <h4>Add Brand</h4>
                <Link to="/all-brand" className="btn btn-outline-primary">
                    <i className="fa-regular fa-circle-left me-1"></i> Back
                </Link>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    {/* Brand Category */}
                    <div className="col-md-6">
                        <label className="form-label">Brand Category *</label>
                        <select
                            name="brand_cat_id"
                            className="form-select"
                            value={formData.brand_cat_id}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Brand Category</option>
                            {brandCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Category Multi Select */}
                    <div className="col-md-6">
                        <label className="form-label">Categories *</label>
                        <select className="form-select" onChange={handleCategorySelect}>
                            <option value="">Select Category</option>
                            {categories.map(cat => (
                                <option key={cat?.id} value={cat?.id}>{cat?.name}</option>
                            ))}
                        </select>
                        <div className="mt-2 d-flex flex-wrap gap-2">
                            {formData?.cat_ids?.map(cid => {
                                const category = categories.find(cat => cat?.id === JSON.parse(cid));
                                return (
                                    <span key={cid} className="badge bg-primary d-flex align-items-center">
                                        {category?.name || cid}
                                        <button type="button" className="btn-close btn-close-white ms-2" onClick={() => removeCategory(cid)}></button>
                                    </span>
                                );
                            })}
                        </div>
                    </div>



                    {/* Other Inputs */}
                    {[
                        { label: "Name", name: "name", required: true },
                        { label: "SEO URL", name: "seo_url" },
                        { label: "Meta Title", name: "meta_title" },
                        { label: "Meta Description", name: "meta_description", type: "textarea" },
                        { label: "Meta Keywords", name: "meta_keyword", type: "textarea" },
                        { label: "Top Title", name: "top_title" },
                        { label: "Top Description", name: "top_des", type: "textarea" },
                    ].map(({ label, name, type = "text", required }) => (
                        <div className="col-md-6" key={name}>
                            <label className="form-label">{label}{required ? ' *' : ''}</label>
                            {type === "textarea" ? (
                                <textarea
                                    className="form-control"
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required={required}
                                />
                            ) : (
                                <input
                                    type={type}
                                    className="form-control"
                                    name={name}
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required={required}
                                />
                            )}
                        </div>
                    ))}

                    {/* Image Upload */}
                    <div className="col-md-6">
                        <label className="form-label">Image</label>
                        <input type="file" className="form-control" onChange={handleImageChange} />
                        {imagePreview && <img src={imagePreview} alt="Preview" className="img-thumbnail mt-2" width={100} />}
                    </div>

                    {/* Banner Upload */}
                    <div className="col-md-6">
                        <label className="form-label">Banner</label>
                        <input type="file" className="form-control" onChange={handleBannerChange} />
                        {bannerPreview && <img src={bannerPreview} alt="Preview" className="img-thumbnail mt-2" width={100} />}
                    </div>

                    {/* Status Checkbox */}
                    <div className="col-md-6">
                        <div className="form-check mt-4">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="status"
                                name="status"
                                checked={formData.status}
                                onChange={handleChange}
                            />
                            <label className="form-check-label" htmlFor="status">Active Status</label>
                        </div>
                    </div>

                    {/* Submit */}
                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success" disabled={isLoading}>
                            {isLoading ? 'Please Wait...' : 'Add Brand'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBrand;
