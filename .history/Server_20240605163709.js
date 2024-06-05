require('dotenv').config();

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

//const routerLocal = require('./Routes/Local/Index');
const routerPgs = require('./Routes/Pgs/Index');
const publicRouter = require('./Routes/Public');
const privateRouter = require('./Routes/Private');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Servir arquivos estáticos
//app.use('/Styles', express.static('Styles'))
//app.use('/Assets', express.static('Assets'))
//app.use('/Scripts', express.static('Scripts'))
//app.use(express.static('Pages'))
app.use(express.static('Pages'))

// Rotas principais
app.use('/', publicRouter);
app.use('/Private/', privateRouter);
//app.use('/Api/Local/', routerLocal);
app.use('/Api/Pgs/', routerPgs);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Adicionar rota de teste de conexão ao banco de dados
app.get('/test-db', async (req, res) => {
    try {
      const utilizadores = await prisma.utilizador.findMany();
      const avaliacoes = await prisma.avaliar.findMany();
      const produtos = await prisma.produtos.findMany();
      const precos = await prisma.precos.findMany();
      const aSeguir = await prisma.a_seguir.findMany();
      const listaSeguidos = await prisma.lista_seguidos.findMany();
      const categorias = await prisma.categorias.findMany();
  
      res.json({ utilizadores, avaliacoes, produtos, precos, aSeguir, listaSeguidos, categorias });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

const port = process.env.SERVER_PORT || 4242;
app.listen(port, () => {
    console.log('Express server listening on port', port)
    console.log('Port open', port)
});
