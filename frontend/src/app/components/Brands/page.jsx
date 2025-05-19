'use client';
import React from 'react';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';
import './brands.css';

// Importing brand images
import brand1 from '@/app/assets/brands/audi1.png';
import brand2 from '@/app/assets/brands/honda.png';
import brand3 from '@/app/assets/brands/hundai.png';
import brand4 from '@/app/assets/brands/nissan.png';
import brand5 from '@/app/assets/brands/renault.png';
import brand6 from '@/app/assets/brands/suzuki.png';
import brand7 from '@/app/assets/brands/tayota.png';
import brand8 from '@/app/assets/brands/Chevrolet.png';
import brand9 from '@/app/assets/brands/bmw.png';
import brand10 from '@/app/assets/brands/scorpio.png';
import brand11 from '@/app/assets/brands/tata.png';
import brand12 from '@/app/assets/brands/volkswagan.png';
import brand13 from '@/app/assets/brands/kia.png';
import brand14 from '@/app/assets/brands/ashok layland.png';
import brand15 from '@/app/assets/brands/skoda.png';
import brand16 from '@/app/assets/brands/jeep.png';
import brand17 from '@/app/assets/brands/ford.png';
import brand18 from '@/app/assets/brands/flat.png';
import brand19 from '@/app/assets/brands/man.png';
import brand20 from '@/app/assets/brands/mercedise.png';
import brand21 from '@/app/assets/brands/jcb.png';
import brand22 from '@/app/assets/brands/mg.png';
import Link from 'next/link';

const brands = [
  { src: brand1, alt: 'Audi' }, { src: brand2, alt: 'Honda' }, { src: brand3, alt: 'Hyundai' },
  { src: brand4, alt: 'Nissan' }, { src: brand5, alt: 'Renault' }, { src: brand6, alt: 'Suzuki' },
  { src: brand7, alt: 'Toyota' }, { src: brand8, alt: 'Chevrolet' }, { src: brand9, alt: 'BMW' },
  { src: brand10, alt: 'Scorpio' }, { src: brand11, alt: 'Tata' }, { src: brand12, alt: 'Volkswagen' },
  { src: brand13, alt: 'KIA' }, { src: brand14, alt: 'Ashok Layland' }, { src: brand15, alt: 'Skoda' },
  { src: brand16, alt: 'Jeep' }, { src: brand17, alt: 'Ford' }, { src: brand18, alt: 'Flat' },
  { src: brand19, alt: 'Man' }, { src: brand20, alt: 'Mercedise' }, { src: brand21, alt: 'jcb' },
  { src: brand22, alt: 'Man' },
];

const Brands = () => {
  return (
    <>
      <section className="brands-container py-3">
  <h2 className="text-center">TOP <span className="text-theme bouncing-text"> OEM  BRANDS</span></h2>
        <div className="container">
          <div className='row justify-content-center'>
          {brands.map((item, index) =>
  <div key={index} className="col-md-2 col-4 p-0">
    <Link href="/pages/all-products" className="text-decoration-none text-dark">
      <div className='brand-item'>
        <div className='d-flex justify-content-center'>
          <Image className="brandimg" src={item.src} alt={item.alt} />
        </div>
        <p className='text-center'>
          {item.alt}
        </p>
      </div>
    </Link>
  </div>
)}

          </div>
         
        </div>

      </section>
      <div>
      </div>
    </>
  );
};

export default Brands;












// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './brands.css';

// // Importing brand images
// import brand1 from '@/app/assets/brands/audi1.png';
// import brand2 from '@/app/assets/brands/honda.png';
// import brand3 from '@/app/assets/brands/hundai.png';
// import brand4 from '@/app/assets/brands/nissan.png';
// import brand5 from '@/app/assets/brands/renault.png';
// import brand6 from '@/app/assets/brands/suzuki.png';
// import brand7 from '@/app/assets/brands/tayota.png';
// import brand8 from '@/app/assets/brands/jaguar.png';
// import brand9 from '@/app/assets/brands/bmw.png';
// import brand10 from '@/app/assets/brands/scorpio.png';
// import brand11 from '@/app/assets/brands/tata.png';
// import brand12 from '@/app/assets/brands/volkswagan.png';
// import brand13 from '@/app/assets/brands/kia.png';
// import brand14 from '@/app/assets/brands/ashok layland.png';
// import brand15 from '@/app/assets/brands/skoda.png';
// import brand16 from '@/app/assets/brands/jeep.png';
// import brand17 from '@/app/assets/brands/ford.png';
// import brand18 from '@/app/assets/brands/flat.png';
// import brand19 from '@/app/assets/brands/man.png';
// import brand20 from '@/app/assets/brands/mercedise.png';

// const brands = [
//   { src: brand1, alt: 'Audi', name: 'Audi' },
//   { src: brand2, alt: 'Honda', name: 'Honda' },
//   { src: brand3, alt: 'Hyundai', name: 'Hyundai' },
//   { src: brand4, alt: 'Nissan', name: 'Nissan' },
//   { src: brand5, alt: 'Renault', name: 'Renault' },
//   { src: brand6, alt: 'Suzuki', name: 'Suzuki' },
//   { src: brand7, alt: 'Toyota', name: 'Toyota' },
//   { src: brand8, alt: 'Jaguar', name: 'Jaguar' },
//   { src: brand9, alt: 'BMW', name: 'BMW' },
//   { src: brand10, alt: 'Scorpio', name: 'Mahindra' },
//   { src: brand11, alt: 'Tata', name: 'Tata' },
//   { src: brand12, alt: 'Volkswagen', name: 'Volkswagen' },
//   { src: brand13, alt: 'KIA', name: 'KIA' },
//   { src: brand14, alt: 'Ashok Layland', name: 'Ashok Layland' },
//   { src: brand15, alt: 'Skoda', name: 'Skoda' },
//   { src: brand16, alt: 'Jeep', name: 'Jeep' },
//   { src: brand17, alt: 'Ford', name: 'Ford' },
//   { src: brand18, alt: 'Flat', name: 'Flat' },
//   { src: brand19, alt: 'Flat', name: 'man' },
//   { src: brand20, alt: 'Flat', name: 'mercedise' },
// ];

// const Brands = () => {
//   return (
//     <section className="brands-container py-4">
//       <h2 className="text-center mb-4">Top <span className="text-warning">Brands</span> of Us</h2>
//       <div className="container">
//         <div className="row justify-content-center ">
//           {brands.map((brand, index) => (
//             <div key={index} className="col-6 col-sm-4 col-md-3 col-lg-1 g-2 text-center brand-item" >
//               <div className="brand-wrapper m-3" >
//                 <Image className="brandimg" src={brand.src} alt={brand.alt} width={100} height={100} />
//                 {/* <div><b>{brand.name}</b></div> */}
//               </div>
//             </div>
//           ))}
//         </div>    
//       </div>
//     </section>
//   );
// };

// export default Brands;
