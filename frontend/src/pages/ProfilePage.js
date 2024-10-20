import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";

function ProfilePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await api.get("/auth/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user", error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    if (loading) {
        return <p>Loading user information...</p>;
    }

    return (
        <div>
            {user ? (
                <div>
                    <h2>Hello, {user.username}</h2>
                    <p>{user.email}</p>
                    <Link to="/editor">Write an article</Link>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
}

export default ProfilePage;
