'use client'; // Required for client-side components

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./carousel.css"; // Regular CSS import (not module)
import pic1 from "@/app/assets/Banner/Banner4.jpg";
import pic2 from "@/app/assets/Banner/Banner3.png";
import pic3 from "@/app/assets/Banner/Banner2.jpg";
import pic4 from "@/app/assets/Banner/Banner1.jpg";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getData, serverURL } from '@/app/services/FetchNodeServices';
import Image from 'next/image';


export default function CustomCarousel() {
  const [banner, setBanner] = useState([])
  // const slides = [
  //   {
  //     id: 1,
  //     image: pic1,
  //     title: "Orignal, Aftermarket & OEM Parts",
  //     text: "High Quality Standards",
  //     buttonLink: "/nature",
  //     buttonText: "Learn More"
  //   },
  //   {
  //     id: 2,
  //     image: pic2,
  //     title: "TOP AFTERMARKETS BRANDS",
  //     text: "Unleash your spirit with thrilling activities.",
  //     buttonLink: "/adventure",
  //     buttonText: "Get Started"
  //   },
  //   {
  //     id: 3,
  //     image: pic3,
  //     title: "2/3 WHEELERS AFTERMARKET",
  //     text: "Example text for third slide.",
  //     buttonLink: "/third",
  //     buttonText: "View More"
  //   },
  //   {
  //     id: 4,
  //     image: pic4,
  //     title: "TYRES 2W/3W/4W/LCV/HCV",
  //     text: "Example text for fourth slide.",
  //     buttonLink: "/fourth",
  //     buttonText: "Explore"
  //   }
  // ];

  const fetchBanner = async () => {
    try {
      const res = await getData('banner-image/get-all-banner-for-home');
      if (res.status) {
        setBanner(res.data);
      } else {
        console.log("Failed to fetch banner images")
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    fetchBanner()
  }, [])
  console.log("BANNER:-", banner)
  return (
    <Carousel interval={3000} pause={false}>
      
      {banner?.map((slide) => (
        <Carousel.Item key={slide?.id}>
          <Image
            className="d-block w-100 dimmed-image"
            src={`${serverURL}/uploads/images/${slide?.image}` || `${serverURL}/${slide?.image}` || pic1} // Use .src for imported images
            alt={slide?.title}
            width={100}
            height={100}
          />
          <div className="carousel-content"> {/* Changed from styles.carouselContent to regular class */}
            <h3>{slide?.title}</h3>
            <p>{slide?.heading || "Example text for fourth slide."}</p>
            <Link href={slide?.slider_link} className='blur-btn'>
              {slide?.sub_heading || "Explore"}
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
