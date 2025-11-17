// src/App.jsx

import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom"; 
import { useContext, useEffect } from "react"; 
import Navbar from "./components/Navbar";
import Homepage from "./components/Hero";
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
import { OrdersProvider } from "./context/orders/OrdersContext";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import Features from "./components/Features";
import CTA from "./components/CTA";
import UserContext from "./context/user/UserContext";

const ScrollToTop = ({ children }) => {
  // Destructure hash along with pathname
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Check if an anchor link is specified (e.g., #section-id)
    if (hash === '') {
      // If there is no hash, scroll to the very top (0, 0)
      window.scrollTo(0, 0); 
    } 
    // If a hash exists, we rely on the browser's default behavior 
    // to handle the navigation to the element with that ID.
    
    // Note: We include `hash` in dependencies to handle in-page anchor link clicks as well.
  }, [pathname, hash]); 

  return children;
};
// ------------------------------------

// Component to wrap the content and access context
const HomeLayout = () => {
    const { user } = useContext(UserContext); 

    return (
        <div>
            <Navbar />
            <Homepage />
            <Features />
            {/* Conditional Rendering: Only show CTA if the user is NOT logged in */}
            {!user && <CTA />}
            <Footer />
        </div>
    );
};


function App() {
  return (
    <>
      <OrdersProvider>
        <UserProvider>
          <ProductProvider>
            <UsersProvider>
              <Router>
                {/* WRAPPING Routes with ScrollToTop */}
                <ScrollToTop>
                  <Routes>
                    <Route
                      exact
                      path="/"
                      element={
                        <HomeLayout />
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
                      path="/admin/orders"
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
                    <Route
                      exact
                      path="/checkout"
                      element={
                        <div>
                          <Checkout />
                          <Footer />
                        </div>
                      }
                    />
                    <Route
                      exact
                      path="/my-orders"
                      element={
                        <div>
                          <Navbar />
                          <MyOrders />
                          <Footer />
                        </div>
                      }
                    />
                  </Routes>
                </ScrollToTop>
              </Router>
            </UsersProvider>
          </ProductProvider>
        </UserProvider>
      </OrdersProvider>
    </>
  );
}

export default App;