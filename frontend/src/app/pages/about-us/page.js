import VideoSection from '@/app/components/Videosec/page';
import Image from 'next/image';
import './about.css'
import React from 'react';
import pic1 from '@/app/assets/icons/genuine.png';
import pic2 from '@/app/assets/icons/time.png';
import pic3 from '@/app/assets/icons/ok.png';
import img1 from '@/app/assets/box.png'
import img2 from '@/app/assets/services.avif'
import TestimonialCarousel from '@/app/components/Testimonial/page';
import HeroSection from '@/app/components/HeroSection/page';
import Link from 'next/link';

const details = [
  { id: 1, title: "Genuine Spare Parts", subtitle: "We have highly competitive pricing for a complete range of genuine products in all brands", src: pic1 },
  { id: 2, title: "Delivered on Time", subtitle: "Our delivery services are lightning fast and we have an array of delivery options to choose from", src: pic2 },
  { id: 3, title: "Happy Customers", subtitle: "We have provided services to over 2500 satisfied customers. We have client-friendly services ", src: pic3 },
];

const Page = () => {
  return (
    <>
      <HeroSection />

      <section className='aboutussec '>
        <div className='container'>
          <h2 className="text-center">The <span className="text-theme">Value</span> We Live By</h2>
          <p className='paragraph'>
            Smart Parts Exports is a leading exporter of automotive spare parts for passenger and commercial vehicles in India. We strive to give world-class service to all our esteemed clients. Our sheer professionalism has enabled us to make our presence felt in more than 80+ countries spread over 5 continents. We take pride in being among the top most preferred auto parts exporter of the country. We are the largest exporters of genuine spare parts from India.
            <br />
            OEM brands - Suzuki, Hyundai, Mahindra, Tata, Ashok Leyland, Man, Chevrolet, Ford, Nissan, Honda, Renault, Toyota, Kia Spare parts.

            Aftermarket brands - Mando, Bosch, Schaeffler, Fleetguard Filters, NGK Spark Plugs, Valeo, Wabco, Donaldson Filters, Mann Filters, Victor Reinz, Lumax, Hyundai Xteer, Delphi, Knorr Bremse, Tel, ZF Spare Parts. We are exporting to more than 80 Countries.
          </p>
        </div>

        {/* <div className='AboutusvideoSec mb-5'>
        <VideoSection />
      </div> */}


        <div className="container bg-dark text-white py-3">
          <h2 className="text-center mb-5">
            Our <span className="text-theme">Main Goals</span> Exporter from India
          </h2>

          <div className="row">
            {details.map((item) => (
              <div key={item.id} className="col-md-4 col-6  mb-4">
                <div className="card bg-black goal-card shadow-sm">
                  <Image
                    src={item.src}
                    alt={item.title}
                    className="card-img-top p-4"
                    width={300}
                    height={300}
                  />
                  <div className="card-body">
                    <h5 className="text-light text-size-md">{item.title}</h5>
                    <p className="text-light text-size-sm">{item.subtitle}</p>
                    <Link href="#" className="btn btn-primary w-100">
                      Know More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>







        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <div className='d-flex justify-content-center'>
              <Image className="enginpic1" src={img1} alt='enginpic' />
              </div>
            </div>
            <div className='col-md-6'>
              <div className='mt-5'>
                <h2 className="text-center"><span className="text-theme">Automotive Spare Parts</span> Exporter from India</h2>
                <p className='paragraph'>
                  Automotive Spare Parts Exporter from India
                  Smart Parts Exports specializing in complete product range from Suzuki Spare parts, Tata Motors Spares parts, Ashok Leyland Spares parts, Mahindra Spares parts, Chevrolet Spare Parts, Ford Spare Parts, Nissan Spare Parts, Man Spare parts for CLA , Ford Spare parts & Hyundai spare parts (aftermarket)

                  We are already exporting to more than 80+ countries.

                  For exports, we also have a very large product range and can undertake any customizations as per consumer or market requirements. Any needs regarding automobile products for any Indian vehicles will be taken care of.
                </p>
              </div>
            </div>

          </div>




        </div>



        <div className='container m-3'>
          <div className='row'>

            <div className='col-md-6'>
              <div className='mt-2'>
                <h2 className="text-center">Our<span className="text-theme"> Complete Services</span> </h2>
                <p className='paragraph'>
                  A complete range of genuine and aftermarket products for all these brands is available with us


                  Our product range includes all automotive products for all models of these brands from A to Z
                  <br />

                  Smart Parts Exports is a leading automotive component market player
                </p>
              </div>
            </div>

            <div className='col-md-6 '>
              <Image className='enginpic2' src={img2} alt='enginpic' />
            </div>

          </div>




        </div>




        <TestimonialCarousel />

      </section>

    </>

  );
};

export default Page;
