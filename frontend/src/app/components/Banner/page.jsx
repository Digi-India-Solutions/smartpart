import Image from 'next/image'
import React from 'react'
import pic1 from '../../assets/banner.jpg';

const page = () => {
  return (
    <>
    <section>
        <div>
            <Image className='w-100' src={pic1} alt='bannerimg'  />
        </div>
    </section>
      
    </>
  )
}

export default page
