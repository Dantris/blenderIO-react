const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).send({ message: "No token provided" });
    }

    const token = authHeader.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(403).send({ message: "Invalid or expired token" });
    }
};

module.exports = authMiddleware;
