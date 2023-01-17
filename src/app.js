import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import fs from 'fs';





const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);


try {

    /*app.get('/products', async (req, res) => {

        const { limit } = req.query;

        const resultado = await prodManager.getProducts();
        if (typeof limit === "string") {

            let arrayresult = [];
            for (let i = 0; i < parseInt(limit); i++) {
                arrayresult.push(resultado[i]);

            }
            res.send(arrayresult);

        } else {

            res.send(resultado);
        }

    });*/

    /*app.get('/products/:pId', async (req, res) => {

        const idSolicitado = req.params.pId;
        const arrayProductos = prodManager.getProducts();

        if (parseInt(idSolicitado) <= arrayProductos.length) {

            const producSolicitado = prodManager.getProductById(idSolicitado);

            res.send(producSolicitado);
        } else {

            res.send(`El producto con ID:${idSolicitado} no existe`);
        }

    });*/

    app.listen(8080, () => console.log('Server Corriendo en: http://localhost:8080/'));
} catch (error) {
    console.log(error);
};
