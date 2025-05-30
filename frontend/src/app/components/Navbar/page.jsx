// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import "./navbar.css";
// import websitelogo from '../../assets/log.png';
// import Image from "next/image";
// import { FaShoppingCart } from "react-icons/fa";
// import { IoIosPersonAdd } from "react-icons/io";
// import { FaWhatsapp } from "react-icons/fa";
// import { AiFillWechat } from "react-icons/ai";
// import { useRouter } from "next/navigation";
// import { useSelector } from "react-redux";

// const Navbar = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();
//   const { carts } = useSelector(state => state.user);

//   // console.log("XXXXXXXXXXCART:-",carts)
//   useEffect(() => {
//     const localCart = JSON.parse(localStorage.getItem("carts")) || [];
//     setCartItems(localCart);
//   }, [carts]);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/pages/all-products?query=${encodeURIComponent(searchQuery.trim())}`);
//     }
//     setSearchQuery('')
//   };

//   return (
// <>
//     <nav className="navbar navbar-expand-lg sticky-top  top-0">
//       <div className="container-fluid">
//         {/* Logo */}
//         <Link className="navbar-brand" href="/">
//           <Image src={websitelogo} alt="websitelogo" className="logo"/>
//         </Link>

//         {/* Navbar Toggler for Mobile */}
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse" id="navbarNav">
//           <ul className="navbar-nav mx-auto">
//             <li className="nav-item">
//               <Link className="nav-link active" href="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/shop">Shop</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/brands">Brands</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/about-us">About Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/contact-us">Contact Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/blog">Blogs</Link>
//             </li>

//           </ul>

//           {/* Search Bar */}
//              <form className="d-flex me-2" onSubmit={handleSearch}>
//                <div className="input-group">
//                 <input type="text" className="form-control" placeholder="Search products" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} aria-label="Search"/>
//                 <button className="btn btn-secondary" type="submit">
//                   Search
//                 </button>
//               </div>
//             </form>

//           {/* Icons */}
//           <div className="d-flex ms-1">
//             {/* <Link className="nav-link" href="/pages/signup">
//               <IoIosPersonAdd className="fs-3"/>
//             </Link> */}
//             <div className="float-end d-flex">
//             <Link className="nav-link position-relative" href="/pages/addtocart">
//                 <FaShoppingCart className="fs-4 text-white" />
//                 {cartItems.length > 0 && (
//                   <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-warning text-dark">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>

//             </div>
//             <Link className="nav-link ms-1" href="#">
//               <i className="bi bi-whatsapp text-white fs-4"></i>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
    
//        {/* <Link
//       href="https://wa.me/918826477077"
//       target="_blank"
//       rel="noopener noreferrer"
//       className="fixed bottom-4 right-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:bg-green-100 transition-all duration-300 z-50"
//     >
//       <FaWhatsapp className="text-green-500 text-2xl" />
//       <span className="text-sm font-medium text-black">+91 88264 77077</span>
//     </Link> */}

//   <Link 
//   href="https://wa.me/918826477077"
//   target="_blank"
//   >
//      <div className="whatsap-fix">
//     <FaWhatsapp  className="fs-1  "/>
//     </div> 
//     </Link>
    

//     <div className="wechat">
//     <AiFillWechat  className="fs-1  "/>
//     </div>

// </>

//   );
// };

// export default Navbar;


