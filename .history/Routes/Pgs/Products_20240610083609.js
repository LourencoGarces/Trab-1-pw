const express = require('express');
const path = require('path');
const controller = require('../../Controllers/Pgs/Products');
const productsRouter = express.Router();

// CRUD para produtos
productsRouter.get('/', controller.getAll); // le todos
productsRouter.get('/:id', controller.getById); // le um produto indicado pelo id
productsRouter.post('/create', controller.create); // criar um produto
productsRouter.put('/update/:id', controller.update); // atualizar um produto
productsRouter.delete('/delete/:id', controller.delete); // apagar um produto

// Function to get Products by Category
productsRouter.get('/category/:categoria', controller.getByCategory);
// Function to get Products by Image
productsRouter.get('/image/:imagem', controller.getByImage);
// Function to get Products by Manufacturer
productsRouter.get('/manufacturer/:fabricante', controller.getByManufacturer);
// Function to get Products by Price
productsRouter.get('/price/:preco', controller.getByPrice);
// Function to get Products by Name
productsRouter.get('/name/:nome', controller.getByName);
// Function to get Products by ID Category
productsRouter.get('/id_category/:id_categoria', controller.getByIdCategory);
// Function to get Products by Detalhes
productsRouter.get('/detalhes/:detalhes', controller.getByDetalhes);

// Rota para servir o HTML
productsRouter.get('/product/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/Product.html'));
});

module.exports = productsRouter;
