import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, deleteData } from "../../services/FetchNodeServices";

const ITEMS_PER_PAGE = 10;

const AllEnquiry = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchEnquiries = async () => {
    try {
      const res = await getData("enquiry/get-all-enquiry");
      if (res?.status) {
        setData(res?.data || []);
      } else {
        toast.error("Failed to fetch enquiries.");
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error("Something went wrong while fetching enquiries.");
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this enquiry?")) return;

    try {
      const res = await getData(`enquiry/delete-enquiry/${id}`);
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

  const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = data.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPaginationButtons = () => {
    const pagesToShow = 3;
    let startPage = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
    let endPage = startPage + pagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - pagesToShow + 1, 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <div className="d-flex justify-content-center align-items-center mt-3 gap-2 flex-wrap">
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn btn-sm ${currentPage === page ? "btn-dark text-white" : "btn-outline-dark"}`}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          className="btn btn-sm btn-outline-dark"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return isNaN(date) ? "—" : date.toLocaleDateString("en-IN");
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Enquiries</h4>
        </div>
      </div>

      <section className="d-table">
        <div className="table-responsive">
          <table className="table table-bordered table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Sr. No.</th>
                <th>Name</th>
                <th>Subject</th>
                <th>City</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
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
                    <td>{item.subject || "—"}</td>
                    <td>{item.city || "—"}</td>
                    <td>{item.phone || "—"}</td>
                    <td>{item.email || "—"}</td>
                    <td
                      style={{
                        whiteSpace: "pre-line",
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        maxWidth: "250px",
                      }}
                    >
                      {item.message || "—"}
                    </td>
                    <td>{item.status ? "Active" : "Inactive"}</td>
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
                  <td colSpan="10" className="text-center">
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

export default AllEnquiry;
