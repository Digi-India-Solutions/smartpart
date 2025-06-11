// "use client";
// import Image from "next/image";
// import { useParams } from "next/navigation";
// import pic1 from "@/app/assets/products/item1.jpg";
// import { useEffect, useState } from "react";
// import "./productdetails.css";
// import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
// import { FaSquareWhatsapp } from "react-icons/fa6";
// import { TbTruckDelivery } from "react-icons/tb";
// import RelatedProducts from "@/app/components/RelatedProducts/page";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min";
// import { FaCartPlus } from "react-icons/fa";
// import Link from "next/link";
// import brandpic from '@/app/assets/brands/suzuki.png';
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
// import intlTelInput from "intl-tel-input";
// import "intl-tel-input/build/css/intlTelInput.css";
// import { toast } from "react-toastify";
// import parse from 'html-react-parser';
// import { getData, postData, serverURL } from "@/app/services/FetchNodeServices";


// const ProductDetail = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState({});
//   const [formData, setFormData] = useState('');
//   const [btn, setBtn] = useState(false)
//   const [cart, setCart] = useState('')

//   const fetchProducts = async () => {
//     const res = await getData(`product/get-all-product-by-id/${id}`);
//     if (res.status) {
//       setProduct(res?.data || []);
//     } else {
//       toast.error("Failed to fetch product data");
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//     const carts = localStorage.getItem('carts')
//     setCart(carts)
//   }, []);




//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const handleModalOpen = () => {
//         const phoneInput = document.querySelector("#phone");
//         if (phoneInput && !phoneInput.classList.contains("iti-loaded")) {
//           intlTelInput(phoneInput, {
//             initialCountry: "in",
//             preferredCountries: ["in", "us", "gb"],
//             separateDialCode: true,
//           });
//         }
//       };

//       const modal = document.getElementById("formModal");
//       modal?.addEventListener("shown.bs.modal", handleModalOpen);

//       return () => {
//         modal?.removeEventListener("shown.bs.modal", handleModalOpen);
//       };
//     }
//   }, []);

//   const handleFormSubmit = async (e) => {
//     e.preventDefault();

//     // Validate the fields
//     if (!formData?.name || !formData?.email || !formData?.phone || !formData?.message) {
//       Swal.fire({
//         title: "Oops!",
//         text: "All fields are required. Please fill them out.",
//         icon: "warning",
//         confirmButtonColor: "#f0ad4e",
//         confirmButtonText: "Okay",
//         background: "#1e1e1e",
//         color: "#fff",
//         customClass: {
//           popup: "rounded-4 shadow-lg",
//         },
//       });
//       return; // Prevent form submission if validation fails
//     }

//     const res = await postData("enquiry/create-enquiry", formData);
//     if (res?.status) {
//       Swal.fire({
//         title: "Thank you!",
//         text: "Your message has been submitted successfully.",
//         icon: "success",
//         confirmButtonColor: "#3085d6",
//         confirmButtonText: "Cool!",
//         background: "#1e1e1e",
//         color: "#fff",
//         customClass: {
//           popup: "rounded-4 shadow-lg",
//         },
//       });
//       // Reset the form after submission
//       e.target.reset();
//       // Optionally close the modal (Bootstrap way)
//       const modalElement = document.getElementById("formModal");
//       const modalInstance = bootstrap.Modal.getInstance(modalElement);
//       modalInstance?.hide();
//     }
//   };

//   const handleCartSubmit = async () => {
//     const quantity = 1;
//     const item = localStorage.getItem("productItem");
//     const bd = { product, quantity, item };

//     const cartss = JSON.parse(sessionStorage.getItem("carts")) || [];
//     const cartLocal = JSON.parse(localStorage.getItem("carts")) || [];

//     const isProductInCart = cartss.some((cartItem) => cartItem.product._id === bd.product._id);

//     if (isProductInCart) {
//       Swal.fire({
//         title: "Item Already in Cart!",
//         text: "This item is already in your cart.",
//         icon: "info",
//         confirmButtonText: "Go to Cart",
//       }).then(() => {
//         // router.push('/pages/addtocart/id');
//         // setButtonText.router.push('/pages/addtocart./id')
//         // setButtonText("Okay");
//       })
//     } else {
//       let body = { userId: User_data?._id, productId: product?._id, quantity, item };

//       const updatedCartLocal = [...cartLocal, body];
//       localStorage.setItem("carts", JSON.stringify(updatedCartLocal));

//       const updatedCartSession = [...cartss, bd];
//       sessionStorage.setItem("carts", JSON.stringify(updatedCartSession));
//       // dispatch(login({ cart: updatedCartSession }));
//       Swal.fire({
//         title: "Item Added!",
//         text: "Your item has been added to the cart.",
//         icon: "success",
//         confirmButtonText: "Go to Cart",
//       }).then(() => {
//         setButtonText("Go to Cart");
//       });
//     }
//   };



