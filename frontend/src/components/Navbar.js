import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Ensure correct import
import "../styles/Navbar.css";

function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <Link to="/">
                <img src="/logo.svg" alt="Blender Community Logo" className="navbar-logo" />
            </Link>
            <Link to="/">Home</Link>
            {user ? (
                <>
                    <Link to="/editor">Create article</Link>
                    <Link to="/profile">Profile</Link>
                    <button onClick={() => { logout(); navigate('/auth/login'); }}>Logout</button>
                </>
            ) : (
                <>
                    <Link to="/auth/login">Login</Link>
                    <Link to="/auth/register">Register</Link>
                </>
            )}
        </nav>
    );
}

export default Navbar;
