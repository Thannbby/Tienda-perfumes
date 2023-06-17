const Product = require('./productsService/productsService');
const { Router } = require('express');
const bodyParser = require("body-parser");

const productService = new Product('./products.json')

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/products', router);
  router.get('/', productService.getProducts.bind(productService));
  router.get('/:pid', productService.getProductsById.bind(productService));
  router.post('/', productService.addProduct.bind(productService));
  router.put('/:pid', productService.upDateProductId.bind(productService));
  router.delete('/:pid', productService.deletProduct.bind(productService));
}