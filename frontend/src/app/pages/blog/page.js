"use client";

import Image from "next/image";
import './blog.css'
import { motion } from "framer-motion";
import BlogImage1 from "@/app/assets/blogImage1.jpg";
import BlogImage2 from "@/app/assets/blogImage2.jpg";
import BlogImage3 from "@/app/assets/pic.jpg";
import HeroSection from "@/app/components/HeroSection/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getData, serverURL } from "@/app/services/FetchNodeServices";
import parse from 'html-react-parser';

const blogPosts = [
  {
    id: 1,
    title: "Hyundai Accessories & Genuine Spare Parts | Car Parts Exporter",
    summary:
      "A complete guide to modern React practices including hooks, context, and performance optimizations.",
    image: BlogImage1,
    date: "April 2, 2025",
  },
  {
    id: 2,
    title: "Hyundai Spare Parts Indian Exporter of Automotive Parts",
    summary:
      "Beautiful UI, fast dev workflow, and how to make Tailwind sing for you.",
    image: BlogImage2,
    date: "March 20, 2025",
  },
  {
    id: 3,
    title: "Is It Necessary to Use Genuine Spare Parts in Volkswagen",
    summary: "The latest release comes with game-changing updates. Let’s explore!",
    image: BlogImage3,
    date: "March 10, 2025",
  },
  {
    id: 4,
    title: "Is It Necessary to Use Genuine Spare Parts in Volkswagen",
    summary: "The latest release comes with game-changing updates. Let’s explore!",
    image: BlogImage2,
    date: "March 10, 2025",
  },
  {
    id: 5,
    title: "Is It Necessary to Use Genuine Spare Parts in Volkswagen",
    summary: "The latest release comes with game-changing updates. Let’s explore!",
    image: BlogImage1,
    date: "March 10, 2025",
  },
  {
    id: 6,
    title: "Is It Necessary to Use Genuine Spare Parts in Volkswagen",
    summary: "The latest release comes with game-changing updates. Let’s explore!",
    image: BlogImage3,
    date: "March 10, 2025",
  }


];

const categories = [
  "Lubricant",
  "OEM Brands",
  "Aftermarket Brands",
  "2\\3 Wheeler Brands",
  "Tyre Brands",
];

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const limit = 6;

  const fetchBlogs = async (currentPage = 1) => {
    setLoading(true);
    try {
      const res = await getData(`blog/get-all-blog?page=${currentPage}&limit=${limit}`);
      if (res.status) {
        setBlogs(res.data.blogs);
        setTotalPages(Math.ceil(res.data.total / limit));
        setPage(currentPage);
      } else {
        setError("Failed to fetch blogs");
      }
    } catch (err) {
      setError("Something went wrong while fetching blogs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
  }, []);

  return (
    <>
      <HeroSection />
      <main className="bg-dark text-white py-5">
        <div className="container">
          {/* <h2 className="text-center">
            <span className="text-theme bouncing-text mb-3"> Blogs </span>
          </h2> */}

          <div className="row">
            {/* Blog Posts */}
            <div className="col-lg-9">
              <div className="row">
                {blogs.map((post, index) => (
                  <motion.div
                    className="col-md-6 col-lg-4 mb-4"
                    key={post.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.2 }}
                  >
                    <div className="card h-100 bg-secondary text-white">
                      <Image
                        src={`${serverURL}/uploads/images/${post.image}`}
                        alt={post.title}
                        width={400}
                        height={240}
                        className="card-img-top object-fit-cover"
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</h5>
                        <p className="card-text text-light small" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {parse(post?.descri)}
                        </p>
                        <div className="mt-auto d-flex justify-content-between align-items-center">
                          {/* <small className="text-muted">{post?.create_date}</small> */}
                          <Link href={`/pages/blog/${post?.id}`} className="btn btn-outline-light btn-sm">
                            Read More
                          </Link>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <aside className="col-lg-3">
              {/* Categories Section */}
              <div className="bg-dark p-4 mb-4 rounded-4 shadow-sm  border position-relative">
                <h5 className="border-bottom pb-2 mb-4 fw-bold text-uppercase text-theme">
                  Categories
                </h5>
                <form className="vstack gap-3">
                  {categories.map((cat, i) => (
                    <div className="form-check custom-radio-wrap" key={i}>
                      <input
                        className="form-check-input d-none"
                        type="radio"
                        name="category"
                        id={`cat-${i}`}
                        defaultChecked={i === 0}
                      />
                      <label
                        className="form-check-label w-100 d-flex align-items-center p-2 ps-3 border rounded-pill transition-all"
                        htmlFor={`cat-${i}`}
                      >
                        <span className="custom-radio-icon me-2"></span>
                        {cat}
                      </label>
                    </div>
                  ))}
                </form>
              </div>

              {/* Latest Post Section */}
              <div className="bg-dark p-4 rounded-4 shadow-sm border">
                <h5 className="border-bottom pb-2 mb-4 fw-bold text-uppercase text-theme">
                  Latest Post
                </h5>
                {blogPosts.map((post) => (
                  <div className="d-flex gap-3" key={post.id}>
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={70}
                      height={70}
                      className="rounded-3 shadow-sm"
                    />
                    <div>
                      <h6 className="mb-1 fw-semibold text-theme">{post.title}</h6>
                      <small className="text-muted">{post.date}</small>
                    </div>
                  </div>
                ))}
              </div>
            </aside>

          </div>
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                {[...Array(totalPages)].map((_, index) => (
                  <li
                    key={index}
                    className={`page-item ${page === index + 1 ? "active" : ""}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => fetchBlogs(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </>
  );
}

