'use client';

import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import pic10 from '@/app/assets/Wheelers/makino.png'
import pic9 from '@/app/assets/Wheelers/local3.jpeg'
import pic4 from '@/app/assets/Wheelers/local4.png'
import pic5 from '@/app/assets/Wheelers/local5.png'
import pic6 from '@/app/assets/Wheelers/local6.png'
import pic7 from '@/app/assets/Wheelers/local7.png'
import pic8 from '@/app/assets/Wheelers/local8.jpg'
import pic3 from '@/app/assets/Wheelers/local9.jpg'
import pic2 from '@/app/assets/Wheelers/local10.jpg'
import pic11 from '@/app/assets/Wheelers/local1.png'
import pic1 from '@/app/assets/Wheelers/local11.png'
import './wheels.css'
 


import img1 from '@/app/assets/icons/bajaj.webp'
import img2 from '@/app/assets/icons/yamaha.png'
import img4 from '@/app/assets/icons/tvs.png'
import img3 from '@/app/assets/icons/suzuki.webp'
import img5 from '@/app/assets/icons/honda.webp'
import img6 from '@/app/assets/icons/hero.webp'
import img7 from '@/app/assets/Wheelers/ashok layland.png'
import img8 from '@/app/assets/Wheelers/piaggio.png'
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import { useRouter } from 'next/navigation';
// import VideoSection from '../Videosec/page';

// import SpiningWheel from '@/app/components/SpiningWheel/page'




const Wheeler = [
  { name: 'BAJAJ', src: img1 , alt: 'ventage' },
  { name: 'YAMAHA', src: img2 , alt: 'ventage' },
  { name: 'SUZUKI', src: img3 , alt: 'ventage' },
  { name: 'TVS', src: img4 , alt: 'ventage' },
  { name: 'HONDA', src: img5 , alt: 'ventage' },
  { name: 'HERO ', src: img6 , alt: 'ventage'},
  { name: 'ROYAL ENFIELD', src: img7 , alt: 'ventage'},
  { name: 'PIAGGIO', src: img8 , alt: 'ventage'},

];


const subbrands = [
  { src: pic1, alt: 'ventage', name: 'SPARK MINDA' },
  { src: pic2, alt: 'ventage' , name: 'UNO MINDA'},
  { src: pic3, alt: 'ventage', name: 'GABRIEL' },
  { src: pic4, alt: 'ventage', name: 'ROLON' },
  { src: pic5, alt: 'ventage', name: 'GOETZE' },
  { src: pic6, alt: 'ventage' , name: 'FERODO'},
  { src: pic7, alt: 'ventage', name: 'MONROE' },
  { src: pic8, alt: 'ventage', name: 'CHAMPION' },
  { src: pic9, alt: 'ventage', name: 'VARROC' },
  { src: pic10, alt: 'ventage', name: 'MAKINO' },
  { src: pic11, alt: 'ventage' , name: 'ENDURANCE'},

];

