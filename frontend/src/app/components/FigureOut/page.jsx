
"use client"
import Image from 'next/image';
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import './figureout.css';
import pic1 from '@/app/assets/car engine.png';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

const Page = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const sections = containerRef.current.querySelectorAll(".row");

        sections.forEach((section, index) => {
            const image = section.querySelector(".picsec");
            const content = section.querySelector(".text-container");

            gsap.fromTo(
                image,
                { x: index % 2 === 0 ? -300 : 300, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: image,
                        start: "top 80%",
                        end: "bottom 50%",
                        scrub: true,
                    },
                }
            );

            gsap.fromTo(
                content,
                { x: index % 2 === 0 ? 300 : -300, opacity: 0 },
                {
                    x: 0,
                    opacity: 1,
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: content,
                        start: "top 80%",
                        end: "bottom 70%",
                        scrub: true,
                    },
                }
            );
        });
    }, []);

    return (
        <section ref={containerRef} className='Figureoutsec py-5'>
            <div className="container">
                <div className="row align-items-center">
                    {/* Image Section */}
                    <div className="col-md-4 picsec text-center">
                        <Image src={pic1} className='picsecimg' alt='Engine pic' />
                    </div>

                    {/* Content Section */}
                    <div className="col-md-8 text-center text-container">
                        <h2 className="fw-bold">Smart Parts Exports – #1 Online Marketplace to Buy Spare Parts</h2>
                        <p className="mt-3">
                            Smart Parts Exports is the largest exporter of automotive spare parts for passenger 
                            and commercial vehicles all over the world. We strive to give world-class service 
                            to all our esteemed clients.
                        </p>

                        {/* Animated Numbers */}
                        <div className="d-flex justify-content-center align-items-center gap-5 mt-4">
                            <div>
                                <h3 className="fw-bold">80+</h3>
                                <p>Countries</p>
                            </div>
                            <div>
                                <h3 className="fw-bold">5+</h3>
                                <p>Continents</p>
                            </div>
                            <div>
                                <h3 className="fw-bold">1000+</h3>
                                <p>Clients</p>
                            </div>
                        </div>
                       <Link href="/pages/about-us" alt="aboutus">
                       <button className='btn w-100' style={{backgroundColor:'rgb(2, 88, 169)' , color:'white'}}>Know More</button>

                       
                       </Link>
                                           </div>
                </div>
            </div>
        </section>
    );
};

export default Page;











// "use client"
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import pic1 from '@/app/assets/car engine.png';
// import './figureout.css';

// const Page = () => {
//     const [num1, setNum1] = useState(1);
//     const [num2, setNum2] = useState(1);
//     const [num3, setNum3] = useState(1);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setNum1((prev) => (prev < 80 ? prev + 1 : 80));
//             setNum2((prev) => (prev < 5 ? prev + 1 : 5));
//             setNum3((prev) => (prev < 1000 ? prev + 10 : 1000));
//         }, 50);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <section className='Figureoutsec py-5'>
//             <div className="container">
//                 <div className="row align-items-center">
//                     {/* Image Section */}
//                     <div className="col-md-4 picsec text-center">
//                         <Image src={pic1} className='picsecimg' alt='Engine pic' />
//                     </div>

//                     {/* Content Section */}
//                     <div className="col-md-8 text-center">
//                         <h2 className="fw-bold">Smart Parts Exports – #1 Online Marketplace to Buy Spare Parts</h2>
//                         <p className="mt-3">
//                             Smart Parts Exports is the largest exporter of automotive spare parts for passenger 
//                             and commercial vehicles all over the world. We strive to give world-class service 
//                             to all our esteemed clients.
//                         </p>

//                         {/* Animated Numbers */}
//                         <div className="d-flex justify-content-center align-items-center gap-5 mt-4">
//                             <div>
//                                 <h3 className="fw-bold">{num1}+</h3>
//                                 <p>Countries</p>
//                             </div>
//                             <div>
//                                 <h3 className="fw-bold">{num2}+</h3>
//                                 <p>Continents</p>
//                             </div>
//                             <div>
//                                 <h3 className="fw-bold">{num3}+</h3>
//                                 <p>Clients</p>
//                             </div>
//                         </div>
//                             <button className='btn btn-warning w-100'>Know More</button>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// export default Page;


