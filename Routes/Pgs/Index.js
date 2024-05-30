const router = require('express').Router();
const productsRouter = require('./Products');
const usersRouter = require('./Users');
const categoriesRouter = require('./Categories');

router.use('/Products', productsRouter);
router.use('/Users', usersRouter);
router.use('/Categories', categoriesRouter)

module.exports = router;