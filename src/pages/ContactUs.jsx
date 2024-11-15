import React from 'react'
import { Link } from 'react-router-dom'
function ContactUs() {
  return (
    <div className="hero bg-gray-900 min-h-screen">
  <div className="hero-content flex-col ">
    <div className="card bg-base-100 md:w-[500px] max-w-md shrink-0 shadow-2xl ">
      <form className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered mb-5 input-primary" required />
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text ">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered mb-5 input-primary" required />
        </div>
        <div className="form-control ">
        <label className="label ">
            <span className="label-text ">Message</span>
          </label>
        <textarea className="textarea textarea-secondary h-[170px]" placeholder="Message"></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
    <p >New to the Website?<br/>
    <Link to='/signup'><p className='text-center'>Sign-Up</p></Link>
    </p>
   
  </div>
</div>
  )
}

export default ContactUs