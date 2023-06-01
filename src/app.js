// // // desafío 3
const express = require("express");
const app = express();
const ProductManager = require("../ProductManager");

app.get("/productos", async (req, res) => {
try{
   const manager = new ProductManager();
   const productos = await manager.getProducts();
   const limit = parseInt(req.query.limit)
   if (limit) { 
      let allProducts = [...productos]; 
      const limitArregloProducts = allProducts.slice(0, limit); 
      return res.send(limitArregloProducts);
   }
   return res.status(200).json(productos);

}catch (error) {
   res.status(500).send('Ha ocurrido un error inesperado en el servidor');
}

});

app.get("/productos/:id", async (req, res) => {
   try {
     const manager = new ProductManager();
     const productId = req.params.id;
     const product = await manager.getProductsById(productId);
 
     if (product) {
       res.status(200).json(product);
     } else {
       res.status(404).json({ error: "Producto no encontrado" });
     }
   } catch (error) {
     res.status(500).send("Ha ocurrido un error inesperado en el servidor");
   }
 });

module.exports = app;