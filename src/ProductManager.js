fs = require('fs');
const NAME_FILE = 'products.json'

class ProductManager {
    #_productList = [];
    #_path = '';
    #_idCount = 0;


    constructor(path = '../src') {
        this.#_path = `${path}/${NAME_FILE}`;
        this.#_productList = this.getProducts();
    }

    //AGREGAR PRODUCTO
    addProduct(newProduct) {

        this.#_idCount++;

        //Valida si existe el producto
        if (this.existeValueInArray(this.#_productList, this.#_idCount)) {
            throw 'El producto ya existe'
        }
        this.#_productList.push(this.validateObject({
            title: newProduct.title,
            description: newProduct.description,
            price: newProduct.price,
            thumbnail: newProduct.thumbnail,
            code: newProduct.code,
            stock: newProduct.stock,
            id: this.#_idCount
        }))

        this.saveDataFile(this.#_path, this.#_productList);
    }

    // CONSULTAR PRODUCTOS
    getProducts() {

        if (fs.existsSync(this.#_path)) {
            try {
                const reading = this.readDataFile(this.#_path)
                if (Array.isArray(JSON.parse(reading))) {
                    
                    const resultFileParse = JSON.parse(reading).sort((a, b) => b.id - a.id);
                    
                    this.#_idCount = resultFileParse[0].id
                    return this.#_productList = JSON.parse(reading);
                }
            } catch (error) {
                throw error.message
            }
        }
        return this.#_productList;
    }

    getProductById(id) {
        
        return this.#_productList.find((product) => product.id == id)
    }
    

    //Actualiza un producto
    updateProduct(dataUpdate, id) {
        delete dataUpdate.id;

        if (!this.existeValueInArray(this.#_productList, this.#_idCount)) {
            throw 'El producto a actualizar no Existe'
        }
        this.#_productList.map((product) => {
            if (product.id === id) {
                product = { ...product }
            }
        })
    }

    // Eliminasdasdasda un Producto
    deleteProduct(id) {

        if (!this.existeValueInArray(this.#_productList, this.#_idCount)) {
            throw 'El producto a eliminar no Existe'
        }
        this.#_productList = this.#_productList.filter((product) => product.id != id);
        this.saveDataFile(this.#_path, this.#_productList);
    };



    saveDataFile = (path, dataSave) => {
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
        if (array.find((value) => value.id === id)) {
            return true;
        }
        return false;
    }

};

module.exports =  ProductManager;



/**EJECUCÍON DEL PROGRAMA*/


// try {
//     const productManager = new ProductManager()
//     console.clear();

//     /*AGREGA DOS PRODUCTO */
//     productManager.addProduct({ title: 'Coca-Cola', description: 'bebida azucarada 3L', price: 300, thumbnail: 'coca', code: 'ADX1CXZ', stock: 5 })
//     productManager.addProduct({ title: 'Pepsi', description: 'bebida azucarada 1.5L', price: 150, thumbnail: 'pepsi', code: 'ADXC2XZ', stock: 4 })
//     productManager.addProduct({ title: 'Mirinda', description: 'bebida azucarada 2L', price: 200, thumbnail: 'mirinda', code: 'ADXC3XZ', stock: 3 })
//     productManager.addProduct({ title: 'Sprite', description: 'bebida azucarada 4L', price: 400, thumbnail: 'Sprite', code: 'ADXC4XZ', stock: 2 })
//     productManager.addProduct({ title: 'Fanta', description: 'bebida azucarada 1L', price: 100, thumbnail: 'Fanta', code: 'ADXC5XZ', stock: 1 })
//     //productManager.addProduct({title: ''});
//     /**MUESTRA UNA LISTA DE PRODUCTOS */
//     // console.log("***************LISTA DE PRODUCTOS****************");
//     // console.log(productManager.getProducts())
//     // console.log("***************GET ByID 1************************");
//     // console.log(productManager.getProductById(1))
//     // productManager.deleteProduct(2)
//     // console.log("**LISTA DE PRODUCTOS CON EL PRODUCTO 2 ELIMINADO**");
//     // console.log(productManager.getProducts())
// } catch (error) {
//     console.log("Error", error)
// }


// producto.addProduct(productoPrueba);
// producto.getProductbyId(2);
// producto.getProductbyId(1);





// const data = {
//         title: 'Cafe',
//         description: 'Cafe en grano',
//         price: '$300',
//         thumbnail:'asdasda',
//         code: 'abc123',
//         stock: '7',
// }

// const data2  = {
//     title: 'Mate Cocido',
//     description: ' 50 saquitos de mate cocido',
//     price: '$100',
//     thumbnail:'asdasda',
//     code: 'abc124',
//     stock: '5',
// }

// const data3  = {
//     title: 'Te',
//     description: '50 saquitos de Te',
//     price: '$200',
//     thumbnail:'asdasda',
//     code: 'abc125',
//     stock: '3',
// }

// producto.addProduct(data );
// producto.addProduct(data2 );
// producto.addProduct(data3 );

//console.log(producto.getProducts);

// console.log( producto.getProductbyId(4));