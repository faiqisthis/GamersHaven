import { FaGamepad, FaUser } from "react-icons/fa";
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import { Gamepad2 } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { logoutUser,getCurrentUser } from "../context/user/UserActions";
import UserContext from "../context/user/UserContext";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, userDispatch } = useContext(UserContext);
  const handleLogout = () => {
    logoutUser();
    userDispatch({
      type: "SET_TOKEN",
      payload: null,
    });
    
    userDispatch({
      type: "SET_USER",
      payload: null,
    });
  };
useEffect(() => {
 const checkUser=async() => {
    if(localStorage.getItem("authToken") && user===null){
      try {
        const response=await getCurrentUser()
        response&&
        userDispatch({
          type: "SET_USER",
          payload: response.data
        })
      } catch (error) {
        console.log("Error fetching user: ", error)
      }
    }
  }
  checkUser() 
},[])
  return (
    <div className="navbar bg-[#fefae0] text-[#283618] py-4 border-b-2  " style={{borderColor:"rgba(96, 108, 56, 0.2)"}}>
      {/* Wrapper for logo and buttons */}
      <div className="container mx-auto flex flex-col items-center justify-between sm:flex-row  max-w-[1440px]">
        {/* Logo and Icon */}
        <div className="flex items-center space-y-4 md:space-y-0  space-x-2 mb-4 md:mb-0">
         <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ backgroundColor: '#606c38' }}>
                <Gamepad2 className="h-6 w-6" style={{ color: '#fefae0' }} />
              </div>
          <Link to="/" className=" md:text-2xl text-lg font-bold text-[#717182] ">
            GameVault
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="menu flex flex-row items-center ">
          {location.pathname !== "/" && (
            <li>
              <Link to="/" className=" md:text-[18px] hover:bg-[#606c38]/10 text-[#717182]">
                Home
              </Link>
            </li>
          )}

          {user
            ? user.role === "admin" && (
                <li>
                  <Link to="/admin/dashboard" className="md:text-[18px] hover:bg-[#606c38]/10 text-[#717182]">
                    Admin
                  </Link>
                </li>
              )
            : ""}

          {!user && location.pathname !== "/signin" && (
            <li>
              <Link to='/signin' state={{from:location.pathname}} className=" md:text-[18px] hover:bg-[#606c38]/10 text-[#717182]">
                Sign-In
              </Link>
            </li>
          )}
          {location.pathname !== "/contact-us" && (
            <li>
              <Link to="/contact-us" className=" md:text-[18px] hover:bg-[#606c38]/10 text-[#717182]">
                Contact Us
              </Link>
            </li>
          )}
          {location.pathname !== "/about" && (
            <li>
              <Link to="/about" className=" md:text-[18px] hover:bg-[#606c38]/10 text-[#717182]">
                About
              </Link>
            </li>
          )}
        </ul>
        <div className="flex">
          <div
            onClick={() => {
              if (!user) {
                navigate("/signin",{state:{from:'/user/cart'}});
                return
              }
              navigate(`/user/${user._id}/cart`);
            }}
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
             <button
             
              className="relative p-2 hover:bg-[#606c38]/10 rounded-md transition-colors"
            >
              <ShoppingCart className="w-6 h-6 text-[#283618]" />
              
                <span className="absolute -top-1 -right-1 bg-[#bc6c25] text-[#fefae0] text-xs w-5 h-5 rounded-full flex items-center justify-center">
                 {user?.cart?.items?.length > 0 ? user.cart.items.length : 0}
                </span>
              
            </button>
            
          </div>
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className=" rounded-full">
                {/* {profilePhoto === null ? (
                  <FaUser title="user" className="text-gray-500 text-3xl m-auto" />
                ) : (
                  <img
                    alt="User"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                )} */}
                {/* <FaUser
                  title="user"
                  className="text-gray-500 text-3xl m-auto"
                /> */}
                 <User className="h-5 w-5" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 md:w-44 w-36 p-2 shadow md:right-0"
            >
              <li>
                <a className="justify-between">Profile</a>
              </li>

              {user && (
                <>
                  <li>
                    <Link to="/my-orders">My Orders</Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={() => handleLogout()}>Logout</button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
