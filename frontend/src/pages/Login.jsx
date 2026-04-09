import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { saveToken } from "../utils/auth";

function Login() {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({ username: "", password: "" });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg("");
        try{
            const res = await fetch(`${BASEURL}/api/token/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if(res.ok){
                saveToken(data);
                setMsg("Logged in successfully");
                setTimeout(() => {
                navigate("/");
                }, 1000); 
            } else {
                setMsg(data.detail || "Login failed");
            }
        } catch (error) {
            setMsg("An error occurred. Please try again.");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 ">Login</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full p-2 boreder rounded" />

                        <input type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 boreder rounded" />

                    <button className="w-full bg-blue-600 text-white py-2 rounded">
                        Login
                    </button>
                </form>
                {msg && <p className="text-red-500 mt-3">{msg}</p>}
                <div className="mt-4 text-sm">
                    Don't have an account?{" "} <a href="/signup" className="text-blue-600">Sign up</a>
                </div>

            </div>

        </div>
    )
}

export default Login;