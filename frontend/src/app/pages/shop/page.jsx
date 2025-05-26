// "use client"
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { FaHeart, FaShoppingCart } from 'react-icons/fa';
// import './shop.css';
// import pic1 from '@/app/assets/products/item1.jpg';
// import Link from 'next/link';
// import HeroSection from '@/app/components/HeroSection/page';
// import { getData, serverURL } from '@/app/services/FetchNodeServices';

// const ProductCard = ({ image, name, details,   part_no, index }) => {
//   return (
//     <div className='ShopProduct-card'>
//       <div className='ShopProductImg'>
//         {/* <Image src={image} layout='responsive' width={300} height={250} alt='productimg' className='product-image' /> */}
//         <Image className='product-image' layout='responsive' src={`${serverURL}/uploads/images/${image}` || image || `${serverURL}/${image}`} width={300} height={250} alt={name} />
//       </div>
//       <div className='Shopproduct-info'>
//         <h3>{name}</h3>
//         <p className='shopproduct-details'>{details}</p>
//         <p className='shopproduct-part'><strong>Part Number:</strong> { part_no}</p>
//         <div className='shopproduct-actions'>
//           <Link href={`/pages/details-page/${index + 1}`}>
//             <button className='btn btn-primary'>SHOP NOW</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// const ShopPage = () => {
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const itemsPerPage = 10;
  
//   const getApiData = async () => {
//     try {
//       const res = await getData(
//         `product/get-all-product?page=${currentPage}&limit=${itemsPerPage}&searchTerm=${searchTerm}`
//       );
//       console.log("Product Data:FRONTEND", res.data);
//       if (res.status) {
//         setProducts(res.data || []);
//         setTotalPages(res.totalPages || 1);
//       } else {
//         toast.error("Failed to fetch product data");
//       }
//     } catch (error) {
//       console.error("API Fetch Error:", error);
//       toast.error("Something went wrong while fetching products");
//     }
//   };

//   useEffect(() => {
//     getApiData();
//   }, [currentPage, searchTerm]);

//   return (
//     <>
//       <HeroSection />
//       <section className='shop-pageSec  bg-black'>
//         <div className='container '>
//           <div className='row '>
//             <div className='col-lg-3 col-md-4'>
//               <aside className='filters '>
//                 <h2>Filters</h2>
//                 <div className='filter-section'>
//                   <h3>Origin</h3>
//                   <label className='filter-option'>
//                     <input type='checkbox' /> Aftermarket (100)
//                   </label>
//                   <label className='filter-option'>
//                     <input type='checkbox' /> OEM (100)
//                   </label>
//                 </div>
//                 <div className='filter-section'>
//                   <h3>Class</h3>
//                   <label className='filter-option'>
//                     <input type='checkbox' /> Air / Electrical Horn (100)
//                   </label>
//                   <label className='filter-option'>
//                     <input type='checkbox' /> Bellow (100)
//                   </label>
//                 </div>
//               </aside>
//             </div>
//             <div className='col-lg-9 col-md-8'>
//               <section className='ShopProduct-section pt-3'>
//                 <div className='inputSec'>
//                   <input className='search-input' onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Product Code / Name" />
//                 </div>
//                 <div className='shopproducts-grid'>
//                   {products.map((product, index) => (
//                     <ProductCard key={product.id} {...product} index={index} />
//                   ))}
//                 </div>
//                 <div className="pagination mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap mb-5">
//                      <button    className="btn btn-outline-light"    onClick={() => setCurrentPage(currentPage - 1)}    disabled={currentPage === 1}  >
//                            Previous
//                       </button>

//   {Array.from({ length: totalPages }, (_, i) => i + 1)
//     .filter((page) => {
//       if (totalPages <= 5) return true;
//       if (currentPage <= 3) return page <= 5;
//       if (currentPage >= totalPages - 2) return page >= totalPages - 4;
//       return Math.abs(currentPage - page) <= 2;
//     })
//     .map((page) => (
//       <button
//         key={page}
//         className={`btn ${
//           page === currentPage ? 'btn-light text-dark' : 'btn-outline-light'
//         }`}
//         onClick={() => setCurrentPage(page)}
//       >
//         {page}
//       </button>
//     ))}

//   <button
//     className="btn btn-outline-light"
//     onClick={() => setCurrentPage(currentPage + 1)}
//     disabled={currentPage === totalPages}
//   >
//     Next
//   </button>
// </div>
//               </section>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ShopPage;

