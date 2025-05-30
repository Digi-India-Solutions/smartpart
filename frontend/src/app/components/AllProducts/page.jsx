// "use client";

// import Image from 'next/image';
// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import './allproducts.css';
// import Link from 'next/link';
// import HeroSection from '@/app/components/HeroSection/page';
// import { getData, serverURL } from '@/app/services/FetchNodeServices';
// import debounce from "lodash.debounce";
// import { toast } from "react-toastify";
// import parse from 'html-react-parser';
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import { useRouter, useSearchParams } from 'next/navigation';


// const FilterSection = ({ title, items, selectedIds, onToggle, defaultOpen = false }) => {
//     const [isOpen, setIsOpen] = useState(defaultOpen);

//     const toggleDrawer = () => setIsOpen((prev) => !prev);

//     return (
//         <div
//             className="filter-section mb-4"
//         >
//             <div
//                 className="filter-header d-flex justify-content-between align-items-center text-white"
//                 onClick={toggleDrawer}
//                 style={{ cursor: "pointer" }}
//                 aria-expanded={isOpen}
//                 role="button"
//                 tabIndex={0}
//                 onKeyDown={(e) => e.key === "Enter" && toggleDrawer()}
//             >
//                 <h5 className="mb-0">{title}</h5>
//                 {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//             </div>

//             {isOpen && (
//                 <div style={{
//                     maxHeight: 300,
//                     overflowY: "auto",
//                     overflowX: "hidden",
//                     scrollBehavior: "smooth",
//                     scrollbarWidth: "thin",
//                 }}
//                     className="filter-options mt-2 ps-2">
//                     {items?.map(({ id, name }) => (
//                         <label
//                             key={id}
//                             className="d-flex align-items-center mb-2 text-white"
//                             htmlFor={`${title}-${id}`}
//                         >
//                             <input
//                                 id={`${title}-${id}`}
//                                 type="checkbox"
//                                 checked={selectedIds.includes(id)}
//                                 onChange={() => onToggle(id)}
//                                 className="me-2"
//                             />
//                             {name}
//                         </label>
//                     ))}
//                 </div>
//             )}
//             <hr className="border-secondary mt-3 mb-2" />
//         </div>
//     );
// };


// const ProductCard = ({ image, name, product_description, part_no, id }) => {
//     const imgSrc = image?.startsWith("http") ? image : `${serverURL}/uploads/images/${image}`;
//     const safeHtmlParse = (html) => {
//         if (typeof html === 'string') return parse(html);
//         return null;
//     };
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
//                 <div className='Allproduct-details'>{safeHtmlParse(product_description)}</div>
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
//     const searchParams = useSearchParams();
//     const [brandCategory, setBrandCategory] = useState([]);
//     const [allBrand, setAllBrand] = useState([]);
//     const [category, setCategory] = useState([]);
//     const [filterAllBrand, setFilterAllBrand] = useState([]);
//     const [filterCategory, setFilterCategory] = useState([]);
//     const [brand, setBrand] = useState(id || '')

//     // Selected filters
//     const [selectedBrandCategory, setSelectedBrandCategory] = useState([]);
//     const [selectedBrands, setSelectedBrands] = useState([]);
//     const [selectedCategories, setSelectedCategories] = useState([]);

//     // Products & pagination states
//     const [products, setProducts] = useState([]);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [currentPage, setCurrentPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);
//     const [loading, setLoading] = useState(false);
//     const [title, setTitle] = useState('');
//     const [name, setName] = useState('');
//     const itemsPerPage = 10;


//     useEffect(() => {
//         const query = searchParams.get('query');
//         const title = searchParams.get('title');
//         const name = searchParams.get('name');
//         if (name) {
//             setName(name)
//         }
//         if (title) {
//             setTitle(title)
//         }
//         if (query) {
//             const decodedQuery = decodeURIComponent(query);
//             setSearchTerm(decodedQuery);
//             console.log('Search Term:', decodedQuery);
//         }
//     }, [searchParams]);

//     // Fetch helper
//     const fetchData = async (url, setter, errorMsg) => {
//         try {
//             const res = await getData(url);
//             if (res?.status) setter(res?.data);
//             else toast.error(errorMsg);
//         } catch (error) {
//             console.error(error);
//             toast.error(errorMsg);
//         }
//     };

