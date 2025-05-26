'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import './localComapniesbrand.css';



// Importing brand images
import subbrand1 from '@/app/assets/localcompany/logo1.png';
import subbrand2 from '@/app/assets/localcompany/logo2.png';
import subbrand3 from '@/app/assets/localcompany/logo5.png';
import subbrand4 from '@/app/assets/localcompany/logo6.png';
import subbrand5 from '@/app/assets/localcompany/logo9.png';
import subbrand6 from '@/app/assets/localcompany/logo26.png';
import subbrand7 from '@/app/assets/localcompany/logo11.png';
import subbrand8 from '@/app/assets/localcompany/logo12.png';
import subbrand9 from '@/app/assets/localcompany/logo33.png';
import subbrand11 from '@/app/assets/localcompany/logo17.png';
import subbrand12 from '@/app/assets/localcompany/logo18.png';
import subbrand13 from '@/app/assets/localcompany/logo20.png';
import subbrand14 from '@/app/assets/localcompany/logo22.png';
import subbrand15 from '@/app/assets/localcompany/logo23.png';
import subbrand16 from '@/app/assets/localcompany/logo24.png';
import subbrand17 from '@/app/assets/localcompany/logo25.png';
import subbrand18 from '@/app/assets/localcompany/logo10.png';

import subbrand19 from '@/app/assets/localcompany/logo28.png';
import subbrand20 from '@/app/assets/localcompany/logo31.png';
import subbrand21 from '@/app/assets/localcompany/logo32.png';
import subbrand22 from '@/app/assets/localcompany/logo13.png';

import subbrand23 from '@/app/assets/localcompany/logo34.png';
import subbrand24 from '@/app/assets/localcompany/logo35.png';
import subbrand30 from '@/app/assets/localcompany/logo16.png';
import subbrand25 from '@/app/assets/localcompany/logo36.png';
import subbrand26 from '@/app/assets/localcompany/logo37.png';
import subbrand27 from '@/app/assets/localcompany/logo38.png';
import subbrand28 from '@/app/assets/localcompany/logo39.png';
import subbrand29 from '@/app/assets/localcompany/logo21.jpeg';
import subbrand10 from '@/app/assets/localcompany/logo27.png';
import subbrand31 from '@/app/assets/localcompany/logo14.png';
import subbrand32 from '@/app/assets/localcompany/logo15.png';
import subbrand33 from '@/app/assets/localcompany/logo3.png';
import subbrand34 from '@/app/assets/localcompany/logo19.png';
import subbrand35 from '@/app/assets/localcompany/logo29.jpg';
import subbrand36 from '@/app/assets/localcompany/logo30.png';
import subbrand37 from '@/app/assets/localcompany/logo7.png';
import subbrand38 from '@/app/assets/localcompany/logo8.png';
import subbrand39 from '@/app/assets/localcompany/logo4.png';
import Link from 'next/link';
import { getData, serverURL } from '@/app/services/FetchNodeServices';



