// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Swal from "sweetalert2";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { getData } from "../../services/FetchNodeServices";

// const AllProduct = () => {
//   const [data, setData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;



//   const getApiData = async () => {
//     // try {
//       const res = await getData(`product/get-all-product?${currentPage }&${itemsPerPage}`);
//       console.log("Product Data:", res);
//       if (res.status) {
//         setData(res.data);
//       }
//     // } catch (error) {
//     //   console.error(error);
//     //   toast.error("Failed to fetch product data");
//     // }
//   };

//   useEffect(() => {
//     getApiData();
//   }, []);

//   const deleteRecord = async (_id) => {
//     const confirm = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes, delete it!",
//     });

//     if (confirm.isConfirmed) {
//       try {
//         const res = await getData(`product/delete-product/${_id}`);
//         if (res.status === 200) {
//           toast.success("Product deleted successfully");
//           getApiData();
//         } else {
//           toast.error("Failed to delete product");
//         }
//       } catch (error) {
//         console.error(error);
//         toast.error("Something went wrong while deleting");
//       }
//     }
//   };


//   return (
//     <>
//       <ToastContainer />
//       <div className="bread">
//         <div className="head">
//           <h4>All Product List </h4>
//         </div>
//         <div className="links">
//           <Link to="/add-product" className="add-new">
//             Add New <i class="fa-solid fa-plus"></i>
//           </Link>
//         </div>
//       </div>

//       <div className="filteration">
//         <div className="selects">
//           {/* <select>
//                         <option>Ascending Order </option>
//                         <option>Descending Order </option>
//                     </select> */}
//         </div>
//         <div className="search">
//           <label htmlFor="search">Search </label> &nbsp;
//           <input type="text" name="search" id="search" />
//         </div>
//       </div>

//       <section className="d-table ">
//         <table class="table table-bordered table-striped table-hover">
//           <thead>
//             <tr>
//               <th scope="col">Sr.No.</th>
//               <th scope="col" style={{ width: "300px" }}>Product Name</th>
//               <th scope="col">Category</th>
//               <th scope="col">Subcategory</th>
//               <th scope="col">Image1</th>
//               <th scope="col">Part Number/Code</th>
//               <th scope="col">Edit</th>
//               <th scope="col">Delete</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((item, index) => (
//               <tr key={index}>
//                 <td>{indexOfFirstItem + index + 1}</td>
//                 <td>{item.productname}</td>
//                 <td>{item.categoryname}</td>
//                 <td>{item.subcategoryName}</td>
//                 <td>
//                   <a
//                     href={
//                       item.image1?.includes("cloudinary")
//                         ? item.image1
//                         : `https://api.maasavitrinursingcollege.com/${item.image1}`
//                     }
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <img
//                       src={
//                         item.image1?.includes("cloudinary")
//                           ? item.image1
//                           : `https://api.maasavitrinursingcollege.com/${item.image1}`
//                       }
//                       alt=""
//                       style={{ height: 50 }}
//                     />
//                   </a>
//                 </td>
//                 <td>
//                   <a
//                     href={
//                       item.image2?.includes("cloudinary")
//                         ? item.image2
//                         : `https://api.maasavitrinursingcollege.com/${item.image2}`
//                     }
//                     target="_blank"
//                     rel="noopener noreferrer"
//                   >
//                     <img
//                       src={
//                         item.image2?.includes("cloudinary")
//                           ? item.image2
//                           : `https://api.maasavitrinursingcollege.com/${item.image2}`
//                       }
//                       alt=""
//                       style={{ height: 50 }}
//                     />
//                   </a>
//                 </td>
//                 <td>
//                   <Link className="bt edit" to={`/edit-product/${item.id}`}>
//                     Edit <i class="fa-solid fa-pen-to-square"></i>
//                   </Link>
//                 </td>
//                 <td>
//                   <Link
//                     className="bt delete"
//                     onClick={() => deleteRecord(item.id)}
//                   >
//                     Delete <i class="fa-solid fa-trash"></i>
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <Pagination
//           itemsPerPage={itemsPerPage}
//           totalItems={data.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       </section>
//     </>
//   );
// };