//     // Fetch all filters on mount
//     useEffect(() => {
//         fetchData("brandCategory/get-all-brand-category", setBrandCategory, "Failed to load brand categories");
//         fetchData("brand/get-all-brand", setAllBrand, "Failed to load brands");
//         fetchData("category/get-all-categorys", setCategory, "Failed to load categories");
//         fetchData(`brand/get-all-brand-by-id/${id}`, setBrand, "Failed to load brand")
//     }, []);

//     useEffect(()=>{

//     },[])
//     // Build filter query string
//     const buildFilterQuery = (filters) => {
//         const queryParts = [];
//         if (filters.brandCategory.length) queryParts.push(`brandCategory=${filters.brandCategory.join(",")}`);
//         if (filters.brand.length) queryParts.push(`brand=${filters.brand.join(",")}`);
//         if (filters.category.length) queryParts.push(`category=${filters.category.join(",")}`);
//         return queryParts.length ? `&${queryParts.join("&")}` : "";
//     };

//     // Fetch products with filters, search and pagination
//     const fetchProducts = useCallback(
//         async (search = searchTerm, page = currentPage, filters = {
//             brandCategory: selectedBrandCategory,
//             brand: selectedBrands,
//             category: selectedCategories,
//         }) => {
//             setLoading(true);
//             try {
//                 const filterQuery = buildFilterQuery(filters);
//                 const res = await getData(
//                     filterQuery
//                         ? `product/search-product?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}${filterQuery}`
//                         : `product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${search}`
//                 );
//                 if (res.status) {
//                     setProducts(res.data || []);
//                     setTotalPages(res.totalPages || 1);
//                 } else {
//                     toast.error("Failed to fetch product data");
//                 }
//             } catch (error) {
//                 console.error("Fetch Error:", error);
//                 toast.error("Error fetching products");
//             } finally {
//                 setLoading(false);
//             }
//         },
//         [searchTerm, currentPage,
//             selectedBrandCategory,
//             selectedBrands, selectedCategories]
//     );

//     // Fetch products when filters, page or search change
//     useEffect(() => {
//         fetchProducts();
//     }, [fetchProducts]);

//     // Debounced search
//     const debouncedSearch = useMemo(() =>
//         debounce((query) => {
//             setCurrentPage(1);
//             fetchProducts(query, 1, {
//                 brandCategory: selectedBrandCategory,
//                 brand: selectedBrands,
//                 category: selectedCategories,
//             });
//         }, 500), [
//         selectedBrandCategory,
//         selectedBrands, selectedCategories, fetchProducts]);

//     const handleSearchChange = (e) => {
//         const val = e.target.value;
//         setSearchTerm(val);
//         debouncedSearch(val);
//     };

//     // Toggle handler for filters
//     const handleToggle = (filterType, id) => {
//         const updateSelected = (selected, setSelected) =>
//             selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];

//         switch (filterType) {
//             case "brandCategory":
//                 setSelectedBrandCategory((prev) => updateSelected(prev, setSelectedBrandCategory));
//                 break;
//             case "brand":
//                 setSelectedBrands((prev) => updateSelected(prev, setSelectedBrands));
//                 break;
//             case "category":
//                 setSelectedCategories((prev) => updateSelected(prev, setSelectedCategories));
//                 break;
//             default:
//                 break;
//         }
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
//             <HeroSection brandName={name} title={title} />
//             {id ? title === 'category' ? '' : <section className="DynamicProductSec bg-black pt-3">
//                 <div className="container">
//                     <h2 className="mb-4 text-center">
//                         All Products of <span className="text-theme bouncing-text">{brand?.name}</span>
//                     </h2>
//                     <div className="row">
//                         <div className="col-md-12 mb-5" key={brand?.id}>
//                             <div className="card h-100 shadow-sm">
//                                 <div className="blogingSec">
//                                     <div className="card-body">
//                                         <h3 className="card-title text-center text-primary">{brand?.top_title}</h3>
//                                         <p className="card-text" style={{ whiteSpace: "pre-line" }}>{brand?.top_des}</p>
//                                         <Link href="/pages/contact-us" className="btn btn-outline-primary mt-3">Continue Reading →</Link>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </section> : ''}

