import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import pic1 from '@/app/assets/products/item1.jpg';
import pic2 from '@/app/assets/products/item1.jpg';
import pic3 from '@/app/assets/products/item1.jpg';
import { FaCartArrowDown } from "react-icons/fa";
import { RiStarSLine } from "react-icons/ri";
import './related.css'

const relatedProduct = [
  { id: 1, image: pic1, name: 'RADIATOR', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 2, image: pic2, name: 'STRUT ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 3, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 4, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 5, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 6, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 7, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 8, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
  { id: 9, image: pic3, name: 'BLOWER ', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
];

const ProductCard = ({ image, name, details, part, index }) => {
  return (
    <div className='Related-product  bg-dark'>
      <Image src={image} width={250} height={250} alt='productimg' />
      <div className='Related-product-info p-2'>
<div className='text-end pb-2 pe-3'>
<Link  href={`/pages/addtocart`}>  <FaCartArrowDown  className='fs-3 '/>
</Link></div>
        <h3 className='text-light'>{name}</h3>
        <p className='text-light'>{details}</p>
        <p className='text-light '><strong>Part Number:</strong> {part}</p>
        <div className='Related-product-actions ps-5'>
          <Link href={`/pages/details-page/${index + 1}`}>
          <RiStarSLine className='fs-3 ' /><RiStarSLine className='fs-3'/><RiStarSLine className='fs-3'/><RiStarSLine className='fs-3'/>
            {/* <button className='btn btn-light w-100 m-1'>SHOP NOW</button> */}
          </Link>
          <FaHeart className='wishlist-icon' />
        </div>
      </div>
    </div>
  );
};

const RelatedProductsPage = () => {
  return (
    <section className='Related-product-section d-grid pb-3'>
      {relatedProduct.map((product, index) => (
        <ProductCard key={product.id} {...product} index={index} />
      ))}
    </section>
  );
};

export default RelatedProductsPage;