import React, { useEffect, useState } from "react";
import Link from "next/link";
import "./navbar.css";
import websitelogo from '../../assets/log.png';
import Image from "next/image";
import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [productSuggestions, setProductSuggestions] = useState([]);
  const router = useRouter();
  const { carts } = useSelector(state => state.user);

  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("carts")) || [];
    setCartItems(localCart);
  }, [carts]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/pages/all-products?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setProductSuggestions([]);
    }
  };

  const handleSuggestionClick = (product) => {
    router.push(`/pages/product/${product.slug || product._id}`);
    setSearchQuery('');
    setProductSuggestions([]);
  };

  const fetchSuggestions = async (query) => {
    try {
      const res = await fetch(`/api/products/search?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setProductSuggestions(data.products || []);
    } catch (err) {
      console.error("Failed to fetch suggestions:", err);
      setProductSuggestions([]);
    }
  };

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      fetchSuggestions(searchQuery.trim());
    } else {
      setProductSuggestions([]);
    }
  }, [searchQuery]);

  return (
    <>
      <nav className="navbar navbar-expand-lg sticky-top top-0">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand" href="/">
            <Image src={websitelogo} alt="websitelogo" className="logo" />
          </Link>

          {/* Mobile toggle */}
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item"><Link className="nav-link active" href="/">Home</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pages/shop">Shop</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pages/brands">Brands</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pages/about-us">About Us</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pages/contact-us">Contact Us</Link></li>
              <li className="nav-item"><Link className="nav-link" href="/pages/blog">Blogs</Link></li>
            </ul>

            {/* Search */}
            <form className="d-flex me-2 position-relative" onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search"
                />
                <button className="btn btn-secondary" type="submit">Search</button>
              </div>

              {productSuggestions.length > 0 && (
                <div className="search-suggestions bg-white shadow rounded position-absolute w-100 mt-1 p-2 z-10">
                  {productSuggestions.map((product) => (
                    <span
                      key={product._id}
                      className="badge bg-light text-dark me-2 mb-2 px-2 py-1 rounded-pill chip-suggestion cursor-pointer"
                      onClick={() => handleSuggestionClick(product)}
                    >
                      {product.name}
                    </span>
                  ))}
                </div>
              )}
            </form>

            {/* Cart and Whatsapp */}
            <div className="d-flex ms-1">
              <div className="float-end d-flex">
                <Link className="nav-link position-relative" href="/pages/addtocart">
                  <FaShoppingCart className="fs-4 text-white" />
                  {cartItems.length > 0 && (
                    <span className="position-absolute top-2 start-100 translate-middle badge rounded-pill bg-warning text-dark">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </div>
              <Link className="nav-link ms-1" href="#">
                <i className="bi bi-whatsapp text-white fs-4"></i>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Floating WhatsApp and WeChat icons */}
      <Link href="https://wa.me/918826477077" target="_blank">
        <div className="whatsap-fix">
          <FaWhatsapp className="fs-1" />
        </div>
      </Link>
      <div className="wechat">
        <AiFillWechat className="fs-1" />
      </div>
    </>
  );
};

export default Navbar;


////////////////////////////////////////////////////////////////////////////////////////////////



// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { FaShoppingCart, FaWhatsapp } from "react-icons/fa";
// import { AiFillWechat } from "react-icons/ai";
// import websitelogo from '../../assets/log.png';
// import "./navbar.css";

// const Navbar = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const router = useRouter();

//   useEffect(() => {
//     const localCart = JSON.parse(localStorage.getItem("carts")) || [];
//     setCartItems(localCart);
//   }, []);

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       router.push(`/pages/search?query=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   return (
//     <>
//       <nav className="navbar navbar-expand-lg sticky-top top-0 bg-dark">
//         <div className="container-fluid">
//           {/* Logo */}
//           <Link className="navbar-brand" href="/">
//             <Image src={websitelogo} alt="Website Logo" className="logo" />
//           </Link>

//           {/* Toggler */}
//           <button
//             className="navbar-toggler"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarNav"
//             aria-controls="navbarNav"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* Navbar Content */}
//           <div className="collapse navbar-collapse" id="navbarNav">
//             <ul className="navbar-nav mx-auto">
//               {["Home", "Shop", "Brands", "About Us", "Contact Us", "Blogs"].map((item, i) => (
//                 <li key={i} className="nav-item">
//                   <Link className="nav-link" href={`/pages/${item.toLowerCase().replace(/ /g, "-")}`}>
//                     {item}
//                   </Link>
//                 </li>
//               ))}
//             </ul>

//             {/* Search */}
//             <form className="d-flex me-2" onSubmit={handleSearch}>
//               <div className="input-group">
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Search products"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   aria-label="Search"
//                 />
//                 <button className="btn btn-secondary" type="submit">
//                   Search
//                 </button>
//               </div>
//             </form>

//             {/* Icons */}
//             <div className="d-flex align-items-center gap-3 position-relative">
//               {/* Cart Icon */}
//               <Link className="nav-link position-relative" href="/pages/addtocart">
//                 <FaShoppingCart className="fs-4 text-white" />
//                 {cartItems.length > 0 && (
//                   <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark">
//                     {cartItems.length}
//                   </span>
//                 )}
//               </Link>

//               {/* WhatsApp */}
//               <Link className="nav-link" href="https://wa.me/918826477077" target="_blank" rel="noopener noreferrer">
//                 <FaWhatsapp className="fs-4 text-success" title="WhatsApp" />
//               </Link>

//               {/* WeChat */}
//               <div className="nav-link">
//                 <AiFillWechat className="fs-4 text-primary" title="WeChat" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </nav>

//       {/* Floating WhatsApp Button */}
//       <Link href="https://wa.me/918826477077" target="_blank" className="whatsapp-fix-link">
//         <div className="whatsap-fix">
//           <FaWhatsapp className="fs-1" />
//         </div>
//       </Link>

//       {/* Floating WeChat Button */}
//       <div className="wechat">
//         <AiFillWechat className="fs-1" />
//       </div>
//     </>
//   );
// };

// export default Navbar;















// import React from "react";
// import Link from "next/link";
// import "./navbar.css";
// import websitelogo from '../../assets/log.png';
// import Image from "next/image";
// import { FaShoppingCart } from "react-icons/fa";
// // import { IoIosLogIn } from "react-icons/io";
// import { IoIosPersonAdd } from "react-icons/io";

// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg sticky-top  bg-black">
//       <div className="container-fluid ">

//         {/* Logo */}
//         <Link className="navbar-brand" href="/">
//           <Image src={websitelogo} alt="websitelogo" className="logo"/>
//         </Link>

//         {/* Navbar Toggler for Mobile */}
//         <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
//           <span className="navbar-toggler-icon"></span>
//         </button>

//         {/* Navbar Links */}
//         <div className="collapse navbar-collapse " id="navbarNav">
//           <ul className="navbar-nav  mx-auto ">
//             <li className="nav-item">
//               <Link className="nav-link active" href="/">Home</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/shop">Shop</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/brands">Brands</Link>
//             </li>
          
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/about-us">About Us</Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" href="/pages/contact-us">Contact Us</Link>
//             </li>

          
//           </ul>

         
//        {/* Search Bar */}
// <form className="d-flex">
//   <div className="input-group">
//     <input 
//       type="text" 
//       className="form-control" 
//       placeholder="Search"
//     />
//     <button className="btn btn-warning" type="submit">Search</button>
//   </div>
// </form> 


//           {/* Icons */}
//           <div className="d-flex ms-1">
//             <Link className="nav-link" href="#">
//             <IoIosPersonAdd  className="fs-3"/>
//             {/* <IoIosLogIn className="fs-3" /> */}
//             </Link>

//             <div className="float-end d-flex">
// <Link className="nav-link" href="/pages/addtocart"><FaShoppingCart className="fs-3" /></Link>


// </div>


//             <Link className="nav-link ms-1" href="#">
//               <i className="bi bi-whatsapp text-white fs-4"></i>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
