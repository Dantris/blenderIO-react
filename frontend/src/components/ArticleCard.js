import React from "react";
import {Link} from "react-router-dom";
import "../styles/ArticleCard.css";

function ArticleCard({article}) {
    return (
        <div className="article-card">
            <h3><Link to={`/article/${article.id}`}>{article.title}</Link></h3>
            <p>{article.body.substring(0, 100)}...</p>
        </div>
    )
}

export default ArticleCard;