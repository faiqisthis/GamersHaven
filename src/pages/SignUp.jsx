import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import UserContext from "../context/user/UserContext";
import UsersContext from "../context/users/UsersContext";
import { registerUser } from "../context/user/UserActions";

function SignUp() {
  const { user, userDispatch } = useContext(UserContext);
  const { usersDispatch } = useContext(UsersContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
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
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
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
            email: formData.email
          }
        });
        navigate("/");
      }
    } catch (error) {
      setErrors({ submit: error.message || "Registration failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="hero bg-gray-900 min-h-screen">
      <div className="hero-content flex justify-center items-center">
        <div className="card bg-base-100 md:w-[500px] max-w-md shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={handleSubmit}>
            {errors.submit && (
              <div className="alert alert-error">
                <span>{errors.submit}</span>
              </div>
            )}
            
            <div className="form-control">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange("firstName")}
                className={`input input-bordered input-primary mb-5 ${errors.firstName ? 'input-error' : ''}`}
                required
              />
              {errors.firstName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.firstName}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange("lastName")}
                className={`input input-bordered input-primary mb-5 ${errors.lastName ? 'input-error' : ''}`}
                required
              />
              {errors.lastName && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.lastName}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange("email")}
                className={`input input-bordered input-primary mb-5 ${errors.email ? 'input-error' : ''}`}
                required
              />
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email}</span>
                </label>
              )}
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange("password")}
                className={`input input-bordered input-primary ${errors.password ? 'input-error' : ''}`}
                required
              />
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password}</span>
                </label>
              )}
            </div>

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
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

            <p className="text-center mt-4">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
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