const router = require('express').Router();
const productsRouter = require('./Products');
const usersRouter = require('./Users');

router.use('/Products', productsRouter);
router.use('/Users', usersRouter);

module.exports = router;