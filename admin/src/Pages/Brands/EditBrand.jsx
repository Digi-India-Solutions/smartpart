// import React, { useEffect, useState } from 'react';
// import { useParams, Link, useNavigate } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { getData, postData, serverURL } from '../../services/FetchNodeServices';

// const EditBrand = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();

//     const [formData, setFormData] = useState({
//         brand_cat_id: '',
//         cat_id: '',
//         name: '',
//         seo_url: '',
//         meta_title: '',
//         meta_description: '',
//         meta_keyword: '',
//         top_title: '',
//         top_des: '',
//         b_des: '',
//         status: false,
//     });

//     const [categories, setCategories] = useState([]);
//     const [brandCategories, setBrandCategories] = useState([]);
//     const [image, setImage] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [banner, setBanner] = useState(null);
//     const [bannerPreview, setBannerPreview] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (id) fetchSingleBrand();
//         fetchData();
//     }, [id]);

//     const fetchSingleBrand = async () => {
//         try {
//             const res = await getData(`brand/get-all-brand-by-id/${id}`);
//             if (res.status && res.data) {
//                 const data = res.data;
//                 setFormData({
//                     brand_cat_id: data.brand_cat_id || '',
//                     cat_ids: data?.cat_id || '',
//                     name: data.name || '',
//                     seo_url: data.seo_url || '',
//                     meta_title: data.meta_title || '',
//                     meta_description: data.meta_description || '',
//                     meta_keyword: data.meta_keyword || '',
//                     top_title: data.top_title || '',
//                     top_des: data.top_des || '',
//                     b_des: data.b_des || '',
//                     status: data.status || false,
//                 });
//                 if (data.image) setImagePreview(`${serverURL}/uploads/images/${data.image}`);
//                 if (data.banner) setBannerPreview(`${serverURL}/uploads/images/${data.banner}`);
//             } else {
//                 toast.error("Brand not found");
//             }
//         } catch (err) {
//             toast.error("Failed to load brand data");
//         }
//     };

//     const fetchData = async () => {
//         try {
//             const [categoryRes, brandCatRes] = await Promise.all([
//                 getData('category/get-all-categorys'),
//                 getData('brandCategory/get-all-brand-category'),
//             ]);

//             if (categoryRes.status) setCategories(categoryRes.data || []);
//             if (brandCatRes.status) setBrandCategories(brandCatRes.data || []);
//         } catch {
//             toast.error("Failed to load data.");
//         }
//     };

//     const handleChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     const handleImageChange = (e, isBanner = false) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (isBanner) {
//                 setBanner(file);
//                 setBannerPreview(URL.createObjectURL(file));
//             } else {
//                 setImage(file);
//                 setImagePreview(URL.createObjectURL(file));
//             }
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsLoading(true);

//         if (!formData.name.trim() || !formData.brand_cat_id || !formData.cat_id) {
//             toast.error("Please fill all required fields");
//             setIsLoading(false);
//             return;
//         }

//         try {
//             const data = new FormData();
//             Object.entries(formData).forEach(([key, value]) => data.append(key, value));
//             if (image) data.append('image', image);
//             if (banner) data.append('banner', banner);

