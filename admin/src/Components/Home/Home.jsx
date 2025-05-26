import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import Dashboard from '../../Pages/Dashboard/Dashboard'
import AllCategory from '../../Pages/Category/AllCategory'
import AddCategory from '../../Pages/Category/AddCategory'
import EditCategory from '../../Pages/Category/EditCategory'
import AllProduct from '../../Pages/Products/AllProduct'
import AddProduct from '../../Pages/Products/AddProduct'
import EditProduct from '../../Pages/Products/EditProduct'
import AllBanner from '../../Pages/Banners/AllBanner'
import AddBanner from '../../Pages/Banners/AddBanner'
import EditBanner from '../../Pages/Banners/EditBanner'
import AllBrand from '../../Pages/Brands/AllBrand'
import AddBrand from '../../Pages/Brands/AddBrand'
import EditBrand from '../../Pages//Brands/EditBrand'
import AllTags from '../../Pages/Tags/AllTags'
import AddTag from '../../Pages/Tags/AddTag'
import EditTag from '../../Pages/Tags/EditTag'
import AllVoucher from '../../Pages/Vouchers/AllVoucher'
import CreateVoucher from '../../Pages/Vouchers/AddVoucher'
import AllOrder from '../../Pages/Orders/AllOrder'
import EditOrder from '../../Pages/Orders/EditOrder'
import AllUsers from '../../Pages/Users/AllUsers'
import Login from '../auth/Login'
import EditVoucher from '../../Pages/Vouchers/EditVoucher'
import AllBlogs from '../../Pages/Blogs/AllBlogs'
import AddBlogs from '../../Pages/Blogs/AddBlogs'
import EditBlogs from '../../Pages/Blogs/EditBlogs'
import AllSubscription from '../../Pages/Subscripiton/AllSubscription'
import AllBrandCategory from '../../Pages/BrandCategory/AllBrandCategory'
import AddBrandCategory from '../../Pages/BrandCategory/AddBrandCategory'
import EditBrandCategory from '../../Pages/BrandCategory/EditBrandCategory'
import AllEnquiry from '../../Pages/Enquiry/AllEnquiry'
import AllCardEnquiry from '../../Pages/CardEnquiry/CardEnquiry'
import AllBannerImage from '../../Pages/Banner-Image/AllBannerImage'
import AddBannerImage from '../../Pages/Banner-Image/AddBannerImage'
import EditBannerImage from '../../Pages/Banner-Image/EditBannerImage'

const Home = () => {
  const login = sessionStorage.getItem("login")


  return (
    <>
      {login ? (
        <>
          <Header />
          <div className="rightside">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Working */}

              {/* Category Routes */}
              <Route path="/all-category" element={<AllCategory />} />
              <Route path="/add-category" element={<AddCategory />} />
              <Route path="/edit-category/:_id" element={<EditCategory />} />

              {/* Shop Brand Routes */}
              <Route path="/all-Brand" element={<AllBrand />} />
              <Route path="/add-Brand" element={<AddBrand />} />
              <Route path="/edit-Brand/:id" element={<EditBrand />} />

              {/* Shop Brand-Category Routes */}
              <Route path="/all-brand-category" element={<AllBrandCategory />} />
              <Route path="/add-brand-category" element={<AddBrandCategory />} />
              <Route path="/edit-brand-category/:id" element={<EditBrandCategory />} />

              {/* Product Routes */}
              <Route path="/all-products" element={<AllProduct />} />
              <Route path="/add-product" element={<AddProduct />} />
              <Route path="/edit-product/:id" element={<EditProduct />} />

              {/* Working */}

              {/* User Routes */}
              <Route path="/all-users" element={<AllUsers />} />

              {/* Voucher Routes */}
              <Route path="/all-voucher" element={<AllVoucher />} />
              <Route path="/add-voucher" element={<CreateVoucher />} />
              <Route path="/edit-voucher/:id" element={<EditVoucher />} />

              {/* Tag Routes */}
              <Route path="/all-tags" element={<AllTags />} />
              <Route path="/add-tag" element={<AddTag />} />
              <Route path="/edit-tag/:id" element={<EditTag />} />

              {/* Banner Routes */}
              <Route path="/all-banners" element={<AllBanner />} />
              <Route path="/add-banner" element={<AddBanner />} />
              <Route path="/edit-banner/:id" element={<EditBanner />} />
              
              {/* all-banner-image */}
              <Route path="/all-banner-image" element={<AllBannerImage />} />
              <Route path="/add-banner-image" element={<AddBannerImage />} />
              <Route path="/edit-banner-image/:id" element={<EditBannerImage />} />

              {/* Shop Banner Routes */}
              <Route path="/all-blog" element={<AllBlogs />} />
              <Route path="/add-blog" element={<AddBlogs />} />
              <Route path="/edit-blog/:id" element={<EditBlogs />} />

              {/* Order Routes */}
              <Route path="/all-orders" element={<AllOrder />} />
              <Route path="/edit-order/:id" element={<EditOrder />} />

              {/* All Subscription Email */}
              <Route path="/all-subscription-email" element={<AllSubscription />} />
              <Route path="/all-enquiry" element={<AllEnquiry />} />
              <Route path="/all-card-enquiry" element={<AllCardEnquiry />} />

            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      )}
    </>
  )
}

export default Home
