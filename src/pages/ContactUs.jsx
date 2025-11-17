import React from 'react'
import { Link } from 'react-router-dom'
import { Mail, User } from "lucide-react";
function ContactUs() {
  return (
    <div className="hero bg-white min-h-screen">
  <div className="hero-content flex-col w-full md:w-[500px] p-[20px] md:p-[0px] ">
    <div className="card bg-white  w-full shrink-0 shadow-2xl border ">
      <form className="card-body">
      <div className="form-control">
          <label className="label">
            <span className="label-text text-[16px] font-semibold text-black">Name</span>
          </label>
          <div className="relative ">
          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
          <input type="text" placeholder="Name" className="input input-bordered bg-white pl-10 w-full text-black focus:border-black focus:ring-0" required />
          </div>
        </div>
        <div className="form-control">
          <label className="label ">
            <span className="label-text text-[16px] font-semibold text-black">Email</span>
          </label>
          <div className="relative ">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
          <input type="email" placeholder="email" className="input input-bordered bg-white pl-10 text-black w-full focus:border-black focus:ring-0" required />
          </div>
        </div>
        <div className="form-control ">
        <label className="label ">
            <span className="label-text text-[16px] font-semibold text-black">Message</span>
          </label>
          
        <textarea className="textarea bg-white focus:border-black focus:ring-0  h-[170px] text-black" placeholder="Message"></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn">Submit</button>
        </div>
      </form>
    </div>
    <div className='flex flex-row gap-[4px]'>
    <p className='text-gray-600' >New to the Website?</p>
    <Link to='/signup'><p className='text-center text-black'>Sign-Up</p></Link>
    </div>
   
  </div>
</div>
  )
}

export default ContactUs