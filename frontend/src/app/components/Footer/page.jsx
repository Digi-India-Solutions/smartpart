"use client"

import "./footer.css";
import { FaTwitter, FaGithub, FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import logo from '@/app/assets/log.png';
import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoWechat } from "react-icons/io5";
import { FaPinterest } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getData } from "@/app/services/FetchNodeServices";

export default function Footer() {
const [categorys , setCategorys]=useState([])
const [brand , setBrand]=useState([])

  const fetchCategory=async()=>{
       const response = await getData('category/get-all-categorys');
      //  console.log("XXXXXXXXXXXXX:::::--",response)
       if(response?.status){
        setCategorys(response?.data)
       }
  }
  const fetchBrand= async()=>{
    const res = await getData("brand/get-all-brand");
    // console.log("XXXXXXXXXXXXX:::::--",response)
    if(res?.status){
     setBrand(res?.data)
    }
  }
  useEffect(()=>{
    fetchCategory()
    fetchBrand()
  },[])
// console.log("XXXXXXXXXXXXX:::::--",brand)
const filterOEMBrand = brand?.filter((b)=>b?.brand_category_name==='Top OEM Brands')
const filterAftermarkets = brand?.filter((b)=>b?.brand_category_name==='TOP AFTERMARKETS BRANDS')
  return (
    <footer className="footer">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <Image src={logo} alt="footerlogo" className='footer-logo' />
            <h3 className="d-flex align-items-center">
              SMART PARTS EXPORTS
            </h3>
            <p className="small">
            Our team is available 24X7 for direct assistance. <br/> Please feel free to contact us.
            </p>
          </div>
          <div className="col-md-2 col-6">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link href="/" className="text-light text-decoration-none">Home</Link>
              </li>
              <li>
                <Link href="/pages/shop" className="text-light text-decoration-none">Shop</Link>
              </li>
              <li>
                <Link href="/pages/contact-us" className="text-light text-decoration-none">Contact</Link>
              </li>
              <li>
                <Link href="/pages/about-us" className="text-light text-decoration-none">About Us</Link>
              </li>
              <li>
                <Link href="/pages/blog" className="text-light text-decoration-none">Blogs</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-2 col-6">
            <h5>Categories</h5>
            <ul className="list-unstyled small">
  {categorys.slice(0, 5).map((cat, index) => (
    <li key={cat.id || index}>
      <Link href={{ pathname: `/pages/all-products`}}className="text-light text-decoration-none">
      {cat?.name}
      </Link>
      </li>
  ))}
  
  <li><Link href="/pages/all-products" className="text-light text-decoration-none" > View All </Link> </li>
</ul>
          </div>
          <div className="col-md-2 col-6">
            <h5>OEM Brands</h5>  
            <ul className="list-unstyled small">
            {filterOEMBrand?.slice(0, 5).map((brand, index) => (
              <li key={brand?.id || index}> <Link href='/pages/all-products' className="text-light text-decoration-none ">{brand?.name}</Link></li>
            ))}
            <li> <Link href='/pages/all-products' className="text-light text-decoration-none ">View All</Link></li>
            </ul>
          </div>

          <div className="col-md-2 col-6">
            <h5>Aftermarkets Brands</h5>
            <ul className="list-unstyled small">
            {filterAftermarkets?.slice(0, 5).map((brand, index) => (
              <li key={brand?.id || index}> <Link href='/pages/all-products' className="text-light text-decoration-none ">{brand?.name}</Link></li>
            ))}
            <li> <Link href='/pages/all-products' className="text-light text-decoration-none">View All</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom border-top pt-3 mt-3 d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div className="d-flex gap-3">
            <Link href="/privacy-policy" className="text-light small fs-5">Privacy Policy</Link>
            <Link href="/terms-of-service" className="text-light small fs-5">Terms of Service</Link>
          </div>
          <div className="d-flex gap-3 mt-3 me-5 mt-md-0">
            <Link href="https://x.com/spartsexports" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
              <FaTwitter className="fs-3" />
            </Link>
            <Link href="https://www.instagram.com/smartpartsexports/" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
            <FaInstagram className="fs-3" />
            </Link>
            <Link href="https://www.linkedin.com/company/smart-parts-exports/" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
              <FaLinkedin className="fs-3" />
            </Link>

            <Link href="https://www.facebook.com/smartpartsexports" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
            <FaFacebook className="fs-3" />
            </Link>

            <Link href="https://in.pinterest.com/smartpartsexports/_created/" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
            <FaPinterest className="fs-3"/>
            </Link>
            <Link href="https://www.facebook.com/smartpartsexports" target="_blank" rel="noopener noreferrer" className="text-light fs-5">
            <IoLogoWechat  className="fs-3"/>
            </Link>

          </div>
        </div>
      </div>
    </footer>
  );
}
























// import React from 'react'
// import "bootstrap-icons/font/bootstrap-icons.css";
// import Image from 'next/image';
// import logo from '@/app/assets/log.png'

// export default function page() {
//   return (
//     <>
// <footer className="background text-light  py-4">
//       <div className="container">
//         <div className="row">
//           <div className="col-md-4 text-center text-md-start mb-3 mb-md-0">
//             <Image  src={logo}
//             alt="footerlogo"
//             className='h-25 w-25 object-cover'
//             >
              
//             </Image>
//             <h5>About Us</h5>
//             <p>We provide high-quality products and services to our customers worldwide.</p>
//           </div>
//           <div className="col-md-4 text-center mb-3 mb-md-0">
//             <h5>Quick Links</h5>
//             <ul className="list-unstyled">
//               <li><a href="#" className="text-light text-decoration-none">Home</a></li>
//               <li><a href="#" className="text-light text-decoration-none">Services</a></li>
//               <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
//               <li><a href="#" className="text-light text-decoration-none">Contact</a></li>
//             </ul>
//           </div>
//           <div className="col-md-4 text-center d-grid text-center">
//             <h5>Follow Us</h5>
//             <Link href="#" className="text-light me-2"><i className="bi bi-facebook"></i></Link>
//             <Link href="#" className="text-light me-2"><i className="bi bi-twitter"></i></Link>
//             <Link href="#" className="text-light me-2"><i className="bi bi-instagram"></i></Link>
//           </div>
//         </div>
//         <hr className="my-3 text-light" />
//         <div className="text-center">© 2025 YourCompany. All rights reserved.</div>
//       </div>
//     </footer>
//     </>
//   )
// }
    