'use client'

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import './lubricant.css';

import { getData, serverURL } from '@/app/services/FetchNodeServices';

const Brands = () => {
  const router = useRouter();
  const [brand, setBrand] = useState([]);

  const fetchBrand = async () => {
    const res = await getData("brand/get-all-brand");
    console.log("Brand Data:", res?.data);
    setBrand(res?.data || []);
  };

  useEffect(() => {
    fetchBrand();
  }, []);

  const filterData = brand.filter(
    (item) => item?.brand_category_name === 'LUBRICANT BRANDS' && item?.status === 1
  );
  console.log("FRONTEND_DATA:-", filterData);

  const handleCategoryClick = (category) => {
    router.push(
      `/pages/all-products/${category?.id}?name=${category?.name}&title=brand`
    );
  };

  return (
    <section className="lubricant-container">
      <h2 className="text-center">
        <span className="text-theme bouncing-text">LUBRICANT BRANDS</span>
      </h2>
      <div className="container">
        <div className="row justify-content-center">
          {filterData.map((item, index) => (
            <div key={index} className="col-md-2 col-4 p-0">
              <div
                onClick={() => handleCategoryClick(item)}
                className="text-decoration-none cursor-pointer"
              >
                <div className="lubricant-item">
                  <div className="d-flex justify-content-center">
                  <Image className="brandimg" src={`${serverURL}/uploads/images/${item?.image}` || item?.image || `${serverURL}/${item?.image}`} width={100} height={100} alt={item?.name} />
                  </div>
                  <p className="text-center">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
















// import Image from 'next/image';
// import React from 'react';
// import pic1 from '@/app/assets/icons/lubricant1.png';
// import pic2 from '@/app/assets/icons/lubricant2.png';
// import pic3 from '@/app/assets/icons/lubricant3.png';
// import pic4 from '@/app/assets/icons/lubricant4.png';

// import './lubricant.css';

// const subbrands = [
//   { src: pic1, alt: 'ventage', name: 'ventange' },
//   { src: pic2, alt: 'ventage', name: 'ventange' },
//   { src: pic3, alt: 'ventage', name: 'ventange' },
//   { src: pic4, alt: 'ventage', name: 'ventange' },

 
// ];

// const Page = () => {
//   return (
//     <section className='lubricantsection bg-black py-10'>
//       <div className="container mx-auto px-4">
//         <h2 className='lubricanttitle text-2xl md:text-3xl font-bold mb-6'>
//           <span className='text-warning'>Lubricant</span>
//         </h2>
        
//         <div className='lubricantsec'>
//           {subbrands.map((item, index) => (
//             <div 
//               key={index} 
//               className='lubricantbrand'
//             >
//               <Image className='lubricantbrandImg' src={item.src} alt={item.alt} />
            
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Page;