const brands = [
  { src: subbrand1, alt: 'Audi'   , name : " HYUNDAI XTEER  "     },
  { src: subbrand2, alt: 'Honda'  , name : "  MANDO "     },
  { src: subbrand3, alt: 'Hyundai'  , name : "  VALEO  "     },
  { src: subbrand4, alt: 'Nissan'  , name : " SCHAEFFLER  "     },
  { src: subbrand5, alt: 'Renault'  , name : "  WABCO   "     },
  { src: subbrand6, alt: 'Scorpio'  , name : " BREMBO "     },
  { src: subbrand7, alt: 'Toyota'  , name : " BOSCH  "    },
  { src: subbrand8, alt: 'Jaguar'  , name : " DENSO "     },
  { src: subbrand9, alt: 'Scorpio'  , name : " PIERBURG "     },
  { src: subbrand10, alt: 'Scorpio'  , name : " FILTRON "     },
  { src: subbrand11, alt: 'Scorpio'  , name : "  HI-Q SANGSIN "    },
  { src: subbrand12, alt: 'Scorpio'  , name : "  DONALDSON   "     },
  { src: subbrand13, alt: 'Scorpio'  , name : " DOOWON   "     },
  { src: subbrand14, alt: 'Scorpio'  , name : " MAHLE   "     },
  { src: subbrand15, alt: 'Scorpio'  , name : " LUMAX  "     },
  { src: subbrand16, alt: 'Scorpio'  , name : "  BORGWARNE  "     },
  { src: subbrand17, alt: 'Scorpio'  , name : " SUBROS "     },
  { src: subbrand18, alt: 'Suzuki'  , name : " VICTOR REINZ "    },
  { src: subbrand19, alt: 'Scorpio'  , name : " SKF  "     },

  { src: subbrand20, alt: 'BMW'  , name : " OSRAM "     },
  { src: subbrand21, alt: 'Scorpio'  , name : " PHILIPS "     },
  { src: subbrand22, alt: 'Scorpio'  , name : "DELPHI "     },
  { src: subbrand23, alt: 'Scorpio'  , name : " SACHS "     },
  { src: subbrand24, alt: 'Scorpio'  , name : "  PHC VALEO"     },
  { src: subbrand25, alt: 'Scorpio'  , name : "HENGST  "     },
  { src: subbrand26, alt: 'Scorpio'  , name : " CONTINENTAL  "     },
  { src: subbrand27, alt: 'Scorpio'  , name : "TRW    "     },
  { src: subbrand28, alt: 'Scorpio'  , name : " GARRETT "     },
  { src: subbrand29, alt: 'Scorpio'  , name : "HANON SYSTEMS   "     },
  { src: subbrand30, alt: 'Scorpio'  , name : "  FAG  "     },
  { src: subbrand31, alt: 'Scorpio'  , name : " LUK  "     },
  { src: subbrand32, alt: 'Scorpio'  , name : "  KNORR BREMSE  "     },
  { src: subbrand33, alt: 'Scorpio'  , name : "  MANN FILTER    "     },
  { src: subbrand34, alt: 'Scorpio'  , name : " FLEETGUARD      "     },
  { src: subbrand35, alt: 'Scorpio'  , name : " WIX FILTERS "     },
  { src: subbrand36, alt: 'Scorpio'  , name : " FEBI BILSTEIN "     },
  { src: subbrand37, alt: 'Scorpio'  , name : " ZF  "     },
  { src: subbrand38, alt: 'Scorpio'  , name : "TEL   "     },
  { src: subbrand39, alt: 'Scorpio'  , name : " NGK  "     },
]

