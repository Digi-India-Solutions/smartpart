import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, serverURL } from '../../services/FetchNodeServices';

const AllBrand = () => {
    const [data, setData] = useState([]);

    const getApiData = async () => {
        try {
            const res = await getData("brand/get-all-brand");
            // console.log("Brand Data:", res.data);
            setData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    const handleDelete = async (id) => {
        // console.log("Brand Data:", id);
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        });

        if (confirm.isConfirmed) {
            try {
                const res = await getData(`brand/delete-brand/${id}`);
                if (res.status) {
                    toast.success("Brand deleted successfully!");
                    getApiData();
                } else {
                    toast.error("Error deleting brand");
                }
            } catch (err) {
                console.error(err);
                toast.error("Something went wrong");
            }
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Brand List</h4>
                </div>
                <div className="links">
                    <Link to="/add-brand" className="add-new">Add New <i className="fa-solid fa-plus"></i></Link>
                </div>
            </div>

            <section className="d-table">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th>Sr.No.</th>
                            <th>Brand Category ID</th>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Status</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.brand_category_name}</td>
                                <td>{item.name}</td>
                                <td>
                                    {item?.image && typeof item.image === 'string' ? (
                                        item?.image.startsWith("uploads/images") ? (
                                            <img src={`${serverURL}/${item?.image}`} alt="brand" width="50" />
                                        ) : (
                                            <img src={`${serverURL}/uploads/images/${item?.image}`} alt="brand" width="50" />
                                        )
                                    ) : (
                                        <span>No Image</span>
                                    )}
                                </td>
                                <td>{item.status === 1 ? "Active" : "Inactive"}</td>
                                <td>
                                    <Link to={`/edit-brand/${item.id}`} className="btn btn-warning btn-sm">
                                        Edit
                                    </Link>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </>
    );
};

export default AllBrand;
