import Image from 'next/image'
import React from 'react'
import pic1 from '@/app/assets/structure.jpg'

const page = () => {
  return (
    <>
      <Image className='w-100 h-75' src={pic1} alt='bannerimg'  />
    </>
  )
}

export default page
