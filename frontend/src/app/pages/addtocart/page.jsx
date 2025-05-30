// "use client"
// import Image from 'next/image'
// import React, { useState, useEffect } from 'react'
// import './addtocart.css'
// import { MdDeleteForever } from "react-icons/md";
// import pic1 from '@/app/assets/products/item1.jpg'
// import Link from 'next/link';
// import { Modal, Button } from 'react-bootstrap'
// import intlTelInput from "intl-tel-input";
// import "intl-tel-input/build/css/intlTelInput.css";

// const Page = () => {
//   const [cartItems, setCartItems] = useState([
//     {
//       id: 1,
//       name: "RADIATOR ASSY: 253100X060",
//       price: 12000,
//       quantity: 1,
//       partNumber: "253100X060",
//       brand: "SUZUKI",
//       image: pic1,
//       shippingDate: "June 6th"
//     },
//     {
//       id: 2,
//       name: "BRAKE PAD SET: BP1234",
//       price: 8000,
//       quantity: 1,
//       partNumber: "BP1234",
//       brand: "HONDA",
//       image: pic1,
//       shippingDate: "June 10th"
//     }
//   ]);

//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     message: ''
//   });

//   // Initialize intlTelInput when modal opens
//   useEffect(() => {
//     if (showModal && typeof window !== "undefined") {
//       const phoneInput = document.querySelector("#phone");
//       if (phoneInput && !phoneInput.classList.contains("iti-loaded")) {
//         intlTelInput(phoneInput, {
//           initialCountry: "in",
//           preferredCountries: ["in", "us", "gb"],
//           separateDialCode: true,
//         });
//       }
//     }
//   }, [showModal]);

//   const updateQuantity = (id, type) => {
//     setCartItems(cartItems.map(item =>
//       item.id === id
//         ? { ...item, quantity: type === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1) }
//         : item
//     ));
//   };

//   const removeItem = (id) => {
//     setCartItems(cartItems.filter(item => item.id !== id));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const phoneInput = document.querySelector("#phone");
//     let intlNumber = "";
//     if (phoneInput && window.intlTelInputGlobals) {
//       const iti = window.intlTelInputGlobals.getInstance(phoneInput);
//       intlNumber = iti.getNumber();
//     }

//     const fullFormData = {
//       ...formData,
//       phone: intlNumber
//     };

//     console.log("Submitted data:", fullFormData);

//     setShowModal(false);
//     setFormData({ name: '', email: '', message: '' });
//   };

//   const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <>
//       <section className="cart-section">
//         <div className="container">
//           <div className="row">
//             {cartItems.length > 0 ? (
//               cartItems.map((item) => (
//                 <div className="col-sm-12" key={item.id}>
//                   <div className="row cart-item">
//                     <div className="col-md-4 text-center">
//                       <h4 className="text-warning">Items</h4>
//                       <hr />
//                       <Image src={item.image} alt="cartitems" className="cart-img img-fluid" height={150} width={150} />
//                     </div>

//                     <div className="col-md-4 text-center">
//                       <h4 className="text-theme">Product Details</h4>
//                       <hr />
//                       <div className="cartDetailSec">
//                         <b>{item.name}</b>
//                         <p>( Estimated Shipping Date: {item.shippingDate} )</p>
//                         <p>Part Number: {item.partNumber}</p>
//                         <p>Brand: {item.brand}</p>
//                       </div>
//                     </div>

//                     <div className="col-md-4 text-center">
//                       <h4 className="text-theme">Delete Item</h4>
//                       <hr />
//                       <MdDeleteForever className="fs-2 text-danger cursor-pointer" onClick={() => removeItem(item.id)} />
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <h4 className="text-center text-danger">Your cart is empty!</h4>
//             )}
//           </div>
//         </div>

//         <div className='container d-flex align-items-center gap-4 py-5 '>
//           <h4>"Looking for the best price? Get an exclusive quote today and secure the best deal. Click 'Enquire Now'."</h4>
//           <button className="btn btn-warning" onClick={() => setShowModal(true)}>
//             Enquire Now
//           </button>
//         </div>
//       </section>

//       {/* Bootstrap Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//         <Modal.Header closeButton className="bg-dark text-light">
//           <Modal.Title>Contact Us</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="bg-dark text-light">
//           <form onSubmit={handleSubmit}>
//             <div className="mb-3">
//               <label className="form-label">Name</label>
//               <input 
//                 type="text" 
//                 className="form-control" 
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter your name" 
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Email</label>
//               <input 
//                 type="email" 
//                 className="form-control" 
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter your email" 
//                 required
//               />
//             </div>

//             <div className="mb-3 d-grid text-primary">
//               <label className="form-label">Contact Number</label>
//               <input 
//                 type="tel" 
//                 id="phone"
//                 className="form-control"
//                 name="phone"
//                 placeholder="Enter your phone number"
//                 required
//               />
//             </div>

//             <div className="mb-3">
//               <label className="form-label">Message</label>
//               <textarea 
//                 className="form-control" 
//                 name="message"
//                 value={formData.message}
//                 onChange={handleInputChange}
//                 placeholder="Write your message..................." 
//                 rows={4}
//                 required
//               ></textarea>
//             </div>

