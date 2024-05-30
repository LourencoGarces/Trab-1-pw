const router = require('express').Router();
const productsRouter = require('./Products');
const usersRouter = require('./Users');
const categoriesRouter = require('./Categories');
const assessRouter = require('./Assess');
const pricesRouter = require('./Prices');

router.use('/Products', productsRouter);
router.use('/Users', usersRouter);
router.use('/Categories', categoriesRouter);
router.use('/Assess', assessRouter);
router.use('/Prices', pricesRouter);

module.exports = router;