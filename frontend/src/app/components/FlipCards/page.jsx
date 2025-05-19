import Image from 'next/image'
import React from 'react'
import './flipcards.css'
import pic1 from '@/app/assets/img1.webp'
import pic2 from '@/app/assets/img2.webp'
import pic3 from '@/app/assets/img3.webp'
import pic4 from '@/app/assets/img4.webp'
import pic5 from '@/app/assets/img5.webp'

let Cardsec = [
    { id:1 , title1 : "100% Genuine and Trusted" , title2 : "Offer LCL & FCL & Air Merchandise as per Customer Requirements" , subtitle1:"Automotive Spare Parts at a Best Price ", subtitle2:"Automotive Spare Parts at a Best Price",  src1 : pic1 , src2 : pic2 },
    { id:2 , title1 : "100% Export Oriented Company From India" , title2 : "India’s Premier Export-Driven Business Enterprise" , subtitle1:"International Supplier of Genuine Automotive Spare Parts ", subtitle2:"Automotive Spare Parts at a Best Price",  src1 : pic3 , src2 : pic4 },
    { id:3 , title1 : "100% Genuine and Trusted" , title2 : "Offer LCL & FCL & Air Merchandise as per Customer Requirements" , subtitle1:"Automotive Spare Parts at a Best Price ", subtitle2:"Automotive Spare Parts at a Best Price",  src1 : pic5 , src2 : pic2 },
]

const page = () => {
  return (
    <>
       <section className=' bg-black pt-2'>
        <div className="container ">
         <div className='flip-cardsec'>
         {Cardsec.map((item, index) => (
              <div key={index}>
                  <div className="flip-card ">
                    <div className="flip-card-inner">
                      <div className="flip-card-front">
                        <h3>{item.title1}</h3>
                        <p>{item.subtitle1}</p>
                        <Image src={item.src1} alt='avtar2' width={100} height={100} />
                      </div>
                      <div className="flip-card-back">
                        <h4>{item.title2}</h4>
                        <p>{item.subtitle2}</p>
                        <Image src={item.src2} alt='avtar1' width={80} height={80} />
                      </div>
                    </div>
                  </div>
              </div>
          ))}
         </div>
        </div>        
      </section>
    </>
  )
}

export default page
