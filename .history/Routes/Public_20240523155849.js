const express = require('express');
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const publicRouter = express.Router();
const prisma = new PrismaClient();

// Corrija os caminhos para usar __dirname e apontar corretamente para a pasta Pages
publicRouter.get('/', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Index.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/about_us', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'AboutUs.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/common_questions', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'CommonQuestions.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/contacts', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Contacts.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/help', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Help.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/login', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Login.html');
    console.log('Sending file:', filePath);
    res.sendFile(filePath);
});

publicRouter.get('/register', (req, res) => {
    const filePath = path.join(__dirname, '..', '..', 'Pages', 'Register.html');
    console.log('Sending file:', filePath);
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
