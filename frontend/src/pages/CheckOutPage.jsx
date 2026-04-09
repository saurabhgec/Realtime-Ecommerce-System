import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/auth";
import { useCart } from "../context/CartContext";

function CheckOutPage() {
    
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    console.log("BASE URL:", BASEURL);
    const navigate = useNavigate();
    const { clearCart } = useCart();

    const [form, setForm] = useState({
        name: "",
        address: "",
        phone: "",
        payment_method: "COD",
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const response = await authFetch(`${BASEURL}/api/orders/create/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            // ✅ FIX HERE
            if (response.ok) {
                setMessage("Order placed successfully!");
                fetch(`${BASEURL}/api/cart/`);
                clearCart();

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setMessage(data.error || "Failed to place order. Please try again.");
            }
        } catch (error) {
            
            setMessage("An error occurred while placing the order.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-6 ">
            <div className="bg-white p-8 rounded 2xl shadow-lg w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6">Checkout</h1>

                <form action="" onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    <textarea
                        name="address"
                        placeholder="Full Address"
                        value={form.address}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    ></textarea>

                    <input type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={form.phone}
                        onChange={handleChange}
                        required
                        className="w-full border rounded-lg p-2"
                    />

                    <select
                        name="payment_method"
                        value={form.payment_method}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-2"
                    >
                        <option value=""></option>
                        <option value="COD">Cash on Delivery</option>
                        <option value="Credit Card">Online Payment</option>
                        <option value="PayPal">PayPal</option>
                    </select>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        {loading ? "Processing..." : "Place Order"}
                    </button>

                    {message && (
                        <p className="text-center text-green-700 font-semibold mt-4">
                            {message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default CheckOutPage;