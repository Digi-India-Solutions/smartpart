'use client';
import React from 'react';
import Image from 'next/image';

 import './lubricant.css';


import pic1 from '@/app/assets/icons/lubricant1.png';
import pic2 from '@/app/assets/icons/lubricant2.png';
import pic3 from '@/app/assets/icons/lubricant3.png';
import pic4 from '@/app/assets/icons/lubricant4.png';
import Link from 'next/link';


const subbrands = [
  { src: pic1, alt: 'ventage', name: 'SHELL' },
  { src: pic2, alt: 'ventage', name: 'CASTROL' },
  { src: pic3, alt: 'ventage', name: 'MOBIL' },
  { src: pic4, alt: 'ventage', name: 'MOTUL ENGINE' },

];

const Brands = () => {
  return (
    <>
      <section className="lubricant-container">
        <h2 className="text-center"> <span className="text-theme bouncing-text">LUBRICANT BRANDS </span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {subbrands.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <Link href="/pages/all-products" className='text-decoration-none '>
                <div className='lubricant-item'>
                  <div className='d-flex justify-content-center'>
                  <Image className="lubricantimg" src={item.src} alt={item.alt} />
                  </div>
                  <p className='text-center'>
                    {item.name}
                  </p>
                </div>
                </Link>
              </div>
            )}
          </div>

        </div>

      </section>
    
    </>
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
