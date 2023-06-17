const productsApi = require('../components/products')
const cartsApi = require('../components/carts')


module.exports = (app) => {
  productsApi(app)
  cartsApi(app)
  app.get('/', (req, res) => res.send('challenge 4'));
}