const Brands = () => {

  const [brand, setBrand] = useState([])
  
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
    const filterData = brand.filter((item) => item.brand_category_name === 'TOP AFTERMARKETS BRANDS'&& item?.status===1)
    console.log("FRONEND_DATA:-", filterData)
  return (
    <>
      <section className="local-container">
        <h2 className="text-center">TOP  <span className="text-theme bouncing-text"> AFTERMARKETS BRANDS</span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {filterData?.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <Link href={`/pages/all-products/${item?.id}`} className='text-decoration-none text-dark'>
                <div className='local-item'>
                  <div className='d-flex justify-content-center'>
                  <Image className="brandimg" src={`${serverURL}/uploads/images/${item?.image}` || item?.image || `${serverURL}/${item?.image}`} width={100} height={100} alt={item?.name} />
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








































// 'use client';
// import React from 'react';
// import Image from 'next/image';
// import './localComapniesbrand.css';

// // Importing brand images
// import subbrand1 from '@/app/assets/localcompany/logo1.png';
// import subbrand2 from '@/app/assets/localcompany/logo2.png';
// import subbrand3 from '@/app/assets/localcompany/logo5.png';
// import subbrand4 from '@/app/assets/localcompany/logo6.png';
// import subbrand5 from '@/app/assets/localcompany/logo9.png';
// import subbrand6 from '@/app/assets/localcompany/logo26.png';
// import subbrand7 from '@/app/assets/localcompany/logo11.png';
// import subbrand8 from '@/app/assets/localcompany/logo12.png';
// import subbrand9 from '@/app/assets/localcompany/logo33.png';
// import subbrand11 from '@/app/assets/localcompany/logo17.png';
// import subbrand12 from '@/app/assets/localcompany/logo18.png';
// import subbrand13 from '@/app/assets/localcompany/logo20.png';
// import subbrand14 from '@/app/assets/localcompany/logo22.png';
// import subbrand15 from '@/app/assets/localcompany/logo23.png';
// import subbrand16 from '@/app/assets/localcompany/logo24.png';
// import subbrand17 from '@/app/assets/localcompany/logo25.png';
// import subbrand18 from '@/app/assets/localcompany/logo10.png';

// import subbrand19 from '@/app/assets/localcompany/logo28.png';
// import subbrand20 from '@/app/assets/localcompany/logo31.png';
// import subbrand21 from '@/app/assets/localcompany/logo32.png';
// import subbrand22 from '@/app/assets/localcompany/logo13.png';

// import subbrand23 from '@/app/assets/localcompany/logo34.png';
// import subbrand24 from '@/app/assets/localcompany/logo35.png';
// import subbrand30 from '@/app/assets/localcompany/logo16.png';
// import subbrand25 from '@/app/assets/localcompany/logo36.png';
// import subbrand26 from '@/app/assets/localcompany/logo37.png';
// import subbrand27 from '@/app/assets/localcompany/logo38.png';
// import subbrand28 from '@/app/assets/localcompany/logo39.png';
// import subbrand29 from '@/app/assets/localcompany/logo21.jpeg';
// import subbrand10 from '@/app/assets/localcompany/logo27.png';
// import subbrand31 from '@/app/assets/localcompany/logo14.png';
// import subbrand32 from '@/app/assets/localcompany/logo15.png';
// import subbrand33 from '@/app/assets/localcompany/logo3.png';
// import subbrand34 from '@/app/assets/localcompany/logo19.png';
// import subbrand35 from '@/app/assets/localcompany/logo29.jpg';
// import subbrand36 from '@/app/assets/localcompany/logo30.png';
// import subbrand37 from '@/app/assets/localcompany/logo7.png';
// import subbrand38 from '@/app/assets/localcompany/logo8.png';
// import subbrand39 from '@/app/assets/localcompany/logo4.png';


// const brands = [
//   { src: subbrand1, alt: 'Audi'  },
//   { src: subbrand2, alt: 'Honda' },
//   { src: subbrand3, alt: 'Hyundai' },
//   { src: subbrand4, alt: 'Nissan' },
//   { src: subbrand5, alt: 'Renault' },
//   { src: subbrand6, alt: 'Scorpio' },
//   { src: subbrand7, alt: 'Toyota'},
//   { src: subbrand8, alt: 'Jaguar' },
//   { src: subbrand9, alt: 'Scorpio' },
//   { src: subbrand10, alt: 'Scorpio' },
//   { src: subbrand11, alt: 'Scorpio'},
//   { src: subbrand12, alt: 'Scorpio' },
//   { src: subbrand13, alt: 'Scorpio' },
//   { src: subbrand14, alt: 'Scorpio' },
//   { src: subbrand15, alt: 'Scorpio' },
//   { src: subbrand16, alt: 'Scorpio' },
//   { src: subbrand17, alt: 'Scorpio' },
//   { src: subbrand18, alt: 'Suzuki'},
//   { src: subbrand19, alt: 'Scorpio' },

//   { src: subbrand20, alt: 'BMW' },
//   { src: subbrand21, alt: 'Scorpio' },
//   { src: subbrand22, alt: 'Scorpio' },
//   { src: subbrand23, alt: 'Scorpio' },
//   { src: subbrand24, alt: 'Scorpio' },
//   { src: subbrand25, alt: 'Scorpio' },
//   { src: subbrand26, alt: 'Scorpio' },
//   { src: subbrand27, alt: 'Scorpio' },
//   { src: subbrand28, alt: 'Scorpio' },
//   { src: subbrand29, alt: 'Scorpio' },
//   { src: subbrand30, alt: 'Scorpio' },
//   { src: subbrand31, alt: 'Scorpio' },
//   { src: subbrand32, alt: 'Scorpio' },
//   { src: subbrand33, alt: 'Scorpio' },
//   { src: subbrand34, alt: 'Scorpio' },
//   { src: subbrand35, alt: 'Scorpio' },
//   { src: subbrand36, alt: 'Scorpio' },
//   { src: subbrand37, alt: 'Scorpio' },
//   { src: subbrand38, alt: 'Scorpio' },
//   { src: subbrand39, alt: 'Scorpio' },

 
// ];

// const Brands = () => {
//   return (
//     <section className='localebrands-container py-4'>
//       <div className='container'>
//         <h2 className='text-center mb-4'>TOP <span className='text-warning'>AFTERMARKET BRANDS</span> OF US</h2>
//         <div className='row justify-content-center'>
//           {brands.map((brand, index) => (
//             <div key={index} className='col-6 col-sm-4 col-md-3 col-lg-2 mb-3 d-flex justify-content-center'>
//               <div className='brand-item text-center p-1 h-100 rounded' style={{ color: 'white'  }}>
//                 <Image className='localebrandimg '  src={brand.src} alt={brand.alt} />
              
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Brands;
