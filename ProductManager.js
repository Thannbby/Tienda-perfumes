//desafío 2

// const fs = require("fs");

// class ProductManager {
//   constructor() {
//     this.path = "./Products.json";
//     this.products = JSON.parse(fs.readFileSync(this.path, "utf8"));
//   }
// }

const fs = require("fs");

class ProductManager {
    #NextID = 0;
    path = "./Products.json";

    async getProducts() {
        try {
            const productos = await fs.promises.readFile(this.path, "utf-8")
            return JSON.parse(productos)
        } catch (e) {
            return [];
        }
    };


    async addProduct(title, description, price, thumbnail, code, stock) {

        let id = this.#NextID += 1;

        const producto = {
            id: id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }
        {
            console.log(producto)
        }
        const allProduct = await this.getProducts()

        allProduct.push(producto)
        return await fs.promises.writeFile(this.path, JSON.stringify(allProduct));
    }

    async getProductsById(getbyId) {
        try {
          const products = await this.getProducts();
          const upDateP = products.find((p) => p.id === parseInt(getbyId));
          return upDateP;
        } catch (e) {
          return null;
        }
      }

    async upDateProductId(upId, dataToUpdate) {
        const products = await this.getProducts();
        let aux = products.filter((e) => e.id !== upId)

        let upDateProduct = products.find((p) => p.id === upId)
        if (dataToUpdate.hasOwnProperty("title") || dataToUpdate.hasOwnProperty("description") || dataToUpdate.hasOwnProperty("price")) {
            upDateProduct.title = dataToUpdate.title ? dataToUpdate.title : upDateProduct.title
            upDateProduct.description = dataToUpdate.description ? dataToUpdate.description : upDateProduct.description
            upDateProduct.price = dataToUpdate.price ? dataToUpdate.price : upDateProduct.price
            aux.push(upDateProduct)
            return await fs.promises.writeFile(this.path, JSON.stringify(aux))
        }
    }

    async deletProduct(deletbyId) {
        try {
            const products = await this.getProducts();
            const deletedProduct = await products.filter((p) => p.id !== deletbyId)
            await fs.promises.writeFile(this.path, JSON.stringify(deletedProduct))
            return deletedProduct
        } catch (e) {
            throw new Error(e.message);
        }
    }
}

module.exports = ProductManager;