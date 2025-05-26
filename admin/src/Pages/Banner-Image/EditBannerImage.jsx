import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';
import 'react-toastify/dist/ReactToastify.css';

const EditBannerImage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        banner_id: '',
        title: '',
        link: '',
    });

    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [bannerOptions, setBannerOptions] = useState([]);

    const inputFields = [
        { label: 'Banner Title', name: 'title', type: 'text', required: true },
        { label: 'Link', name: 'link', type: 'url', required: true },
    ];

    // Fetch existing banner image
    const fetchBannerImage = async () => {
        try {
            const res = await getData(`banner-image/get-banner-image-by-id/${id}`);
            if (res.status && res.data) {
                setFormData({
                    banner_id: res.data.banner_id || '',
                    title: res.data.title || '',
                    link: res.data.link || '',
                });
                setPreviewImage(res.data.image || '');
            } else {
                toast.error('Failed to load banner image details.');
            }
        } catch (err) {
            toast.error('Error fetching banner image.');
        }
    };

    // Fetch banner dropdown options
    const fetchBannerOptions = async () => {
        try {
            const res = await getData('banner/get-all-banner');
            if (res.status) {
                setBannerOptions(res.data);
            } else {
                toast.error('Unable to load banner types.');
            }
        } catch (err) {
            toast.error('Something went wrong while loading banner types.');
        }
    };

    useEffect(() => {
        if (id) {
            fetchBannerImage();
            fetchBannerOptions();
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            toast.error('Image must be less than 2MB');
            return;
        }

        setImage(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const { banner_id, title, link } = formData;
        if (!banner_id || !title || !link) {
            toast.error('Please complete all required fields.');
            setLoading(false);
            return;
        }

        const submissionData = new FormData();
        submissionData.append('banner_id', banner_id);
        submissionData.append('title', title);
        submissionData.append('link', link);
        if (image) {
            submissionData.append('image', image);
        }

        try {
            const res = await postData(`banner-image/update-banner-image/${id}`, submissionData);
            if (res.status) {
                toast.success('Banner updated successfully!');
                setTimeout(() => navigate('/all-banner-image'), 1500);
            } else {
                toast.error(res.message || 'Update failed.');
            }
        } catch (err) {
            toast.error('Server error during update.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Banner</h4>
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
                        {/* Dropdown */}
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

                        {/* Input Fields */}
                        {inputFields.map(({ label, name, type, required }) => (
                            <div className="col-md-6 mb-3" key={name}>
                                <label htmlFor={name} className="form-label">
                                    {label} {required && <sup className="text-danger">*</sup>}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    id={name}
                                    className="form-control"
                                    value={formData[name]}
                                    onChange={handleChange}
                                    required={required}
                                />
                            </div>
                        ))}

                        {/* Image Upload */}
                        <div className="col-md-6 mb-3">
                            <label htmlFor="image" className="form-label">
                                Banner Image {previewImage && <span>(leave empty to keep current)</span>}
                            </label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                className="form-control"
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                            {previewImage && (
                                <div className="mt-2">
                                    <strong>Current Image:</strong>
                                    <img
                                        src={
                                            previewImage.includes("cloudinary")
                                                ? previewImage
                                                : `${serverURL}/uploads/images/${previewImage}`
                                        }
                                        onError={(e) => (e.target.src = "/no-image.jpg")}
                                        alt="Preview"
                                        className="img-thumbnail mt-2"
                                        style={{ maxWidth: '200px', height: 'auto' }}
                                    />
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <div className="col-12">
                            <button
                                type="submit"
                                className="mybtnself"
                                disabled={loading}
                                style={{ backgroundColor: "#28a745" }}
                            >
                                {loading ? 'Updating...' : 'Update Banner'}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditBannerImage;
