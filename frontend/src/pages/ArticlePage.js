import React, { useState, useEffect } from "react";
import {useParams} from "react-router-dom";
import api from "../api";

function ArticlePage() {
    const {id} = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const response = await api.get(`/articles/${id}`);
                setArticle(response.data);
            } catch {
                setError("Error fetching article");
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Article not found</div>;
    }

    return (
        <div className="article-page">
            <h1>{article.title}</h1>
            <div className="article-meta">
                <span>By {article.author.username}</span>
                <span>{new Date(article.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="article-content">
                {article.content}
            </div>
        </div>
    )
}

export default ArticlePage;