"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import pic1 from '@/app/assets/tools5.jpg';

gsap.registerPlugin(ScrollTrigger);

const ScrollAnimation = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.children;

    gsap.utils.toArray(elements).forEach((el) => {
      const isLeftImage = el.querySelector("img"); // Check if it contains an image

      gsap.fromTo(
        el,
        { x: isLeftImage ? 400 : 300, opacity: 0 }, // Left elements move from -200, right from 200
        {
          x: 0,
          opacity: 1,
          duration: 1.5,
          stagger: 0.3,
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="h-[200vh] flex flex-col items-center gap-10 p-20">
      {/* Left animation (Image) */}
      <div className="bg-blue-500 text-white p-5 rounded-xl">
        <Image src={pic1} alt="leftimg" height={400} width={1400} />
      </div>

      {/* Right animation */}
      <div className="bg-red-500 text-white p-5 rounded-xl">
      <Image src={pic1} alt="leftimg" height={400} width={1400} />

      </div>

      {/* Fade-in animation */}
      <div className="bg-green-500 text-white p-5 rounded-xl">🔽 Fade In</div>
    </div>
  );
};

export default ScrollAnimation;

