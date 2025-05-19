"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import pic1 from "@/app/assets/products/item1.jpg";
import { useEffect, useState } from "react";
import "./productdetails.css";
import { FaFacebook, FaTwitterSquare } from "react-icons/fa";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { TbTruckDelivery } from "react-icons/tb";
import RelatedProducts from "@/app/components/RelatedProducts/page";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import brandpic from '@/app/assets/brands/suzuki.png';
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import intlTelInput from "intl-tel-input";
import "intl-tel-input/build/css/intlTelInput.css";

const ProductDetail = () => {
  const productsData = [
    { id: 1, image: pic1, name: "RADIATOR ASSY: 253100X060", details: "RADIATOR ASSY: 253100X060", part: "253100X060" },
    { id: 2, image: pic1, name: "STRUT ASSY-FR,RH: 546600X100", details: "STRUT ASSY-FR,RH: 546600X100", part: "546600X100" },
    { id: 3, image: pic1, name: "BLOWER ASSY: 25380B4200", details: "BLOWER ASSY: 25380B4200", part: "25380B4200" },
  ];

  const [product, setProduct] = useState({});
  const { id } = useParams();

  useEffect(() => {
    const foundProduct = productsData.find((item) => item.id == id);
    setProduct(foundProduct || {});
  }, [id]);

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

      return () => {
        modal?.removeEventListener("shown.bs.modal", handleModalOpen);
      };
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Get form values
    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const phone = e.target.elements.phone.value;
    const message = e.target.elements.message.value;

    // Validate the fields
    if (!name || !email || !phone || !message) {
      Swal.fire({
        title: "Oops!",
        text: "All fields are required. Please fill them out.",
        icon: "warning",
        confirmButtonColor: "#f0ad4e",
        confirmButtonText: "Okay",
        background: "#1e1e1e",
        color: "#fff",
        customClass: {
          popup: "rounded-4 shadow-lg",
        },
      });
      return; // Prevent form submission if validation fails
    }

    // If everything is filled, show success message
    Swal.fire({
      title: "Thank you!",
      text: "Your message has been submitted successfully.",
      icon: "success",
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Cool!",
      background: "#1e1e1e",
      color: "#fff",
      customClass: {
        popup: "rounded-4 shadow-lg",
      },
    });

    // Reset the form after submission
    e.target.reset();

    // Optionally close the modal (Bootstrap way)
    const modal = bootstrap.Modal.getInstance(document.getElementById("formModal"));
    modal.hide();
  };

  return (
    <>
      <div className="Detail-product-contain bg-black">
        <div className="Detail-product-wrapper">
          <div className="Detail-product-image">
            <Image
              src={product?.image || pic1}
              alt={product?.name || "Product Image"}
              width={400}
              height={400}
              className="img-fluid"
            />
          </div>
          <div className="Detail-product">
            <div>
              <TbTruckDelivery className="fs-3" /> <p>Free Delivery (Dispatch within 1 Day)</p>
              <Image src={brandpic} width={50} alt="brandimg" />
              <h1 className="Detail-product-title">{product.details}</h1>
              <div className="d-grid text-align-start ">
                <p>
                  <strong>Part Number:</strong> {product.part}
                </p>
                <p>
                  <strong>Brand:</strong> SUZUKI
                </p>
                <p>
                  <strong>Model:</strong> Swift Desire
                </p>
              </div>
              <h2>Description</h2>
              <p className="w-75">
                Smart Parts Exports is the Genuine Exporter of Suzuki OEM Spare Parts.
                You will get this genuine part at the best prices.
              </p>
              <div className="Detail-product-buttons">
                <FaFacebook className="fs-1 facebook" />
                <FaTwitterSquare className="fs-1 twitter" />
                <FaSquareWhatsapp className="fs-1 whatsapp" />
              </div>
              <Link href={`/pages/addtocart`}>
                <button className="btn btn-primary text-center w-25">
                  <FaCartPlus className="bg-none text-dark fs-3" /> Add to Cart
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* POPUP FORM BUTTON */}
      <div className="text-center bg-black">
        <h2 className="text-center p-4">
          PRODUCT <span className="text-primary">REVIEWS</span>
        </h2>
        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#formModal">
          Write your Review
        </button>
      </div>

      {/* BOOTSTRAP MODAL */}
      <div className="modal fade" id="formModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark">
              <h5 className="modal-title">Contact Us</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body bg-dark">
              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label className="form-label">Contact Number</label>
                    <input
                      type="tel"
                      id="phone"
                      className="form-control"
                      name="phone"
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Message</label>
                  <textarea
                    className="form-control"
                    name="message"
                    placeholder="Write your message..................."
                    required
                  ></textarea>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Close
                  </button>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      <section className="bg-black">
        <div className="container">
          <h2 className="text-start p-4">
            <span className="text-primary">RELATED PRODUCT</span>
          </h2>
          <RelatedProducts />
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
