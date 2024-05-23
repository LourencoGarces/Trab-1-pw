const express = require('express');
const privateRouter = express.Router();

// Rota para a página de gerenciamento de perfil
privateRouter.get('/managemet_profile', (req, res) => {
    res.sendFile('Managemet_Profile.html', { root: '.' });
});

// Rota para a página de administração de perfil
privateRouter.get('/profile_admin', (req, res) => {
    res.sendFile('ProfileAdmin.html', { root: '.' });
});

// Exemplo de operações CRUD para gerenciar perfis e produtos
privateRouter.post('/managemet_profile', (req, res) => {
    // Lógica para criar um novo perfil
});

privateRouter.put('/managemet_profile', (req, res) => {
    // Lógica para atualizar um perfil existente
});

privateRouter.delete('/managemet_profile', (req, res) => {
    // Lógica para deletar um perfil
});

privateRouter.post('/profile_admin', (req, res) => {
    // Lógica para criar um novo produto
});

privateRouter.put('/profile_admin', (req, res) => {
    // Lógica para atualizar um produto existente
});

privateRouter.delete('/profile_admin', (req, res) => {
    // Lógica para deletar um produto
});

module.exports = privateRouter;
