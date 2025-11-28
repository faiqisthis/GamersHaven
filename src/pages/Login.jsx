import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import { loginUser } from "../context/user/UserActions";
import { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Lock, Mail, User, Github, Gamepad2 } from "lucide-react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { toast } from "react-hot-toast";
function Login() {
  const { user, userDispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const fromPage = location.state?.from || "None";

  useEffect(() => {
    if (fromPage === "/user/cart") {
      if (user) {
        navigate(`/user/${user._id}/cart`);
      }
    }
    if (user) {
      navigate("/");
    }
  }, [user]);

  const validateUser = async (e) => {
    e.preventDefault();
    const token = await loginUser(email, password);
    if (token) {
      toast.success("Logged In Successfully", { position: "top-center" });
      userDispatch({
        type: "SET_TOKEN",
        payload: token,
      });
      if (fromPage !== "/user/cart") {
        navigate(fromPage);
      }
    }
  };

  return (
    <div className=" bg-white">
      <div className=" flex-col w-full p-[20px] lg:p-[64px] max-w-[1440px] mx-auto items-center justify-center flex min-h-screen mb-10">
        <div className="w-full max-w-md ">
          {/* Logo/Brand */}
          <div className="text-center my-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-xl bg-black flex items-center justify-center">
                <Gamepad2 className="h-10 w-10 text-white " />
              </div>
            </div>
            <h1 className="mb-2 text-black">Welcome to GameVault</h1>
            <p className="text-gray-500">
              Sign in to access your account and start shopping
            </p>
          </div>
        </div>
        <div className=" bg-white w-full shrink-0 shadow-xl rounded-lg border max-w-[500px]">
          <form className="p-[30px] ">
            <div className="space-y-2 flex flex-col md:gap-[15px] gap-[10px]">
              <label className="label">
                <span className="label-text text-black font-semibold text-[16px]">
                  Email Address
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john.doe@example.com"
                  className="input bg-white w-full pl-10 text-black focus:border-black focus:ring-0 rounded-lg py-2 pr-1"
                  required
                />
              </div>

              <div className="space-y-2 flex flex-col md:gap-[15px] gap-[10px]">
                <label className="label">
                  <span className="label-text text-black font-semibold text-[16px]">
                    Password
                  </span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="input bg-white w-full pl-10 text-black focus:border-black focus:ring-0 rounded-lg py-2 pr-1"
                    required
                  />
                </div>
              </div>
            </div>

            <div className=" md:mt-10 mt-8">
              <button className="w-full bg-black text-white py-2 rounded-lg font-semibold" onClick={(e) => validateUser(e)}>
                Login
              </button>
            </div>
          </form>

          <div className="flex items-center gap-4 px-3 py-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="text-gray-400 whitespace-nowrap text-[14px]">
              Or Continue With
            </p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <div className="grid grid-cols-2 gap-3  p-3 mb-3">
            {/* Google */}
            <button
              className="group flex items-center justify-center gap-2 rounded-lg py-2
  hover:border-black transition"
            >
              <FaGoogle
                size={20}
                className="text-gray-400 group-hover:text-black transition"
              />
              <span className="text-gray-400 group-hover:text-black transition">
                Google
              </span>
            </button>

            {/* Facebook */}
            <button
              className="group flex items-center justify-center gap-2 rounded-lg py-2
  hover:border-black transition"
            >
              <FaFacebook
                size={20}
                className="text-gray-400 group-hover:text-black transition"
              />
              <span className="text-gray-400 group-hover:text-black transition">
                Facebook
              </span>
            </button>
          </div>
        </div>
        <div className="flex gap-[6px] flex-row mt-[10px] ">
          <p className="text-gray-600">New to the Website?</p>

          <Link to="/signup">
            <p className="text-center text-black">Sign-Up</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
