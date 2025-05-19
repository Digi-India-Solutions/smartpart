import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaList, FaTags, FaBoxOpen, FaImage, FaEnvelope, FaRocket,
} from 'react-icons/fa';
import './dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [categories, setCategories] = useState(0);
  const [subcategories, setSubcategories] = useState(0);
  const [products, setProducts] = useState(0);
  const [banner, setBanner] = useState(0);
  const [contactEnquiries, setContactEnquiries] = useState(0);
  const [newLanch, setNewLanch] = useState(0);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [categoryRes, subcategoryRes, productRes, bannerRes, contactRes, enquiryRes] = await Promise.all([
          axios.get('http://localhost:8000/api/category'),
          axios.get('http://localhost:8000/api/subcategory'),
          axios.get('http://localhost:8000/api/product'),
          axios.get('http://localhost:8000/api/banner'),
          axios.get('http://localhost:8000/api/contact'),
          axios.get('http://localhost:8000/api/get-all-enquiry'),
        ]);

        setCategories(categoryRes.data.data.length);
        setSubcategories(subcategoryRes.data.data.length);
        setProducts(productRes.data.data.length);
        setBanner(bannerRes.data.data.length);
        setContactEnquiries(contactRes.data.data.length);
        setNewLanch(enquiryRes.data.data.length);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  const data = [
    { label: 'All Categories', value: categories, icon: <FaList />, link: '/all-category' },
    { label: 'Subcategories', value: subcategories, icon: <FaTags />, link: '/all-tags' },
    { label: 'Products', value: products, icon: <FaBoxOpen />, link: '/all-products' },
    { label: 'All Banners', value: banner, icon: <FaImage />, link: '/all-banners' },
    { label: 'Contact Enquiries', value: contactEnquiries, icon: <FaEnvelope />, link: '/all-shop-banners' },
    { label: 'Enquiry Queries', value: newLanch, icon: <FaRocket />, link: '/all-voucher' },
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
