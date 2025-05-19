'use client'; // Required for client-side components

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./carousel.css"; // Regular CSS import (not module)
import pic1 from "@/app/assets/Banner/Banner4.jpg";
import pic2 from "@/app/assets/Banner/Banner3.png";
import pic3 from "@/app/assets/Banner/Banner2.jpg";
import pic4 from "@/app/assets/Banner/Banner1.jpg";
import Link from 'next/link';

export default function CustomCarousel() {
  const slides = [
    {
      id: 1,
      image: pic1,
      title: "Orignal, Aftermarket & OEM Parts",
      text: "High Quality Standards",
      buttonLink: "/nature",
      buttonText: "Learn More"
    },
    {
      id: 2,
      image: pic2,
      title: "TOP AFTERMARKETS BRANDS",
      text: "Unleash your spirit with thrilling activities.",
      buttonLink: "/adventure",
      buttonText: "Get Started"
    },
    {
      id: 3,
      image: pic3,
      title: "2/3 WHEELERS AFTERMARKET",
      text: "Example text for third slide.",
      buttonLink: "/third",
      buttonText: "View More"
    },
    {
      id: 4,
      image: pic4,
      title: "TYRES 2W/3W/4W/LCV/HCV",
      text: "Example text for fourth slide.",
      buttonLink: "/fourth",
      buttonText: "Explore"
    }
  ];

  return (
    <Carousel interval={3000} pause={false}>
      {slides.map((slide) => (
        <Carousel.Item key={slide.id}>
          <img
            className="d-block w-100 dimmed-image"
            src={slide.image.src} // Use .src for imported images
            alt={slide.title}
          />
          <div className="carousel-content"> {/* Changed from styles.carouselContent to regular class */}
            <h3>{slide.title}</h3>
            <p>{slide.text}</p>
            <Link href={slide.buttonLink} className='blur-btn'>
              {slide.buttonText}
            </Link>
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
