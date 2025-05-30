import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaList, FaTags, FaBoxOpen, FaImage, FaEnvelope, FaRocket, FaRegNewspaper
} from 'react-icons/fa';
import './dashboard.css';
import { Link } from 'react-router-dom';
import { getData } from '../../services/FetchNodeServices'

const Dashboard = () => {
  const [categories, setCategories] = useState(0);
  const [brand, setBrand] = useState(0);
  const [products, setProducts] = useState(0);
  const [banner, setBanner] = useState(0);
  const [contactEnquiries, setContactEnquiries] = useState(0);
  const [newLanch, setNewLanch] = useState(0);
  const [blog, setBlog] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [categoryRes, brandRes, productRes, bannerRes, contactRes, enquiryRes, blogRes] = await Promise.all([
          getData('category/get-all-categorys'),
          getData('brand/get-all-brand'),
          getData('product/get-all-product-without-pagination'),
          getData('banner-image/get-all-banner-image'),
          getData('enquiry/get-all-enquiry'),
          getData('cardEnquiry/get-all-card-enquiry'),
          getData('blog/get-all-blog')
        ]);

        setCategories(categoryRes?.data?.length);
        setBrand(brandRes?.data?.length);
        setProducts(productRes?.data?.length);
        setBanner(bannerRes?.data?.length);
        setContactEnquiries(contactRes?.data?.length);
        setNewLanch(enquiryRes?.data?.length);
        setBlog(blogRes?.data?.blogs?.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const data = [
    { label: 'All Categories', value: categories, icon: <FaList />, link: '/all-category' },
    { label: 'All Brand', value: brand, icon: <FaTags />, link: '/all-brand' },
    { label: 'Products', value: products, icon: <FaBoxOpen />, link: '/all-products' },
    { label: 'All Banners', value: banner, icon: <FaImage />, link: '/all-banners' },
    { label: 'Contact Enquiries', value: contactEnquiries, icon: <FaEnvelope />, link: '/all-enquiry' },
    { label: 'Enquiry Queries', value: newLanch, icon: <FaRocket />, link: '/all-card-enquiry' },
    { label: 'All Blog', value: blog, icon: <FaRegNewspaper />, link: '/all-blog' },
  ];

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-cards">
        {data.map((item, idx) => (
          <Link to={item.link} key={idx} className="dashboard-card link-style">
            <div className="dashboard-icon">{item.icon}</div>
            <h3 className='text-light'>{item.label}</h3>
            <p>{item.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
