import React, { useState, useEffect, useContext } from "react";
import Stats from "./Stats";
import ItemList from "./ProductList";
import { useLocation,useNavigate } from "react-router-dom";
import UserList from "./UserList";
import { FaBars } from "react-icons/fa";
import UserContext from "../context/user/UserContext";


function Admin() {
  const {user}=useContext(UserContext)
  const location=useLocation()
  const navigate=useNavigate()
  useEffect(() => {
    console.log(user)
  if( !user || user.role!=="admin" ){
    navigate('/')
  }
  },[user,navigate])
  
  return (
    <>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="my-drawer-2"
            className="btn drawer-button lg:hidden ml-1 mt-1"
          >
            <FaBars color="gray" size={18} />
          </label>
          {location.pathname==='/admin/dashboard'&& (
            <Stats/>
          )}
          {location.pathname==='/admin/products'&& (
            <ItemList/>
          )}
          {location.pathname==='/admin/users'&&(
            <UserList/>
          )}

        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-lg font-bold min-h-full w-60 p-4">
            {/* Sidebar content here */}
            <div className="flex flex-col mt-10">
            <li>
              <button onClick={()=>navigate('/')}> Home</button>
            </li>
            <li>
              <button onClick={()=>navigate('/admin/dashboard')}> Dashboard</button>
            </li>
            <li>
              <button onClick={()=>navigate('/admin/users')}> Users</button>
            </li>
            <li>
              <button onClick={()=>navigate('/admin/products')}> Products</button>
            </li>
            </div>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Admin;
