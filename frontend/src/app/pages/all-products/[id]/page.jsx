"use client"
import React from 'react'
import AllProducts from '@/app/components/AllProducts/page'
import { useParams } from 'next/navigation'

const page = () => {
  const { id } = useParams()
  return (
    <>
      <AllProducts id={id} />
    </>
  )
}

export default page