// const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
//   const pageNumbers = [];

//   for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
//     pageNumbers.push(i);
//   }

//   return (
//     <nav>
//       <ul className="pagination">
//         {pageNumbers.map((number) => (
//           <li
//             key={number}
//             className={`page-item ${currentPage === number ? "active" : ""}`}
//           >
//             <Link
//               onClick={() => paginate(number)}
//               to="/all-products"
//               className="page-link"
//             >
//               {number}
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </nav>
//   );
// };

// export default AllProduct;

import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getData, serverURL } from "../../services/FetchNodeServices";
import debounce from "lodash.debounce";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const getApiData = async (search = searchTerm, page = currentPage) => {
    try {
      const res = await getData(
        // `product/get-all-product?page=${currentPage}&limit=${itemsPerPage}`
        `product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${search}`
      );
      console.log("Product Data:GGGGGGGGGG", res.data);
      if (res.status) {
        setProducts(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        toast.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      toast.error("Something went wrong while fetching products");
    }
  };

  useEffect(() => {
    getApiData();
  }, [currentPage, searchTerm]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setCurrentPage(1);
      getApiData(query, 1);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  const deleteRecord = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await getData(`product/delete-product/${id}`);
        if (res.status === true) {
          toast.success("Product deleted successfully");
          getApiData();
        } else {
          toast.error("Failed to delete product");
        }
      } catch (error) {
        console.error(error);
        toast.error("Error while deleting product");
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="bread">
        <div className="head">
          <h4>All Product List</h4>
        </div>
        <div className="links">
          <Link to="/add-product" className="add-new">
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
          <input type="text" onChange={handleSearchChange} name="search" id="search" />
        </div>
      </div>

      <section className="d-table">
        <table className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <th>Sr.No.</th>
              <th style={{ width: "300px" }}>Product Name</th>
              <th>Brand Name</th>
              <th>Part No.</th>
              <th>Image</th>
              {/* <th>Price (Rs)</th>
              <th>Special Price (Rs)</th> */}
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={item.id}>
                  <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.brand_name}</td>
                  <td>{item.part_no}</td>
                  <td>
                    {/* 	https://www.smartpartsexports.com/uploads/product/1673873338_80839502ebe5edffa262.jpg*/}
                    <img
                      src={
                        item?.image
                          ? item?.image.includes("uploads/product")
                            ? `${serverURL}/${item?.image}`
                            : `${serverURL}/uploads/images/${item?.image}`
                          : " https://www.smartpartsexports.com"
                      }
                      alt="Product"
                      style={{ height: 50 }}
                    />
                  </td>
                  {/* <td>{item.price}</td>
                  <td>{item.special_price}</td> */}
                  <td>
                    <Link className="bt edit" to={`/edit-product/${item?.id}`}>
                      Edit <i className="fa-solid fa-pen-to-square"></i>
                    </Link>
                  </td>
                  <td>
                    <button className="bt delete" onClick={() => deleteRecord(item.id)}>
                      Delete <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </section>
    </>
  );
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxShown = 5;
    let start = Math.max(1, currentPage - Math.floor(maxShown / 2));
    let end = Math.min(totalPages, start + maxShown - 1);

    if (end - start < maxShown - 1) {
      start = Math.max(1, end - maxShown + 1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button onClick={() => onPageChange(currentPage - 1)} className="page-link">
            Previous
          </button>
        </li>
        {getPageNumbers().map((number) => (
          <li
            key={number}
            className={`page-item ${currentPage === number ? "active" : ""}`}
          >
            <button onClick={() => onPageChange(number)} className="page-link">
              {number}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
          <button onClick={() => onPageChange(currentPage + 1)} className="page-link">
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default AllProduct;
