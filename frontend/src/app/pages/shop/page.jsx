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
    () => (image?.startsWith("http") ? image : `${serverURL}/uploads/images/${image}`),
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
          src={imgSrc}
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
        <p className="shopproduct-details">{HtmlRenderer(product_description)}</p>
        <p className="shopproduct-part">
          <strong>Part Number:</strong> {part_no}
        </p>
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
const ShopPage = () => {
  // Filter data states
  const [brandCategory, setBrandCategory] = useState([]);
  const [allBrand, setAllBrand] = useState([]);
  const [category, setCategory] = useState([]);

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
  const itemsPerPage = 10;

  // Fetch helper
  const fetchData = async (url, setter, errorMsg) => {
    try {
      const res = await getData(url);
      if (res.status) setter(res.data);
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
  }, []);

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
    const updateSelected = (selected, setSelected) =>
      selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];

    switch (filterType) {
      case "brandCategory":
        setSelectedBrandCategory((prev) => updateSelected(prev, setSelectedBrandCategory));
        break;
      case "brand":
        setSelectedBrands((prev) => updateSelected(prev, setSelectedBrands));
        break;
      case "category":
        setSelectedCategories((prev) => updateSelected(prev, setSelectedCategories));
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  // Pagination logic: smart page numbers with ellipsis
  const paginationButtons = useMemo(() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages = [];

    if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) pages.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pages.push(i);
    }

    return pages;
  }, [totalPages, currentPage]);

  return (
    <>
      <HeroSection />
      <section className="shop-pageSec bg-black text-white" >
        <div className="container" >
          <div className="row">
            {/* Sidebar Filters */}
            <aside className="col-lg-3 col-md-4 filters p-3 bg-dark rounded" style={{ marginTop: 40, height: "auto" }}>
              <FilterSection
                title="Brand Category"
                items={brandCategory}
                selectedIds={selectedBrandCategory}
                onToggle={(id) => handleToggle("brandCategory", id)}
                defaultOpen={false}  // <-- Add this
              />
              <FilterSection
                title="Brand"
                items={allBrand}
                selectedIds={selectedBrands}
                onToggle={(id) => handleToggle("brand", id)}
                defaultOpen={false}
              />
              <FilterSection
                title="Category"
                items={category}
                selectedIds={selectedCategories}
                onToggle={(id) => handleToggle("category", id)}
                defaultOpen={false}
              />
            </aside>

            {/* Products Section */}
            <section className="col-lg-9 col-md-8 ShopProduct-section pt-3">
              <div className="inputSec mb-4">
                <input
                  className="search-input form-control"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Search Product Name / Part_on"
                  aria-label="Search products by name or Part_on"
                />
              </div>

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

              {/* Pagination */}
              <div className="pagination mt-4 d-flex justify-content-center align-items-center gap-2 flex-wrap mb-5">
                <button
                  className="btn btn-outline-light"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                >
                  Previous
                </button>

                {paginationButtons.map((page) => (
                  <button
                    key={page}
                    className={`btn ${page === currentPage ? "btn-light text-dark" : "btn-outline-light"}`}
                    onClick={() => setCurrentPage(page)}
                    aria-current={page === currentPage ? "page" : undefined}
                  >
                    {page}
                  </button>
                ))}

                <button
                  className="btn btn-outline-light"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                >
                  Next
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
