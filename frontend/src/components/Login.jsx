import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
        const res = await loginUser(form);
        // expected: res.data = { token, user }
        const token = res.data.token;
        if (!token) throw new Error("No token returned");
        login(token); // stores token in localStorage + set header
        navigate("/dashboard");
        } catch (err) {
        setError(err?.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-sm p-6 bg-white rounded-xl shadow-lg">
                <h2 className="text-2x1 font-semibold text-center mb-6">Login</h2>

                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    <input
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        Log in
                    </button>
                </form>
            </div>
        </div>
    );
}
