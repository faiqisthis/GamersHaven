import { useContext, useState } from "react";
import UserContext from "../context/user/UserContext";
import React from "react";
import { registerUser } from "../context/user/UserActions";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UsersContext from "../context/users/UsersContext";
function SignUp() {
  const { userDispatch } = useContext(UserContext);
  const { usersDispatch } = useContext(UsersContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  const validateSignup = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
  
      if (password.length < 6) {
        alert("Password must be at least of length 6.");
        return;
      }
      const token = await registerUser(firstName, lastName, email, password);
      if (token) {
        userDispatch({ type: "SET_TOKEN", payload: token });
        usersDispatch({
          type: "ADD_USER",
          payload: { firstName, lastName, email },
        });
        navigate("/");
      }
    } else {
    
      alert("Invalid Email Entered");
      return;
    }
  };

  return (
    <div className="hero bg-gray-900 min-h-screen">
      <div className="hero-content flex justify-center items-center ">
        <div className="card bg-base-100 md:w-[500px] max-w-md shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input input-bordered input-primary mb-5"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input input-bordered input-primary mb-5"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input input-bordered input-primary mb-5"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input input-bordered input-primary"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={async (e) => validateSignup(e)}
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
