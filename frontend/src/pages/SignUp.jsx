import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { saveToken } from "../utils/auth";

function Signup() {
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
            const res = await fetch(`${BASEURL}/api/register/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if(res.ok){
                setMsg("Account created successfully. Logging in...");
                setTimeout(() => {
                navigate("/login");
                }, 1000); 
            } else {
                setMsg(data.username || data.password || JSON.stringify(data) || "Signup failed");
            }
        } catch (err) {
            setMsg("Signup failed. Please try again.");
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4 ">Sign Up</h2>
                <form onSubmit={handleSubmit} className="space-y-3">
                    <input type="text"
                        name="username"
                        placeholder="Username"
                        value={form.username}
                        onChange={handleChange}
                        required
                        className="w-full p-2 boreder rounded" />

                        <input type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
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

                        <input type="password"
                        name="password2"
                        placeholder="Confirm Password"
                        value={form.confirm_password}
                        onChange={handleChange}
                        required
                        className="w-full p-2 boreder rounded" />
                        
                    <button className="w-full bg-blue-600 text-white py-2 rounded">
                        Create Account
                    </button>
                </form>
                {msg && <p className="text-red-500 mt-3">{msg}</p>}
                
            </div>

        </div>
    )
}

export default Signup;