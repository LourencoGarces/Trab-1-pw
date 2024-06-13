require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const bodyParser = require('body-parser'); // Middleware para analisar corpos de requisições
const cors = require('cors'); // Middleware para habilitar Cross-Origin Resource Sharing
const express = require('express'); // Importar o framework express
const path = require('path'); // Importar módulo path para trabalhar com caminhos de arquivos

const routerPgs = require('./Routes/Pgs/Index'); // Importar rotas Pgs
const publicRouter = require('./Routes/Public'); // Importar rotas públicas
const privateRouter = require('./Routes/Private'); // Importar rotas privadas
const categoriesRouter = require('./Routes/Pgs/Categories'); // Importar rotas de categorias
const productsRouter = require('./Routes/Pgs/Products');//Importar rotas de Produtos


const app = express(); // Criar uma instância do express
app.use(bodyParser.json()); // Usar middleware body-parser para analisar corpos de requisições JSON
app.use(cors()); // Usar middleware CORS para habilitar Cross-Origin Resource Sharin

// Servir arquivos estáticos da pasta 'Pages'
app.use(express.static(path.join(__dirname, 'Pages')));

// Rota para servir login-explore.html como a página inicial
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'Pages/Login-explore.html'));
});

// Rotas principais para usar no postman
app.use('/Public', publicRouter); // Usar publicRouter para a rota /Public
app.use('/Private', privateRouter); // Usar privateRouter para a rota /Private
app.use('/Api/Pgs', routerPgs); // Usar routerPgs para a rota /Api/Pgs
app.use('/Api/Pgs/Products',categoriesRouter); // Usar categoriesRouter para a ro
app.use('/Api/Pgs/Categories', categoriesRouter); // Usar categoriesRouter para a rota /Api/Categories



const port = process.env.SERVER_PORT || 4242; // Definir a porta do servidor, padrão para 4242 se não especificado
app.listen(port, () => { // Iniciar o servidor express
    console.log('Express server listening on port', port); // Mensagem de log do servidor escutando
    console.log('Port open', port); // Mensagem de log de porta aberta
});
