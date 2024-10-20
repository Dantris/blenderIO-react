import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import ArticlePage from "./pages/ArticlePage";
import ArticleEditor from "./components/ArticleEditor";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "./App.css";

function App() {
    return (
        <Router>
            <AuthProvider>
                <Navbar />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/auth/login" element={<LoginPage />} />
                    <Route path="/auth/register" element={<RegisterPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/article/:id" element={<ArticlePage />} />
                    <Route path="/editor" element={<ArticleEditor />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </Router>
    );
}

export default App;
