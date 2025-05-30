import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';

const AllBrandCategory = () => {
    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            const res = await getData("brandCategory/get-all-brand-category");
            if (res.status) setData(res.data);
            else toast.error("Failed to load brand categories.");
        } catch (error) {
            toast.error("Error fetching data.");
        }
    };

    const handleStatusToggle = async (id, status) => {
        try {
            const res = await postData("brandCategory/change-status", { id, status: status === 1 ? 0 : 1 });
            if (res.status) {
                toast.success("Status updated successfully.");
                getApiData();
            } else toast.error("Failed to update status.");
        } catch (error) {
            toast.error("Error updating status.");
        }
    };

    const handleShowHomeToggle = async (id, show_home) => {
        try {
            const res = await postData("brandCategory/change-show-home", { id, show_home: show_home === 1 ? 0 : 1 });
            if (res.status) {
                toast.success("Show Home updated.");
                getApiData();
            } else toast.error("Failed to update Show Home.");
        } catch (error) {
            toast.error("Error updating Show Home.");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this category?")) return;
        try {
            const res = await getData(`brandCategory/delete-brand-category/${id}`);
            if (res.status) {
                toast.success("Brand category deleted.");
                getApiData();
            } else toast.error("Failed to delete brand category.");
        } catch (error) {
            toast.error("Error deleting brand category.");
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="bread d-flex justify-content-between align-items-center mb-3">
                <h4>All Brand Categories</h4>
                {/* <Link to="/add-brand-category" className="btn btn-primary">
                    Add New <i className="fa-solid fa-plus"></i>
                </Link> */}
            </div>

            <section className="table-responsive">
                <table className="table table-bordered table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Sr.No.</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Show on Home</th>
                            <th>Status</th>
                            {/* <th>Edit</th>
                            <th>Delete</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data?.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={item?.id}>
                                    <td>{index + 1}</td>
                                    <td>{item?.name}</td>
                                    <td>
                                        {item?.image ? (
                                            <img
                                                src={`${serverURL}/uploads/brand-category/${item.image}`}
                                                alt={item.name}
                                                style={{ width: 50, height: 50, objectFit: 'cover' }}
                                            />
                                        ) : (
                                            "No Image"
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${item?.show_home === 1 ? 'btn-success' : 'btn-secondary'}`}
                                            onClick={() => handleShowHomeToggle(item.id, item.show_home)}
                                        >
                                            {item?.show_home === 1 ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${item?.status === 1 ? 'btn-success' : 'btn-danger'}`}
                                            onClick={() => handleStatusToggle(item.id, item.status)}
                                        >
                                            {item?.status === 1 ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    {/* <td>
                                        <Link to={`/edit-brand-category/${item?.id}`} className="btn btn-warning btn-sm">
                                            Edit
                                        </Link>
                                    </td> */}
                                    {/* <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(item?.id)}
                                        >
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="12" className="text-center">No Data Found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllBrandCategory;
