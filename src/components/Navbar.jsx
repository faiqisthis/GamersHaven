import { FaGamepad, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useContext, useState } from "react";
import { logoutUser } from "../context/user/UserActions";
import UserContext from "../context/user/UserContext";
function Navbar() {
  const location = useLocation();
  const { user,dispatch } = useContext(UserContext);
const handleLogout=() => {
  logoutUser();
  dispatch({
    type:'SET_TOKEN',
    payload:null
   })
   dispatch({
    type:'SET_USER',
    payload:null
   })
}

  
  return (
    <div className="navbar bg-black p-4">
      {/* Wrapper for logo and buttons */}
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between  text-gray-300">
        {/* Logo and Icon */}
        <div className="flex items-center space-x-2 mb-4 md:mb-0">
          <FaGamepad title="Gamepad" className=" text-2xl" />
          <Link to="/" className=" md:text-xl text-lg font-bold">
            Gamer's Haven
          </Link>
        </div>

        {/* Navigation Links */}
        <ul className="menu flex flex-row items-center ">
          {location.pathname !== "/" && (
            <li>
              <Link to="/" className=" md:text-lg">
                Home
              </Link>
            </li>
          )}
          <li>
            <Link to="/about" className=" md:text-lg">
              About
            </Link>
          </li>
            {!user && (
          <li>
              <Link to="/signin" className=" md:text-lg">
                Sign-In
              </Link>
          </li>
            )}
          <li>
            <Link to="/contact-us" className=" md:text-lg">
              Contact Us
            </Link>
          </li>
        </ul>
        <div className="flex">
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  1
                </span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 md:w-44 w-36 shadow md:right-0"
            >
              <div className="card-body">
                <span className="text-lg font-bold">
                  {/* {cart.length === 0 ? `No Items` : `1 Items`} */}
                  1 Items
                </span>
                <span className="text-info">Subtotal: $999</span>
                <div className="card-actions">
                  <button className="btn btn-primary btn-block">
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {/* {profilePhoto === null ? (
                  <FaUser title="user" className="text-gray-500 text-3xl m-auto" />
                ) : (
                  <img
                    alt="User"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                )} */}
                 <FaUser title="user" className="text-gray-500 text-3xl m-auto" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 md:w-44 w-36 p-2 shadow md:right-0"
            >
              <li>
                <a className="justify-between">
                  Profile
                </a>
              </li>

              {user && (
                <>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <button onClick={()=>handleLogout()}>Logout</button>
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
