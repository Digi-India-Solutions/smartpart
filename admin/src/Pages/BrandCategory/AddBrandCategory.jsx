import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData } from '../../services/FetchNodeServices';

const AddBrandCategory = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', show_home: false,  meta_title: '', meta_description: '', meta_keyword: '', seo_url: '', status: false,
    });

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        console.log("Image:-", image)
        setFile(image);
        setPreviewUrl(URL.createObjectURL(image));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Basic validation
        if (!formData.name.trim()) {
            toast.error('Name is required');
            setIsLoading(false);
            return;
        }

        if (!file) {
            toast.error('Please upload an image');
            setIsLoading(false);
            return;
        }

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.append('image', file);

        try {
            const response = await postData('brandCategory/create-brand-category', data);

            if (response.status) {
                toast.success(response.message || 'Brand category added successfully');
                setFormData({
                    name: '',
                    show_home: false,
                    meta_title: '',
                    meta_description: '',
                    meta_keyword: '',
                    seo_url: '',
                    status: false,
                });
                setFile(null);
                setPreviewUrl('');
                navigate('/all-brand-category');
            } else {
                toast.error(response.message || 'Something went wrong');
            }
        } catch (error) {
            toast.error('Error while submitting form');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread d-flex justify-content-between align-items-center mb-4">
                <h4>Add Brand Category</h4>
                <Link to="/all-brand-category" className="btn btn-outline-primary">
                    <i className="fa-regular fa-circle-left me-1"></i> Back
                </Link>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-6">
                        <label className="form-label">Name *</label>
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Image *</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handleFileChange}
                            required
                        />
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="img-thumbnail mt-2"
                                width="100"
                            />
                        )}
                    </div>


                    <div className="col-md-6">
                        <label className="form-label">SEO URL</label>
                        <input
                            type="text"
                            name="seo_url"
                            className="form-control"
                            value={formData.seo_url}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Meta Title</label>
                        <input
                            type="text"
                            name="meta_title"
                            className="form-control"
                            value={formData.meta_title}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="col-md-6">
                        <label className="form-label">Meta Keywords</label>
                        <textarea
                            name="meta_keyword"
                            className="form-control"
                            value={formData.meta_keyword}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Meta Description</label>
                        <textarea
                            name="meta_description"
                            className="form-control"
                            value={formData.meta_description}
                            onChange={handleChange}
                        ></textarea>
                    </div>

                    <div className="col-md-6">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="show_home"
                                className="form-check-input"
                                checked={formData.show_home}
                                onChange={handleChange}
                                id="show_home"
                            />
                            <label htmlFor="show_home" className="form-check-label">Show on Home</label>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                name="status"
                                className="form-check-input"
                                checked={formData.status}
                                onChange={handleChange}
                                id="status"
                            />
                            <label htmlFor="status" className="form-check-label">Active Status</label>
                        </div>
                    </div>

                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`btn ${isLoading ? 'btn-secondary' : 'btn-primary'}`}>
                            {isLoading ? 'Please wait...' : 'Add Brand Category'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBrandCategory;
