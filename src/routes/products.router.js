import { Router } from 'express';
import product from '../dao/dbManager/productManager.js'
//import { ProductManager } from '../ProductManager.js';

import io from '../app.js';

const router = Router();

const prodManager = new product();

router.get('/', async (req, res) => {

    let products = await prodManager.getProducts();


    res.send({ status: "success", payload: products });
});

router.get("/realTimeProducts", async (req, res) => {

    const { limit } = req.query;
    const resultado = await prodManager.getProducts();

    if (!resultado.error) {

        if (typeof limit === "string") {
            let arrayresult = [];
            for (let i = 0; i < parseInt(limit); i++) {
                arrayresult.push(resultado[i]);
            }
        }
        io.on("connection", () => {
            io.emit("products", resultado);
        });
        res.render("realTimeProducts", {});
    } else {
        res.status(resultado.status).send(resultado);
    }
});

router.get('/:pId', async  (req, res) => {

    const idSolicitado = req.params.pId;
    console.log("entre get Pid");
    let product = await prodManager.getProductById(idSolicitado);

    if(!product.error){
     res.send({ status: "success", payload: product });
        
    } else{
        res.status(product.status).send(product);
    }
    

});

router.post('/', async (req, res) => {

    const product = req.body;


    try {
        let result = await prodManager.addProduct(product);
        io.emit("products", prodManager.getProducts());

        res.status(200).send({ message: 'Carga Exitosa', payload: result });

    } catch (error) {
        res.status(500).send({ message: error })
    }
});

router.put('/:pId', (req, res) => {
    const idActualizar = req.params.pId;
    const producto = req.body;

    try {

        prodManager.updateProduct(idActualizar, producto);
        prodManager.getProductById(idActualizar);

        res.status(200).send({ message: 'Producto Actualizado Exitosamente' })

    } catch (error) {
        res.status(500).send({ message: error })
    }

});

router.delete('/:pId', (req, res) => {

    const idAEliminar = req.params.pId;
    try {
        prodManager.deleteProduct(idAEliminar);
        io.emit("products", prodManager.getProducts());
        res.status(200).send({ message: 'Producto Eliminado Exitosamente' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
})

export default router;