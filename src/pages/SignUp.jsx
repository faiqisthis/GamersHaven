import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import UsersContext from "../context/users/UsersContext";
import { registerUser } from "../context/user/UserActions";
import { Mail, Lock, User,Gamepad2 } from "lucide-react";

function SignUp() {
  const { user, userDispatch } = useContext(UserContext);
  const { usersDispatch } = useContext(UsersContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const token = await registerUser(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.password
      );

      if (token) {
        userDispatch({ type: "SET_TOKEN", payload: token });
        usersDispatch({
          type: "ADD_USER",
          payload: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
          },
        });
        navigate("/");
      }
    } catch (error) {
      setErrors({
        submit: error.message || "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" bg-white ">
      <div className=" flex-col w-full max-w-[1440px] mx-auto  flex items-center justify-center  px-[20px] pt-[40px] pb-[80px]  lg:p-[64px] ">
        <div className="w-full max-w-md ">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-xl bg-black flex items-center justify-center">
                <Gamepad2 className="h-10 w-10 text-white " />
              </div>
            </div>
            <h1 className="mb-2 text-black">Welcome to GameVault</h1>
            <p className="text-gray-500">
              Sign up to create your account and start shopping
            </p>
          </div>
        </div>
        <div className=" bg-white max-w-[500px] p-[30px] rounded-lg  w-full shrink-0 shadow-2xl border">
          <form className="flex flex-col md:gap-[25px] gap-[20px]" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="alert alert-error">
                <span>{errors.submit}</span>
              </div>
            )}

            <div className="form-control flex flex-col md:gap-[15px] gap-[10px] ">
              <label className="label">
                <span className="label-text text-[16px] font-semibold text-black">
                  First Name
                </span>
              </label>
              <div className="relative ">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="text"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  className={`input input-bordered bg-white pl-10 w-full py-2 pr-1 rounded-lg focus:border-black focus:ring-0 ${
                    errors.firstName ? "input-error" : ""
                  }`}
                  required
                />
             </div>
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.firstName}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control flex flex-col md:gap-[15px] gap-[10px]">
              <label className="label">
                <span className="label-text text-[16px] font-semibold text-black">
                  Last Name
                </span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange("lastName")}
                  className={`input input-bordered bg-white pl-10 w-full py-2 pr-1 rounded-lg focus:border-black focus:ring-0 ${
                    errors.lastName ? "input-error" : ""
                  }`}
                  required
                />
              </div>
              {errors.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.lastName}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control flex flex-col md:gap-[15px] gap-[10px]">
              <label className="label">
                <span className="label-text text-[16px] font-semibold text-black">
                  Email
                </span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                  className={`input input-bordered bg-white pl-10 w-full py-2 pr-1 rounded-lg focus:border-black focus:ring-0 ${
                    errors.email ? "input-error" : ""
                  }`}
                  required
                />
              </div>
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.email}
                  </span>
                </label>
              )}
            </div>

            <div className="form-control flex flex-col md:gap-[15px] gap-[10px]">
              <label className="label">
                <span className="label-text text-[16px] font-semibold  text-black">
                  Password
                </span>
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground text-black" />
                <input
                  type="password"
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange("password")}
                  className={`input input-bordered bg-white pl-10 w-full py-2 pr-1 rounded-lg focus:border-black focus:ring-0 ${
                    errors.password ? "input-error" : ""
                  }`}
                  required
                />
              </div>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.password}
                  </span>
                </label>
              )}
            </div>

            <div className="w-full bg-black text-white py-2 px-1 rounded-lg font-semibold text-center mt-6">
              <button
                type="submit"
                className="btn "
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Signing Up...
                  </>
                ) : (
                  "Sign Up"
                )}
              </button>
            </div>

            <p className="text-center mt-4 text-gray-600">
              Already have an account?{" "}
              <Link to="/signin" className=" text-black">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
