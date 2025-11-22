// src/components/Navbar.jsx
import { useEffect, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { User, ShoppingCart, Menu, X, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import UserContext from "../context/user/UserContext";
import { logoutUser, getCurrentUser } from "../context/user/UserActions";

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userDispatch } = useContext(UserContext);

  // Scroll hide/show
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const controlNavbar = () => {
    if (window.innerWidth < 768) return;
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 80) setShow(false);
    else setShow(true);
    setLastScrollY(currentScrollY);
  };
  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);

  // Check user
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
        } catch (err) {
          console.log(err);
        }
      }
    };
    checkUser();
  }, []);

  const handleLogout = () => {
    logoutUser();
    userDispatch({ type: "SET_TOKEN", payload: null });
    userDispatch({ type: "SET_USER", payload: null });
  };

  return (
    <nav
      className={`sticky top-0 w-full z-50 bg-[#fefae0] border-b-2 transition-transform duration-500 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{ borderColor: "rgba(96,108,56,0.2)" }}
    >
      <div className="container mx-auto max-w-[1440px] flex items-center justify-between px-3 py-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
          <div
            className="flex h-10 w-10 items-center justify-center rounded-lg"
            style={{ backgroundColor: "#606c38" }}
          >
            <Gamepad2 className="h-6 w-6 text-[#fefae0]" />
          </div>
          <Link to="/" className="text-xl md:text-2xl font-bold text-[#717182]">
            GameVault
          </Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 text-[#717182]">
          {location.pathname !== "/" && (
            <li>
              <Link
                to="/"
                className="text-[18px] hover:bg-[#606c38]/10 rounded px-2 py-1"
              >
                Home
              </Link>
            </li>
          )}
          {user?.role === "admin" && (
            <li>
              <Link
                to="/admin/dashboard"
                className="text-[18px] hover:bg-[#606c38]/10 rounded px-2 py-1"
              >
                Admin
              </Link>
            </li>
          )}
          {location.pathname !== "/contact-us" && (
            <li>
              <Link
                to="/contact-us"
                className="text-[18px] hover:bg-[#606c38]/10 rounded px-2 py-1"
              >
                Contact Us
              </Link>
            </li>
          )}
          {location.pathname !== "/about" && (
            <li>
              <Link
                to="/about"
                className="text-[18px] hover:bg-[#606c38]/10 rounded px-2 py-1"
              >
                About
              </Link>
            </li>
          )}
          {!user && location.pathname !== "/signin" && (
            <li>
              <Link
                to="/signin"
                state={{ from: location.pathname }}
                className="text-[18px] hover:bg-[#606c38]/10 rounded px-2 py-1"
              >
                Sign-In
              </Link>
            </li>
          )}
        </ul>

        {/* Right Side: Cart + User */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            className="relative rounded-md p-2"
            onClick={() => {
              if (!user) navigate("/signin", { state: { from: "/user/cart" } });
              else navigate(`/user/${user._id}/cart`);
            }}
          >
            <ShoppingCart className="w-6 h-6 text-[#283618]" />
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#bc6c25] text-xs text-[#fefae0] flex items-center justify-center">
              {user?.cart?.items?.length || 0}
            </span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full h-10 w-10 p-2">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/my-orders")}>
                My Orders
              </DropdownMenuItem>
              {user && <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button className="md:hidden p-2 bg-[#fefae0] text-black " >
                <Menu className="w-7 h-7 bg-[#fefae0] text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[75%] p-5">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-xl font-semibold text-[#283618]">Menu</h2>
                <SheetTrigger asChild>
                
                    {/* <X className="w-7 h-7" /> */}
               
                </SheetTrigger>
              </div>
              <ul className="flex flex-col gap-4 text-lg text-[#283618]">
                <Link to="/" onClick={() => {}}>Home</Link>
                <Link to="/contact-us" onClick={() => {}}>Contact Us</Link>
                <Link to="/about" onClick={() => {}}>About</Link>
                {!user && <Link to="/signin">Sign-In</Link>}
                {user?.role === "admin" && <Link to="/admin/dashboard">Admin</Link>}
                {user && (
                  <>
                    <Link to="/my-orders">My Orders</Link>
                    <button className="text-left" onClick={handleLogout}>
                      Logout
                    </button>
                  </>
                )}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
