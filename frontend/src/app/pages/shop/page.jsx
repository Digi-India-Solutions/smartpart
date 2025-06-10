// "use client";

// import Image from "next/image";
// import React, { useEffect, useState, useCallback, useMemo } from "react";
// import { FaChevronDown, FaChevronUp } from "react-icons/fa";
// import Link from "next/link";
// import debounce from "lodash.debounce";
// import HeroSection from "@/app/components/HeroSection/page";
// import { getData, serverURL } from "@/app/services/FetchNodeServices";
// import { toast } from "react-toastify";
// import "./shop.css";
// import parse from 'html-react-parser';

// // Reusable FilterSection Component
// const FilterSection = ({ title, items, selectedIds, onToggle, defaultOpen = false }) => {
//   const [isOpen, setIsOpen] = useState(defaultOpen);

//   const toggleDrawer = () => setIsOpen((prev) => !prev);

//   return (
//     <div
//       className="filter-section mb-4"

//     >
//       <div
//         className="filter-header d-flex justify-content-between align-items-center text-white"
//         onClick={toggleDrawer}
//         style={{ cursor: "pointer" }}
//         aria-expanded={isOpen}
//         role="button"
//         tabIndex={0}
//         onKeyDown={(e) => e.key === "Enter" && toggleDrawer()}
//       >
//         <h5 className="mb-0">{title}</h5>
//         {isOpen ? <FaChevronUp /> : <FaChevronDown />}
//       </div>

//       {isOpen && (
//         <div style={{
//           maxHeight: 300,
//           overflowY: "auto",
//           overflowX: "hidden",
//           scrollBehavior: "smooth",
//           scrollbarWidth: "thin",
//         }}
//           className="filter-options mt-2 ps-2">
//           {items?.map(({ id, name }) => (
//             <label
//               key={id}
//               className="d-flex align-items-center mb-2 text-white"
//               htmlFor={`${title}-${id}`}
//             >
//               <input
//                 id={`${title}-${id}`}
//                 type="checkbox"
//                 checked={selectedIds.includes(id)}
//                 onChange={() => onToggle(id)}
//                 className="me-2"
//               />
//               {name}
//             </label>
//           ))}
//         </div>
//       )}
//       <hr className="border-secondary mt-3 mb-2" />
//     </div>
//   );
// };

// // Product Card Component
// const ProductCard = ({ image, name, product_description, part_no, id }) => {
//   const imgSrc = useMemo(
//     () => (image?.startsWith("http") ? image : `${serverURL}/uploads/images/${image}`),
//     [image]
//   );

//   const HtmlRenderer = (product_description) => {
//     const html = product_description;
//     // alert(html)
//     if (typeof html === 'string') {
//       return <>{parse(html)}</>;
//     }
//     return null;
//   };


//   return (
//     <article className="ShopProduct-card" aria-label={name}>
//       <div className="ShopProductImg">
//         <Image
//           src={imgSrc}
//           layout="responsive"
//           width={300}
//           height={250}
//           alt={name || "Product image"}
//           className="product-image"
//           priority={false}
//         />
//       </div>
//       <div className="Shopproduct-info">
//         <h3>{name}</h3>
//         <div className="shopproduct-details">{HtmlRenderer(product_description)}</div>
//         <div className="shopproduct-part">
//           <strong>Part Number:</strong> {part_no}
//         </div>
//         <div className="shopproduct-actions">
//           <Link href={`/pages/details-page/${id}`} passHref>
//             <button className="btn btn-primary">SHOP NOW</button>
//           </Link>
//         </div>
//       </div>
//     </article>
//   );
// };

// // Main ShopPage Component
// const ShopPage = () => {
//   // Filter data states
//   const [brandCategory, setBrandCategory] = useState([]);
//   const [allBrand, setAllBrand] = useState([]);
//   const [category, setCategory] = useState([]);
//   const [filterAllBrand, setFilterAllBrand] = useState([]);
//   const [filterCategory, setFilterCategory] = useState([]);

//   // Selected filters
//   const [selectedBrandCategory, setSelectedBrandCategory] = useState([]);
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);

//   // Products & pagination states
//   const [products, setProducts] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const itemsPerPage = 10;

//   // Fetch helper
//   const fetchData = async (url, setter, errorMsg) => {
//     try {
//       const res = await getData(url);
//       if (res.status) setter(res.data);
//       else toast.error(errorMsg);
//     } catch (error) {
//       console.error(error);
//       toast.error(errorMsg);
//     }
//   };

//   // Fetch all filters on mount
//   useEffect(() => {
//     fetchData("brandCategory/get-all-brand-category", setBrandCategory, "Failed to load brand categories");
//     fetchData("brand/get-all-brand", setAllBrand, "Failed to load brands");
//     fetchData("category/get-all-categorys", setCategory, "Failed to load categories");
//   }, []);

