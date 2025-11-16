import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
function App() {
  return (
    <>
      <OrdersProvider>
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
                        <Features/>
                        <CTA/>
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
              </Router>
            </UsersProvider>
          </ProductProvider>
        </UserProvider>
      </OrdersProvider>
    </>
  );
}

export default App;