const page = () => {
  const [brand, setBrand] = useState([])
const router = useRouter()
  const fetchBrand = async () => {
    //   try {
    const res = await getData("brand/get-all-brand");
    console.log("Brand Data:", res?.data);
    setBrand(res?.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
  }

  useEffect(() => {
    fetchBrand()
  }, [])


  const filterData = brand.filter((item) => item?.brand_category_name === 'TOP 2/3 WHEELERS BRANDS' && item?.status===1)
  const filterData2 = brand.filter((item) => item?.brand_category_name === '2/3 WHEELERS AFTERMARKET BRANDS' && item?.status===1)
  console.log("FRONEND_DATA:-WHEEL:=>", filterData2)

  const handleCategoryClick = (category) => {
    router.push(
      `/pages/all-products/${category?.id}?name=${category?.name}&title=brand`
    );
  };
  
  return (
    <>

{/* <VideoSection/> */}

      <section className="Wheel-container">
        <h2 className="text-center">TOP  <span className="text-theme bouncing-text">2/3 WHEELERS</span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {filterData?.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <div onClick={()=>handleCategoryClick(item)}  className='text-decoration-none text-dark'>
                <div className='Wheel-item'>
                  <div className='d-flex justify-content-center'>
                  <Image
                                        src={
                                          item?.image
                                            ? (item?.image?.includes('uploads/images')
                                              ? `${serverURL}/${item?.image}`
                                              : `${serverURL}/uploads/images/${item?.image}`)
                                            : '/default-category.png'
                                        }
                                        width={100} height={100}
                                        alt={item?.name || 'Brand Image'} style={{ objectFit: 'contain' }} />
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
    
              
      <section className="Wheel-container">
      <h2 className='tyertitle text-center'>2/3 <span className='text-theme bouncing-text'> WHEELERS AFTERMARKET </span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {filterData2.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <Link href="/pages/all-products" className='text-decoration-none text-dark'>
                <div className='Wheel-item'>
                  <div className='d-flex justify-content-center'>
                  <Image className="brandimg" src={`${serverURL}/uploads/images/${item?.image}` || item?.image || `${serverURL}/${item?.image}`} width={100} height={100} alt={item?.name} />
                  </div>
                  <p className='text-center'>
                    {item?.name}
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

export default page;














// import Image from 'next/image'
// import Link from 'next/link';
// import React from 'react'
// import pic10 from '@/app/assets/Wheelers/makino.png'
// import pic9 from '@/app/assets/Wheelers/local3.jpeg'
// import pic4 from '@/app/assets/Wheelers/local4.png'
// import pic5 from '@/app/assets/Wheelers/local5.png'
// import pic6 from '@/app/assets/Wheelers/local6.png'
// import pic7 from '@/app/assets/Wheelers/local7.png'
// import pic8 from '@/app/assets/Wheelers/local8.jpg'
// import pic3 from '@/app/assets/Wheelers/local9.jpg'
// import pic2 from '@/app/assets/Wheelers/local10.jpg'
// import pic11 from '@/app/assets/Wheelers/local1.png'
// import pic1 from '@/app/assets/Wheelers/local11.png'
// import './wheels.css'

// import img1 from '@/app/assets/icons/bajaj.webp'
// import img2 from '@/app/assets/icons/yamaha.png'
// import img4 from '@/app/assets/icons/tvs.png'
// import img3 from '@/app/assets/icons/suzuki.webp'
// import img5 from '@/app/assets/icons/honda.webp'
// import img6 from '@/app/assets/icons/hero.webp'
// import img7 from '@/app/assets/Wheelers/ashok layland.png'
// import img8 from '@/app/assets/Wheelers/piaggio.png'
// import VideoSection from '../Videosec/page';

// // import SpiningWheel from '@/app/components/SpiningWheel/page'


// const wheeler = [
//   { name: 'bajaj', image: img1 },
//   { name: 'tvs', image: img2 },
//   { name: 'yamaha', image: img3 },
//   { name: 'suzuki', image: img4 },
//   { name: 'hero', image: img5 },
//   { name: 'honda', image: img6 },
//   { name: 'honda', image: img7 },
//   { name: 'honda', image: img8 },

// ]



// const subbrands = [
//   { src: pic1, alt: 'ventage' },
//   { src: pic2, alt: 'ventage' },
//   { src: pic3, alt: 'ventage' },
//   { src: pic4, alt: 'ventage' },
//   { src: pic5, alt: 'ventage' },
//   { src: pic6, alt: 'ventage' },
//   { src: pic7, alt: 'ventage' },
//   { src: pic8, alt: 'ventage' },
//   { src: pic9, alt: 'ventage' },
//   { src: pic10, alt: 'ventage' },
//   { src: pic11, alt: 'ventage' },

// ]

// const page = () => {
//   return (
//     <>
   
//    <VideoSection/>

//       <div className='main bg-black'>
//         <div className="container-fluid">
//           <div className='wheelsection'>
//             {/* <SpiningWheel /> */}
//             <h1 className='text-center'> TOP 2/3  <span className='text-warning'>WHEELERS</span></h1>
//             <div className="row justify-content-center">
//               {wheeler.map((item, index) => (
//                 <div key={index} className="col-md-1 m-2 wheelPortion">
//                   <Link href="/">
//                     <div className='icon'>
//                       <Image className="whele-icons-image" src={item.image} alt={item.name} />
//                     </div>
//                   </Link>
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>

//         <section className='Tyerssection'>
//           <div className="container">
//             <h2 className='tyertitle text-center'>2/3<span className='text-warning'> WHEELERS AFTERMARKET </span></h2>
//             <div className='tyerbrandsec' style={{ maxWidth: '1400px', margin: '0 auto' }}>
//               {subbrands.map((item, index) => (
//                 <div key={index} className='tyerbrand' style={{ width: '9%', transition: 'transform 0.3s', cursor: 'pointer' }}>
//                   <Image className='tyerbrandImg' src={item.src} alt={item.alt} />
//                   <div>
//                     <small className='text-center'>{item.name}</small>
//                   </div>
//                 </div>
//               ))}
//             </div>

//           </div>
//         </section>
//       </div>

//     </>
//   )
// }

// export default page




