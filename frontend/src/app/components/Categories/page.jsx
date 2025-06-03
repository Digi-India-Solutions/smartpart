"use client"
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './categories.css';
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import { useRouter } from 'next/navigation';

const Page = () => {
  const [categories, setCategories] = useState([]);
  const router = useRouter()
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

  const handleCategoryClick = (category) => {
    router.push(
      `/pages/all-products/${category?.id}?name=${category?.name}&title=category`
    );
  };

  console.log("filterData:=>", filterData)

  return (
    <div className='categorySection1'>
      <div className="container">
        <div className='categorySection'>
          <h1 className='text-center'>
            Search By <span className='text-theme bouncing-text'>CATEGORIES</span>
          </h1>
          <div className="row" style={{ justifyContent: 'center' }}>
            {filterData.map((category, index) => {
              const imageSrc = category?.thumbnail?.startsWith('uploads/images')
                ? `${serverURL}/${category?.thumbnail}`
                : `${serverURL}/uploads/images/${category?.thumbnail}`;

              return (
                <div key={index} className="col-md-2 col-6">
                  <div className='categoriesPortion'  >
                    <div onClick={() => handleCategoryClick(category)} className="text-decoration-none text-dark">
                      <div className='icon' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Image className="brandimg" src={imageSrc} width={100} height={100} alt={category?.name || 'category'} style={{ objectFit: 'contain' }} />
                      </div>
                      <div>
                        <p className='pt-3 text-center'>{category?.name}</p>
                      </div>
                    </div>
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
