import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData } from "../../services/FetchNodeServices";

const ITEMS_PER_PAGE = 10;

const AllCardEnquiry = () => {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const fetchEnquiries = async () => {
        try {
            const res = await getData("cardEnquiry/get-all-card-enquiry");
            if (res?.status) {
                setData(res.data || []);
            } else {
                toast.error("Failed to fetch enquiries.");
            }
        } catch (error) {
            console.error("Fetch error:", error);
            toast.error("Something went wrong while fetching enquiries.");
        }
    };

    useEffect(() => {
        fetchEnquiries();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

        try {
            const res = await getData(`cardEnquiry/delete-card-enquiry/${id}`);
            if (res?.status) {
                toast.success("Enquiry deleted successfully.");
                fetchEnquiries();
            } else {
                toast.error("Failed to delete enquiry.");
            }
        } catch (err) {
            toast.error("Server error while deleting.");
        }
    };

    const formatMessage = (msg) => {
        try {
            if (msg?.type === "Buffer" && Array.isArray(msg.data)) {
                return new TextDecoder().decode(new Uint8Array(msg.data));
            }
            return typeof msg === "string" ? msg : JSON.stringify(msg);
        } catch {
            return "—";
        }
    };

    const parseProduct = (productString) => {
        try {
            const parsed = JSON.parse(JSON.parse(productString));
            return parsed?.map((p, i) => (
                <div key={i}>
                    <strong>{p.product?.name || "N/A"}</strong> (Qty: {p.quantity})
                </div>
            ));
        } catch (err) {
            return <span>Invalid product data</span>;
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return isNaN(date) ? "—" : date.toLocaleDateString("en-IN");
    };

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const renderPaginationButtons = () => {
        const pagesToShow = 3;
        let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
        let endPage = Math.min(startPage + pagesToShow - 1, totalPages);

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return (
            <div className="d-flex justify-content-center align-items-center mt-3 gap-2 flex-wrap">
                <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        className={`btn btn-sm ${currentPage === page ? "btn-dark" : "btn-outline-dark"}`}
                        onClick={() => setCurrentPage(page)}
                    >
                        {page}
                    </button>
                ))}
                <button
                    className="btn btn-sm btn-outline-dark"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        );
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Card Enquiries</h4>
                </div>
            </div>

            <section className="d-table">
                <div className="table-responsive">
                    <table className="table table-bordered table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>Sr. No.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Product</th>
                                <th>Total Price</th>
                                <th>Date</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentData.length > 0 ? (
                                currentData.map((item, index) => (
                                    <tr key={item.id || index}>
                                        <td>{startIndex + index + 1}</td>
                                        <td>{item.name || "—"}</td>
                                        <td>{item.email || "—"}</td>
                                        <td>{item.phone || "—"}</td>
                                        <td style={{ whiteSpace: "pre-line", maxWidth: 250 }}>
                                            {formatMessage(item.message)}
                                        </td>
                                        <td style={{ maxWidth: 250 }}>{parseProduct(item.product)}</td>
                                        <td>{item.totalPrice}</td>
                                        <td>{formatDate(item.create_date)}</td>
                                        <td>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleDelete(item.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="9" className="text-center">
                                        No enquiries found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {totalPages > 1 && renderPaginationButtons()}
            </section>
        </>
    );
};

export default AllCardEnquiry;
