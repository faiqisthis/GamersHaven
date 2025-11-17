import { Link } from "react-router-dom";
import { Mail, User, Gamepad2,MapPin,Phone } from "lucide-react";
function ContactUs() {
  return (
    <div className="hero bg-[#fefae0] min-h-screen border-black">
      <div className="hero-content flex-col w-full  p-[40px] lg:p-[64px]  max-w-[1440px]  ">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div
              className="h-16 w-16 rounded-xl flex items-center justify-center"
              style={{ backgroundColor: "#606c38" }}
            >
              <Gamepad2 className="h-10 w-10" style={{ color: "#fefae0" }} />
            </div>
          </div>
          <h1 className="mb-2" style={{ color: "#283618" }}>
            Get in Touch
          </h1>
          <p className="text-gray-600" >
            Have questions? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Contact Info Cards */}
          <div className="text-center p-4 rounded-lg border" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(96, 108, 56, 0.2)' }}>
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(96, 108, 56, 0.1)' }}>
                <Mail className="h-6 w-6" style={{ color: '#606c38' }} />
              </div>
            </div>
            <h4 className="mb-1" style={{ color: '#283618' }}>Email</h4>
            <p className="text-sm text-[#606c38]">support@gamevault.com</p>
          </div>

          <div className="text-center p-4 rounded-lg border" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(96, 108, 56, 0.2)' }}>
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(96, 108, 56, 0.1)' }}>
                <Phone className="h-6 w-6" style={{ color: '#606c38' }} />
              </div>
            </div>
            <h4 className="mb-1" style={{ color: '#283618' }}>Phone</h4>
            <p className="text-sm text-[#606c38]" >+1 (555) 123-4567</p>
          </div>

          <div className="text-center p-4 rounded-lg border" style={{ backgroundColor: '#ffffff', borderColor: 'rgba(96, 108, 56, 0.2)' }}>
            <div className="flex justify-center mb-3">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(96, 108, 56, 0.1)' }}>
                <MapPin className="h-6 w-6" style={{ color: '#606c38' }} />
              </div>
            </div>
            <h4 className="mb-1" style={{ color: '#283618' }}>Location</h4>
            <p className="text-sm text-[#606c38]" >San Francisco, CA</p>
          </div>
        </div>

        <div className="card bg-white max-w-[650px]  w-full shrink-0 shadow-2xl border ">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-[16px] font-semibold text-black">
                  Name
                </span>
              </label>
              <div className="relative ">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="text"
                  placeholder="Name"
                  className="input input-bordered bg-white pl-10 w-full text-black focus:border-black focus:ring-0"
                  required
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label ">
                <span className="label-text text-[16px] font-semibold text-black">
                  Email
                </span>
              </label>
              <div className="relative ">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered bg-white pl-10 text-black w-full focus:border-black focus:ring-0"
                  required
                />
              </div>
            </div>
            <div className="form-control ">
              <label className="label ">
                <span className="label-text text-[16px] font-semibold text-black">
                  Message
                </span>
              </label>

              <textarea
                className="textarea bg-white focus:border-black focus:ring-0  h-[170px] text-black"
                placeholder="Tell us about your inquiry..."
              ></textarea>
            </div>
            <div className="form-control mt-6">
              <button className="btn">Submit</button>
            </div>
          </form>
        </div>
        <div className="flex flex-row gap-[4px]">
          <p className="text-gray-600">New to the Website?</p>
          <Link to="/signup">
            <p className="text-center text-black">Sign-Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
