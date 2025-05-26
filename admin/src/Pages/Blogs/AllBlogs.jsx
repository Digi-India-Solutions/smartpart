import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData, postData, serverURL } from '../../services/FetchNodeServices';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // For showing limited page numbers in pagination (max 3)
  const [pageRange, setPageRange] = useState([1, 2, 3]);

  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getData('blog/get-all-blog');
      if (res.status) {
        setBlogs(res.data);
      } else {
        setError('Failed to fetch blogs');
      }
    } catch (err) {
      setError('Something went wrong while fetching blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog?')) return;

    try {
      const res = await getData(`blog/delete-blog/${id}`);
      if (res.status) {
        toast.success('Blog deleted successfully');
        setBlogs(prev => prev.filter(blog => blog.id !== id));
      } else {
        toast.error('Failed to delete blog');
      }
    } catch (err) {
      toast.error('Something went wrong while deleting blog');
    }
  };

  // Filter blogs by search term (title or descri)
  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (blog.descri && blog.descri.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBlogs.slice(indexOfFirstItem, indexOfLastItem);

  // Update pageRange on currentPage or totalPages change
  useEffect(() => {
    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(start + 2, totalPages);

    // Adjust start if less than 3 pages at the end
    if (end - start < 2) {
      start = Math.max(end - 2, 1);
    }

    setPageRange(
      Array.from({ length: end - start + 1 }, (_, i) => start + i)
    );
  }, [currentPage, totalPages]);

  // Pagination handlers
  const goToPage = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => goToPage(currentPage - 1);
  const handleNext = () => goToPage(currentPage + 1);

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Blogs</h4>
        </div>
        <div className="links">
          <Link to="/add-blog" className="add-new">
            Add New <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
      </div>


      <div className="filteration">
        <div className="selects">
          {/* <select>
                         <option>Ascending Order </option>
                         <option>Descending Order </option>
                     </select> */}
        </div>
        <div className="search">
          <label htmlFor="search">Search </label> &nbsp;
          <input type="text" name="search" id="search" value={searchTerm} onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1); }} placeholder="Search" />
        </div>
      </div>

      <section className="d-table">
        {loading ? (
          <p>Loading blogs...</p>
        ) : error ? (
          <p style={{ color: 'red' }}>{error}</p>
        ) : (
          <>
            <table className="table table-bordered table-striped table-hover">
              <thead>
                <tr>
                  <th>Sr.No.</th>
                  <th>Image</th>
                  <th>Title</th>
                  {/* <th>Description</th> */}
                  <th>Create Date</th>
                  <th>Status</th>
                  <th>Featured</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.length === 0 ? (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>
                      No blogs found
                    </td>
                  </tr>
                ) : (
                  currentItems.map((item, index) => (
                    <tr key={item.id}>
                      <th scope="row">{indexOfFirstItem + index + 1}</th>
                      <td>
                        <img src={`${serverURL}/uploads/images/${item.image}` || `${serverURL}/${item.image}`} alt="Blog Image" width={100} height={100} />
                      </td>
                      <td>{item?.title}</td>
                      {/* <td dangerouslySetInnerHTML={{ __html: item.descri || '' }}></td> */}
                      <td>{new Date(item.create_date).toLocaleDateString()}</td>
                      <td>{item.status ? 'Active' : 'Inactive'}</td>
                      <td>{item.featured ? 'Yes' : 'No'}</td>
                      <td>
                        <Link className="bt edit" to={`/edit-blog/${item.id}`}>
                          Edit <i className="fa-solid fa-pen-to-square"></i>
                        </Link>
                      </td>
                      <td>
                        <button
                          className="bt delete"
                          onClick={() => handleDelete(item.id)}
                          disabled={loading}
                        >
                          Delete <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Pagination controls */}
            <nav>
              <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handlePrev} disabled={currentPage === 1}>
                    Prev
                  </button>
                </li>

                {pageRange.map(pageNum => (
                  <li
                    key={pageNum}
                    className={`page-item ${currentPage === pageNum ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => goToPage(pageNum)}
                    >
                      {pageNum}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handleNext} disabled={currentPage === totalPages}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </section>
    </>
  );
};

export default AllBlogs;
