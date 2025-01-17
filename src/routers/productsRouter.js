/* Requieres */
const express = require('express');
const router = express.Router();

/* Controllers Requieres */
const productsController = require('../controllers/productsController');
const upload = require('../middlewares/multerProducts'); //Para que funcione Multer

//Middlewares
const createProductValidation = require("../middlewares/validations/createProductValidation")
//!no funca todavia el edit
const editProductValidation = require("../middlewares/validations/editProductValidation")
const adminMiddleware = require("../middlewares/adminMiddleware")


//Routeo a todos los productos
router.get('/sidras', productsController.sidras);

//Routeo detalles de producto
router.get('/productDetail/:id/', productsController.productDetail);

//Routeo al carro de compras
router.get('/productCart', productsController.productCart);



//Routeo a crear producto, vista administrador
router.get('/createProduct',adminMiddleware, productsController.createProduct); //Para mostrar la vista
router.post('/createProduct', upload.any(''), createProductValidation, productsController.saveProduct); //Para procesar la vista

//Routeo a editar producto, vista administrador
router.get('/editProduct/:id/',adminMiddleware, productsController.editProduct);
router.put('/editProduct/:id/', upload.any(''), editProductValidation, productsController.updateProduct);


// Routeo para eliminar un producto 
router.post('/delete/:id/', productsController.destroy); 

//Exportamos las rutas
module.exports = router;