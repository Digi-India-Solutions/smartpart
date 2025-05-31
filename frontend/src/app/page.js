"use client"
import React, { useEffect, useState } from 'react'
import Carousel from './components/Carousel/page'
import Brands from './components/Brands/page'
import Categroies from './components/Categories/page'
import Trands from './components/Trands/page'
// import Banner from './components/Banner/page'
// import SpiningWheel from './components/SpiningWheel/page'
import Modals from './components/Modals/page'
// import Videosec from './components/Videosec/page'
import AfterMarketBrands from '@/app/components/AfterMarketBrands/page'
import Wheels from '@/app/components/Wheels/page'
import LocalCompanies from "@/app/components/LocalCompanies/page"
import Lubricant from '@/app/components/Lubricant/page'
import DetailsSec from '@/app/components/DetailsSec/page'
import FigureOut from '@/app/components/FigureOut/page'
import Testimonial from '@/app/components/Testimonial/page'
import FlipCards from '@/app/components/FlipCards/page'
import UniqueVid from '@/app/components/UniqueVid/page'
import AnimatedPic from '@/app/components/AnimatedPic/page'
import { getData } from './services/FetchNodeServices'
// import SliderImages from '@/app/components/SliderImages/page'
// import ScrollAnimation from './components/ScrollEffect/page'
// import { FaWhatsapp, FaPhone } from "react-icons/fa";

const page = () => {

  return (
    <>
      <Carousel />   
    
      {/* <SliderImages/> */}
      {/* <FaWhatsapp className="pulse-icon" /> */}


      <DetailsSec /> 
      <Brands /> 
      <AnimatedPic /> 


      {/* <Videosec/> */}
      <LocalCompanies />
      {/* <Banner/> */}
      {/* <SpiningWheel/> */}
      <UniqueVid />
      <Wheels />
      {/* <AnimatedPic/> */}
      <AfterMarketBrands />
      <Lubricant /> 
      <Trands />
      <Categroies />
      <FigureOut />
      {/* <ScrollAnimation/> */}
      <Modals />
      <FlipCards />
      <Testimonial />

    </>
  )
}

export default page;
