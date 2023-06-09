const fs = require('fs');

class CartsController {
  static id = 0;

  constructor(path) {
    this.path = path
    try {
      this.carts = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
    } catch (error) {
      this.carts = []
    }

    CartsController.id = this.carts.reduce((prev, curr) => (
      curr.id >= prev ? curr.id : prev
    ), 0)
  }

  getAllCarts(req, res) {
    try {
      res.send(this.carts);
    } catch (error) {
      res.status(500).send('Error no se pueden obtener los carritos');
    }
  }

  createCart(req, res) {
    try {
      let newProduct = req.body;
      const newCart = {
        id: ++CartsController.id,
        products: newProduct
      }

      this.carts = [...this.carts, newCart]
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
      res.send(this.carts);
    } catch (error) {
      res.status(500).send('Error no se puede crear el carrito');
    }
  }

  getCartById(req, res) {
    try {
      let cid = parseInt(req.params.cid);
      const findCart = this.carts.find(cart => cart.id === cid)
      if (findCart) {
        res.send(findCart);
      } else {
        res.status(404).send(`No existe ningún carrito con el ID enviado.`);
      }
    } catch (error) {
      res.status(500).send('Error no se puede obtener el carrito con el ID.');
    }
  }

  updateCartWithProduct(req, res) {
    try {
      const cartId = parseInt(req.params.cid);
      const productId = req.params.pid
      const selectedCartIndex = this.carts.findIndex(cart => cart.id === cartId);

      if (selectedCartIndex === -1) {
        return res.status(404).send(`No se encontró ningún carrito.`);
      }

      const selectedCart = this.carts[selectedCartIndex];
      const selectedProduct = selectedCart.products.find(cart => cart.product === productId);

      if (selectedProduct) {
        selectedProduct.quantity += 1;
      } else {
        selectedCart.products.push({ product: productId, quantity: 1 });
      }

      this.carts[selectedCartIndex] = selectedCart;
      fs.writeFileSync(this.path, JSON.stringify(this.carts, null, 2), 'utf-8');
      res.send(selectedCart);
    } catch (error) {
      res.status(500).send('Error al actualizar el carrito');
    }
  }
}

module.exports = CartsController;