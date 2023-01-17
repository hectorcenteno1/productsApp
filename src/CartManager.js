import fs from 'fs';
import { ProductManager } from './ProductManager.js';
const NAME_FILE = 'carts.json'

const productManager = new ProductManager();

class CartManager {
    #_cartList = [];
    #_path = '';
    #_idCount = 0;


    constructor(path = './src') {
        this.#_path = `${path}/${NAME_FILE}`;
        this.#_cartList = this.getCarts();
    }

    //AGREGAR PRODUCTO
    addCart(newCart) {

        this.#_idCount++;

        this.#_cartList.push({

            products: [],
            id: this.#_idCount,

        })


        this.saveDataFile(this.#_path, this.#_cartList);
    }

    // CONSULTAR PRODUCTOS
    getCarts() {

        if (fs.existsSync(this.#_path)) {
            try {
                const reading = this.readDataFile(this.#_path)
                if (Array.isArray(JSON.parse(reading))) {

                    const resultFileParse = JSON.parse(reading).sort((a, b) => b.id - a.id);

                    this.#_idCount = resultFileParse[0].id
                    return this.#_cartList = JSON.parse(reading);
                }
            } catch (error) {
                throw error.message
            }
        }
        return this.#_cartList;
    }

    addProductToCart(cartId, productoId,) {
        
        if (!this.existeValueInArray(this.#_cartList, cartId)) {
            throw 'Este Carrito no existe'
        }
        console.log(productoId);
        if (!productManager.getProductById(productoId)) {
            throw 'Este Producto no existe'
        }
        const cart = this.getCartById(cartId)
        if(this.existeValueInArray(cart.products, productoId)) {
            cart.products.forEach((product) => {

                if (product.id == productoId) {
    
                    return product.quantity += 1
    
                }
                
            })
        }else{
            cart.products.push(
            {
                id: productoId,
                quantity: 1,
            }

        )
        }
        

        this.saveDataFile(this.#_path, this.#_cartList)

    }

    getCartById(id) {

        return this.#_cartList.find((cart) => cart.id == id);

    }

    //Actualiza un producto
    // updateProduct(dataUpdate, id) {
    //     delete dataUpdate.id;

    //     if (!this.existeValueInArray(this.#_productList, id)) {
    //         throw 'El producto a actualizar no Existe'
    //     }

    //     this.#_productList = this.#_productList.map((product) => {

    //         if (product.id == id) {
    //             console.log('entre If');
    //             return product = { ...product ,...dataUpdate  }  
    //         }
    //         return product
    //     })

    //     this.saveDataFile(this.#_path, this.#_productList);
    // }

    // Eliminasdasdasda un Producto
    // deleteProduct(id) {

    //     if (!this.existeValueInArray(this.#_productList, this.#_idCount)) {
    //         throw 'El producto a eliminar no Existe'
    //     }
    //     this.#_productList = this.#_productList.filter((product) => product.id != id);
    //     this.saveDataFile(this.#_path, this.#_productList);
    // };

    saveDataFile = (path, dataSave) => {
        console.log(dataSave);
        try {

            fs.writeFileSync(path, JSON.stringify(dataSave))
        } catch (error) {
            throw `Error Al guardar en el archivo ${path}`
        }
    }

    readDataFile = () => {
        const reading = fs.readFileSync(this.#_path, 'utf-8');
        return reading
    }

    validateObject = (dataObj) => {
        const propMissings = [];
        const data = { ...dataObj };


        for (const prop in data) {

            if (typeof data[prop] === 'string' && data[prop].toString().trim() == '') {
                throw ` La propiedad ${prop} viene Vacia`
            }
            if (typeof data[prop] == "undefined") {
                propMissings.push(prop)
            }
        }
        if (propMissings.length > 0) {
            throw `Propiedades Faltantes: ${propMissings}`

        }
        return data
    }

    existeValueInArray = (array, id) => {
        if (array.find((value) => value.id == id)) {
            return true;
        }
        return false;
    }
};

export { CartManager };

try {
    const cart1 = new CartManager();

    //cart1.addCart();
    //console.log(cart1.getCartById(4));
    //cart1.addProductToCart(1, 9);
    //console.log(cart1.getCartById(1));
    //console.log( cart1.getCarts());

} catch (error) {
    console.log(error);
}