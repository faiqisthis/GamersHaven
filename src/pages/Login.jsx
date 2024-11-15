import React, { useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import { loginUser } from "../context/user/UserActions";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate=useNavigate()
  const validateUser = async(e) => {
    e.preventDefault();
    const token=await loginUser(email, password) 
    if(token){
      alert('Logged In Successfully')
      dispatch({
        type: "SET_TOKEN",
        payload: token,
      });
    }
      navigate('/')
  };
  return (
    <div className="hero bg-gray-900 min-h-screen">
      <div className="hero-content flex-col ">
        <div className="card bg-base-100 md:w-[500px] max-w-md shrink-0 shadow-2xl">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email"
                className="input input-bordered mb-5 input-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="input input-bordered input-primary"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button
                className="btn btn-primary"
                onClick={(e) => validateUser(e)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <p>
          New to the Website?
          <br />
          <Link to="/signup">
            <p className="text-center">Sign-Up</p>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
