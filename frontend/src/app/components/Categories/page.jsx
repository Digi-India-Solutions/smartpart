"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './categories.css';
import { getData, serverURL } from '@/app/services/FetchNodeServices';

const Page = () => {
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    try {
      const response = await getData('category/get-all-categorys');
      console.log("response:-", response);
      if (response?.status) {
        setCategories(response.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filterData = categories?.filter((item) => item?.top === 1);
  return (
    <div className='categorySection1'>
      <div className="container">
        <div className='categorySection'>
          <h1 className='text-center'>
            Search By <span className='text-theme bouncing-text'>CATEGORIES</span>
          </h1>
          <div className="row" style={{ justifyContent: 'center' }}>
            {filterData.map((category, index) => {
              const imageSrc = category?.image?.startsWith('http')
                ? category.image
                : `${serverURL}/uploads/images/${category?.image}`;

              return (
                <div key={index} className="col-md-2 col-6">
                  <div className='categoriesPortion'>
                    <Link href="/pages/all-category" className="text-decoration-none text-dark">
                      <div className='icon'>
                        <Image
                          className="brandimg"
                          src={imageSrc}
                          width={100}
                          height={100}
                          alt={category?.name || 'category'}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <div>
                        <p className='pt-3 text-center'>{category?.name}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
