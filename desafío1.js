// desafío 1

class ProductManager {

    #NextID= 0;
    #precioBaseDeGanancia
        
    constructor () {
    this.products = []
    this.#precioBaseDeGanancia = 0.15
    }
    
    
    getProducts = () => {return console.log(this.products) }
        
    addProduct = (title, description, price, thumbnail,code, stock) => {
    
    const productoExiste = this.products.find((producto)=> producto.code == code)
    
    if(productoExiste){
        console.log(`El producto ${title} posee un error, codigo ${code} es el mismo de un producto existente ${productoExiste.title}`);
    return;
    }
    
    let id = this.#NextID += 1;
    
    const producto ={
    id: id,
    title,
    description,
    price: price * (1 + this.#precioBaseDeGanancia),
    thumbnail,
    code,
    stock,
    }
     
    this.products.push(producto);
    {
    console.log(`El producto ${producto.title} fue agregado correctamente`)
    }
    };
    
    
    getProductsById = (id) =>{
    const buscar = this.products.find(product => product.id === id)
    if (!buscar) {
        console.log(`“Not found” El producto con el id ${id} no existe`);
        return;
    }
    return buscar;
    }
    }
    
    const manager = new ProductManager()
    
    manager.addProduct ("Escada", "Especially Elixir EDP 30 Ml", 600, "Imagen1", "code1", 2)
    manager.addProduct ("NINA RICCI", "Les Sorbet Bella EDT 80 Ml", 800, "Imagen", "code2", 10)
    manager.addProduct ("Escada", "Especially Elixir EDP 30 Ml", 600, "Imagen", "code3", 5)
    manager.addProduct ("NINA RICCI", "Les Sorbet Bella EDT 80 Ml", 800, "Imagen", "code4", 7)
    manager.getProductsById(2)
    manager.getProductsById(4)
    manager.getProducts()