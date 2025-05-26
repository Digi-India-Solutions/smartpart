import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, deleteCategory, updateCategoryField } from '../../Slice/Category/categorySlice';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { serverURL } from '../../services/FetchNodeServices';

const AllCategory = () => {
    const dispatch = useDispatch();
    const { categories, loading } = useSelector((state) => state.category);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteCategory(id))
                    .then(() => {
                        toast.success("Category Deleted Successfully")
                        dispatch(fetchCategories());
                    })
                    .catch(() => toast.error("Failed to delete category"));
            }
        });
    };

    const handleToggle = (id, field, value) => {
        console.log("XXXXXXXXXXXXXXXXXX", id, field, value)
        dispatch(updateCategoryField({ id, field, value: !value }))
            .then(() => {
                dispatch(fetchCategories());
                toast.success(`${field} updated successfully`)
            })
            .catch(() => toast.error(`Failed to update ${field}`));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(categories.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Category List</h4>
                </div>
                <div className="links">
                    <Link to="/add-category" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <section className="d-table">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Sr.No.</th>
                                <th>Category ID</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Status</th>
                                <th>Top</th>
                                <th>Popular</th>
                                <th>Created</th>
                                <th>Updated</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentItems.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{indexOfFirstItem + index + 1}</td>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        {item.image ? (
                                            <img
                                                src={`${serverURL}/uploads/images/${item.image}`}
                                                alt={item.name}
                                                style={{ height: 60, width: 60, objectFit: 'contain' }}
                                            />
                                        ) : (
                                            'N/A'
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${item?.status ? 'btn-success' : 'btn-danger'}`}
                                            onClick={() => handleToggle(item?.id, 'status', item?.status)}
                                        >
                                            {item.status ? 'Active' : 'Inactive'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${item?.top ? 'btn-success' : 'btn-danger'}`}
                                            onClick={() => handleToggle(item?.id, 'top', item?.top)}
                                        >
                                            {item.top ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td>
                                        <button
                                            className={`btn btn-sm ${item?.popular_category ? 'btn-success' : 'btn-danger'}`}
                                            onClick={() => handleToggle(item?.id, 'popular_category', item?.popular_category)}
                                        >
                                            {item.popular_category ? 'Yes' : 'No'}
                                        </button>
                                    </td>
                                    <td>{item.create_date}</td>
                                    <td>{item.modify_date}</td>
                                    <td>
                                        <Link className="btn btn-warning btn-sm" to={`/edit-category/${item?.id}`}>
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <nav>
                    <ul className="pagination">
                        {pageNumbers.map((number) => (
                            <li key={number} className="page-item">
                                <button onClick={() => setCurrentPage(number)} className="page-link">
                                    {number}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>
        </>
    );
};

export default AllCategory;