//   console.log("DATA:-", formData);
//   return (
//     <>
//       <div className="Detail-product-contain bg-black">
//         <div className="Detail-product-wrapper">
//           <div className="Detail-product-image">
//             <Image
//               src={`${serverURL}/uploads/images/${product?.image}` || `${serverURL}/${product?.image}` || pic1}

//               alt={product?.name || "Product Image"}
//               width={400}
//               height={400}
//               className="img-fluid"
//             />
//           </div>
//           <div className="Detail-product">
//             <div>
//               <TbTruckDelivery className="fs-3" /> <p>Free Delivery (Dispatch within 1 Day)</p>
//               <Image src={`${serverURL}/uploads/images/${product?.brand_image}` || `${serverURL}/${product?.brand_image}` || brandpic} width={50} height={50} alt="brandimg" />
//               <h1 className="Detail-product-title">{product?.details}</h1>
//               <div className="d-grid text-align-start ">
//                 <p>
//                   <strong>Product Name:</strong> {product?.name}
//                 </p>
//                 <p>
//                   <strong>Part Number:</strong> {product?.part_no}
//                 </p>
//                 <p>
//                   <strong>Brand:</strong> {product?.brand_name}
//                 </p>
//                 <p>
//                   <strong>Model:</strong> {product?.model}
//                 </p>
//               </div>
//               <h2>Description</h2>
//               <p className="w-75">
//                 {product?.product_description ? parse(product?.product_description) : "No description available."}
//               </p>
//               <div className="Detail-product-buttons">
//                 <FaFacebook className="fs-1 facebook" />
//                 <FaTwitterSquare className="fs-1 twitter" />
//                 <FaSquareWhatsapp className="fs-1 whatsapp" />
//               </div>
//               {/* <Link href={``}> */}
//               <button className="btn btn-primary text-center w-25" onClick={btn ? handleCartSubmit : () => toast.error("Select Price")}>
//                 <FaCartPlus className="bg-none text-dark fs-3" /> Add to Cart
//               </button>
//               {/* </Link> */}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* POPUP FORM BUTTON */}
//       <div className="text-center bg-black">
//         <h2 className="text-center p-4">
//           PRODUCT <span className="text-primary">REVIEWS</span>
//         </h2>
//         <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#formModal">
//           Write your Review
//         </button>
//       </div>

//       {/* BOOTSTRAP MODAL */}
//       <div className="modal fade" id="formModal" tabIndex="-1" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header bg-dark">
//               <h5 className="modal-title">Contact Us</h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
//             </div>
//             <div className="modal-body bg-dark">
//               <form onSubmit={handleFormSubmit}>
//                 <div className="mb-3">
//                   <label className="form-label">Name</label>
//                   <input type="text" className="form-control" onChange={(e) => setFormData({ ...formData, name: e.target.value })} name="name" placeholder="Enter your name" required />
//                 </div>

//                 <div className="row">
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">Email</label>
//                     <input type="email" className="form-control" name="email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter your email" required />
//                   </div>
//                   <div className="mb-3 col-md-6">
//                     <label className="form-label">Contact Number</label>
//                     <input type="tel" id="phone" className="form-control" name="phone" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Enter your phone number" required />
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Message</label>
//                   <textarea className="form-control" name="message" onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Write your message..................." required></textarea>
//                 </div>

//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
//                     Close
//                   </button>
//                   <button type="submit" className="btn btn-success">
//                     Submit
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* RELATED PRODUCTS SECTION */}
//       {/* <section className="bg-black">
//         <div className="container">
//           <h2 className="text-start p-4">
//             <span className="text-primary">RELATED PRODUCT</span>
//           </h2>
//           <RelatedProducts />
//         </div>
//       </section> */}
//     </>
//   );
// };

// export default ProductDetail;