//             const res = await postData(`brand/update-brand/${id}`, data);
//             if (res.status) {
//                 toast.success("Brand updated successfully");
//                 setTimeout(() => navigate('/all-brand'), 1500);
//             } else {
//                 toast.error(res.message || "Update failed");
//             }
//         } catch {
//             toast.error("Server error");
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     return (
//         <>
//             <ToastContainer />
//             <div className="bread">
//                 <div className="head"><h4>Edit Brand</h4></div>
//                 <div className="links">
//                     <Link to="/all-brand" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
//                 </div>
//             </div>

//             <div className="d-form">
//                 <form className="row g-3" onSubmit={handleSubmit}>

//                     {/* Category Dropdown */}
//                     <div className="col-md-6">
//                         <label className="form-label">Category *</label>
//                         <select
//                             name="cat_id"
//                             className="form-select"
//                             value={formData.cat_id}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select Category</option>
//                             {categories.map(cat => (
//                                 <option key={cat.id} value={cat.id}>{cat.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Brand Category Dropdown */}
//                     <div className="col-md-6">
//                         <label className="form-label">Brand Category *</label>
//                         <select
//                             name="brand_cat_id"
//                             className="form-select"
//                             value={formData.brand_cat_id}
//                             onChange={handleChange}
//                             required
//                         >
//                             <option value="">Select Brand Category</option>
//                             {brandCategories.map(cat => (
//                                 <option key={cat.id} value={cat.id}>{cat.name}</option>
//                             ))}
//                         </select>
//                     </div>

//                     {/* Text Fields */}
//                     {[
//                         { label: "Name", name: "name", required: true },
//                         { label: "SEO URL", name: "seo_url" },
//                         { label: "Meta Title", name: "meta_title" },
//                         { label: "Meta Description", name: "meta_description", type: "textarea" },
//                         { label: "Meta Keywords", name: "meta_keyword", type: "textarea" },
//                         { label: "Top Title", name: "top_title" },
//                         { label: "Top Description", name: "top_des", type: "textarea" },
//                         { label: "Bottom Description", name: "b_des", type: "textarea" },
//                     ].map(({ label, name, type = "text", required }) => (
//                         <div className="col-md-6" key={name}>
//                             <label className="form-label">{label}{required && ' *'}</label>
//                             {type === "textarea" ? (
//                                 <textarea
//                                     name={name}
//                                     className="form-control"
//                                     value={formData[name]}
//                                     onChange={handleChange}
//                                     required={required}
//                                 />
//                             ) : (
//                                 <input
//                                     type="text"
//                                     name={name}
//                                     className="form-control"
//                                     value={formData[name]}
//                                     onChange={handleChange}
//                                     required={required}
//                                 />
//                             )}
//                         </div>
//                     ))}

//                     {/* Image Upload */}
//                     <div className="col-md-6">
//                         <label className="form-label">Image</label>
//                         <input type="file" className="form-control" onChange={(e) => handleImageChange(e)} />
//                         {imagePreview && <img src={imagePreview} alt="preview" className="img-thumbnail mt-2" width={100} />}
//                     </div>

//                     {/* Banner Upload */}
//                     <div className="col-md-6">
//                         <label className="form-label">Banner</label>
//                         <input type="file" className="form-control" onChange={(e) => handleImageChange(e, true)} />
//                         {bannerPreview && <img src={bannerPreview} alt="preview" className="img-thumbnail mt-2" width={100} />}
//                     </div>

//                     {/* Status */}
//                     <div className="col-md-6 d-flex align-items-center mt-4">
//                         <div className="form-check">
//                             <input
//                                 type="checkbox"
//                                 name="status"
//                                 className="form-check-input"
//                                 checked={formData.status}
//                                 onChange={handleChange}
//                                 id="status"
//                             />
//                             <label htmlFor="status" className="form-check-label">Active Status</label>
//                         </div>
//                     </div>

//                     {/* Submit */}
//                     <div className="col-12 text-center">
//                         <button type="submit" className="btn btn-success" disabled={isLoading}>
//                             {isLoading ? "Please Wait..." : "Update Brand"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     );
// };

// export default EditBrand;

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';

const EditBrand = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        brand_cat_id: '',
        name: '',
        seo_url: '',
        meta_title: '',
        meta_description: '',
        meta_keyword: '',
        top_title: '',
        top_des: '',
        b_des: '',
        status: false,
        cat_ids: [],
    });

    const [categories, setCategories] = useState([]);
    const [brandCategories, setBrandCategories] = useState([]);
    const [image, setImage] = useState(null);
    const [banner, setBanner] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [bannerPreview, setBannerPreview] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchData();
        if (id) fetchSingleBrand();
    }, [id]);

    const fetchData = async () => {
        try {
            const [categoryRes, brandCatRes] = await Promise.all([
                getData('category/get-all-categorys'),
                getData('brandCategory/get-all-brand-category'),
            ]);
            if (categoryRes.status) setCategories(categoryRes.data || []);
            if (brandCatRes.status) setBrandCategories(brandCatRes.data || []);
        } catch {
            toast.error("Failed to load dropdown data.");
        }
    };

    const fetchSingleBrand = async () => {
        try {
            const res = await getData(`brand/get-all-brand-by-id/${id}`);
            if (res.status && res.data) {
                const data = res.data;
                setFormData({
                    brand_cat_id: data?.brand_cat_id || '',
                    name: data?.name || '',
                    seo_url: data?.seo_url || '',
                    meta_title: data?.meta_title || '',
                    meta_description: data?.meta_description || '',
                    meta_keyword: data?.meta_keyword || '',
                    top_title: data?.top_title || '',
                    top_des: data?.top_des || '',
                    b_des: data?.b_des || '',
                    status: data?.status || false,
                    cat_ids: data?.cat_id?.split(",").map(cid => cid.trim()) || [],
                });
                if (data.image) {
                    const isFullPath = data.image.startsWith('uploads/images');
                    setImagePreview(isFullPath ? `${serverURL}/${data.image}` : `${serverURL}/uploads/images/${data.image}`);
                }
                if (data.banner) {
                    const isFullPath = data.banner.startsWith('uploads/images');
                    setBannerPreview(isFullPath ? `${serverURL}/${data.banner}` : `${serverURL}/uploads/images/${data.banner}`);
                }
            } else {
                toast.error("Brand not found");
            }
        } catch {
            toast.error("Failed to load brand data");
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleCategorySelect = (e) => {
        const value = e.target.value;
        if (value && !formData.cat_ids?.includes(value)) {
            setFormData((prev) => ({ ...prev, cat_ids: [...(prev.cat_ids || []), value] }));
        }
    };

    const removeCategory = (cid) => {
        setFormData((prev) => ({
            ...prev,
            cat_ids: prev.cat_ids.filter(id => id !== cid),
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if (!formData.name.trim() || !formData.brand_cat_id || formData.cat_ids.length === 0) {
            toast.error("Please fill all required fields");
            setIsLoading(false);
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                if (key === 'cat_ids') {
                    value.forEach(v => data.append('cat_ids[]', v));
                } else {
                    data.append(key, value);
                }
            });

            if (image) data.append('image', image);
            if (banner) data.append('banner', banner);

            const res = await postData(`brand/update-brand/${id}`, data);
            if (res.status) {
                toast.success("Brand updated successfully");
                setTimeout(() => navigate('/all-brand'), 1500);
            } else {
                toast.error(res.message || "Update failed");
            }
        } catch (err) {
            toast.error("Server error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head"><h4>Edit Brand</h4></div>
                <div className="links">
                    <Link to="/all-brand" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">Brand Category *</label>
                        <select name="brand_cat_id" className="form-select" value={formData.brand_cat_id} onChange={handleChange} required>
                            <option value="">Select Brand Category</option>
                            {brandCategories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>

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

                    {[
                        { label: "Name", name: "name", required: true },
                        { label: "SEO URL", name: "seo_url" },
                        { label: "Meta Title", name: "meta_title" },
                        { label: "Meta Description", name: "meta_description", type: "textarea" },
                        { label: "Meta Keywords", name: "meta_keyword", type: "textarea" },
                        { label: "Top Title", name: "top_title" },
                        { label: "Top Description", name: "top_des", type: "textarea" },
                        { label: "Bottom Description", name: "b_des", type: "textarea" },
                    ].map(({ label, name, type = "text", required }) => (
                        <div className="col-md-6" key={name}>
                            <label className="form-label">{label}{required && ' *'}</label>
                            {type === "textarea" ? (
                                <textarea name={name} className="form-control" value={formData[name]} onChange={handleChange} required={required}></textarea>
                            ) : (
                                <input type="text" name={name} className="form-control" value={formData[name]} onChange={handleChange} required={required} />
                            )}
                        </div>
                    ))}

                    <div className="col-md-6">
                        <label className="form-label">Image</label>
                        <input type="file" className="form-control" onChange={handleImageChange} />
                        {imagePreview && <img src={imagePreview} alt="Image" className="img-thumbnail mt-2" width={100} />}
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Banner</label>
                        <input type="file" className="form-control" onChange={handleBannerChange} />
                        {bannerPreview && <img src={bannerPreview} alt="Banner" className="img-thumbnail mt-2" width={100} />}
                    </div>

                    <div className="col-md-6 d-flex align-items-center mt-4">
                        <div className="form-check">
                            <input type="checkbox" name="status" className="form-check-input" checked={formData.status} onChange={handleChange} id="status" />
                            <label htmlFor="status" className="form-check-label">Active Status</label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" className="btn btn-success" disabled={isLoading}>
                            {isLoading ? "Please Wait..." : "Update Brand"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBrand;
