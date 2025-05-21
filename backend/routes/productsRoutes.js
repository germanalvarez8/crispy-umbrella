const express = require('express');
const productsController = require('../controllers/productsController.js');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct);
router.put('/:id', productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
