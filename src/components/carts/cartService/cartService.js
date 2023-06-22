const fs = require ('fs');
const path = require ('path');
const file = path.join(__dirname, 'carts.json');

class CartService {
    constructor (){
        this.carrito = [];
        this.path = file;

        if (!fs.existsSync(this.path)){
            fs.writeFileSync(this.path, '[]');
        }
        try {
            this.carrito = JSON.parse(fs.readFileSync(this.path, 'utf-8'))
        }catch(error){
            this.carrito = [];
        }

        CartService.id = this.carrito.reduce((prev, curr) =>(
            curr.id >= prev ? curr.id : prev
        ), 0);
    }

    getAllCarts(){
        try{
            return this.carrito;
        }catch(error){
            console.log(error);
        }
    }

    async createCart(){
        try{
            const id = ++CartService.id;
            const newCart ={
                id,
                products: []
            };

            this.carrito.push(newCart)
            await fs.promises.writeFile(this.path, JSON.stringify(this.carrito,null, 2));
        }catch(error){
            console.log(`[error] -> ${error}`);
        }
    }

    async getProducts(cartId){
        try{
            const cart = this.carrito.find(cart => cart.is === cartId)

            if (!cart){
                throw new Error ('Cart not found')
            }

            return cart.products;
        }catch(error){
            console.log(`[error] -> ${error}`); 
        }
    }

    async addProduct (cartId, productId){
        try{
            const selectedCartIndex = this.carritofindIndex(cart => cart.id === cartId);

            if(selectedCartIndex === -1){
                throw new Error ('Cart not found')
            }

            const selectedCart = this.carrito[selectedCartIndex];
            const selectedProduct = selectedCart.products.find(cart => cart.product === productId);

            if(selectedProduct){
                selectedProduct.quantity += 1;
                console.log(selectedProduct)
            }else{
                selectedCart.products.push({product: productId, quantity: 1});
            }
            this.carritos[selectedCartIndex] = selectedCart;
            await fs.promises.writeFile(this.path, JSON.stringify(this.carrito, null, 2));
        }catch(error){
            console.log(`[ERROR]->${error}`);
        }
    }
}

const cartService = new CartService();
module.exports = cartService;