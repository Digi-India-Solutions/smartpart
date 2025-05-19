import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import './categories.css';
import pic1 from '@/app/assets/icons/Maintenance Service Part.png';
import pic2 from '@/app/assets/icons/airconditioner.png';
import pic3 from '@/app/assets/icons/baltChainAndRoller.png';
import pic4 from '@/app/assets/icons/body.png';
import pic5 from '@/app/assets/icons/clatchSystem.png';
import pic6 from '@/app/assets/icons/Engine.png';
import pic7 from '@/app/assets/icons/ExhaustSystem.png';
import pic8 from '@/app/assets/icons/filters.png';
import pic9 from '@/app/assets/icons/fuelSupplySystem.png';
import pic10 from '@/app/assets/icons/gasKitAndSealRing.png';
import pic11 from '@/app/assets/icons/Suspension and Arms.png';
import pic12 from '@/app/assets/icons/Steering.png';
import pic13 from '@/app/assets/icons/Sensors Relays and Control units.png';
import pic14 from '@/app/assets/icons/repaire kit.png';
import pic15 from '@/app/assets/icons/pipe and hoses.png';
import pic16 from '@/app/assets/icons/oil and fluids.png';
import pic17 from '@/app/assets/icons/Maintenance Service Part.png';
import pic18 from '@/app/assets/icons/lighting.png';
import pic19 from '@/app/assets/icons/interior and comfort.png';
import pic20 from '@/app/assets/icons/Maintenance Service Part.png';



const categories = [
  { name: 'Maintenance Service Part', image: pic1 },
  { name: 'Air Conditioner', image: pic2 },
  { name: 'Chain & Roller', image: pic3 },
  { name: 'Body Parts', image: pic4 },
  { name: 'Clutch System', image: pic5 },
  { name: 'Engine Parts', image: pic6 },
  { name: 'Exhaust System', image: pic7 },
  { name: 'Filters', image: pic8 },
  { name: 'Fuel Supply System', image: pic9 },
  { name: 'Gasket & Seal Ring', image: pic10 },
  { name: 'Suspension and Arms', image: pic11 },
  { name: 'Steering', image: pic12 },
  { name: 'Sensors Relays and Control units', image: pic13 },
  { name: 'repaire kit', image: pic14 },
  { name: 'pipe and hoses', image: pic15 },
  { name: 'oil and fluids', image: pic16 },
  { name: 'Maintenance Service Part', image: pic17 },
  { name: 'lighting', image: pic18 },
  { name: 'interior and comfort', image: pic19 },
  { name: 'Maintenance Service Part', image: pic20 },
];




const Page = () => {
  return (
    <>
      <div className='categorySection1'>

        <div className="container">
          <div className='categorySection'>
              <h1 className='text-center'> Search By  <span className='text-theme bouncing-text'> CATEGORIES </span></h1>
            <div className="row" style={{ justifyContent: 'center' }}>
              {categories.map((category, index) => (
                <div key={index} className="col-md-2 col-6">
                    <div className='categoriesPortion'>
                  <Link href="/pages/shop">
                    <div className='icon'>
                      <Image className="" src={category.image} alt={category.name} />
                    </div>
                    <div>
                  <p className='pt-3'>{category.name}</p>

                    </div>
                  </Link>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>


    </>

  );
};

export default Page;
