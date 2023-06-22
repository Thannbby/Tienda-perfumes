const cartController = require('../components/carts/cartController/cartController');
const { Router } = require('express');
const bodyParser = require("body-parser");

module.exports = (app) => {
  let router = new Router();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/api/carts', router);
  
  router.get('/', cartController.getAllCarts);
  router.post('/', cartController.createCart);
  router.get('/:cid', cartController.products);
  router.post('/:cid/product/:pid', cartController.addProduct);
}