//             <section className="All-pageSec bg-black">
//                 <div className="container">
//                     <div className="row">
//                         <div className="col-lg-3 col-md-4">
//                             <aside className=" filters p-3 bg-dark rounded" style={{ marginTop: 40, height: "auto" }}>
//                                 <FilterSection
//                                     title="Brand Category"
//                                     items={brandCategory}
//                                     selectedIds={selectedBrandCategory}
//                                     onToggle={(id) => handleToggle("brandCategory", id)}
//                                     defaultOpen={false}  // <-- Add this
//                                 />
//                                 <FilterSection
//                                     title="Brand"
//                                     items={allBrand}
//                                     selectedIds={selectedBrands}
//                                     onToggle={(id) => handleToggle("brand", id)}
//                                     defaultOpen={false}
//                                 />
//                                 <FilterSection
//                                     title="Category"
//                                     items={category}
//                                     selectedIds={selectedCategories}
//                                     onToggle={(id) => handleToggle("category", id)}
//                                     defaultOpen={false}
//                                 />
//                             </aside>

//                         </div>

//                         <div className="col-lg-9 col-md-8">
//                             <section className="AllProduct-section pt-3">
//                                 <div className="inputSec mb-3">
//                                     <input
//                                         className="search-input"
//                                         onChange={handleSearchChange}
//                                         type="text"
//                                         placeholder="Product Code / Name"
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
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useRouter, useSearchParams } from 'next/navigation';


