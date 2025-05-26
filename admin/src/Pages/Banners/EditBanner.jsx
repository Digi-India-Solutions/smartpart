import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData } from '../../services/FetchNodeServices';

const EditBanner = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Note: adjust if param is named `id` instead
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: '', heading: '', sub_heading: '', slider_link: '', status: '1',
    });

    useEffect(() => {
        if (id) {
            fetchBannerDetails(id);
        }
    }, [id]);

    const fetchBannerDetails = async (id) => {
        try {
            const res = await getData(`banner/get-all-banner-by-id/${id}`);
            console.log("res:-", res);
            if (res.status) {
                setFormData(res.data);
            } else {
                toast.error('Failed to fetch banner');
            }
        } catch (error) {
            toast.error('Something went wrong while fetching');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await postData(`banner/update-banner/${id}`, formData);
            if (res.status) {
                toast.success('Banner updated successfully!');
                navigate('/all-banners');
            } else {
                toast.error(res.message || 'Update failed');
            }
        } catch (error) {
            toast.error('Server error occurred');
        }

        setLoading(false);
    };

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
                    <h4>Edit Banner</h4>
                </div>
                <div className="links">
                    <Link to="/all-banners" className="add-new">
                        Back <i className="fa-regular fa-circle-left"></i>
                    </Link>
                </div>
            </div>

            <div className="d-form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {fields.map(({ name, label, type }) => (
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

                    <button
                        type="submit"
                        className="mybtnself"
                        disabled={loading}
                        style={{ backgroundColor: '#28a745' }}
                    >
                        {loading ? 'Updating...' : 'Update Banner'}
                    </button>
                </form>
            </div>
        </>
    );
};

export default EditBanner;
