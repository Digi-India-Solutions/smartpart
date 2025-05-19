     "use client";
     import Image from 'next/image';
     import { useEffect, useRef } from "react";
     import { gsap } from "gsap";
     import { ScrollTrigger } from "gsap/ScrollTrigger";
     import './trands.css';
     import pic1 from '@/app/assets/brands/structure.jpg';
     
     gsap.registerPlugin(ScrollTrigger);
     
     const Page = () => {
       const containerRef = useRef(null);
     
       useEffect(() => {
         const imageEl = containerRef.current.querySelector(".image-container");
         const textEl = containerRef.current.querySelector(".text-container");
     
         gsap.fromTo(
           imageEl,
           { x: -200, opacity: 0 }, // Image from the left
           {
             x: 0,
             opacity: 1,
             duration: 1.5,
             scrollTrigger: {
               trigger: imageEl,
               start: "top 80%",
               end: "bottom 20%",
               scrub: true,
             },
           }
         );
     
         gsap.fromTo(
           textEl,
           { x: 200, opacity: 0 }, // Text from the right
           {
             x: 0,
             opacity: 1,
             duration: 1.5,
             scrollTrigger: {
               trigger: textEl,
               start: "top 80%",
               end: "bottom 20%",
               scrub: true,
             },
           }
         );
       }, []);
     
       return (
         <section ref={containerRef} className='TrandSec'>
           <div className='container'>
             <div className='row'>
               {/* Image Section */}
               <div className='image-container'>
                 <Image src={pic1} alt='blueprint of car' className='img-responsive' />
               </div>
               
               {/* Text Section */}
               <div className='text-container'>
                 <h3>
                 Trusted   <span className='text-theme bouncing-text'> Genuine Parts </span> Exporter Worldwide
                 </h3>
                 <p>
                
                 Using the proper spare parts is the first step in guaranteeing the performance and dependability of your OEM'S vehicle worldwide. At Smart Parts Exports, we take great satisfaction in being a trusted OEM'S genuine parts exporter, providing premium, genuine parts that are perfectly matched to your car's specifications. Whether you’re maintaining an X-Trail, Qashqai, or Patrol, our genuine spare parts deliver the durability and precision your car deserves.
                 </p>
               </div>
             </div>
           </div>
         </section>
       );
     };
     
     export default Page;
     
















// import Image from 'next/image';
// import React from 'react';
// import './trands.css';
// import pic1 from '@/app/assets/brands/structure.jpg';

// const Page = () => {
//   return (
//     <section className='TrandSec'>
//       <div className='container'>
//         <div className='row'>
//           {/* Image Section */}
//           <div className='image-container'>
//             <Image src={pic1} alt='blueprint of car' className='img-responsive' />
//           </div>
          
//           {/* Text Section */}
//           <div className='text-container'>
//             <h3>
//               Trusted Nissan <span className='text-warning'>Genuine Parts</span> Exporter in Russia
//             </h3>
//             <p>
//               Using the proper spare parts is the first step in guaranteeing the performance and dependability of your Nissan vehicle in Russia. At Smart Parts Exports, we take great satisfaction in being a trusted Nissan genuine parts exporter, providing premium, genuine parts that are perfectly matched to your car's specifications. Whether you’re maintaining a Nissan X-Trail, Qashqai, or Patrol, our genuine spare parts deliver the durability and precision your car deserves.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Page;