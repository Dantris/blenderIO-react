const express = require("express");
const cors = require("cors");
const articleRoutes = require("./routes/articles"); // Routes for article operations
const publicArticleRoutes = require("./routes/publicArticles"); // Publicly accessible routes
const authRoutes = require("./routes/auth");
const errorHandler = require("./middleware/errorHandler");
const authMiddleware = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/articles', authMiddleware, articleRoutes); // Protect article creation, editing, deleting
app.use('/public-articles', publicArticleRoutes); // Publicly accessible article fetching

app.use(errorHandler);

app.listen(5000, () => console.log('Server running on port 5000'));
