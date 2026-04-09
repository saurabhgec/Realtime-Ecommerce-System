import { createContext, useContext, useState, useEffect } from "react";
import { authFetch, getAccessToken } from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    console.log("Cart Context:", cartItems);

    // ✅ Fetch cart
    const fetchCartItems = async () => {
        try {
            const res = await authFetch(`${BASEURL}/api/cart/`);
            const data = await res.json();

            setCartItems(data.items || []);
            setTotal(data.total || 0);
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Correct place
    useEffect(() => {
        fetchCartItems();
    }, []);

    // ✅ Add
    const addToCart = async (product) => {
        console.log("Sending product id:", product.id);
        try {
            await authFetch(`${BASEURL}/api/cart/add/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ product_id: product.id }),
            });

            fetchCartItems();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Remove
    const removeFromCart = async (itemId) => {
        try {
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item_id: itemId }),
            });

            fetchCartItems();
        } catch (err) {
            console.error(err);
        }
    };

    // ✅ Update
    const updateQuantity = async (itemId, quantity) => {
        try {
            if (quantity < 1) {
                await removeFromCart(itemId);
                return;
            }

            await authFetch(`${BASEURL}/api/cart/update/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ item_id: itemId, quantity }),
            });

            fetchCartItems();
        } catch (err) {
            console.error(err);
        }
    };

    const clearCart =  () => {
        setCartItems([]);
        setTotal(0);
    }

    return (
        <CartContext.Provider value={{ cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};


export const useCart = () => useContext(CartContext);