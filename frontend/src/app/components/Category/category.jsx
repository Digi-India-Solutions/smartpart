'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import './category.css';
import { useRouter } from 'next/navigation';

const Category = () => {
    const router = useRouter();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await getData('category/get-all-categorys');
            if (response?.status) {
                setCategories(response.data);
            } else {
                setError("Failed to load categories");
            }
        } catch (error) {
            console.error("Error fetching categories:", error);
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryClick = (category) => {
        router.push(
          `/pages/all-products/${category?.id}?name=${category?.name}&title=category`
        );
      };

    return (
        <div className="container my-4">
            <h3 className="mb-4">Top Categories</h3>

            {loading && <p>Loading categories...</p>}
            {error && <p className="text-danger">{error}</p>}

            <div className="row">
                {categories.map((category, index) => (
                    <div className="col-md-3 col-6 mb-4" key={index}>
                        <div
                            onClick={() => handleCategoryClick(category)}
                            className="text-decoration-none text-gray cursor-pointer"
                            style={{ cursor: 'pointer' }}
                        >
                            <div className="border p-3 text-center h-100 rounded category-box hover-shadow">
                                <Image
                                    src={
                                        category?.thumbnail
                                            ? (category?.thumbnail?.includes('uploads/images')
                                                ? `${serverURL}/${category?.thumbnail}`
                                                : `${serverURL}/uploads/images/${category?.thumbnail}`)
                                            : '/default-category.png'
                                    }
                                    width={100}
                                    height={100}
                                    alt={category.name || 'Category Image'}
                                    style={{ objectFit: 'contain' }}
                                />
                                <span className="d-block mt-2 text-muted">{category?.name}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
