   "use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import Image1 from '@/app/assets/testimonial1.jpg'; // Replace with your image path
import Image2 from '@/app/assets/testimonial2.jpg';
import Image3 from '@/app/assets/testimonial4.jpg';
import Image4 from '@/app/assets/profile.jpg';
import testimonialImage from '@/app/assets/tools parts.jpg'; // Replace with your image path
import './testimonial.css';

const testimonials = [
  {
    quote: "Top-quality parts at unbeatable prices! I ordered brake pads for my Honda Civic and received them within 3 days. Everything fit perfectly. This is my go-to site from now on.",
    name: "Mukesh Singh ",
    position: "Frontend Developer",
    image: Image3
  },
  {
    quote: "User-friendly website, easy checkout, and great customer service. I had a small issue with payment and it was resolved in minutes. Highly recommended",
    name: "Vishnu sahu",
    position: " Full Stack Developer (CSO)",
    image: Image1 
  },
  {
    quote: "Super fast delivery and genuine spare parts. I got a replacement headlight for my Hyundai i20 at almost half the price of local stores.",
    name: "Gaurov",
    position: "Senior Developer",
    image: Image2
  },

  {
    quote: "Great quality spare parts for both my car and bike. Everything fit perfectly and worked like a charm. Fast delivery too!",
    name: "Nitin Gupta ",
    position: "Senior Developer",
    image: Image4
  }
];

export default function TestimonialCarousel() {
  return (
    <div className="testimonial-container">
      {/* Background Image */}
      <Image
        src={testimonialImage}
        alt="Background"
        layout="fill"
        objectFit="cover"
        className="background-image"
      />
      {/* Overlay */}
      <div className="overlay"></div>

      <div className="carousel-wrapper">
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="swiper-container"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-card">
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-info">
                  <Image src={testimonial.image} alt={testimonial.name} width={100} height={100} className="testimonial-image" />
                  <div>
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-position">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}