//   useEffect(() => {
//     setFilterAllBrand(selectedBrandCategory?.map((item) => allBrand?.filter((b) => b?.brand_cat_id === item)))

//     const brandCatIds = selectedBrands
//       .map((item) => allBrand?.find((b) => b?.id === item)?.cat_id)
//       .filter(Boolean).flatMap((str) => str.split(','));

//     const matchedCategories = brandCatIds
//       .flatMap((item) => item.split(','))
//       .map((id) => parseInt(id))
//       .map((id) => category.find((b) => b.id === id))
//       .filter(Boolean);

//     setFilterCategory(matchedCategories)

//   }, [allBrand, selectedBrandCategory, selectedBrands])

//   // Build filter query string
//   const buildFilterQuery = (filters) => {
//     const queryParts = [];
//     if (filters.brandCategory.length) queryParts.push(`brandCategory=${filters.brandCategory.join(",")}`);
//     if (filters.brand.length) queryParts.push(`brand=${filters.brand.join(",")}`);
//     if (filters.category.length) queryParts.push(`category=${filters.category.join(",")}`);
//     return queryParts.length ? `&${queryParts.join("&")}` : "";
//   };

//   // Fetch products with filters, search and pagination
//   const fetchProducts = useCallback(
//     async (search = searchTerm, page = currentPage, filters = {
//       brandCategory: selectedBrandCategory, brand: selectedBrands, category: selectedCategories,
//     }) => {
//       setLoading(true);
//       try {
//         const filterQuery = buildFilterQuery(filters);
//         const res = await getData(
//           filterQuery
//             ? `product/search-product?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search)}${filterQuery}`
//             : `product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${search}`
//         );
//         if (res?.status) {
//           setProducts(res.data || []);
//           setTotalPages(res.totalPages || 1);
//         } else {
//           toast.error("Failed to fetch product data");
//         }
//       } catch (error) {
//         console.error("Fetch Error:", error);
//         toast.error("Error fetching products");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [searchTerm, currentPage, selectedBrandCategory, selectedBrands, selectedCategories]
//   );

//   // Fetch products when filters, page or search change
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Debounced search
//   const debouncedSearch = useMemo(() =>
//     debounce((query) => {
//       setCurrentPage(1);
//       fetchProducts(query, 1, {
//         brandCategory: selectedBrandCategory,
//         brand: selectedBrands,
//         category: selectedCategories,
//       });
//     }, 500), [
//     selectedBrandCategory,
//     selectedBrands, selectedCategories, fetchProducts]);

//   const handleSearchChange = (e) => {
//     const val = e.target.value;
//     setSearchTerm(val);
//     debouncedSearch(val);
//   };

//   // Toggle handler for filters
//   const handleToggle = (filterType, id) => {
//     const toggleSingleSelect = (selected, setSelected) => {
//       if (selected[0] === id) {
//         setSelected([]); // Deselect if already selected
//       } else {
//         setSelected([id]); // Only one selected at a time
//       }
//     };

//     switch (filterType) {
//       case "brandCategory":
//         toggleSingleSelect(selectedBrandCategory, setSelectedBrandCategory);
//         break;
//       case "brand":
//         toggleSingleSelect(selectedBrands, setSelectedBrands);
//         break;
//       case "category":
//         toggleSingleSelect(selectedCategories, setSelectedCategories);
//         break;
//       default:
//         break;
//     }

//     setCurrentPage(1);
//   };

//   // Pagination logic: smart page numbers with ellipsis
//   const paginationButtons = useMemo(() => {
//     if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

//     const pages = [];

//     if (currentPage <= 3) {
//       for (let i = 1; i <= 5; i++) pages.push(i);
//     } else if (currentPage >= totalPages - 2) {
//       for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
//     } else {
//       for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
//     }

//     return pages;
//   }, [totalPages, currentPage]);

//   return (
//     <>
//       <HeroSection />
//       <section className="shop-pageSec bg-black text-white" >
//         <div className="container" >
//           <div className="row">
//             {/* Sidebar Filters */}
//             <aside className="col-lg-3 col-md-4 filters p-3 bg-dark rounded" style={{ marginTop: 40, height: "auto" }}>
//               <FilterSection
//                 title="Brand Category"
//                 items={brandCategory}
//                 selectedIds={selectedBrandCategory}
//                 onToggle={(id) => handleToggle("brandCategory", id)}
//                 defaultOpen={false}  // <-- Add this
//               />
//               <FilterSection
//                 title="Brand"
//                 items={filterAllBrand[0]}
//                 selectedIds={selectedBrands}
//                 onToggle={(id) => handleToggle("brand", id)}
//                 defaultOpen={false}
//               />
//               <FilterSection
//                 title="Category"
//                 items={filterCategory}
//                 selectedIds={selectedCategories}
//                 onToggle={(id) => handleToggle("category", id)}
//                 defaultOpen={false}
//               />
//             </aside>

