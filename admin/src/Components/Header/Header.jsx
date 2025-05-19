import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const [sidetoggle,setSideToggle] = useState(false)

  const handletoggleBtn =()=>{
    setSideToggle(!sidetoggle)
  }

  const logout = ()=>{
    sessionStorage.clear()
    window.location.href = "/"
  }
  return (
    <>
      <header>
        <div className="top-head">
          <div className="right">
            <img src="/log.png" style={{height:50}} alt="" />
            <h2>Smart Part Export</h2>
            <div className="bar" onClick={handletoggleBtn}>
              <i class="fa-solid fa-bars"></i>
            </div>
          </div>
          <div className="left ">
            <a href="https://www.smartpartsexports.com/" className='bg-theme' target="_blank">
             
            Our Website,,,,
            <i class="fa-solid fa-globe"></i>
            </a>
          </div>

        </div>

        <div className={`rightNav ${sidetoggle ? "active" : "" } `}>
          <ul>
            <li><Link to="/dashboard"  onClick={handletoggleBtn}> <i class="fa-solid fa-gauge"></i> Dashboard</Link></li>
            <li><Link to="/all-banners" onClick={handletoggleBtn}> <i class="fa-regular fa-images"></i>Banners</Link></li>
            <li><Link to="/all-category" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Category</Link></li>
            <li><Link to="/all-tags" onClick={handletoggleBtn}> <i class="fa-solid fa-tag"></i> Subcategory</Link></li>
            <li><Link to="/all-products" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Product</Link></li>
            <li><Link to="/all-blog" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> Blog</Link></li>
                
           
            <li><Link to="/all-shop-banners" onClick={handletoggleBtn}> <i class="fa-brands fa-unsplash"></i>Contact Query</Link></li>
            <li><Link to="/all-voucher" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i>Enquiry Query</Link></li>
            <li><Link to="/all-subscription-email" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i>Subscription Users</Link></li>
            {/* <li><Link to="/all-cart-enquiry" onClick={handletoggleBtn}> <i class="fa-solid fa-layer-group"></i> All Cart Enquiry</Link></li> */}
            {/* <li><Link to="/all-users" onClick={handletoggleBtn}> <i class="fa-solid fa-user"></i> All Users</Link></li>
            <li><Link to="/all-orders" onClick={handletoggleBtn}> <i class="fa-solid fa-truck-arrow-right"></i> Manage Orders</Link></li> */}
            
            <button className='logout mb-5' onClick={logout}>Log Out <i class="fa-solid fa-right-from-bracket"></i></button>

          </ul>
        </div>

      </header>
    </>
  )
}

export default Header; 
