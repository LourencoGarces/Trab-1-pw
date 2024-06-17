const pricesRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Prices');

//CRUD para preços
pricesRouter.get('/', controller.getAll); //le todos
pricesRouter.get('/:id', controller.getById); //le  preços indicado pelo id
pricesRouter.post('/create', controller.create); //criar preço
pricesRouter.put('/update/:id', controller.update); //atualizar preços
pricesRouter.delete('/delete/:id', controller.delete); //apagar preços

module.exports = pricesRouter;
