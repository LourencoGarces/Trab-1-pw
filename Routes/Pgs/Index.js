const router = require('express').Router();
const productsRouter = require('./Products');
const usersRouter = require('./Users');
const categoriesRouter = require('./Categories');
const assessRouter = require('./Assess');
const pricesRouter = require('./Prices');
const followedRouter = require('./Followed_list');
const followingRouter = require('./Following'); 

router.use('/Products', productsRouter);
router.use('/Users', usersRouter);
router.use('/Categories', categoriesRouter);
router.use('/Assess', assessRouter);
router.use('/Prices', pricesRouter);
router.use('/Followed_list', followedRouter);
router.use('/Following', followingRouter);

module.exports = router;