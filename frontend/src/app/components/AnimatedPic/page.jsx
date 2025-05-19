'use client';
import React, { useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image'; // If using Next.js
import pic1 from '@/app/assets/structure.jpg'
import './animatedpic.css'
const ImageSection = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const container = containerRef.current;

      if (!container) return;

      // Optional: Add parallax effect (0.5 = half-speed scroll)
      const parallaxValue = scrollPosition * 0.5;
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${parallaxValue}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    <>
    <section className='fixed-animated-image'></section>
    </>
  );
};

export default ImageSection;






    // <div className="w-100" ref={containerRef}>
    //   <div id="image-section" className="position-relative vh-100">
    //     <div
    //       ref={imageRef}
    //       className="position-fixed top-0 start-0 w-100 h-100"
    //       style={{
    //         pointerEvents: 'none',
    //         zIndex: -1,
    //         transition: 'transform 0.3s ease-out',
    //         willChange: 'transform'
    //       }}
    //     >
    //       <Image
    //         src={pic1}
    //         alt="Background"
    //         fill
    //         className="object-fit-cover"
    //         priority
    //       />

    //     </div>

    //     <div className="
    //       position-relative d-flex align-items-center justify-content-center 
    //       vh-100 text-white display-4 fw-bold bg-dark bg-opacity-50
    //     ">
    //       TOP 2/3 WHEELERS
    //     </div>
    //   </div>
    // </div>