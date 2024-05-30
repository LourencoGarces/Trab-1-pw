const router = require('express').Router();
const productsRouter = require('./Products');
const usersRouter = require('./Users');
const categoriesRouter = require('./Categories');
const assessRouter = require('./Assess')

router.use('/Products', productsRouter);
router.use('/Users', usersRouter);
router.use('/Categories', categoriesRouter);
router.use('/Assess', assessRouter);

module.exports = router;