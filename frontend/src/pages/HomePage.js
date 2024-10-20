import React, { useEffect, useState } from "react";
import api from "../api";

function HomePage() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await api.get("/public-articles");
                setArticles(response.data);
            } catch (error) {
                console.error("Error fetching articles", error);
            }
        };
        fetchArticles();
    }, []);

    // Utility function to strip HTML and limit text
    const createSnippet = (htmlContent) => {
        const text = htmlContent.replace(/<[^>]+>/g, ''); // Remove HTML tags
        return text.slice(0, 200) + '...'; // Return first 200 characters followed by ellipsis
    };

    return (
        <div className="home-page">
            <h1>Latest Articles</h1>
            {articles.length > 0 ? (
                articles.map(article => (
                    <div key={article.id} className="article-card">
                        <h2>{article.title}</h2>
                        <p>{createSnippet(article.content)}</p>
                        <a href={`/article/${article.id}`}>Read more</a>
                    </div>
                ))
            ) : (
                <p>No articles found.</p>
            )}
        </div>
    );
}

export default HomePage;