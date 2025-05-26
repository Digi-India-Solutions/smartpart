"use client";

import React, { useEffect, useState } from 'react';
import './pageblog.css';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import parse from 'html-react-parser';
import pic1 from '@/app/assets/banner8.jpg';

const Page = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [date, setDate] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await getData(`blog/get-all-blog-by-id/${id}`);
        if (res?.data) {
          setBlog(res.data);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
    };

    if (id) {
      fetchBlog();
    }
  }, [id]);

  useEffect(() => {
    const formattedDate = new Date().toLocaleDateString();
    setDate(formattedDate);
  }, []);

  if (!blog) {
    return <div className="text-light p-4">Loading blog details...</div>;
  }

  const imageUrl =
    blog?.image && blog.image.startsWith('uploads')
      ? `${serverURL}/${blog.image}`
      : `${serverURL}/uploads/images/${blog?.image}`;

  return (
    <>
      <section className="blog-detail bg-dark">
        <div className="container">
          <div className="blog-header">
            <h1 className="blog-title">{blog.title}</h1>
            <div className="blog-meta">
              <span className="badge category">Automotive</span>
              <span className="date">{date}</span>
            </div>

            <Image
              src={imageUrl}
              width={1000}
              height={400}
              alt="Blog Banner"
              className="banner-img"
              priority
              onError={(e) => {
                e.target.src = pic1.src;
              }}
            />
          </div>

          <div className="blog-content text-light">
            {typeof blog?.descri === 'string' && (
              <div
                // style={{
                //   display: '-webkit-box',
                //   WebkitLineClamp: 3,
                //   WebkitBoxOrient: 'vertical',
                //   overflow: 'hidden',
                //   textOverflow: 'ellipsis'
                // }}
              >
                {parse(blog.descri)}
              </div>
            )}

            {typeof blog?.description2 === 'string' && (
              <div
                // style={{
                //   display: '-webkit-box',
                //   WebkitLineClamp: 3,
                //   WebkitBoxOrient: 'vertical',
                //   overflow: 'hidden',
                //   textOverflow: 'ellipsis',
                //   marginTop: '1rem'
                // }}
              >
                {parse(blog.description2)}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
