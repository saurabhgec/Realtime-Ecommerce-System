import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
  const { id } = useParams();
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  console.log("Full product:", product);

  useEffect(() => {
    fetch(`${BASEURL}/api/products/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [id, BASEURL]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
  if (!product) return <div className="text-center mt-10">Product not found.</div>;

  const handleAddToCart = () => {
  if (!localStorage.getItem("access_Token")) {   // ✅ FIX
    window.location.href = "/login";
    return;
  }
  addToCart({ id: product.id });
};

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-10">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-3xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={`${product.image}`}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            <p className="text-gray-600 text-xl font-semibold mb-4">
              ${Number(product.price).toFixed(2)}
            </p>
            <p className="text-gray-500">{product.description}</p>
            
            <button
              className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>

            {/* Home Button */}
            <div className="mt-4">

              <a href="/" className="text-blue-600 hover-underline&">&larr;Back to Home</a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;