//             {/* Products Section */}
//             <section className="col-lg-9 col-md-8 ShopProduct-section pt-3">
//               <div className="inputSec mb-4">
//                 <input
//                   className="search-input form-control"
//                   value={searchTerm}
//                   onChange={handleSearchChange}
//                   type="text"
//                   placeholder="Search Product Name / Part_on"
//                   aria-label="Search products by name or Part_on"
//                 />
//               </div>

//               {loading ? (
//                 <p className="text-white mt-4">Loading products...</p>
//               ) : products.length > 0 ? (
//                 <div className="shopproducts-grid row">
//                   {products.map((product) => (
//                     <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
//                       <ProductCard {...product} />
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-white mt-4">No products found.</p>
//               )}

//               {/* Pagination */}
//               <div className="pagination mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap mb-5">
//                 <button
//                   className="btn btn-outline-light"
//                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                   aria-label="Previous page"
//                 >
//                   Previous
//                 </button>

//                 {paginationButtons.map((page) => (
//                   <button
//                     key={page}
//                     className={`btn ${page === currentPage ? "btn-light text-dark" : "btn-outline-light"}`}
//                     onClick={() => setCurrentPage(page)}
//                     aria-current={page === currentPage ? "page" : undefined}
//                   >
//                     {page}
//                   </button>
//                 ))}

//                 <button
//                   className="btn btn-outline-light"
//                   onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                   disabled={currentPage === totalPages}
//                   aria-label="Next page"
//                 >
//                   Next
//                 </button>
//               </div>
//             </section>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ShopPage;


"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Link from "next/link";
import debounce from "lodash.debounce";
import HeroSection from "@/app/components/HeroSection/page";
import { getData, serverURL } from "@/app/services/FetchNodeServices";
import { toast } from "react-toastify";
import "./shop.css";
import parse from 'html-react-parser';
import { useSearchParams } from "next/navigation";

// Reusable FilterSection Component
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

// Product Card Component
const ProductCard = ({ image, name, product_description, part_no, id }) => {
  const imgSrc = useMemo(
    () => (image?.startsWith("uploads/product") ? `${serverURL}/${image} `: `${serverURL}/uploads/images/${image}`),
    [image]
  );


  const HtmlRenderer = (product_description) => {
    const html = product_description;
    // alert(html)
    if (typeof html === 'string') {
      return <>{parse(html)}</>;
    }
    return null;
  };


  return (
    <article className="ShopProduct-card" aria-label={name}>
      <div className="ShopProductImg">
        <Image
          src={imgSrc.trim()||'IMAGE'}
          layout="responsive"
          width={300}
          height={250}
          alt={name || "Product image"}
          className="product-image"
          priority={false}
        />
      </div>
      <div className="Shopproduct-info">
        <h3>{name}</h3>
        <div className="shopproduct-details">{HtmlRenderer(product_description)}</div>
        <div className="shopproduct-part">
          <strong>Part Number:</strong> {part_no}
        </div>
        <div className="shopproduct-actions">
          <Link href={`/pages/details-page/${id}`} passHref>
            <button className="btn btn-primary">SHOP NOW</button>
          </Link>
        </div>
      </div>
    </article>
  );
};

// Main ShopPage Component

const itemsPerPage = 10;

