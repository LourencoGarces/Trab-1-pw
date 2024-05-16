const publicRouter = require('express').Router();


// Define uma rota para a página HTML
publicRouter.get('/', (req, res) => {
    // Envie o arquivo HTML como resposta para a solicitação HTTP
    res.sendFile('Index.html', { root: '.' });
});


module.exports = publicRouter;