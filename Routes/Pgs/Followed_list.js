const followedRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Followed_list');

//CRUD para lista seguidos
followedRouter.get('/', controller.getAll); //le todas
followedRouter.get('/:id', controller.getById); //le uma lista seguidos indicado pelo id
followedRouter.post('/create', controller.create); //criar uma lista seguidos
followedRouter.put('/update/:id', controller.update); //atualizar uma lista seguidos
followedRouter.delete('/delete/:id', controller.delete); //apagar uma lista seguidos

module.exports = followedRouter;