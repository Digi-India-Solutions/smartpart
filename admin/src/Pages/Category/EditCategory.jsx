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
        active: false,
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(fetchCategory(_id));
    }, [dispatch, _id]);

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
                active: category.status === '1' || category.status === 1 || category.status === true,
            });
        }
    }, [category]);

    const getInputData = (e) => {
        const { name, value, type, checked } = e.target;
        setData({
            ...data,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const getFileData = (e) => {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            toast.error("File size should be less than 2MB");
            return;
        }
        setData({
            ...data,
            image: file,
            imagePreview: file ? URL.createObjectURL(file) : data.imagePreview
        });
    };

    const postData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", data.categoryname);
        formData.append("meta_title", data.metaTagTitle);
        formData.append("meta_description", data.metaTagDescription);
        formData.append("meta_keyword", data.metaTagKeywords);
        formData.append("keyword", data.keywords);
        formData.append("image", data.image);
        formData.append("status", data.active ? 1 : 0)
        formData.append("existingImage", data.imagePreview)

        setLoading(true);
        try {
            await dispatch(updateCategory({ id: _id, formData }))
                .unwrap()
                .then((res) => {
                    toast.success(res?.message || "Category updated successfully");
                    navigate("/all-category");
                })
                .catch((error) => {
                    toast.error(`Error: ${error.message}`);
                });

        } catch (error) {
            toast.error("Failed to update category");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Category</h4>
                </div>
                <div className="links">
                    <Link to="/all-category" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={postData}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label className="form-label">
                                Category Name <sup className="text-danger">*</sup>
                            </label>
                            <input type="text" name="categoryname" className="form-control" value={data.categoryname} onChange={getInputData} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Meta Tag Title <sup className="text-danger">*</sup>
                            </label>
                            <input type="text" name="metaTagTitle" className="form-control" value={data.metaTagTitle} onChange={getInputData} required />
                        </div>

                        <div className="col-md-12">
                            <label className="form-label">
                                Meta Tag Description <sup className="text-danger">*</sup>
                            </label>
                            <input type="text" name="metaTagDescription" className="form-control" value={data.metaTagDescription} onChange={getInputData} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Meta Tag Keywords <sup className="text-danger">*</sup>
                            </label>
                            <input type="text" name="metaTagKeywords" className="form-control" value={data.metaTagKeywords} onChange={getInputData} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Keywords <sup className="text-danger">*</sup>
                            </label>
                            <input type="text" name="keywords" className="form-control" value={data.keywords} onChange={getInputData} required />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label">
                                Category Image {data.imagePreview && <span>(Preview below)</span>}
                            </label>
                            <input type="file" name="image" className="form-control" onChange={getFileData} accept="image/*" />
                            {data.image ? <>{
                                data?.imagePreview && (
                                    <div style={{ marginTop: '10px' }}>
                                        <img src={data.imagePreview || `${serverURL}/uploads/images/${data.imagePreview}`} alt="Preview" height="100" />
                                    </div>
                                )
                            } </> : <div style={{ marginTop: '10px' }}>
                                <img src={`${serverURL}/uploads/images/${data.imagePreview}` || data.imagePreview} alt="Preview" height="100" />
                            </div>}
                        </div>

                        <div className="col-md-6 d-flex align-items-center" style={{ marginTop: 20 }}>
                            <input type="checkbox" name="active" checked={data.active} onChange={getInputData} id="active" style={{ marginRight: 8 }} />
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
