const productService = require('../productsService/productsService');

class ProductsController {
    async getProducts (req, res){
        try{
            const limitedProducts = req.query.limit;
            const products = await productService.getProducts();

            let response = products;

            if (limitedProducts){
                const parsedLimit = parseInt(limit, 10)
                if(!isNaN(parsedLimit)){
                    response = products.slice(0, parsedLimit)
                }
            }
            res.json(response)
        } catch (error){
            res.status(500).json({error: 'Error getting the products'})
        }
    }

    async getProductById(req, res){
        try{
            const productId = parseInt(req.params.pid)
            const product = await productService.getProductsById(productId);

            if(product){
                res.json(product);
            }else {
                res.status(404).json({error: 'Product not found'})
            }
        }catch (error){
            res.status(500).json({error: 'Error getting the product'})
        }
    }
    async addProduct (req, res){
        try{
            const productData = req.body;

            const newProdcut = await productService.addProduct(productData);
            if (newProdcut === 'Invalid product!'){
                res.status(400).json(newProdcut)
            }else{
                res.status(201).json(newProdcut)
            }
        } catch (error){
            res.status(500).json({error: 'Error adding product'})
        }
    }

    async updateProduct(req, res){
        try{
            const productId = parseInt(req.params.pid);
            const updateFields = req.body;

            if(Object.keys(updateFields).length === 0){
                return res.status(400).json({error: 'At least one field must be submitted to update'})
            }

            const existinProduct = await productService.getProductsById(productId)
            if(!existinProduct){
                return res.status(404).json({error: 'Product not found'})
            }

            for (const field in updateFields){
                if (updateFields.hasOwnProperty(field)){
                    await productService.updateFields(productId, field, updateFields[field]);
                }
            }

            const updateProduct = await productService.getProductsById(productId);
            res.json(updateProduct)
        }catch(error){
            res.status(500).json({error: 'Error updating the product'})
        }
    }

    async deletProducts(rqp, res){
        try{
            const productId =parseInt(req.params.pid);

            const existingProduct = await productService.getProductsById(productId);
            if (!existingProduct){
                return res.status(404).json({error: 'Product not found'})
            }

            await productService.deletProduct(productId);
            res.status(204).end();
        }catch (error){
            res.status(500).json({error:'Error deleting the product'})
        }
    }
}

module.exports = new ProductsController();
