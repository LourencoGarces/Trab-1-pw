const assessRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Assess');

//CRUD para avaliação
assessRouter.get('/', controller.getAll); //le todas
assessRouter.get('/:id', controller.getById); //le uma avaliação indicado pelo id
assessRouter.post('/create', controller.create); //criar uma avaliação
assessRouter.put('/update/:id', controller.update); //atualizar uma avaliação
assessRouter.delete('/delete/:id', controller.delete); //apagar uma avaliação

module.exports = assessRouter;
