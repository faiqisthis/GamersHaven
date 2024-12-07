import React, { useState, useEffect,useContext } from "react";
import { FaXmark } from "react-icons/fa6";
import {createUser } from "../context/users/UsersActions";
import UsersContext from "../context/users/UsersContext";
function AddUserBox({ setAddBox,addBox }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const { users,usersDispatch } = useContext(UsersContext);

  const handleCloseClick = () => {
    setAddBox(false);
  };

  const handleFormSubmit=async() => {
    if(firstName==="" || lastName==="" || email==="" ||role===""||password===""){
        alert("No Field can be left empty.")
    }
    else{
        const data={    
            firstName: firstName,
            lastName: lastName,
            email: email,
            password:password,
            role: role
        }

        const response= await createUser(data)
        
        if(response.success){
                usersDispatch({type:'ADD_USER',payload:response.data})
                setAddBox(false)
        }
    }
  }
  
  return (
    addBox && (
      <div>
        {/* Overlay */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
            zIndex: 1000,
          }}
          onClick={handleCloseClick} // Close modal when clicking outside the box
        ></div>

        {/* Modal Box */}
        <div
          className="bg-black"
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "500px",
            borderRadius: "10px",
            border: "2px solid white",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
            zIndex: 1001,
          }}
        >
          <div className="">
            <h3 className=" text-center text-3xl font-bold p-2 ">Add User Box</h3>
            <div className="p-4">
              <label htmlFor="firstName" className="p-3 text-xl">
                First Name
              </label>
              <input
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              />
              <br />
              <label htmlFor="lastName" className="p-3 text-xl">
                Last Name
              </label>
              <input
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              />
              <br />
              <label htmlFor="role" className="p-3 text-xl">
                Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                id="category"
                className="select select-bordered w-full max-w-xs"
              >
                <option value="" disabled selected>
                  Category
                </option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
              <br />
              <label htmlFor="email" className="p-3 text-xl">
                Email
              </label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              />
              <br />
              <label htmlFor="email" className="p-3 text-xl">
                Password
              </label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type here"
                className="input w-full max-w-md input-primary"
              />
              <br />

              <button
                onClick={() => handleFormSubmit()}
                className="btn-secondary btn btn-md"
              >
                Save
              </button>
            </div>
            <button
              onClick={handleCloseClick}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                background: "none",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                color: "#fff",
              }}
            >
              <FaXmark color="white" size={22} />
            </button>
          </div>
        </div>
      </div>
    )
  );
}
export default AddUserBox;
