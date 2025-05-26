import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addBanner } from '../../Slice/Banner/bannerSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { postData } from '../../services/FetchNodeServices';

const AddBanner = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loading = useSelector((state) => state.banner.loading);

    const [formData, setFormData] = useState({
        name: '',
        heading: '',
        sub_heading: '',
        slider_link: '',
        status: '1',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const submissionData = { name: formData.name, heading: formData.heading, sub_heading: formData.sub_heading, slider_link: formData.slider_link, status: formData.status };

        const res = await postData("banner/create-banner", submissionData)
        if (res.status) {
            toast.success("Banner added successfully!");
            navigate('/all-banners');
        } else {
            toast.error(res.message);
        }
    };
    console.log("VVV", formData);
    // Input fields config
    const fields = [
        { name: 'name', label: 'Name', type: 'text' },
        { name: 'heading', label: 'Heading', type: 'text' },
        { name: 'sub_heading', label: 'Sub Heading', type: 'text' },
        { name: 'slider_link', label: 'Slider Link', type: 'url' },
    ];

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Add Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="row">
                        {fields.map(({ name, label, type }, index) => (
                            <div className="col-md-6 mb-3" key={name}>
                                <label htmlFor={name} className="form-label">
                                    {label} <sup className="text-danger">*</sup>
                                </label>
                                <input
                                    type={type}
                                    id={name}
                                    name={name}
                                    className="form-control"
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        ))}
                    </div>

                    <div className="col-md-6 mb-3">
                        <label htmlFor="status" className="form-label">
                            Status <sup className="text-danger">*</sup>
                        </label>
                        <select
                            id="status"
                            name="status"
                            className="form-control"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                        </select>
                    </div>
                    <button type="submit" className="mybtnself" disabled={loading}>
                        {loading ? 'Uploading...' : 'Add Banner'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddBanner;
