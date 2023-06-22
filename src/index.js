const express = require('express');
const routes = require('./routes');
const http = require ('http');
const PORT = 8080;
const bodyParser = require("body-parser");
const exphbs = require ('express-handlebars');
const socketIo = require ('socket.io');


class Server {
  constructor() {
    this.app = express();
    this.routes();
    this.settings();
    this.server = http.createServer(this.app);
    this.io = null;
    this.initializeSocket();
  }

  settings() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
    this.app.use('/socket.io', express.static('node_modules/socket.io/client-dist')); 

    this.app.engine('handlebars', exphbs.engine());
    this.app.set('view engine', 'handlebars');
    
    this.app.get('/realtimeproducts', async (req, res) => {
      try {
        const productService = require('./components/products/productsService/productsService')
        const products = await productService.getProducts();
        res.render('realTimeProducts', { products });
      } catch (error) {
          console.log(`[ERROR] -> ${error}`);
          res.status(500).json({ error: 'Error getting all products' });
      }
  });
}

initializeSocket(){
  this.io = socketIo(this.server);
  const productService = require('./components/products/productsService/productsService')

  this.io.on('connection', (socket)=>{
    console.log('Client connected');
    productService.getProducts().then((products)=>{
      socket.emit('initial products', products);
      socket.on('new product', (newProduct) =>{
        this.io.emit('new product', newProduct);
      });
      socket.on('delet product', (productId)=>{
        this.io.emit('delet product', productId);
      });
    })
    .catch((error)=>{
      console.log(`[ERROR] ->${error}`);
    });
  });
}

  routes() {
    routes(this.app);
  }

  listen() {
    this.app.listen(PORT, () => console.log(`El servidor esta escuchando en el puerto ${PORT}`));
  }
}

module.exports = new Server();