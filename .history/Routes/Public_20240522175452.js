const express = require('express');
const publicRouter = express.Router();

// Rotas para páginas públicas
publicRouter.get('/', (req, res) => {
    res.sendFile('Index.html', { root: '.' });
});

publicRouter.get('/about_us', (req, res) => {
    res.sendFile('AboutUs.html', { root: '.' });
});

publicRouter.get('/common_questions', (req, res) => {
    res.sendFile('CommonQuestions.html', { root: '.' });
});

publicRouter.get('/contacts', (req, res) => {
    res.sendFile('Contacts.html', { root: '.' });
});

publicRouter.get('/help', (req, res) => {
    res.sendFile('Help.html', { root: '.' });
});

publicRouter.get('/login', (req, res) => {
    res.sendFile('Login.html', { root: '.' });
});

publicRouter.get('/register', (req, res) => {
    res.sendFile('Register.html', { root: '.' });
});

// Exemplos de operações POST
publicRouter.post('/login', (req, res) => {
    // Lógica para login de usuário
});

publicRouter.post('/register', (req, res) => {
    // Lógica para registro de usuário
});

module.exports = publicRouter;
