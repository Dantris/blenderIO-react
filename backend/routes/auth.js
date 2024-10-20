const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail, findUserById } = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
require("dotenv").config();

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log('Received registration request:', { username, email });
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        const user = await createUser({ username, email, password: hashedPassword });
        console.log('User created:', user);
        res.status(201).send("User registered");
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    console.log('Received login request:', { email });
    try {
        const user = await findUserByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
            res.json({ token });
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await findUserById(req.user.id); // Correct function to fetch by id
        if (user) {
            res.json(user);
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
