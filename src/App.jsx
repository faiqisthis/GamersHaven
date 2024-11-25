import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import Explore from "./pages/Explore";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/ProductDetails";
import UploadImage from "./utils/UploadImage";
import Admin from "./pages/Admin";
import { UserProvider } from "./context/user/UserContext";
import { ProductProvider } from "./context/product/ProductContext";
import { UsersProvider } from "./context/users/UsersContext";
import Cart from "./pages/Cart";
function App() {
  return (
    <>
      <UserProvider>
        <ProductProvider>
          <UsersProvider>
            <Router>
              <Routes>
                <Route
                  exact
                  path="/"
                  element={
                    <div>
                      <Navbar />
                      <Homepage />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/about"
                  element={
                    <div>
                      <Navbar />
                      <About />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/contact-us"
                  element={
                    <div>
                      <Navbar />
                      <ContactUs />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/explore"
                  element={
                    <div>
                      <Navbar />
                      <Explore />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/product/:slug/:id"
                  element={
                    <div>
                      <Navbar />
                      <ProductDetails />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/signin"
                  element={
                    <div>
                      <Navbar />
                      <Login />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/signup"
                  element={
                    <div>
                      <Navbar />
                      <SignUp />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/upload"
                  element={
                    <div>
                      <Navbar />
                      <UploadImage />
                      <Footer />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/admin/dashboard"
                  element={
                    <div>
                      <Admin />
                    </div>
                  }
                />

                <Route
                  exact
                  path="/admin/products"
                  element={
                    <div>
                      <Admin />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/admin/users"
                  element={
                    <div>
                      <Admin />
                    </div>
                  }
                />
                <Route
                  exact
                  path="/user/:id/cart"
                  element={
                    <div>
                      <Navbar />
                      <Cart />
                      <Footer />
                    </div>
                  }
                />
              </Routes>
            </Router>
          </UsersProvider>
        </ProductProvider>
      </UserProvider>
    </>
  );
}

export default App;
