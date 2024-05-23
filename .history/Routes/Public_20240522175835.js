const express = require('express');
const publicRouter = express.Router();

// Rotas para páginas públicas
publicRouter.get('/', (req, res) => {
    res.sendFile('Index.html', { root: '.' });
});

publicRouter.get('/About_us', (req, res) => {
    res.sendFile('AboutUs.html', { root: '.' });
});

publicRouter.get('/Common_Questions', (req, res) => {
    res.sendFile('CommonQuestions.html', { root: '.' });
});

publicRouter.get('/Contacts', (req, res) => {
    res.sendFile('Contacts.html', { root: '.' });
});

publicRouter.get('/Help', (req, res) => {
    res.sendFile('Help.html', { root: '.' });
});

publicRouter.get('/Login', (req, res) => {
    res.sendFile('Login.html', { root: '.' });
});

publicRouter.get('/Register', (req, res) => {
    res.sendFile('Register.html', { root: '.' });
});

// Exemplos de operações POST
publicRouter.post('/Login', (req, res) => {
    // Lógica para login de usuário
});

publicRouter.post('/Register', (req, res) => {
    // Lógica para registro de usuário
});

module.exports = publicRouter;
