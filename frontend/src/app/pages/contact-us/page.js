import React from 'react';
import Image from 'next/image';
import gif from '@/app/assets/spare.gif'; // Ensure correct path
import HeroSection from '@/app/components/HeroSection/page';
// import SliderImages from '@/app/components/SliderImages/page' 

const Page = () => {
  return (
    <>
    <HeroSection/>
    {/* <SliderImages/> */}
 <section className='bg-black '>
 <div className='row mb-3'>
        <h2 className="text-center mb-3  pt-3 ">
          <span className="text-theme me-2">Get in Touch</span>with Us
        </h2>
               
        <div className='col-md-6'>
          {/* Use <img> instead of <iframe> for GIFs */}
          <img src={gif.src} height={480} alt="GIF Animation" width="100%" />
        </div>

        <div className='col-md-6 '>
          <h2 className='text-center m-3'>
            <span className='text-primary'>Contact Form</span>
          </h2>
          <p className='p-3'>
            Our team is available 24X7 for direct assistance. Please feel free to contact us.
          </p>

          <form className='p-3'>
            <div className='row'>
              <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Full Name" />
                </div>
              </div>

              <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email Address</label>
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" />
                </div>
              </div>
            </div>

            <div className='row'>
              <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input type="tel" className="form-control" id="phone" placeholder="Contact Number" />
                </div>
              </div>

              <div className='col-md-6'>
                <div className="mb-3">
                  <label htmlFor="city" className="form-label">City Name</label>
                  <input type="text" className="form-control" id="city" placeholder="City Name" />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea className="form-control" id="message" placeholder="Write here..." rows="3"></textarea>
            </div>

            <button className='btn  bg-primary w-100'>Submit</button>
          </form>
        </div>
      </div>
 </section>

      {/* Google Map Section */}
      <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100 ">
        <div className="relative w-screen h-[620px]">
          <iframe
            className="w-100"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.529968663447!2d77.16864897630535!3d28.58323937568024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d02c8fffb7a9b%3A0x964e0f9b6d272cd5!2s33%2C%20Sri%20Nagar%20Colony%20Rd%2C%20Ashok%20Vihar%20Phase%203%2C%20Sri%20Nagar%20Colony%2C%20Sidora%20Kalan%20Village%2C%20Ashok%20Vihar%2C%20New%20Delhi%2C%20Delhi%20110052!5e0!3m2!1sen!2sin!4v1710932337757!5m2!1sen!2sin"
            allowFullScreen
            loading="lazy"
            height="500px"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          {/* Contact Info Overlay */}
          <div className="absolute bg-black top-5 left-5 text-center p-4 shadow-md rounded-lg">
            <div className=''>
            <h2 className="text-xl font-semibold">Contact Information</h2>
            <p className="mt-2">📞 +91 88264 77077</p>
            <p>📧 smartpartsexports@gmail.com</p>
            <p className="mt-2">
              📍 33, Sri Nagar Colony Rd, Ashok Vihar Phase 3, Sri Nagar Colony,
              Sidora Kalan Village, Ashok Vihar, New Delhi, Delhi 110052
            </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