"use client";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import { FaCartPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import parse from "html-react-parser";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import pic1 from "@/app/assets/productItem.jpg";
import brandpic from "@/app/assets/brands/suzuki.png";
import { getData, postData, serverURL } from "@/app/services/FetchNodeServices";
import "./productdetails.css";
import { login } from "@/app/redux/slices/user-slice";
import { useDispatch } from "react-redux";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState({});
  const [formData, setFormData] = useState({});
  const [cart, setCart] = useState([]);
  const [inCart, setInCart] = useState(false);
  const router = useRouter();

  // Fetch product by ID
  const fetchProduct = async () => {
    const res = await getData(`product/get-all-product-by-id/${id}`);
    if (res.status) {
      setProduct(res.data);
    } else {
      toast.error("Failed to fetch product data");
    }
  };

  // Load product and check cart
  useEffect(() => {
    fetchProduct();

    const storedCart = JSON.parse(localStorage.getItem("carts")) || [];
    setCart(storedCart);

    const exists = storedCart.some((item) => item.productId === id);
    setInCart(exists);
  }, [id]);

  // intlTelInput for phone input
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleModalOpen = () => {
        const phoneInput = document.querySelector("#phone");
        if (phoneInput && !phoneInput.classList.contains("iti-loaded")) {
          intlTelInput(phoneInput, {
            initialCountry: "in",
            preferredCountries: ["in", "us", "gb"],
            separateDialCode: true,
          });
        }
      };
      const modal = document.getElementById("formModal");
      modal?.addEventListener("shown.bs.modal", handleModalOpen);
      return () => modal?.removeEventListener("shown.bs.modal", handleModalOpen);
    }
  }, []);

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const { name, email, phone, message } = formData;

    if (!name || !email || !phone || !message) {
      return Swal.fire("Oops!", "All fields are required.", "warning");
    }

    const res = await postData("enquiry/create-enquiry", formData);
    if (res.status) {
      Swal.fire("Thank you!", "Your message has been sent.", "success");
      e.target.reset();
      setFormData({});
      const modalEl = document.getElementById("formModal");
      const modalInstance = bootstrap.Modal.getInstance(modalEl);
      modalInstance?.hide();
    }
  };

  // Handle Add to Cart
  const handleCartSubmit = () => {
    const storedCart = JSON.parse(localStorage.getItem("carts")) || [];

    // Check if the product is already in the cart
    const productExists = storedCart.some(
      (item) => item.productId === product.id
    );

    if (productExists) {
      Swal.fire("Item Already in Cart", "This product is already in your cart.", "info");
      router.push("/pages/addtocart"); // Redirect to cart
      return;
    }

    // Add product to cart
    const newCartItem = {
      userId: null, // Replace with actual userId if needed
      productId: product.id,
      product,
      quantity: 1,
    };

    const updatedCart = [...storedCart, newCartItem];
    localStorage.setItem("carts", JSON.stringify(updatedCart));
    setCart(updatedCart);
    dispatch(login({ cart: updatedCart }));
    setInCart(true);

    Swal.fire("Added to Cart", "Product added to cart successfully.", "success");
  };

  return (
    <>
      <div className="Detail-product-contain bg-black text-white">
        <div className="Detail-product-wrapper">
          <div className="Detail-product-image">
            <Image
              src={
                product?.image && typeof product.image === "string"
                  ? product.image.startsWith("uploads/product")
                    ? `${serverURL}/${product?.image}`
                    : `${serverURL}/uploads/product/${product?.image}`
                  : pic1
              }
              alt={product?.name || "Product"}
              width={400}
              height={400}
              className="img-fluid"
            />
          </div>
          <div className="Detail-product">
            <TbTruckDelivery className="fs-3" />
            <p>Free Delivery (Dispatch within 1 Day)</p>

            <Image
              src={product?.brand_image ? `${serverURL}/uploads/images/${product?.brand_image}` : brandpic}
              width={50}
              height={50}
              alt="Brand"
            />

            <h1 className="Detail-product-title">{product?.details}</h1>
            <div className="d-grid text-start">
              <p><strong>Product Name:</strong> {product?.name}</p>
              <p><strong>Part Number:</strong> {product?.part_no}</p>
              <p><strong>Brand:</strong> {product?.brand_name}</p>
              <p><strong>Model:</strong> {product?.model}</p>
            </div>

            <h2>Description</h2>
            <div className="w-75">{product?.product_description ? parse(product?.product_description) : "No description available."}</div>

            {/* <div className="Detail-product-buttons">
              <FaFacebook className="fs-1 facebook" />
              <FaTwitterSquare className="fs-1 twitter" />
              <FaSquareWhatsapp className="fs-1 whatsapp" />
            </div> */}

            <button
              className="btn btn-primary w-25"
              onClick={handleCartSubmit}
            >
              <FaCartPlus className="fs-3" /> {inCart ? "Go to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      {/* REVIEW SECTION */}
      <div className="text-center bg-black text-white">
        <h2 className="text-center p-4">
          PRODUCT <span className="text-primary">REVIEWS</span>
        </h2>
        <button className="btn btn-primary mb-5" data-bs-toggle="modal" data-bs-target="#formModal">
          Write your Review
        </button>
      </div>

      {/* MODAL FORM */}
      <div className="modal fade" id="formModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark text-white">
            <div className="modal-header">
              <h5 className="modal-title">Contact Us</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" />
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name || ""}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      value={formData.email || ""}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      value={formData.phone || ""}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    value={formData.message || ""}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" type="button" data-bs-dismiss="modal">Close</button>
                <button className="btn btn-success" type="submit">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Related products (optional) */}
      {/* <RelatedProducts /> */}
    </>
  );
};

export default ProductDetail;
