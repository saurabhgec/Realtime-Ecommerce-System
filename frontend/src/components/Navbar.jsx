import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { clearToken, getAccessToken } from "../utils/auth";

function Navbar() {
    const { cartItems } = useCart();
    const navigate = useNavigate();
    console.log("navbar")
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const isLoggedIn = !!getAccessToken();

    const handleLogout = () => {
        clearToken();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50">
            <Link to="/" className="text-2xl font-bold text-gray-800">SRBH-Commerce</Link>

            <div className="flex items-center gap-6">
                {/* Login/Signup links */}
                {!isLoggedIn ? (
                    <>
                        <Link to="/login" className="text-gray-800 hover:text-gray-600 font-medium">Login</Link>
                        <Link to="/signup" className="text-gray-800 hover:text-gray-600 font-medium">Signup</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="text-gray-800 hover:text-gray-600 font-medium">Logout</button>
                )}
            </div>
            <Link to="/cart" className="relative text-gray-800 hover:text-gray-600 font-medium">
                Cart
                {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                        {cartCount}
                    </span>
                )}
            </Link>

        </nav>
    );
}

export default Navbar;