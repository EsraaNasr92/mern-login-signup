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
        <div>
        <h2>Login</h2>
        {error && <p style={{color:"red"}}>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input name="email" placeholder="Email" value={form.email} onChange={handleChange} />
            <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} />
            <button type="submit">Log in</button>
        </form>
        </div>
    );
}
