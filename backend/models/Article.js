const db = require('../db');

const createArticle = async ({ title, content, author_id }) => {
  try {
      // Assuming content is a JSON string and needs to be inserted as JSON data
      const result = await db.query(
          'INSERT INTO articles (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
          [title, JSON.stringify(content), author_id] // Make sure to stringify if not already a string
      );
      return result.rows[0];
  } catch (error) {
      console.error('Failed to create article:', error);
      throw error; // Rethrow to handle it in the route if necessary
  }
};

const getArticles = async () => {
  const result = await db.query('SELECT * FROM articles');
  return result.rows;
};

const getArticleById = async (id) => {
  const result = await db.query('SELECT * FROM articles WHERE id = $1', [id]);
  return result.rows[0];
};

const getAllPublicArticles = async () => {
  const result = await db.query('SELECT * FROM articles'); // Adjust SQL query based on your schema
  return result.rows;
};

module.exports = { createArticle, getArticles, getArticleById, getAllPublicArticles };
