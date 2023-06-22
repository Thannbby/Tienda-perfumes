const productsApi = require('./products');
const cartsApi = require('./carts');
const mainRoutes = require('./mainRoutes')


module.exports = (app) => {
  mainRoutes(app);
  productsApi(app);
  cartsApi(app);
  app.get('/', (req, res) => res.send('Hello world'));
}