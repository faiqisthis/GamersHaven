import { Link } from "react-router-dom";
import { Gamepad2, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
function Footer() {
  return (
    <footer className="border-t lg:p-[64px] p-[20px]" style={{ backgroundColor: '#fefae0', borderColor: 'rgba(96, 108, 56, 0.2)' }}>
      <div className="container mx-auto lg:px-4 lg:py-12 max-w-[1440px]">
        <div className="grid grid-cols-2  md:grid-cols-4 sm:gap-8 gap-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#606c38' }}>
                <Gamepad2 className="h-6 w-6" style={{ color: '#fefae0' }} />
              </div>
              <span className="text-xl font-semibold" style={{ color: '#283618' }}>GameVault</span>
            </div>
            <p className="text-sm" style={{ color: '#606c38' }}>
              Your ultimate destination for gaming gear and accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4" style={{ color: '#283618' }}>Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm transition-colors hover:text-primary" style={{ color: '#606c38' }}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-sm transition-colors hover:text-primary" style={{ color: '#606c38' }}>
                  Products
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm transition-colors hover:text-primary" style={{ color: '#606c38' }}>
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="mb-4" style={{ color: '#283618' }}>Support</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm transition-colors hover:text-primary" style={{ color: '#606c38' }}>
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors hover:text-primary" style={{ color: '#606c38' }}>
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="text-sm transition-colors hover:text-primary" style={{ color: '#606c38' }}>
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="mb-4" style={{ color: '#283618' }}>Follow Us</h4>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border transition-colors" style={{ borderColor: 'rgba(96, 108, 56, 0.2)' }}>
                <Facebook className="h-4 w-4" style={{ color: '#606c38' }} />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border transition-colors" style={{ borderColor: 'rgba(96, 108, 56, 0.2)' }}>
                <Twitter className="h-4 w-4" style={{ color: '#606c38' }} />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border transition-colors" style={{ borderColor: 'rgba(96, 108, 56, 0.2)' }}>
                <Instagram className="h-4 w-4" style={{ color: '#606c38' }} />
              </a>
              <a href="#" className="h-9 w-9 flex items-center justify-center rounded-lg border transition-colors" style={{ borderColor: 'rgba(96, 108, 56, 0.2)' }}>
                <Youtube className="h-4 w-4" style={{ color: '#606c38' }} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm" style={{ borderColor: 'rgba(96, 108, 56, 0.2)', color: '#606c38' }}>
          <p>&copy; 2025 GameVault. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;