//             <div className="modal-footer">
//               <button 
//                 type="button" 
//                 className="btn btn-secondary" 
//                 onClick={() => setShowModal(false)}
//               >
//                 Close
//               </button>
//               <button 
//                 type="submit" 
//                 className="btn btn-primary"
//               >
//                 Submit
//               </button>
//             </div>
//           </form>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// };

// export default Page;


"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdDeleteForever } from "react-icons/md";
import { Modal, Button } from "react-bootstrap";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "./addtocart.css";

import pic1 from "@/app/assets/products/item1.jpg";
import { postData, serverURL } from "@/app/services/FetchNodeServices";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { login } from "@/app/redux/slices/user-slice";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "", phone: "", });

  // Load cart from localStorage
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("carts")) || [];
    setCartItems(localCart);
  }, []);

  // Phone input init
  useEffect(() => {
    if (showModal && typeof window !== "undefined") {
      const phoneInput = document.querySelector("#phone");
      if (phoneInput && !phoneInput.classList.contains("iti-loaded")) {
        intlTelInput(phoneInput, {
          initialCountry: "in",
          preferredCountries: ["in", "us", "gb"],
          separateDialCode: true,
        });
      }
    }
  }, [showModal]);

  const updateQuantity = (productId, type) => {
    const updatedCart = cartItems.map((item) =>
      item.productId === productId
        ? {
          ...item,
          quantity:
            type === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1),
        }
        : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    dispatch(login({ cart: updatedCart }));
  };

  const removeItem = (productId) => {
    const updatedCart = cartItems.filter((item) => item.productId !== productId);
    setCartItems(updatedCart);
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    dispatch(login({ cart: updatedCart }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneInput = document.querySelector("#phone");
    let intlNumber = "";
    if (phoneInput && window.intlTelInputGlobals) {
      const iti = window.intlTelInputGlobals.getInstance(phoneInput);
      intlNumber = iti.getNumber();
    }

    const fullFormData = { ...formData, 'totalPrice': totalPrice, phone: intlNumber, userId: null, productId: JSON.stringify(cartItems) };

    console.log("Submitted Enquiry:", fullFormData);

    const res = await postData("cardEnquiry/create-card-enquiry", fullFormData);
    if (res.status) {
      Swal.fire(res.message || 'Enquiry submitted successfully', 'success', "Enquiry submitted successfully.", "success");
      setFormData({ name: "", email: "", message: "", phone: "" });
      localStorage.removeItem("carts");
      setShowModal(false);
    }
    // Reset

  };

  const totalPrice = cartItems?.reduce(
    (acc, item) => acc + item?.product?.price * item?.quantity,
    0
  );
  // console.log("Submitted Enquiry:", formData);

  return (
    <>
      <section className="cart-section">
        <div className="container">
          <div className="row">
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div className="col-sm-12 mb-4" key={index}>
                  <div className="row cart-item">
                    <div className="col-md-4 text-center">
                      <h4 className="text-warning">Item</h4>
                      <hr />
                      <Image
                        src={item?.product?.image ? `${serverURL}/uploads/images/${item?.product?.image}` : pic1}
                        alt={item?.product?.name || "Product Image"}
                        width={150} height={150} className="cart-img img-fluid" />
                    </div>

                    <div className="col-md-4 text-center">
                      <h4 className="text-theme">Details</h4>
                      <hr />
                      <div className="cartDetailSec">
                        <b>{item?.product?.name}</b>
                        <p>Part Number: {item?.product?.part_no}</p>
                        <p>Brand: {item?.product?.brand_name}</p>
                        {/* <p>Qty: {item?.quantity}</p>
                        <div className="d-flex justify-content-center gap-2">
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => updateQuantity(item?.productId, "decrease")}
                          >
                            -
                          </button>
                          <button
                            className="btn btn-sm btn-secondary"
                            onClick={() => updateQuantity(item?.productId, "increase")}
                          >
                            +
                          </button>
                        </div> */}
                      </div>
                    </div>

                    <div className="col-md-4 text-center">
                      <h4 className="text-theme">Remove</h4>
                      <hr />
                      <MdDeleteForever
                        className="fs-2 text-danger cursor-pointer"
                        onClick={() => removeItem(item?.productId)}
                      />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <h4 className="text-center text-danger mt-5">
                Your cart is empty!
              </h4>
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="container d-flex flex-column align-items-start gap-4 py-5">
            <h5>
              Looking for the best price? Get an exclusive quote today and
              secure the best deal. Click "Enquire Now".
            </h5>
            {/* <h6 className="text-light">Total: ₹{totalPrice.toLocaleString()}</h6> */}
            <button className="btn btn-warning" onClick={() => setShowModal(true)}>
              Enquire Now
            </button>
          </div>
        )}
      </section>

      {/* Enquiry Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="bg-dark text-light">
          <Modal.Title>Contact Us</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-light">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className=" col-md-12 mb-3">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleInputChange} placeholder="Enter your name" required />
              </div>

              <div className=" col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
              </div>

              <div className=" col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input type="tel" id="phone" className="form-control" placeholder="Enter phone number" name="phone" value={formData?.phone} onChange={handleInputChange} required />
              </div>

              <div className=" col-md-12 mb-3">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows={4} name="message" value={formData.message} onChange={handleInputChange} placeholder="Write your message..." required></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Page;
