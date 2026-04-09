import ProductList from "./pages/ProductList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetails from "./pages/ProductDetails";
import Navbar from "./components/Navbar";
import CartPage from "./pages/CartPage";
import CheckOutPage from "./pages/CheckOutPage";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {

  return (

    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<CartPage />} />
        <Route element={<PrivateRoute />}>
          <Route path="/checkout" element={<CheckOutPage />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );

}

export default App;