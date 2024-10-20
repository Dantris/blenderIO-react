// backend/routes/articles.js
const express = require('express');
const { createArticle, getArticles, getArticleById } = require('../models/Article');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { title, content, author_id } = req.body; // Ensure author_id is managed according to your auth setup
    const article = await createArticle({ title, content, author_id });
    res.status(201).json(article);
  } catch (error) {
    console.error('Failed to create article:', error);
    res.status(500).json({ message: 'Failed to create article' });
  }
});

router.get('/', async (req, res) => {
  try {
    const articles = await getArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const article = await getArticleById(id);
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;