import React from 'react'
import './enquiry.css'

const page = () => {
  return (
    <>
      <div className='d-flex align-items-center sectionEnquiry justify-content-center'>
        <div className='enquirySection' >
          <div className="container">
            <div className="row">
              <h3 className='text-center text-theme fs-1'>Inquiry Form</h3>
              <p  className='text-center'>We will get in touch with you shortly</p>

              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1" className='text-dark'> Name </label>
                  <input type="text" className="form-control" id="userName" aria-describedby="nameHelp" placeholder="Full Name" />
                  <small id="nameHelp" className="form-text text-light">We'll never share your detail with anyone else.</small>
                </div>

                <div className="row ">
                  <div className="col-md-6">

                    <div className="form-group">
                      <label htmlFor="contactNumber1"  className='text-dark'>Phone No</label>
                      <input type="phone" className="form-control" id="contactNumber1" placeholder="Contact Number" />
                    </div>
                  </div>

                  <div className="col-md-6 ">

                    <div className="form-group">
                      <label htmlFor="email"  className='text-dark'>Email Address</label>
                      <input type="email" className="form-control" id="email" placeholder="Email Address " />
                    </div>
                  </div>
                </div>

                <div className="form-group pt-4">
                  <label  htmlFor="exampleFormControlTextarea1"  className='text-dark'>Leave Your Message</label>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
                </div>



                <div className="form-group form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label text-dark mb-3" htmlFor="exampleCheck1" >Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary mb-3">Submit</button>
              </form>








            </div>
          </div>



        </div>

      </div>

    </>
  )
}

export default page

