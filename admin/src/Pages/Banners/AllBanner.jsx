import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData } from '../../services/FetchNodeServices';

const AllBanner = () => {
    const [banners, setBanners] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Fetch banners
    const fetchBanners = async () => {
        try {
            const res = await getData('banner/get-all-banner');
            if (res.status) {
                setBanners(res.data);
            } else {
                toast.error('Failed to fetch banners');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    // Delete banner
    const handleDelete = async (id) => {
        try {
            const res = await getData(`banner/delete-banner/${id}`);
            if (res.status) {
                toast.success('Banner deleted successfully');
                fetchBanners();
            } else {
                toast.error('Failed to delete banner');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    // Toggle status
    const handleStatusToggle = async (id, currentStatus) => {
        const newStatus = currentStatus === '1' || currentStatus === 1 ? '0' : '1';
        try {
            const res = await postData('banner/update-status', { id, status: newStatus });
            if (res.status) {
                toast.success('Status updated!');
                setBanners(prev =>
                    prev.map(item =>
                        item.id === id ? { ...item, status: newStatus } : item
                    )
                );
            } else {
                toast.error('Failed to update status');
            }
        } catch (error) {
            toast.error('Something went wrong');
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = banners.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Banners</h4>
                </div>
                <div className="links">
                    <Link to="/add-banner" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input type="text" name="search" id="search" placeholder="Search banners..." />
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Name</th>
                            <th>Heading</th>
                            <th>Sub Heading</th>
                            <th>Slider Link</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{item.name}</td>
                                    <td>{item.heading}</td>
                                    <td>{item.sub_heading}</td>
                                    <td>
                                        <a href={item.slider_link} target="_blank" rel="noreferrer">
                                            {item.slider_link}
                                        </a>
                                    </td>
                                    <td>
                                        <button
                                            className={`badge border-0 ${item.status === '1' || item.status === 1 ? 'bg-success' : 'bg-secondary'}`}
                                            onClick={() => handleStatusToggle(item.id, item.status)}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {item.status === '1' || item.status === 1 ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>
                                        <Link className="bt edit" to={`/edit-banner/${item.id}`}>
                                            Edit <i className="fa-solid fa-pen-to-square"></i>
                                        </Link>
                                    </td>
                                    <td>
                                        <button className="bt delete" onClick={() => handleDelete(item.id)}>
                                            Delete <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center">
                                    No banners found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {banners.length > itemsPerPage && (
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(banners.length / itemsPerPage) }, (_, i) => (
                                <li key={i} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                    <button onClick={() => paginate(i + 1)} className="page-link">
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

export default AllBanner;
