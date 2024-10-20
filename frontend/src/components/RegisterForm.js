import React, { useState } from "react";
import api from "../api";

function RegisterForm() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/auth/register", { username, email, password });
            // Handle successful registration (e.g., redirect to login)
        } catch (error) {
            console.error("Error registering", error);
            setError(error.response.data.error);  // Set error message
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Username</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>
            <div>
                <label>Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}

export default RegisterForm;