"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import debounce from "lodash.debounce";
import HeroSection from "@/app/components/HeroSection/page";
import { getData, serverURL } from "@/app/services/FetchNodeServices";
import "./shop.css";
import { toast } from "react-toastify";

const ProductCard = ({ image, name, details, part_no, id }) => {
  const imgSrc = image?.startsWith("http")
    ? image
    : `${serverURL}/uploads/images/${image}`;

  return (
    <div className="ShopProduct-card">
      <div className="ShopProductImg">
        <Image
          src={imgSrc}
          layout="responsive"
          width={300}
          height={250}
          alt={name}
          className="product-image"
        />
      </div>
      <div className="Shopproduct-info">
        <h3>{name}</h3>
        <p className="shopproduct-details">{details}</p>
        <p className="shopproduct-part">
          <strong>Part Number:</strong> {part_no}
        </p>
        <div className="shopproduct-actions">
          <Link href={`/pages/details-page/${id}`}>
            <button className="btn btn-primary">SHOP NOW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;

  const fetchProducts = async (search = searchTerm, page = currentPage) => {
    try {
      setLoading(true);
      const res = await getData(
        `product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${search}`
      );
      if (res.status) {
        setProducts(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        toast.error("Failed to fetch product data");
      }
    } catch (error) {
      console.error("API Fetch Error:", error);
      toast.error("Something went wrong while fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const debouncedSearch = useCallback(
    debounce((query) => {
      setCurrentPage(1);
      fetchProducts(query, 1);
    }, 500),
    []
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  return (
    <>
      <HeroSection />
      <section className="shop-pageSec bg-black">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-4">
              <aside className="filters">
                <h2>Filters</h2>
                <div className="filter-section">
                  <h3>Origin</h3>
                  <label className="filter-option">
                    <input type="checkbox" /> Aftermarket (100)
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" /> OEM (100)
                  </label>
                </div>
                <div className="filter-section">
                  <h3>Class</h3>
                  <label className="filter-option">
                    <input type="checkbox" /> Air / Electrical Horn (100)
                  </label>
                  <label className="filter-option">
                    <input type="checkbox" /> Bellow (100)
                  </label>
                </div>
              </aside>
            </div>

            {/* Products Section */}
            <div className="col-lg-9 col-md-8">
              <section className="ShopProduct-section pt-3">
                <div className="inputSec">
                  <input
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    type="text"
                    placeholder="Search Product Name / SKU"
                  />
                </div>

                {loading ? (
                  <p className="text-white mt-4">Loading products...</p>
                ) : (
                  <div className="shopproducts-grid">
                    {products.length > 0 ? (
                      products.map((product) => (
                        <ProductCard key={product.id} {...product} />
                      ))
                    ) : (
                      <p className="text-white mt-4">No products found.</p>
                    )}
                  </div>
                )}

                {/* Pagination */}
                <div className="pagination mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap mb-5">
                  <button
                    className="btn btn-outline-light"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((page) => {
                      if (totalPages <= 5) return true;
                      if (currentPage <= 3) return page <= 5;
                      if (currentPage >= totalPages - 2)
                        return page >= totalPages - 4;
                      return Math.abs(currentPage - page) <= 2;
                    })
                    .map((page) => (
                      <button
                        key={page}
                        className={`btn ${
                          page === currentPage
                            ? "btn-light text-dark"
                            : "btn-outline-light"
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    ))}

                  <button
                    className="btn btn-outline-light"
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;




// import Image from 'next/image';
// import React from 'react';
// import { FaHeart, FaShoppingCart } from 'react-icons/fa';
// import './shop.css';
// import pic1 from '@/app/assets/products/item1.jpg'
// import Link from 'next/link';
// import HeroSection from '@/app/components/HeroSection/page';

// const products = [
//   { id: 1, image: pic1, name: 'RADIATOR ASSY: 253100X060', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
//   { id: 2, image: pic1, name: 'STRUT ASSY-FR,RH: 546600X100', details: 'Mobis (Hyundai, Kia) 546600X100', part: '546600X100' },
//   { id: 3, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 4, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 5, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 6, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 7, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 8, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
// ];

// const ProductCard = ({ image, name, details, part,index }) => {
//   return (
// <>    
//     <div className='product-card bg-dark'>
//       <Image src={image} width={250} height={250} alt='productimg' className='product-image' />
//       <div className='product-info'>
//         <h3>{name}</h3>
//         <p className='text-light'>{details}</p>
//         <p className='text-primary'><strong>Part Number:</strong> {part}</p>
//         <div className='product-actions '>
//        <Link href={`/pages/details-page/${index+1}`}> <button className='btn btn-light w-100 m-1 '>SHOP NOW</button> </Link>
//           {/* <FaHeart className=' wishlist-icon ' /> */}
//         </div>
//       </div>
//     </div>
//     </>

//   );
// };

// const ShopPage = () => {
//   return (
//    <>
//    <HeroSection/>

//      <section className='bg-black'>
//      <div className='container'>
//       <div className='shop-container  d-flex'>
//         <aside className='filters bg-dark'>
//             <h2>Filters</h2>
//             <div>
//           <h3>Origin</h3>
//           <label><input type='checkbox' /> Aftermarket (100)</label>
//           <label><input type='checkbox' /> OEM (100)</label>
//             </div>
//             <div>
//           <h3>Class</h3>
//           <label><input type='checkbox' /> Air / Electrical Horn (100)</label>
//           <label><input type='checkbox' /> Bellow (100)</label>
//         </div>
//         <div>
//           {/* <h3>Price</h3>
//           <input type='range' min='0' max='9000' step='50' /> */}
//         </div>
//       </aside>

//       <section className='ProductSec'>
//             <div className='inputSec'>
//               <input  className='form-control w-25' type="text" placeholder="Product Code / Name " />
//             </div>
//             <div className='d-flex product-section'>
//         {products.map((product,index) => (
//           <ProductCard key={product.id} {...product} index={index} />
//         ))}
//         </div>
//       </section>
//     </div>
//       </div>

//      </section>
   
//    </>
//   );
// };

// export default ShopPage;





















// "use client";

// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { FaHeart } from 'react-icons/fa';
// import './shop.css';
// import pic1 from '@/app/assets/products/item1.jpg';
// import Link from 'next/link';
// import HeroSection from '@/app/components/HeroSection/page'; // fixed import

// // Static product list (you can remove this if using API products only)
 
// const ProductCard = ({ image, title, price, category, index }) => {
//   return (
//     <div className='product-card bg-dark'>
//       <Image src={image} width={250} height={250} alt='productimg' className='product-image' />
//       <div className='product-info'>
//         <h3 className='line-clamp-2'>{title}</h3>
//         <p>{category}</p>
//         <p><strong>Part Number:</strong> {price}</p>
//         <div className='product-actions'>
//           <Link href={`/pages/details-page/${index + 1}`} className='btn btn-light w-100 m-1'>SHOP NOW</Link>
//           <FaHeart className='wishlist-icon' />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ShopPage = () => {
//   const [apiProducts, setApiProducts] = useState([]);


//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       console.log('Fetched data:', data);
//       setApiProducts(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <HeroSection />

//       <section className='bg-black'>
//         <div className='container'>
//           <div className='shop-container d-flex'>
// <div className='row'>
// <div className='col-md-3'>
// <aside className='filters bg-dark'>
//               <h2>Filters</h2>
//               <div>
//                 <h3>Origin</h3>
//                 <label><input type='checkbox' /> Aftermarket (100)</label>
//                 <label><input type='checkbox' /> OEM (100)</label>
//               </div>
//               <div>
//                 <h3>Class</h3>
//                 <label><input type='checkbox' /> Air / Electrical Horn (100)</label>
//                 <label><input type='checkbox' /> Bellow (100)</label>
//               </div>
//               {/* Uncomment and style if you want price filter */}
//               {/* <div>
//                 <h3>Price</h3>
//                 <input type='range' min='0' max='9000' step='50' />
//               </div> */}
//             </aside>

//                 </div>
//                <div className='col-md-9'>
//                <div className='row'>

//                   <div className='col-md-4'>
//                <form action="">
    
//                   <label htmlFor="validation01" className="form-label">Search by Product Name or Code </label>
//                   <input type="text" className="form-control is-valid mb-3" id="validation01" value="Mark"   onChange={(e) => setSearchValue(e.target.value)} placeholder='Product Name / Code' />
 
//            </form>

//                 </div>



//                     </div>

//                        <section className='product-section d-flex flex-wrap'>
                          
//                           {apiProducts.map((product, index) => (
//                             <ProductCard key={product.id} {...product} index={index} />
//                           ))}
//                         </section>
//                  </div>

//               </div>
  
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ShopPage;











