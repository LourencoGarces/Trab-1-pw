const productsRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Products');

//CRUD para produtos
productsRouter.get('/', controller.getAll); //le todos
productsRouter.get('/:id', controller.getById); //le um produto indicado pelo id
productsRouter.post('/create', controller.create); //criar um produto
productsRouter.put('/update/:id', controller.update); //atualizar um produto
productsRouter.delete('/delete/:id', controller.delete); //apagar um produto
productsRouter.get('/category/:categoria', controller.getByCategory);
productsRouter.get('/image/:imagem', controller.getByImage);

module.exports = productsRouter;