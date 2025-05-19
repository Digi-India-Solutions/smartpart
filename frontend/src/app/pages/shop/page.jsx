import Image from 'next/image';
import React from 'react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import './shop.css';
import pic1 from '@/app/assets/products/item1.jpg';
import Link from 'next/link';
import HeroSection from '@/app/components/HeroSection/page';

const products = [
  { id: 1, image: pic1, name: 'RADIATOR ASSY: 253100X060', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 2, image: pic1, name: 'STRUT ASSY-FR,RH: 546600X100', details: 'Mobis (Hyundai, Kia) 546600X100', part: '546600X100' },
  { id: 3, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
  { id: 4, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
  { id: 5, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
  { id: 6, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
  { id: 7, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
  { id: 8, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
];

const ProductCard = ({ image, name, details, part, index }) => {
  return (
    <div className='ShopProduct-card'>
      <div className='ShopProductImg'>
        <Image src={image} layout='responsive' width={300} height={250} alt='productimg' className='product-image' />
      </div>
      <div className='Shopproduct-info'>
        <h3>{name}</h3>
        <p className='shopproduct-details'>{details}</p>
        <p className='shopproduct-part'><strong>Part Number:</strong> {part}</p>
        <div className='shopproduct-actions'>
          <Link href={`/pages/details-page/${index + 1}`}>
            <button className='btn btn-primary'>SHOP NOW</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const ShopPage = () => {
  return (
    <>
      <HeroSection />
      <section className='shop-pageSec  bg-black'>
        <div className='container '>
          <div className='row '>
            <div className='col-lg-3 col-md-4'>
              <aside className='filters '>
                <h2>Filters</h2>
                <div className='filter-section'>
                  <h3>Origin</h3>
                  <label className='filter-option'>
                    <input type='checkbox' /> Aftermarket (100)
                  </label>
                  <label className='filter-option'>
                    <input type='checkbox' /> OEM (100)
                  </label>
                </div>
                <div className='filter-section'>
                  <h3>Class</h3>
                  <label className='filter-option'>
                    <input type='checkbox' /> Air / Electrical Horn (100)
                  </label>
                  <label className='filter-option'>
                    <input type='checkbox' /> Bellow (100)
                  </label>
                </div>
              </aside>
            </div>
            <div className='col-lg-9 col-md-8'>
              <section className='ShopProduct-section pt-3'>
                <div className='inputSec'>
                  <input className='search-input' type="text" placeholder="Product Code / Name" />
                </div>
                <div className='shopproducts-grid'>
                  {products.map((product, index) => (
                    <ProductCard key={product.id} {...product} index={index} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;





// import Image from 'next/image';
// import React from 'react';
// import { FaHeart, FaShoppingCart } from 'react-icons/fa';
// import './shop.css';
// import pic1 from '@/app/assets/products/item1.jpg'
// import Link from 'next/link';
// import HeroSection from '@/app/components/HeroSection/page';

// const products = [
//   { id: 1, image: pic1, name: 'RADIATOR ASSY: 253100X060', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
//   { id: 2, image: pic1, name: 'STRUT ASSY-FR,RH: 546600X100', details: 'Mobis (Hyundai, Kia) 546600X100', part: '546600X100' },
//   { id: 3, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 4, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 5, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 6, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 7, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
//   { id: 8, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
// ];

// const ProductCard = ({ image, name, details, part,index }) => {
//   return (
// <>    
//     <div className='product-card bg-dark'>
//       <Image src={image} width={250} height={250} alt='productimg' className='product-image' />
//       <div className='product-info'>
//         <h3>{name}</h3>
//         <p className='text-light'>{details}</p>
//         <p className='text-primary'><strong>Part Number:</strong> {part}</p>
//         <div className='product-actions '>
//        <Link href={`/pages/details-page/${index+1}`}> <button className='btn btn-light w-100 m-1 '>SHOP NOW</button> </Link>
//           {/* <FaHeart className=' wishlist-icon ' /> */}
//         </div>
//       </div>
//     </div>
//     </>

//   );
// };

// const ShopPage = () => {
//   return (
//    <>
//    <HeroSection/>

//      <section className='bg-black'>
//      <div className='container'>
//       <div className='shop-container  d-flex'>
//         <aside className='filters bg-dark'>
//             <h2>Filters</h2>
//             <div>
//           <h3>Origin</h3>
//           <label><input type='checkbox' /> Aftermarket (100)</label>
//           <label><input type='checkbox' /> OEM (100)</label>
//             </div>
//             <div>
//           <h3>Class</h3>
//           <label><input type='checkbox' /> Air / Electrical Horn (100)</label>
//           <label><input type='checkbox' /> Bellow (100)</label>
//         </div>
//         <div>
//           {/* <h3>Price</h3>
//           <input type='range' min='0' max='9000' step='50' /> */}
//         </div>
//       </aside>

//       <section className='ProductSec'>
//             <div className='inputSec'>
//               <input  className='form-control w-25' type="text" placeholder="Product Code / Name " />
//             </div>
//             <div className='d-flex product-section'>
//         {products.map((product,index) => (
//           <ProductCard key={product.id} {...product} index={index} />
//         ))}
//         </div>
//       </section>
//     </div>
//       </div>

//      </section>
   
//    </>
//   );
// };

// export default ShopPage;





















// "use client";

// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { FaHeart } from 'react-icons/fa';
// import './shop.css';
// import pic1 from '@/app/assets/products/item1.jpg';
// import Link from 'next/link';
// import HeroSection from '@/app/components/HeroSection/page'; // fixed import

// // Static product list (you can remove this if using API products only)
 
// const ProductCard = ({ image, title, price, category, index }) => {
//   return (
//     <div className='product-card bg-dark'>
//       <Image src={image} width={250} height={250} alt='productimg' className='product-image' />
//       <div className='product-info'>
//         <h3 className='line-clamp-2'>{title}</h3>
//         <p>{category}</p>
//         <p><strong>Part Number:</strong> {price}</p>
//         <div className='product-actions'>
//           <Link href={`/pages/details-page/${index + 1}`} className='btn btn-light w-100 m-1'>SHOP NOW</Link>
//           <FaHeart className='wishlist-icon' />
//         </div>
//       </div>
//     </div>
//   );
// };

// const ShopPage = () => {
//   const [apiProducts, setApiProducts] = useState([]);


//   const fetchData = async () => {
//     try {
//       const response = await fetch('https://fakestoreapi.com/products');
//       if (!response.ok) throw new Error('Network response was not ok');
//       const data = await response.json();
//       console.log('Fetched data:', data);
//       setApiProducts(data);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };


//   useEffect(() => {
//     fetchData();
//   }, []);

//   return (
//     <>
//       <HeroSection />

//       <section className='bg-black'>
//         <div className='container'>
//           <div className='shop-container d-flex'>
// <div className='row'>
// <div className='col-md-3'>
// <aside className='filters bg-dark'>
//               <h2>Filters</h2>
//               <div>
//                 <h3>Origin</h3>
//                 <label><input type='checkbox' /> Aftermarket (100)</label>
//                 <label><input type='checkbox' /> OEM (100)</label>
//               </div>
//               <div>
//                 <h3>Class</h3>
//                 <label><input type='checkbox' /> Air / Electrical Horn (100)</label>
//                 <label><input type='checkbox' /> Bellow (100)</label>
//               </div>
//               {/* Uncomment and style if you want price filter */}
//               {/* <div>
//                 <h3>Price</h3>
//                 <input type='range' min='0' max='9000' step='50' />
//               </div> */}
//             </aside>

//                 </div>
//                <div className='col-md-9'>
//                <div className='row'>

//                   <div className='col-md-4'>
//                <form action="">
    
//                   <label htmlFor="validation01" className="form-label">Search by Product Name or Code </label>
//                   <input type="text" className="form-control is-valid mb-3" id="validation01" value="Mark"   onChange={(e) => setSearchValue(e.target.value)} placeholder='Product Name / Code' />
 
//            </form>

//                 </div>



//                     </div>

//                        <section className='product-section d-flex flex-wrap'>
                          
//                           {apiProducts.map((product, index) => (
//                             <ProductCard key={product.id} {...product} index={index} />
//                           ))}
//                         </section>
//                  </div>

//               </div>
  
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ShopPage;











