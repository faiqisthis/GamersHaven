import React from 'react'
import {Link} from 'react-router-dom'
function CTA() {
  return (
    <div className='bg-[#fefae0]'>

  <section className="p-[64px] max-w-[1440px]">
        <div className="container mx-auto px-4">
          <div className="relative rounded-3xl overflow-hidden">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXRybyUyMGdhbWluZ3xlbnwxfHx8fDE3NjMxNjEwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Gaming background"
                className="w-full h-full object-cover"
                />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(40, 54, 24, 1), rgba(40, 54, 24, 0.9), rgba(40, 54, 24, 0.7))' }} />
            </div>
            
            <div className="relative px-8 md:px-16 py-20 md:py-24 text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl mb-4" style={{ color: '#fefae0' }}>
                Join the Gaming Revolution
              </h2>
              <p className="text-lg mb-8" style={{ color: 'rgba(254, 250, 224, 0.9)' }}>
                Sign up now and get 15% off your first order. Plus, be the first to know about exclusive deals and new releases.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/signin">
                  <button className='px-8 py-3 rounded-md'  style={{ backgroundColor: '#bc6c25', color: '#fefae0' }}>
                    Sign Up Now
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
                </div>
  )
}

export default CTA
