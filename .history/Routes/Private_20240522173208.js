const privateRouter = require('express').Router();

// Define uma rota para a página HTML
privateRouter.get('/gerirProdutos', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('ProfileAdmin.html', { root: '.' });
});

module.exports = privateRouter;