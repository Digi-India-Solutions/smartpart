"use client";
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';

const AllBannerImage = () => {
    const [banners, setBanners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const fetchBannerImages = async () => {
        try {
            const res = await getData('banner-image/get-all-banner-image');
            if (res.status) {
                setBanners(res.data);
            } else {
                toast.error('Failed to fetch banner images');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    useEffect(() => {
        fetchBannerImages();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this banner?")) return;

        try {
            const res = await getData(`banner-image/delete-banner-image/${id}`);
            if (res.status) {
                toast.success('Banner deleted successfully');
                fetchBannerImages();
            } else {
                toast.error('Failed to delete banner');
            }
        } catch (error) {
            toast.error(`Error: ${error.message}`);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = banners.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(banners.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
console.log("banner",banners)
    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Banner Images</h4>
                </div>
                <div className="links">
                    <Link to="/add-banner-image" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Banner ID</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item?.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>
                                        <img
                                            src={
                                                item.image?.includes('cloudinary')
                                                    ? item.image
                                                    : `${serverURL}/uploads/images/${item?.image}`
                                            }
                                            alt={item?.title}
                                            style={{ width: '150px', height: 'auto', objectFit: 'cover' }}
                                        />
                                    </td>
                                    <td>{item?.title}</td>
                                    <td>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">
                                            {item.link}
                                        </a>
                                    </td>

                                    <td>{item?.id}</td>
                                    <td>
                                        <Link className="bt edit" to={`/edit-banner-image/${item?.id}`}>
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(item?.id)}>
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">No banner images found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* Pagination */}
                {totalPages > 1 && (
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: totalPages }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button className="page-link" onClick={() => paginate(i + 1)}>
                                        {i + 1}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </section>
        </>
    );
};

export default AllBannerImage;
