const router = require('express').Router();
const productController = require ("../controllers/productsController");

//end points 

router.get('/',productController.getAllProducts)
router.get('/:id',productController.getProduct)
router.get('/search/:key',productController.searchProduct)
router.post('/',productController.createProduct)

module.exports =router