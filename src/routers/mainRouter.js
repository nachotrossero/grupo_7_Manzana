const express = require('express');
const router = express.Router();
const productsRouter = require('./productsRouter');
const usersRouter = require('./usersRouter');
const mainController = require('../controllers/mainController');

//Routeo al home
//? Deberíamos ver cómo usar solo una linea de estos como dice GIAN.
router.get('/', mainController.index);
router.get('/home', mainController.index);
router.get('/index', mainController.index);

//Routeo a productos y users
router.use('/products', productsRouter);
router.use('/users', usersRouter);



module.exports = router;





