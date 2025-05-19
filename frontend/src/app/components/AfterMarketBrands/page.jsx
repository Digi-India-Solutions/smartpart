'use client';
import Image from 'next/image'
import React from 'react'
import img7 from '@/app/assets/localcompany/img7.png'
import img2 from '@/app/assets/localcompany/mrf.png'
import img3 from '@/app/assets/localcompany/img3.png'
import img4 from '@/app/assets/localcompany/img4.png'
import img5 from '@/app/assets/localcompany/img5.png'
import img6 from '@/app/assets/localcompany/img6.png'
import './aftermarketbrand.css'
import SpiningWheel from  '@/app/components/SpiningWheel/page'
import Link from 'next/link';

const subbrands = [
  { src: img7, alt: 'ventage', name : " MICHELIN " },
  { src: img2, alt: 'ventage', name : " MRF " },
  { src: img3, alt: 'ventage', name : " GOODYEAR " },
  { src: img4, alt: 'ventage', name : " FEAT " },
  { src: img5, alt: 'ventage', name : " BRIDGESTON " },
  { src: img6, alt: 'ventage', name : " APOLLO" },
  
  
];


const Brands = () => {
  return (
    <>
     <SpiningWheel/>
      <section className="aftermarketbrands-container">
        <h2 className="text-center">TYRES  <span className="text-theme bouncing-text">  2W/3W/4W/LCV/HCV </span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {subbrands.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <Link href="/pages/all-products" className='text-decoration-none text-dark'>
                <div className='aftermarketbrands-item'>
                  <div className='d-flex justify-content-center'>
                  <Image className="aftermarketbrandsimg" src={item.src} alt={item.alt} />
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















// import Image from 'next/image'
// import React from 'react'
// import img7 from '@/app/assets/localcompany/img7.png'
// import img2 from '@/app/assets/localcompany/mrf.png'
// import img3 from '@/app/assets/localcompany/img3.png'
// import img4 from '@/app/assets/localcompany/img4.png'
// import img5 from '@/app/assets/localcompany/img5.png'
// import img6 from '@/app/assets/localcompany/img6.png'
// import './aftermarketbrand.css'
// import SpiningWheel from  '@/app/components/SpiningWheel/page'

// const subbrands = [
//   { src: img7, alt: 'ventage', },
//   { src: img2, alt: 'ventage', },
//   { src: img3, alt: 'ventage', },
//   { src: img4, alt: 'ventage', },
//   { src: img5, alt: 'ventage', },
//   { src: img6, alt: 'ventage', }
  
// ]

// const page = () => {
//   return (
//     <>
//   <SpiningWheel/>

//       <section className='aftermarketbrandsection'>
//         <div className="container">

//           <h2 className='afterbrandtitle text-center'>TYRES <span className='text-warning'>  2W/3W/4W/LCV/HCV</span></h2>
//           <div className='afterbrandsec'>
//             {subbrands.map((item, index) => (

//               <div key={index} className='localbrand' >
//                 <Image className='subbrandImg' src={item.src} alt={item.alt}   />
                
//               </div>


//             ))
//             }
//           </div>

//         </div>





//       </section>







//     </>
//   )
// }

// export default page
