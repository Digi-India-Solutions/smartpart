'use client';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import img7 from '@/app/assets/localcompany/img7.png'
import img2 from '@/app/assets/localcompany/mrf.png'
import img3 from '@/app/assets/localcompany/img3.png'
import img4 from '@/app/assets/localcompany/img4.png'
import img5 from '@/app/assets/localcompany/img5.png'
import img6 from '@/app/assets/localcompany/img6.png'
import './aftermarketbrand.css'
import SpiningWheel from  '@/app/components/SpiningWheel/page'
import Link from 'next/link';
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import { useRouter } from 'next/navigation';


const Brands = () => {
   const [brand, setBrand] = useState([])
  const router = useRouter();
    const fetchBrand = async () => {
      const res = await getData("brand/get-all-brand");
      console.log("Brand Data:", res?.data);
      setBrand(res?.data);
    }
  
    useEffect(() => {
      fetchBrand()
    }, [])
  
  
    const filterData = brand.filter((item) => item?.brand_category_name === 'TYRES 2W/3W/4W/LCV/HCV' && item?.status===1)
    console.log("FRONEND_DATA:-", filterData)
  
    const handleCategoryClick = (category) => {
      router.push(
        `/pages/all-products/${category?.id}?name=${category?.name}&title=brand`
      );
    };

  return (
    <>
     <SpiningWheel/>
      <section className="aftermarketbrands-container">
        <h2 className="text-center">TYRES  <span className="text-theme bouncing-text">  2W/3W/4W/LCV/HCV </span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {filterData.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <div onClick={() => handleCategoryClick(item)} className='text-decoration-none text-dark'>
                <div className='aftermarketbrands-item'>
                  <div className='d-flex justify-content-center'>
                  <Image className="brandimg" src={`${serverURL}/uploads/images/${item?.image}` || item?.image || `${serverURL}/${item?.image}`} width={100} height={100} alt={item?.name} />
                  </div>
                  <p className='text-center'>
                    {item.name}
                  </p>
                </div>
                </div>
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
