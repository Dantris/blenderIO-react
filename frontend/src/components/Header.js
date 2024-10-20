// frontend/src/components/Header.js
import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar"; // Import Navbar component

function Header() {
    return (
        <header className="header">
            <h1><Link to="/">Blender Community</Link></h1>
            <Navbar /> {/* Include Navbar */}
        </header>
    );
}

export default Header;
