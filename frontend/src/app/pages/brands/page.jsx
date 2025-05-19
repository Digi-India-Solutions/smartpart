import React from 'react'
import '@/app/components/Brands/page'
import Brands from '@/app/components/Brands/page'
import TopAfterMarketBrand from '@/app/components/AfterMarketBrands/page'
import LocalCompanies from '@/app/components/LocalCompanies/page'
import Wheelers from '@/app/components/Wheels/page'
import Banner from '@/app/components/Banner/page'
import HeroSection from '@/app/components/HeroSection/page'
import Lubricant from '@/app/components/Lubricant/page'

const page = () => {
  return (
    <>
    <HeroSection/>
  <Brands/>
  <LocalCompanies/>
   <Lubricant/>
  <Wheelers/>
<TopAfterMarketBrand/>
<Banner/>
      
    </>
  )
}

export default page