const FilterSection = ({ title, items, selectedIds, onToggle, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    const toggleDrawer = () => setIsOpen((prev) => !prev);

    return (
        <div
            className="filter-section mb-4"
        >
            <div
                className="filter-header d-flex justify-content-between align-items-center text-white"
                onClick={toggleDrawer}
                style={{ cursor: "pointer" }}
                aria-expanded={isOpen}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && toggleDrawer()}
            >
                <h5 className="mb-0">{title}</h5>
                {isOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>

            {isOpen && (
                <div style={{
                    maxHeight: 300,
                    overflowY: "auto",
                    overflowX: "hidden",
                    scrollBehavior: "smooth",
                    scrollbarWidth: "thin",
                }}
                    className="filter-options mt-2 ps-2">
                    {items?.map(({ id, name }) => (
                        <label
                            key={id}
                            className="d-flex align-items-center mb-2 text-white"
                            htmlFor={`${title}-${id}`}
                        >
                            <input
                                id={`${title}-${id}`}
                                type="checkbox"
                                checked={selectedIds.includes(id)}
                                onChange={() => onToggle(id)}
                                className="me-2"
                            />
                            {name}
                        </label>
                    ))}
                </div>
            )}
            <hr className="border-secondary mt-3 mb-2" />
        </div>
    );
};


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
                <div className='Allproduct-details'>{safeHtmlParse(product_description)}</div>
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
    const searchParams = useSearchParams();
    const [brandCategory, setBrandCategory] = useState([]);
    const [allBrand, setAllBrand] = useState([]);
    const [category, setCategory] = useState([]);
    const [filterAllBrand, setFilterAllBrand] = useState([]);
    const [filterCategory, setFilterCategory] = useState([]);
    const [brand, setBrand] = useState(id || '')

    // Selected filters
    const [selectedBrandCategory, setSelectedBrandCategory] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    // Products & pagination states
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState('');
    const [name, setName] = useState('');
    const itemsPerPage = 10;


    useEffect(() => {
        const query = searchParams.get('query');
        const title = searchParams.get('title');
        const name = searchParams.get('name');
        if (name) {
            setName(name)
        }
        if (title) {
            setTitle(title)
        }
        if (query) {
            const decodedQuery = decodeURIComponent(query);
            setSearchTerm(decodedQuery);
            console.log('Search Term:', decodedQuery);
        }
    }, [searchParams]);

    // Fetch helper
    const fetchData = async (url, setter, errorMsg) => {
        try {
            const res = await getData(url);
            if (res?.status) setter(res?.data);
            else toast.error(errorMsg);
        } catch (error) {
            console.error(error);
            toast.error(errorMsg);
        }
    };

    // Fetch all filters on mount
    useEffect(() => {
        fetchData("brandCategory/get-all-brand-category", setBrandCategory, "Failed to load brand categories");
        fetchData("brand/get-all-brand", setAllBrand, "Failed to load brands");
        fetchData("category/get-all-categorys", setCategory, "Failed to load categories");
        fetchData(`brand/get-all-brand-by-id/${id}`, setBrand, "Failed to load brand")
    }, []);

    useEffect(() => {
        setFilterAllBrand(selectedBrandCategory?.map((item) => allBrand?.filter((b) => b?.brand_cat_id === item)))
        // cat_id

        const brandCatIds = selectedBrands
            .map((item) => allBrand?.find((b) => b?.id === item)?.cat_id)
            .filter(Boolean).flatMap((str) => str.split(','));

        const matchedCategories = brandCatIds
            .flatMap((item) => item.split(','))
            .map((id) => parseInt(id)) // or just use `id` if your IDs are strings
            .map((id) => category.find((b) => b.id === id))
            .filter(Boolean);

        setFilterCategory(matchedCategories)
        console.log("XXXXXXXXX:-", matchedCategories)
        // console.log("XXXXXXXXX:-", selectedBrands)

    }, [allBrand, selectedBrandCategory, selectedBrands])
    // console.log("XXXXXXXXX:-", filterAllBrand[0])
    // Build filter query string
    const buildFilterQuery = (filters) => {
        const queryParts = [];
        if (filters.brandCategory.length) queryParts.push(`brandCategory=${filters.brandCategory.join(",")}`);
        if (filters.brand.length) queryParts.push(`brand=${filters.brand.join(",")}`);
        if (filters.category.length) queryParts.push(`category=${filters.category.join(",")}`);
        return queryParts.length ? `&${queryParts.join("&")}` : "";
    };

    // Fetch products with filters, search and pagination
    const fetchProducts = useCallback(
        async (search = searchTerm, page = currentPage, filters = {
            brandCategory: selectedBrandCategory,
            brand: selectedBrands,
            category: selectedCategories,
        }) => {
            setLoading(true);
            try {
                const filterQuery = buildFilterQuery(filters);
                const res = await getData(
                    filterQuery
                        ? `product/search-product?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}${filterQuery}`
                        : `product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${search}`
                );
                if (res.status) {
                    setProducts(res.data || []);
                    setTotalPages(res.totalPages || 1);
                } else {
                    toast.error("Failed to fetch product data");
                }
            } catch (error) {
                console.error("Fetch Error:", error);
                toast.error("Error fetching products");
            } finally {
                setLoading(false);
            }
        },
        [searchTerm, currentPage,
            selectedBrandCategory,
            selectedBrands, selectedCategories]
    );

    // Fetch products when filters, page or search change
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Debounced search
    const debouncedSearch = useMemo(() =>
        debounce((query) => {
            setCurrentPage(1);
            fetchProducts(query, 1, {
                brandCategory: selectedBrandCategory,
                brand: selectedBrands,
                category: selectedCategories,
            });
        }, 500), [
        selectedBrandCategory,
        selectedBrands, selectedCategories, fetchProducts]);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        debouncedSearch(val);
    };

    // Toggle handler for filters
    const handleToggle = (filterType, id) => {
        const toggleSingleSelect = (selected, setSelected) => {
            if (selected[0] === id) {
                setSelected([]); // Deselect if already selected
            } else {
                setSelected([id]); // Only one selected at a time
            }
        };

        switch (filterType) {
            case "brandCategory":
                toggleSingleSelect(selectedBrandCategory, setSelectedBrandCategory);
                break;
            case "brand":
                toggleSingleSelect(selectedBrands, setSelectedBrands);
                break;
            case "category":
                toggleSingleSelect(selectedCategories, setSelectedCategories);
                break;
            default:
                break;
        }

        setCurrentPage(1);
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


    return (
        <>
            <HeroSection brandName={name} title={title} />
            {id ? title === 'category' ? '' : <section className="DynamicProductSec bg-black pt-3">
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
            </section> : ''}

            <section className="All-pageSec bg-black">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4">
                            <aside className=" filters p-3 bg-dark rounded" style={{ marginTop: 40, height: "auto" }}>
                                <FilterSection
                                    title="Brand Category"
                                    items={brandCategory}
                                    selectedIds={selectedBrandCategory}
                                    onToggle={(id) => handleToggle("brandCategory", id)}
                                    defaultOpen={false}  // <-- Add this
                                />
                                <FilterSection
                                    title="Brand"
                                    // items={allBrand}
                                    items={filterAllBrand[0]}
                                    selectedIds={selectedBrands}
                                    onToggle={(id) => handleToggle("brand", id)}
                                    defaultOpen={false}
                                />
                                <FilterSection
                                    title="Category"
                                    items={filterCategory}
                                    selectedIds={selectedCategories}
                                    onToggle={(id) => handleToggle("category", id)}
                                    defaultOpen={false}
                                />
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