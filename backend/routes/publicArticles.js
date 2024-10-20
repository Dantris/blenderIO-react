const express = require("express");
const router = express.Router();
const { getAllPublicArticles } = require("../models/Article"); // Ensure this function is defined in your model

router.get('/', async (req, res) => {
  try {
    const articles = await getAllPublicArticles();
    res.json(articles);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch articles" });
  }
});

module.exports = router;
