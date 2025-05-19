"use client"
import React, { useEffect, useState } from 'react'
import './pageblog.css'
import Image from 'next/image'
import pic1 from '@/app/assets/banner8.jpg'


const Page = () => {
    const [date, setDate] = useState('');

    useEffect(() => {
      const formattedDate = new Date().toLocaleDateString();
      setDate(formattedDate);
    }, []);
  return (
    <>
  <section className='blog-detail bg-dark'>
      <div className="container">
        <div className="blog-header">
          <h1 className='blog-title'>
            Hyundai Spare Parts - Indian Exporter of Automotive Parts
          </h1>
          <div className="blog-meta">
            <span className='badge category'>Automotive</span>
            <span className='date'>{date}</span>
          </div>
          <Image src={pic1} alt='Hyundai Spare Parts Banner' className='banner-img' priority />
        </div>

        <div className="blog-content">
          <p>
            At our core, we are committed to delivering high-quality Hyundai spare parts to global markets.
            As one of the leading Indian exporters of automotive components, we pride ourselves on a wide inventory,
            top-notch customer support, and a mission to power vehicles with genuine parts.
          </p>

          <p>
            Our portfolio includes everything from engine components, suspension parts, electricals, to body parts.
            We ensure that each part meets international standards and offers long-lasting durability.
          </p>

          <h3>Why Choose Us?</h3>
          <ul>
            <li>✔️ Genuine OEM & aftermarket Hyundai parts</li>
            <li>✔️ Fast global shipping</li>
            <li>✔️ Bulk order support with attractive pricing</li>
            <li>✔️ Trusted by over 1000+ clients worldwide</li>
          </ul>

          <p>
            Whether you re a mechanic, a distributor, or a retail customer, our expert team ensures you receive the best parts with full satisfaction.
          </p>
        </div>
      </div>
    </section>
     <section>
          
      

     </section>

    </>

  )
}

export default Page;
