const express = require('express');
const privateRouter = express.Router();

// Rota para a página de gerenciamento de perfil
privateRouter.get('/Management_profile', (req, res) => {
    res.sendFile('Management_Profile.html', { root: '.' });
});

// Rota para a página de administração de perfil
privateRouter.get('/ProfileAdmin', (req, res) => {
    res.sendFile('ProfileAdmin.html', { root: '.' });
});

// Exemplo de operações CRUD para gerenciar perfis e produtos
privateRouter.post('/Management_profile', (req, res) => {
    // Lógica para criar um novo perfil
});

privateRouter.put('/Management_profile', (req, res) => {
    // Lógica para atualizar um perfil existente
});

privateRouter.delete('/Management_profile', (req, res) => {
    // Lógica para deletar um perfil
});

privateRouter.post('/ProfileAdmin', (req, res) => {
    // Lógica para criar um novo produto
});

privateRouter.put('/ProfileAdmin', (req, res) => {
    // Lógica para atualizar um produto existente
});

privateRouter.delete('/ProfileAdmin', (req, res) => {
    // Lógica para deletar um produto
});

module.exports = privateRouter;
