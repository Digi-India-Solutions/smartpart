import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData } from '../../services/FetchNodeServices';
import 'react-toastify/dist/ReactToastify.css';

const AddBannerImage = () => {
    const navigate = useNavigate();
    const loading = useSelector((state) => state.banner.loading);
    const [formData, setFormData] = useState({ banner_id: '', title: '', link: '', });
    const [image, setImage] = useState(null);
    const [bannerOptions, setBannerOptions] = useState([]);

    const fetchBanner = async () => {
        try {
            const res = await getData('banner/get-all-banner');
            console.log("res:-", res);
            if (res.status) {
                setBannerOptions(res.data);
            } else {
                toast.error('Failed to fetch banner');
            }
        } catch (error) {
            toast.error('Something went wrong while fetching');
        }
    }
    useEffect(() => {
        fetchBanner();
    }, [])

    // Dynamic form input configurations
    const inputFields = [
        { label: 'Banner Title', name: 'title', type: 'text', required: true },
        { label: 'Link', name: 'link', type: 'url', required: true },
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image size must be less than 2MB');
            return;
        }

        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { banner_id, title, link } = formData;
        if (!banner_id || !title || !link || !image) {
            toast.error('Please fill all required fields.');
            return;
        }

        const submissionData = new FormData();
        submissionData.append('banner_id', banner_id);
        submissionData.append('title', title);
        submissionData.append('link', link);
        submissionData.append('image', image);

        const res = await postData('banner-image/create-banner-image', submissionData);

        if (res.status) {
            toast.success('Banner added successfully!');
            navigate('/all-banner-image');
        } else {
            toast.error(res.message || 'Failed to add banner');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banner-image" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Dropdown for Banner Type */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="banner_id" className="form-label">
                                Banner Type <sup className="text-danger">*</sup>
                            </label>
                            <select
                                id="banner_id"
                                name="banner_id"
                                className="form-control"
                                value={formData.banner_id}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Banner Type</option>
                                {bannerOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Dynamic Input Fields */}
                        {inputFields.map(({ label, name, type, required, min }) => (
                            <div className="col-md-6 mb-3" key={name}>
                                <label htmlFor={name} className="form-label">
                                    {label} {required && <sup className="text-danger">*</sup>}
                                </label>
                                <input
                                    type={type}
                                    id={name}
                                    name={name}
                                    className="form-control"
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required={required}
                                    min={min}
                                />
                            </div>
                        ))}

                        {/* Image Upload */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="image" className="form-label">
                                Banner Image <sup className="text-danger">*</sup>
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

                        {/* Submit Button */}
                        <button type="submit" className="mybtnself" disabled={loading}>
                            {loading ? 'Uploading...' : 'Add Banner'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddBannerImage;
