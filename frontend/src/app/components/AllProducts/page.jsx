import Image from 'next/image';
import React from 'react';
import './allproducts.css';
import pic1 from '@/app/assets/products/item1.jpg';
import Link from 'next/link';
import HeroSection from '@/app/components/HeroSection/page';

const products = [
    { id: 1, image: pic1, name: 'RADIATOR ASSY: 253100X060', details: 'Mobis (Hyundai, Kia) 253100X060', part: '253100X060' },
    { id: 2, image: pic1, name: 'STRUT ASSY-FR,RH: 546600X100', details: 'Mobis (Hyundai, Kia) 546600X100', part: '546600X100' },
    { id: 3, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
    { id: 4, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
    { id: 5, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
    { id: 6, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
    { id: 7, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
    { id: 8, image: pic1, name: 'BLOWER ASSY: 25380B4200', details: 'Mobis (Hyundai, Kia) 25380B4200', part: '25380B4200' },
];


var Blogs = [
    {
        id: 1,
        title: "MARUTI SUZUKI SPARE PARTS EXPORTER INDIA",
        content: `Maruti Suzuki is the top-selling brand in India in the car industry, and it has a manufacturing plant with a great production capacity. Apart from India, Maruti Suzuki spare parts is also focusing on the market of the USA, Qatar, Mexico, Chile, and many more countries, you can buy maruti genuine parts in Qatar at the best price from us. Maruti Suzuki Car Spares manufactures stylish and best quality cars such as Suzuki Swift, Wagon-R, Suzuki Baleno, Suzuki Alto, Suzuki Vitara Brezza, Suzuki Dzire, and Suzuki EECO. Smart Parts Exports provides a wide range of Maruti Suzuki Spare Parts all over the world, whether those are Maruti Suzuki OEM parts, genuine parts (original spare parts ) or Maruti Suzuki Aftermarket Spare Parts. We deliver 100% Maruti Suzuki genuine parts for all the Suzuki Cars. Smart Parts Exports is the largest Maruti Suzuki spare parts exporter India, and MJ Distributors is the export company of Smart Parts Exports.`,
        date: "2025-04-09"
    }

]

const ProductCard = ({ image, name, details, part, index }) => {
    return (
        <div className='AllProduct-card'>
            <div className='AllProductImg'>
                <Image src={image} layout='responsive' width={300} height={250} alt='productimg' className='Allproduct-image' />
            </div>
            <div className='Allproduct-info'>
                <h3>{name}</h3>
                <p className='Allproduct-details'>{details}</p>
                <p className='Allproduct-part'><strong>Part Number:</strong> {part}</p>
                <div className='Allproduct-actions'>
                    <Link href={`/pages/details-page/${index + 1}`}>
                        <button className='btn btn-primary'>SHOP NOW</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Page = () => {
    return (
        <>
            <HeroSection />
<section className=' DynamicProductSec  bg-black pt-3'>
    
<div className="container  ">
                <h2 className="mb-4 text-center">All Products of <span className='text-theme bouncing-text'>MARUTI SUZUKI </span></h2>
                <div className="row">
                    {Blogs.map((item) => (
                        <div className="col-md-12 mb-5" key={item.id}>
                                <div className="card h-100  shadow-sm">
                                <div className='blogingSec '>
                                    <div className="card-body">
                                        <h3 className="card-title text-center text-primary">{item.title}</h3>
                                        <p className="card-text" style={{ whiteSpace: "pre-line" }}>
                                            {item.content}
                                        </p>
                                        <p className="text-muted"><small>{item.date}</small></p>
                                        <a href={`/blog/${item.id}`} className="btn btn-outline-primary mt-3">
                                            Continue Reading →
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
</section>




            <section className='All-pageSec  bg-black'>
                <div className=' container '>
                    <div className='row '>
                        <div className='col-lg-3 col-md-4'>
                            <aside className='AllSecfilters '>
                                <h2>Filters</h2>
                                <div className='AllSecfilter-section'>
                                    <h3>Origin</h3>
                                    <label className='AllSecfilter-option'>
                                        <input type='checkbox' /> Aftermarket (100)
                                    </label>
                                    <label className='AllSecfilter-option'>
                                        <input type='checkbox' /> OEM (100)
                                    </label>
                                </div>
                                <div className='AllSecfilter-section'>
                                    <h3>Class</h3>
                                    <label className='AllSecfilter-option'>
                                        <input type='checkbox' /> Air / Electrical Horn (100)
                                    </label>
                                    <label className='AllSecfilter-option'>
                                        <input type='checkbox' /> Bellow (100)
                                    </label>
                                </div>
                            </aside>
                        </div>
                        <div className='col-lg-9 col-md-8'>
                            <section className='AllProduct-section pt-3'>
                                <div className='inputSec'>
                                    <input className='search-input' type="text" placeholder="Product Code / Name" />
                                </div>
                                <div className='Allproducts-grid'>
                                    {products.map((product, index) => (
                                        <ProductCard key={product.id} {...product} index={index} />
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;

