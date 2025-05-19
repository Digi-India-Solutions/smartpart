import React from "react";
import Link from "next/link";
import "./navbar.css";
import websitelogo from '../../assets/log.png';
import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { IoIosPersonAdd } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { AiFillWechat } from "react-icons/ai";

const Navbar = () => {
  return (
<>
    <nav className="navbar navbar-expand-lg sticky-top  top-0">
      <div className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" href="/">
          <Image src={websitelogo} alt="websitelogo" className="logo"/>
        </Link>

        {/* Navbar Toggler for Mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" href="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pages/shop">Shop</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pages/brands">Brands</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pages/about-us">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pages/contact-us">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" href="/pages/blog">Blogs</Link>
            </li>

          </ul>

          {/* Search Bar */}
          <form className="d-flex">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Search" />
              <button className="btn btn-secondary" type="submit">Search</button>
            </div>
          </form>

          {/* Icons */}
          <div className="d-flex ms-1">
            <Link className="nav-link" href="/pages/signup">
              <IoIosPersonAdd className="fs-3"/>
            </Link>
            <div className="float-end d-flex">
              <Link className="nav-link" href="/pages/addtocart">
                <FaShoppingCart className="fs-3" />
              </Link>
            </div>
            <Link className="nav-link ms-1" href="#">
              <i className="bi bi-whatsapp text-white fs-4"></i>
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
       {/* <Link
      href="https://wa.me/918826477077"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-lg hover:bg-green-100 transition-all duration-300 z-50"
    >
      <FaWhatsapp className="text-green-500 text-2xl" />
      <span className="text-sm font-medium text-black">+91 88264 77077</span>
    </Link> */}

  <Link 
  href="https://wa.me/918826477077"
  target="_blank"
  >
     <div className="whatsap-fix">
    <FaWhatsapp  className="fs-1  "/>
    </div> 
    </Link>
    

    <div className="wechat">
    <AiFillWechat  className="fs-1  "/>
    </div>

</>

  );
};

export default Navbar;















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
