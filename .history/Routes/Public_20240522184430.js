const express = require('express');
const { PrismaClient } = require('@prisma/client');
const publicRouter = express.Router();
const prisma = new PrismaClient();


// Define uma rota para a página HTML
publicRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('Index.html', { root: '.' });
});

// Route for the about us page
publicRouter.get('/about_us', (req, res) => {
    res.sendFile('AboutUs.html', { root: '.' });
});

// Route for the common questions page
publicRouter.get('/common_questions', (req, res) => {
    res.sendFile('CommonQuestions.html', { root: '.' });
});

// Route for the contacts page
publicRouter.get('/contacts', (req, res) => {
    res.sendFile('Contacts.html', { root: '.' });
});

// Route for the help page
publicRouter.get('/help', (req, res) => {
    res.sendFile('Help.html', { root: '.' });
});

// Route for the index page
publicRouter.get('/', (req, res) => {
    res.sendFile('Index.html', { root: '.' });
});

// Route for the login page
publicRouter.get('/login', (req, res) => {
    res.sendFile('Login.html', { root: '.' });
});

// Route for the register page
publicRouter.get('/register', (req, res) => {
    res.sendFile('Register.html', { root: '.' });
});

// Example POST route for user registration
publicRouter.post('/register', async (req, res) => {
    const { nome, email, contacto, password } = req.body;
    try {
        const newUser = await prisma.utilizador.create({
            data: { nome, email, contacto, password }
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: 'Failed to register user' });
    }
});

// Example POST route for user login
publicRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.utilizador.findUnique({
            where: { email }
        });

        if (user && user.password === password) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to login' });
    }
});

module.exports = publicRouter;
