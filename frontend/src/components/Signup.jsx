import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";

export default function Signup() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.name || !form.email || form.password.length < 6) {
            setError("Please fill all fields; password must be at least 6 characters.");
            return;
        }

        try {
            const res = await signupUser(form);
            navigate("/login");
        } catch (err) {
            setError(err?.response?.data?.message || "Signup failed");
        }
    };

    return (
        <div>
            <h2>Sign up</h2>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="name"
                    value={form.name}
                    onChange={handleChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    value={form.email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    value={form.password}
                    onChange={handleChange}
                />
                <button type="submit">Sign up</button>
            </form>
        </div>
    );
}
