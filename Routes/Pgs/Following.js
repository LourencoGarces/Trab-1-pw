const followingRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Following');

//CRUD para seguidos
followingRouter.get('/', controller.getAll); //le todas
followingRouter.get('/:id', controller.getById); //le uma seguidos indicado pelo id
followingRouter.post('/create', controller.create); //criar uma seguidos
followingRouter.put('/update/:id', controller.update); //atualizar uma seguidos
followingRouter.delete('/delete/:id', controller.delete); //apagar uma seguidos

module.exports = followingRouter;