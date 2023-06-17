const fs = require('fs');
const fileProduct = './products.json';

class productManager {
  static id = 0;

  constructor() {
    this.path = fileProduct;
    this.props = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
    try {
      this.products = JSON.parse(fs.readFileSync(path, 'utf-8'));
    } catch (error) {
      this.products = [];
    }
    productManager.id = this.products.reduce((prev, curr) => (
      curr.id >= prev ? curr.id : prev
    ), 0);
  }

  async getProducts() {
    try {
       return this.products;
      }
    catch (error) {
      console.log(error)
    }
  }

  isValidateCode(product) {
    return this.products.some(item => item.code === product.code);
  }

 async addProduct(product) {
  try{
    for (let prop of this.products){
      if(!product.hasOwnProperty(prop)|| this.isValidateCode(product) ){
        return 'invalid product!';
      }
    }
    const id = ++productManager.id;
    const newProduct = {
      id,
      title: [],
      status: true,
      ...product
    };

    this.products.push(newProduct);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
  } catch(error){
    console.log(error)
  }
  }

  async getProductsById(id) {
    try {
      const product = this.products.find(product => product.id === id)
      return product ?? 'product not found';
    } catch (error) {
      console.log(error);
    }
  }

async upDateProductId(id, field, newValue) {
  try{
    const product = this.products.fiend(product => product.id === id);
    if (product){
      product[field]= newValue
      await fs.promises.writeFile(this.path, JSON.stringify (this.products, null, 2))
    }
  }catch(error){
    console.log(error)
  }
}
  
async deletProduct(id){
  try{
    this.products = this.products.filter(product.id != id);
    await fs.promises.writeFile(this.path, JSON.stringify(this.products, null, 2));
  }catch(error){
    console.log(error)
  }
}
}

module.exports = productManager;