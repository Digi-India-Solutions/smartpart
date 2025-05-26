"use client";

import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './allproducts.css';
import Link from 'next/link';
import HeroSection from '@/app/components/HeroSection/page';
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import debounce from "lodash.debounce";
import { toast } from "react-toastify";
import parse from 'html-react-parser';

const ProductCard = ({ image, name, product_description, part_no, id }) => {
    const imgSrc = image?.startsWith("http") ? image : `${serverURL}/uploads/images/${image}`;
    const safeHtmlParse = (html) => {
        if (typeof html === 'string') return parse(html);
        return null;
    };
    return (
        <div className='AllProduct-card'>
            <div className='AllProductImg'>
                <Image
                    src={imgSrc}
                    layout="responsive"
                    width={300}
                    height={250}
                    alt={name}
                    className='Allproduct-image'
                />
            </div>
            <div className='Allproduct-info'>
                <h3>{name}</h3>
                <p className='Allproduct-details'>{safeHtmlParse(product_description)}</p>
                <p className='Allproduct-part'><strong>Part Number:</strong> {part_no}</p>
                <div className='Allproduct-actions'>
                    <Link href={`/pages/details-page/${id}`}>
                        <button className='btn btn-primary'>SHOP NOW</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Page = ({ id }) => {
    const [brand, setBrand] = useState(null);
    const [brandCategory, setBrandCategory] = useState([]);
    const [allBrand, setAllBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState(id || "");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 10;

    const fetchBrand = async () => {
        const res = await getData(`brand/get-all-brand-by-id/${id}`);
        if (res.status) setBrand(res?.data);
    };


    const fetchBrandCategories = async () => {
        const res = await getData(`brandCategory/get-all-brand-category`);
        if (res.status) setBrandCategory(res?.data);
    };

    const fetchAllBrand = async () => {
        const res = await getData("brand/get-all-brand");
        if (res.status) setAllBrand(res?.data);
    };

    const fetchCategories = async () => {
        const res = await getData('category/get-all-categorys');
        if (res.status) setCategory(res?.data);
    };

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
            toast.error("Error fetching products");
        } finally {
            setLoading(false);
        }
    };

    console.log("XXXXXXXXXXXXXXXX:--", products)
    useEffect(() => {
        if (id) fetchBrand();
        fetchBrandCategories();
        fetchAllBrand();
        fetchCategories();
    }, [id]);

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

    const handleCategoryToggle = (catId) => {
        setSearchTerm(catId);
        debouncedSearch(catId);
        setSelectedCategories((prev) =>
            prev.includes(catId)
                ? prev.filter((id) => id !== catId)
                : [...prev, catId]
        );
    };

    const renderPagination = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            if (
                i === 1 || i === totalPages ||
                (i >= currentPage - 2 && i <= currentPage + 2)
            ) {
                pages.push(i);
            }
        }

        return (
            <div className="pagination d-flex justify-content-center gap-2 flex-wrap mb-5">
                <button
                    className="btn btn-outline-light"
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {pages.map((page) => (
                    <button
                        key={page}
                        className={`btn ${page === currentPage ? "btn-light text-dark" : "btn-outline-light"}`}
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
        );
    };


    // const getCategoryCounts = () => {
    //     const counts = {};

    //     products.forEach(product => {
    //         if (Array.isArray(product?.brand)) {
    //             product?.brand?.forEach(catId => {
    //                 counts[catId] = (counts[catId] || 0) + 1;
    //             });
    //         } else if (product?.category_id) {
    //             // fallback for single category field
    //             const catId = product.category_id;
    //             counts[catId] = (counts[catId] || 0) + 1;
    //         }
    //     });

    //     return counts;
    // };

    // const categoryCounts = useMemo(() => getCategoryCounts(), [products]);

    return (
        <>
            <HeroSection />
            <section className="DynamicProductSec bg-black pt-3">
                <div className="container">
                    <h2 className="mb-4 text-center">
                        All Products of <span className="text-theme bouncing-text">{brand?.name}</span>
                    </h2>
                    <div className="row">
                        <div className="col-md-12 mb-5" key={brand?.id}>
                            <div className="card h-100 shadow-sm">
                                <div className="blogingSec">
                                    <div className="card-body">
                                        <h3 className="card-title text-center text-primary">{brand?.top_title}</h3>
                                        <p className="card-text" style={{ whiteSpace: "pre-line" }}>{brand?.top_des}</p>
                                        <Link href="/pages/contact-us" className="btn btn-outline-primary mt-3">Continue Reading →</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="All-pageSec bg-black">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <aside className="AllSecfilters">
                                <h2>Filters</h2>
                                <div className="AllSecfilter-section">
                                    <h3>Brand Category</h3>
                                    <div className="filter-scroll">
                                        {brandCategory?.map((item) => (
                                            <label key={item.id} className="AllSecfilter-option">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(item.id)}
                                                    onChange={() => handleCategoryToggle(item?.id)}
                                                />
                                                {item?.name}
                                                {/* ({categoryCounts[item?.id] || 0}) */}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="AllSecfilter-section">
                                        <h3>Brand</h3>
                                        <div className="filter-scroll">
                                            {allBrand?.map((item) => (
                                                <label key={item.id} className="AllSecfilter-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(item.id)}
                                                        onChange={() => handleCategoryToggle(item?.id)}
                                                    />
                                                    {item?.name}
                                                    {/* ({categoryCounts[item?.id] || 0}) */}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="AllSecfilter-section">
                                        <h3>Category</h3>
                                        <div className="filter-scroll">
                                            {category?.map((item) => (
                                                <label key={item.id} className="AllSecfilter-option">
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCategories.includes(item.id)}
                                                        onChange={() => handleCategoryToggle(item?.id)}
                                                    />
                                                    {item?.name}
                                                    {/* ({categoryCounts[item?.id] || 0}) */}
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* <div className="AllSecfilter-section">
                                    <h3>Class</h3>
                                    {["Air / Electrical Horn", "Bellow"].map((label, i) => (
                                        <label key={i} className="AllSecfilter-option">
                                            <input type="checkbox" /> {label} (100)
                                        </label>
                                    ))}
                                </div> */}
                            </aside>
                        </div>

                        <div className="col-lg-9 col-md-8">
                            <section className="AllProduct-section pt-3">
                                <div className="inputSec mb-3">
                                    <input
                                        className="search-input"
                                        onChange={handleSearchChange}
                                        type="text"
                                        placeholder="Product Code / Name"
                                    />
                                </div>

                                <div className="Allproducts-grid">
                                    {loading ? (
                                        <p className="text-light">Loading...</p>
                                    ) : products.length > 0 ? (
                                        products.map((product) => (
                                            <ProductCard key={product.id} {...product} />
                                        ))
                                    ) : (
                                        <p className="text-light">No products found.</p>
                                    )}
                                </div>

                                {renderPagination()}
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;


// "use client";

// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import parse from 'html-react-parser';
// import debounce from "lodash.debounce";
// import { toast } from "react-toastify";
// import HeroSection from '@/app/components/HeroSection/page';
// import { getData, serverURL } from '@/app/services/FetchNodeServices';
// import './allproducts.css';

// const ProductCard = ({ image, name, product_description, part_no, id }) => {
//     const imgSrc = image?.startsWith("http") ? image : `${serverURL}/uploads/images/${image}`;

//     return (
//         <div className='AllProduct-card'>
//             <div className='AllProductImg'>
//                 <Image
//                     src={imgSrc}
//                     layout="responsive"
//                     width={300}
//                     height={250}
//                     alt={name}
//                     className='Allproduct-image'
//                 />
//             </div>
//             <div className='Allproduct-info'>
//                 <h3>{name}</h3>
//                 <p className='Allproduct-details'>{parse(product_description || "")}</p>
//                 <p className='Allproduct-part'><strong>Part Number:</strong> {part_no}</p>
//                 <div className='Allproduct-actions'>
//                     <Link href={`/pages/details-page/${id}`}>
//                         <button className='btn btn-primary'>SHOP NOW</button>
//                     </Link>
//                 </div>
//             </div>
//         </div>
//     );
// };

// const Page = ({ id }) => {
//     const [brand, setBrand] = useState(null);
//     const [brandCategory, setBrandCategory] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState(id || "");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const itemsPerPage = 10;

//     // Fetch Brand
//     useEffect(() => {
//         if (!id) return;
//         const fetchBrand = async () => {
//             const res = await getData(`brand/get-all-brand-by-id/${id}`);
//             if (res.status) setBrand(res.data);
//         };
//         fetchBrand();
//     }, [id]);

//     // Fetch Brand Categories
//     useEffect(() => {
//         const fetchBrandCategories = async () => {
//             const res = await getData(`brandCategory/get-all-brand-category`);
//             if (res.status) setBrandCategory(res.data);
//         };
//         fetchBrandCategories();
//     }, []);

//     const fetchProducts = async (search = searchTerm, page = currentPage) => {
//         try {
//             setLoading(true);
//             const categoryParam = selectedCategories.join(",");
//             const query = categoryParam ? `${search}&category=${categoryParam}` : search;
//             const res = await getData(`product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${query}`);

//             if (res.status) {
//                 setProducts(res.data || []);
//                 setTotalPages(res.totalPages || 1);
//             } else {
//                 toast.error("Failed to fetch product data");
//             }
//         } catch (error) {
//             console.error("API Fetch Error:", error);
//             toast.error("Error fetching products");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchProducts();
//     }, [currentPage, selectedCategories]);

//     const debouncedSearch = useCallback(
//         debounce((query) => {
//             setCurrentPage(1);
//             fetchProducts(query, 1);
//         }, 500),
//         [selectedCategories]
//     );

//     const handleSearchChange = (e) => {
//         const val = e.target.value;
//         setSearchTerm(val);
//         debouncedSearch(val);
//     };

//     const handleCategoryToggle = (catId) => {
//         const updated = selectedCategories.includes(catId)
//             ? selectedCategories.filter(id => id !== catId)
//             : [...selectedCategories, catId];

//         setSelectedCategories(updated);
//         setCurrentPage(1);
//     };

//     const renderPagination = () => {
//         const pages = [];
//         for (let i = 1; i <= totalPages; i++) {
//             if (
//                 i === 1 || i === totalPages ||
//                 (i >= currentPage - 2 && i <= currentPage + 2)
//             ) {
//                 pages.push(i);
//             }
//         }

//         return (
//             <div className="pagination d-flex justify-content-center gap-2 flex-wrap mb-5">
//                 <button
//                     className="btn btn-outline-light"
//                     onClick={() => setCurrentPage((prev) => prev - 1)}
//                     disabled={currentPage === 1}
//                 >
//                     Previous
//                 </button>

//                 {pages.map((page) => (
//                     <button
//                         key={page}
//                         className={`btn ${page === currentPage ? "btn-light text-dark" : "btn-outline-light"}`}
//                         onClick={() => setCurrentPage(page)}
//                     >
//                         {page}
//                     </button>
//                 ))}

//                 <button
//                     className="btn btn-outline-light"
//                     onClick={() => setCurrentPage((prev) => prev + 1)}
//                     disabled={currentPage === totalPages}
//                 >
//                     Next
//                 </button>
//             </div>
//         );
//     };

//     return (
//         <>
//             <HeroSection />
//             <section className="DynamicProductSec bg-black pt-3">
//                 <div className="container">
//                     <h2 className="mb-4 text-center">
//                         All Products of <span className="text-theme bouncing-text">{brand?.name}</span>
//                     </h2>

//                     {brand && (
//                         <div className="card h-100 shadow-sm mb-5">
//                             <div className="card-body text-center">
//                                 <h3 className="card-title text-primary">{brand.top_title}</h3>
//                                 <p className="card-text" style={{ whiteSpace: "pre-line" }}>{brand.top_des}</p>
//                                 <Link href="/pages/contact-us" className="btn btn-outline-primary mt-3">Continue Reading →</Link>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </section>

//             <section className="All-pageSec bg-black">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-3 col-md-4">
//                             <aside className="AllSecfilters">
//                                 <h2>Filters</h2>
//                                 <div className="AllSecfilter-section">
//                                     <h3>Category</h3>
//                                     <div className="filter-scroll">
//                                         {brandCategory.map((item) => (
//                                             <label key={item.id} className="AllSecfilter-option">
//                                                 <input
//                                                     type="checkbox"
//                                                     checked={selectedCategories.includes(item.id)}
//                                                     onChange={() => handleCategoryToggle(item.id)}
//                                                 />
//                                                 {item.name} ({item.productCount || 0})
//                                             </label>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </aside>
//                         </div>

//                         <div className="col-lg-9 col-md-8">
//                             <section className="AllProduct-section pt-3">
//                                 <div className="inputSec mb-3">
//                                     <input
//                                         className="search-input"
//                                         onChange={handleSearchChange}
//                                         type="text"
//                                         placeholder="Search by Product Code or Name"
//                                         value={searchTerm}
//                                     />
//                                 </div>

//                                 <div className="Allproducts-grid">
//                                     {loading ? (
//                                         <p className="text-light">Loading...</p>
//                                     ) : products.length > 0 ? (
//                                         products.map((product) => (
//                                             <ProductCard key={product.id} {...product} />
//                                         ))
//                                     ) : (
//                                         <p className="text-light">No products found.</p>
//                                     )}
//                                 </div>

//                                 {renderPagination()}
//                             </section>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         </>
//     );
// };

// export default Page;