const ShopPage = () => {
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState({
    brandCategory: [],
    allBrand: [],
    category: [],
    selectedBrandCategory: [],
    selectedBrands: [],
    filterAllBrand: [],
    filterCategory: [],
  });

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [brandTop, setBrandTop] = useState(null);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Parse query params
  useEffect(() => {
    const query = searchParams.get("query");
    const titleParam = searchParams.get("title");
    const nameParam = searchParams.get("name");

    if (query) setSearchTerm(decodeURIComponent(query));
    if (titleParam) setTitle(titleParam);
    if (nameParam) setName(nameParam);
  }, [searchParams]);

  // Fetch helpers
  const fetchData = async (url, setter, errorMsg) => {
    try {
      const res = await getData(url);
      if (res?.status) setter(res.data);
      else toast.error(errorMsg);
    } catch (err) {
      console.error(err);
      toast.error(errorMsg);
    }
  };

  const loadInitialFilters = useCallback(async () => {
    await Promise.all([
      fetchData("brandCategory/get-all-brand-category", data => setFilters(prev => ({ ...prev, brandCategory: data })), "Failed to load brand categories"),
      fetchData("brand/get-all-brand", data => setFilters(prev => ({ ...prev, allBrand: data })), "Failed to load brands"),
      fetchData("category/get-all-categorys", data => setFilters(prev => ({ ...prev, category: data })), "Failed to load categories"),
      searchTerm && fetchData(`brand/get-all-brand-by-id/${searchTerm}`, setBrandTop, "Failed to load brand"),
    ]);
  }, [searchTerm]);

  useEffect(() => {
    loadInitialFilters();
  }, [loadInitialFilters]);

  // Update filtered brands/categories
  useEffect(() => {
    const { selectedBrandCategory, selectedBrands, allBrand, category } = filters;

    const filteredBrands = allBrand.filter(b =>
      selectedBrandCategory.includes(b.brand_cat_id)
    );

    const brandCatIds = selectedBrands
      .map(id => allBrand.find(b => b.id === id)?.cat_id)
      .filter(Boolean)
      .flatMap(str => str.split(","));

    const matchedCategories = [...new Set(brandCatIds)]
      .map(id => parseInt(id))
      .map(id => category.find(c => c.id === id))
      .filter(Boolean);

    setFilters(prev => ({
      ...prev,
      filterAllBrand: filteredBrands,
      filterCategory: matchedCategories,
    }));
  }, [
    filters.selectedBrandCategory,
    filters.selectedBrands,
    filters.allBrand,
    filters.category,
  ]);

  // Product fetcher
  const fetchProducts = useCallback(async (
    search = searchTerm,
    page = currentPage,
    filtersObj = { brand: filters.selectedBrands }
  ) => {
    setLoading(true);
    try {
      const url = `product/get-all-product?page=${page}&limit=${itemsPerPage}&search=${encodeURIComponent(search || "")}`;
      const res = await getData(url);
      if (res.status) {
        setProducts(res.data || []);
        setTotalPages(res.totalPages || 1);
      } else {
        setProducts([]);
        toast.error("Failed to fetch product data");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching products");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage, filters.selectedBrands]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Debounced search
  const debouncedSearch = useMemo(() =>
    debounce((query) => {
      setCurrentPage(1);
      fetchProducts(query, 1, { brand: filters.selectedBrands });
    }, 500), [filters.selectedBrands, fetchProducts]
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchTerm(val);
    debouncedSearch(val);
  };

  const handleToggle = (filterType, id) => {
    const updateSelection = (selected) =>
      selected[0] === id ? [] : [id];

    if (filterType === "brandCategory") {
      setFilters(prev => ({
        ...prev,
        selectedBrandCategory: updateSelection(prev.selectedBrandCategory),
      }));
    } else if (filterType === "brand") {
      setFilters(prev => ({
        ...prev,
        selectedBrands: updateSelection(prev.selectedBrands),
      }));
      setSearchTerm(id);
    }

    setCurrentPage(1);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
        pages.push(i);
      }
    }

      console.log("XXXXXXXXXXXXX:-",products)
    return (
      <div className="pagination d-flex justify-content-center gap-2 flex-wrap mb-5">
        <button className="btn btn-outline-light" onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>Previous</button>
        {pages.map(page => (
          <button
            key={page}
            className={`btn ${page === currentPage ? "btn-light text-dark" : "btn-outline-light"}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button className="btn btn-outline-light" onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>Next</button>
      </div>
    );
  };

  return (
    <>
      <HeroSection brandName={name} title={title} />
      <section className="All-pageSec bg-black">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4">
              <aside className="filters p-3 bg-dark rounded" style={{ marginTop: 40 }}>
                <FilterSection
                  title="Brand Category"
                  items={filters.brandCategory}
                  selectedIds={filters.selectedBrandCategory}
                  onToggle={(id) => handleToggle("brandCategory", id)}
                  defaultOpen={false}
                />
                <FilterSection
                  title="Brand"
                  items={filters.filterAllBrand}
                  selectedIds={filters.selectedBrands}
                  onToggle={(id) => handleToggle("brand", id)}
                  defaultOpen={false}
                />
                <div className="mt-3">
                  <button className="btn btn-primary w-100" onClick={() => fetchProducts()}>
                    Filter Data
                  </button>
                </div>
              </aside>
            </div>

            <div className="col-lg-9 col-md-8">
              <section className="AllProduct-section pt-3">
                <div className="inputSec mb-3">
                  <input
                    className="search-input"
                    type="text"
                    placeholder="Product Code / Name"
                    value={/^\d+$/.test(searchTerm) ? brandTop?.name || "" : searchTerm}
                    onChange={handleSearchChange}
                  />
                </div>
                <div className="Allproducts-grid">
                  {loading ? (
                    <p className="text-white mt-4">Loading products...</p>
                  ) : products.length > 0 ? (
                    <div className="shopproducts-grid row">
                      {products.map((product) => (
                        <div className="col-md-6 col-lg-4 mb-4" key={product.id}>
                          <ProductCard {...product} />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-white mt-4">No products found.</p>
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

export default ShopPage;