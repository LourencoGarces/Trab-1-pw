const categoriesRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Categories');

//CRUD para categorias
categoriesRouter.get('/', controller.getAll); //le todas
categoriesRouter.get('/:id', controller.getById); //le uma categoria indicado pelo id
categoriesRouter.post('/create', controller.create); //criar uma categoria
categoriesRouter.put('/update/:id', controller.update); //atualizar uma categoria
categoriesRouter.delete('/delete/:id', controller.delete); //apagar uma categoria

module.exports = categoriesRouter;