const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const publicRouter = express.Router();
const prisma = new PrismaClient();

// Define uma rota para a página HTML
publicRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    const filePath = path.join(__dirname, 'Pages', 'Index.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the about us page
publicRouter.get('/about_us', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'AboutUs.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the common questions page
publicRouter.get('/common_questions', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'CommonQuestions.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the contacts page
publicRouter.get('/contacts', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'Contacts.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the help page
publicRouter.get('/help', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'Help.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the index page
publicRouter.get('/', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'Index.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the login page
publicRouter.get('/login', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'Login.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
});

// Route for the register page
publicRouter.get('/register', (req, res) => {
    const filePath = path.join(__dirname, 'Pages', 'Register.html');
    console.log('Sending file:', filePath); // Adiciona um log para depuração
    res.sendFile(filePath);
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
