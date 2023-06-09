const Product = require('./productsController/productsController');
const { Router } = require('express');
const bodyParser = require("body-parser");

const productController = new Product('./products.json')

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/products', router);
  router.get('/', productController.getProducts.bind(productController));
  router.get('/:pid', productController.getProductsById.bind(productController));
  router.post('/', productController.addProduct.bind(productController));
  router.put('/:pid', productController.upDateProductId.bind(productController));
  router.delete('/:pid', productController.deleteProduct.bind(productController));
}