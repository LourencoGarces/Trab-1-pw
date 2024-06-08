const autenticationRouter = require('express').Router();
const controller = require('../../Controllers/Pgs/Auth');

autenticationRouter.post('/signin', controller.signin);
autenticationRouter.post('/signup', controller.signup);
autenticationRouter.post('/readToken', controller.readToken);

module.exports = autenticationRouter;