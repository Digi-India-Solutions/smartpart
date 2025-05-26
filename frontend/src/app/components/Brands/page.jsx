'use client';
import React, { useEffect, useState } from 'react';
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
import { getData, serverURL } from '@/app/services/FetchNodeServices';

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


  const filterData = brand.filter((item) => item.brand_category_name === 'Top OEM Brands' && item?.status === 1)
  console.log("FRONEND_DATA:-", filterData)
  return (
    <>
      <section className="brands-container py-3">
        <h2 className="text-center">TOP <span className="text-theme bouncing-text"> OEM  BRANDS</span></h2>
        <div className="container">
          <div className='row justify-content-center'>
            {filterData.map((item, index) =>
              <div key={index} className="col-md-2 col-4 p-0">
                <Link href={`/pages/all-products/${item?.id}`} className="text-decoration-none text-dark">
                  <div className='brand-item'>
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
      <div>
      </div>
    </>
  );
};

export default Brands;
