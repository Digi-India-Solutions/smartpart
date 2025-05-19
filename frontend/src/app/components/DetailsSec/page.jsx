import React from 'react';
import './details.css'; // Linking the CSS file

const Page = () => {
  return (
    <>
      <section className="details-container ">
        <div className="details-content">
          <h2 className="text-center">
            From India to the <span className="highlight text-theme bouncing-text">World!</span>
          </h2>
          <p className="description text-light">
            Smart Parts Exports is a leading exporter of Automotive Spare Parts from India 
            and a well-known brand in more than 80+ countries. We offer both 
            **Genuine and Aftermarket Spare Parts** at competitive prices. Our products 
            include complete ranges for **CARS, LCV, HCV, 2W/3W, and TRACTORS** made in India.  

            We export **Suzuki, Hyundai, Tata, Mahindra, Ashok Leyland, Kia, Nissan, Renault, 
            Fiat, Ford, Volkswagen** genuine parts. Additionally, we supply **Aftermarket brands** 
            such as Schaeffler (Luk, INA, Fag), Mando, Valeo, Bosch, Lumax, Mann Filters, 
            Hyundai Xteer, NGK, Wabco, ZF, etc.
          </p>
        </div>
      </section>
    </>
  );
};

export default Page;
