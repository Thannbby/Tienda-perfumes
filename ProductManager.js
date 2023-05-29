//desafío 2

const fs = require ("fs");

class ProductManager {
#NextID = 0;
path = "./Products.json";

async getProducts() {
try {
    const productos = await fs.promises.readFile(this.path, "utf-8")
    return JSON.parse(productos)
}catch (e){
    return [];
}
};
    
    
async addProduct (title, description, price, thumbnail,code, stock) {
    
let id = this.#NextID += 1;

const producto ={
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

async getProductsById (getbyId){
try{
    const products = await this.getProducts();
    const upDateP = await products.find((p) => p.id === getbyId)
    return upDateP;
} catch (e){
    return [];
}
}

async upDateProductId (upId, dataToUpdate){
const products = await this.getProducts();
let aux = products.filter((e)=> e.id !== upId)

let upDateProduct = products.find((p) => p.id === upId)
if(dataToUpdate.hasOwnProperty("title") || dataToUpdate.hasOwnProperty("description") || dataToUpdate.hasOwnProperty("price")){
    upDateProduct.title = dataToUpdate.title ? dataToUpdate.title : upDateProduct.title
    upDateProduct.description = dataToUpdate.description ? dataToUpdate.description : upDateProduct.description
    upDateProduct.price = dataToUpdate.price ? dataToUpdate.price : upDateProduct.price
    aux.push(upDateProduct)
return await fs.promises.writeFile(this.path, JSON.stringify(aux))
    }
}

async deletProduct (deletbyId){
try{
    const products = await this.getProducts();
    const deletedProduct = await products.filter((p) => p.id !== deletbyId)
    await fs.promises.writeFile(this.path, JSON.stringify(deletedProduct))
    return deletedProduct
} catch (e){
    throw new Error (e.message);
    }
}
}

async function main (){
    const manager = new ProductManager();
    await manager.addProduct("Escada", "Especially Elixir EDP 30 Ml", 600, "Imagen1", "code1", 2)
    await manager.addProduct ("NINA RICCI", "Les Sorbet Bella EDT 80 Ml", 800, "Imagen", "code2", 10)
    await manager.upDateProductId(1,{ description: "NINA", price: 50})
    console.log (await manager.getProductsById(1))
    console.log (await manager.deletProduct(2))
}

main();