import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategory, updateCategory } from '../../Slice/Category/categorySlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from '../../services/FetchNodeServices';

const EditCategory = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useParams();
    const category = useSelector((state) => state.category.category);

    const [data, setData] = useState({
        categoryname: '',
        metaTagTitle: '',
        metaTagDescription: '',
        metaTagKeywords: '',
        keywords: '',
        image: null,
        imagePreview: '',
        thumbnail: null,
        thumbnailPreview: '',
        active: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCategory(_id));
    }, [dispatch, _id]);


    console.log("category",category)
    useEffect(() => {
        if (category) {
            setData({
                categoryname: category.name || '',
                metaTagTitle: category.meta_title || '',
                metaTagDescription: category.meta_description || '',
                metaTagKeywords: category.meta_keyword || '',
                keywords: category.keyword || '',
                image: null,
                imagePreview: category.image || '',
                thumbnail: null,
                thumbnailPreview: category.thumbnail || '',
                active: category.status === '1' || category.status === 1 || category.status === true,
            });
        }
    }, [category]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e, field) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            toast.error("File size must be under 2MB");
            return;
        }
        const preview = URL.createObjectURL(file);
        setData((prev) => ({
            ...prev,
            [field]: file,
            [`${field}Preview`]: preview,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", data.categoryname);
        formData.append("meta_title", data.metaTagTitle);
        formData.append("meta_description", data.metaTagDescription);
        formData.append("meta_keyword", data.metaTagKeywords);
        formData.append("keyword", data.keywords);
        formData.append("status", data.active ? 1 : 0);
        formData.append("existingImage", data.imagePreview);
        formData.append("existingThumbnail", data.thumbnailPreview);
        if (data.image) formData.append("image", data.image);
        if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

        setLoading(true);
        try {
            const res = await dispatch(updateCategory({ id: _id, formData })).unwrap();
            toast.success(res?.message || "Category updated successfully");
            navigate("/all-category");
        } catch (error) {
            toast.error(`Error: ${error.message || "Failed to update category"}`);
        } finally {
            setLoading(false);
        }
    };

    const renderImagePreview = (preview, defaultPath) => {
        const imageUrl = preview.startsWith('blob:')
            ? preview
            : `${serverURL}/uploads/images/${preview}`;
        return <img src={imageUrl} alt="Preview" height="100" style={{ marginTop: 10 }} />;
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
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
                        {[
                            { label: 'Category Name', name: 'categoryname' },
                            { label: 'Meta Tag Title', name: 'metaTagTitle' },
                            { label: 'Meta Tag Description', name: 'metaTagDescription' },
                            { label: 'Meta Tag Keywords', name: 'metaTagKeywords' },
                            { label: 'Keywords', name: 'keywords' },
                        ].map(({ label, name }) => (
                            <div key={name} className={`col-md-${name === 'metaTagDescription' ? '12' : '6'}`}>
                                <label className="form-label">
                                    {label} <sup className="text-danger">*</sup>
                                </label>
                                <input
                                    type="text"
                                    name={name}
                                    className="form-control"
                                    value={data[name]}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        ))}

                        <div className="col-md-6">
                            <label className="form-label">Category Banner Image</label>
                            <input
                                type="file"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'image')}
                            />
                            {data.imagePreview && renderImagePreview(data.imagePreview)}
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">Category Thumbnail</label>
                            <input
                                type="file"
                                name="thumbnail"
                                className="form-control"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, 'thumbnail')}
                            />
                            {data.thumbnailPreview && renderImagePreview(data.thumbnailPreview)}
                        </div>

                        <div className="col-md-6 d-flex align-items-center" style={{ marginTop: 20 }}>
                            <input
                                type="checkbox"
                                name="active"
                                checked={data.active}
                                onChange={handleInputChange}
                                id="active"
                                style={{ marginRight: 8 }}
                            />
                            <label htmlFor="active">Active</label>
                        </div>
                    </div>

                    <button type="submit" className="mybtnself" disabled={loading}>
                        {loading ? 'Updating...' : 'Update Category'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditCategory;
