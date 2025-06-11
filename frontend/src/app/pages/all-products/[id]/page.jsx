"use client"
import React, { useState } from 'react'
import AllProducts from '@/app/components/AllProducts/page'
import { useParams } from 'next/navigation'

const page = () => {
  const { id } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  console.log("XXXXXXXXXXXX:--",id)
  // useEffect(() => {
  //   // if (router.isReady) {
  //   const { query } = router.query;
  //   if (query) {
  //     const decodedQuery = decodeURIComponent(query);
  //     setSearchTerm(decodedQuery);
  //     console.log('Search Term:', decodedQuery);
  //   }
  //   // }
  // }, [router.isReady, router.query]);

  return (
    <>
      <AllProducts id={id} />
    </>
  )
}

export default page
