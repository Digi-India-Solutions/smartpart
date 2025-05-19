import Image from 'next/image';
import React from 'react';
import './modals.css';
import pic1 from '@/app/assets/Engine.png';
import pic2 from '@/app/assets/Engine1.png';

const bike = [
  {
    id: 1,
    title: 'BIKE PARTS',
    description: 'we supply  motorbikes parts not only in India rather we provide  motor vehicles parts globally. To ensure their customers that we manufacture a brilliant and an excellent piece of art. Smart Parts Exports is Participated in this automotive industry for a long time and Hero spare parts Exporters from India provides you the Hero genuine parts (original parts), OEM Parts, Aftermarket parts and accessories and make it available for you and next to your door. We Always provide you with genuine spares which will be verified from its serial number that is mentioned on it.',
    image: pic2,
  },

];

const car = [
  {
    id: 1,
    title: 'CAR PARTS',
    description: 'The engine is the heart of your vehicle, and keeping it in top condition is essential for optimal performance. Our engine component category includes essential parts such as pistons, cylinders, valves, gaskets, and more. Rest assured that each component is meticulously manufactured to meet stringent quality standards',
    image: pic1
  }


]


const Page = () => {
  return (

    <>
      <section className='bg-black'>
        <div className="container">
          <div className="py-2">
            {bike.map((service) => (
              <div key={service.id} className="row modalSection">
                <div className="col-md-3">
                  <h2 className="fw-bold">{service.title}</h2>
                </div>
                <div className="col-md-6">
                  <p className='align-justify text-justify'>{service.description}</p>
                </div>
                <div className="col-md-3 d-flex justify-content-center">
                  <Image src={service.image} alt={service.title} width={200} height={300} />
                </div>
                <hr />
              </div>
            ))}
          </div>


          <div className="py-2">
            {car.map((item) => (
              <div key={item.id} className="row modalSection">
                <div className="col-md-3 d-flex justify-content-center">
                  <Image src={item.image} alt={item.title} width={200} height={300} />
                </div>
                <div className="col-md-6">
                  <p>{item.description}</p>
                </div>
                <div className="col-md-3">

                  <h2 className="fw-bold">{item.title}</h2>
                </div>
              </div>
            ))}
          </div>
        </div>




      </section>

    </>

  );
};

export default Page;
