// src/components/Navbar.jsx

import { FaGamepad } from "react-icons/fa";
import { ShoppingCart, User, Menu, X, Gamepad2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { logoutUser, getCurrentUser } from "../context/user/UserActions";
import UserContext from "../context/user/UserContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userDispatch } = useContext(UserContext);

  // --- START: Scroll Logic + Mobile Disable ---
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (window.innerWidth < 768) return; // disable on mobile

    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) {
      setShow(false);
    } else if (currentScrollY < lastScrollY) {
      setShow(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);
  // --- END: Scroll Logic ---

  // Mobile menu
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    userDispatch({ type: "SET_TOKEN", payload: null });
    userDispatch({ type: "SET_USER", payload: null });
  };

  useEffect(() => {
    const checkUser = async () => {
      if (localStorage.getItem("authToken") && user === null) {
        try {
          const response = await getCurrentUser();
          response &&
            userDispatch({
              type: "SET_USER",
              payload: response.data,
            });
        } catch (error) {
          console.log("Error fetching user: ", error);
        }
      }
    };
    checkUser();
  }, []);

  return (
    <>
      {/* NAVBAR */}
      <div
        className={`navbar bg-[#fefae0] text-[#283618] py-4 border-b-2 sticky top-0 w-full z-50 transition-transform duration-500 ${
          show ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ borderColor: "rgba(96,108,56,0.2)" }}
      >
        <div className="container mx-auto flex md:flex-row flex-row items-center justify-between max-w-[1440px] px-3">

          {/* Left Side: Logo + Mobile Menu Button */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <div className="flex items-center gap-2">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ backgroundColor: "#606c38" }}
              >
                <Gamepad2 className="h-6 w-6" style={{ color: "#fefae0" }} />
              </div>

              <Link
                to="/"
                className="md:text-2xl text-xl font-bold text-[#717182]"
              >
                GameVault
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden block p-2"
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>

          {/* Desktop Menu */}
          <ul className="menu hidden md:flex flex-row items-center gap-4">
            {location.pathname !== "/" && (
              <li>
                <Link className="text-[18px] hover:bg-[#606c38]/10 text-[#717182]" to="/">
                  Home
                </Link>
              </li>
            )}

            {user?.role === "admin" && (
              <li>
                <Link className="text-[18px] hover:bg-[#606c38]/10 text-[#717182]" to="/admin/dashboard">
                  Admin
                </Link>
              </li>
            )}

            {!user && location.pathname !== "/signin" && (
              <li>
                <Link
                  to="/signin"
                  state={{ from: location.pathname }}
                  className="text-[18px] hover:bg-[#606c38]/10 text-[#717182]"
                >
                  Sign-In
                </Link>
              </li>
            )}

            {location.pathname !== "/contact-us" && (
              <li>
                <Link className="text-[18px] hover:bg-[#606c38]/10 text-[#717182]" to="/contact-us">
                  Contact Us
                </Link>
              </li>
            )}

            {location.pathname !== "/about" && (
              <li>
                <Link className="text-[18px] hover:bg-[#606c38]/10 text-[#717182]" to="/about">
                  About
                </Link>
              </li>
            )}
          </ul>

          {/* Right Side Buttons */}
          <div className="flex  ">
            {/* Cart */}
            <button
              onClick={() => {
                if (!user) {
                  navigate("/signin", { state: { from: "/user/cart" } });
                  return;
                }
                navigate(`/user/${user._id}/cart`);
              }}
              className="relative px-2 md:px-0  hover:bg-[#606c38]/10 rounded-md transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-[#283618]" />

              <span className="absolute -top-1 -right-1 bg-[#bc6c25] text-[#fefae0] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {user?.cart?.items?.length > 0 ? user.cart.items.length : 0}
              </span>
            </button>

            {/* User Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <User className="h-5 w-5" />
              </label>

              {user && (
                <ul className="menu menu-sm dropdown-content bg-white text-black rounded-box mt-3 w-44 p-2 shadow">
                  <li><a>Profile</a></li>
                  <li><Link to="/my-orders">My Orders</Link></li>
                  <li><a>Settings</a></li>
                  <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DRAWER */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/30 z-40"
            onClick={() => setMobileOpen(false)}
          />

          <div className="fixed top-0 left-0 h-full w-[75%] bg-[#fefae0] shadow z-50 p-5">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-[#283618]">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X className="w-7 h-7" />
              </button>
            </div>

            <ul className="flex flex-col gap-4 text-lg text-[#283618]">
              <Link to="/" onClick={() => setMobileOpen(false)}>Home</Link>
              <Link to="/contact-us" onClick={() => setMobileOpen(false)}>Contact Us</Link>
              <Link to="/about" onClick={() => setMobileOpen(false)}>About</Link>

              {!user && (
                <Link to="/signin" onClick={() => setMobileOpen(false)}>
                  Sign-In
                </Link>
              )}

              {user?.role === "admin" && (
                <Link to="/admin/dashboard" onClick={() => setMobileOpen(false)}>
                  Admin
                </Link>
              )}

              {user && (
                <>
                  <Link to="/my-orders" onClick={() => setMobileOpen(false)}>My Orders</Link>
                  <button
                    className="text-left"
                    onClick={() => {
                      handleLogout();
                      setMobileOpen(false);
                    }}
                  >
                    Logout
                  </button>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
