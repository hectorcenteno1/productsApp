import { Router } from 'express';
const router = Router();
import { ProductManager } from '../ProductManager.js';
import io from '../app.js';
 

const prodManager = new ProductManager();

router.get('/', async (req, res) => {  
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
});

router.get("/realTimeProducts", async (req, res) => {
    
    const { limit } = req.query;
    const resultado = await prodManager.getProducts();
    
    if (typeof limit === "string") {
        let arrayresult = [];
        for (let i = 0; i < parseInt(limit); i++) {
            arrayresult.push(resultado[i]);
        } 
    }

    if (!resultado.error) {
        
      io.on("connection", () => {
        io.emit("products", resultado);
      });
      
      res.render("realTimeProducts", {});
    } else {
      res.status(resultado.status).send(resultado);
    }
  });

router.get('/:pId', async (req, res) => {

    const idSolicitado = req.params.pId;
    const arrayProductos = prodManager.getProducts();

    if (parseInt(idSolicitado) <= arrayProductos.length) {

        const producSolicitado = prodManager.getProductById(idSolicitado);

        res.send(producSolicitado);
    } else {

        res.send(`El producto con ID:${idSolicitado} no existe`);
    }

});

router.post('/', (req, res) => {

    let product = req.body;
    
    try {
        prodManager.addProduct(product,);
        io.emit("products", product);
        res.status(200).send({ message: 'Carga Exitosa' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
});

router.put('/:pId', (req, res) =>{
    const idActualizar = req.params.pId;
    const producto = req.body;
    
try {
    
    prodManager.updateProduct(producto, idActualizar);
    const prodActualizar = prodManager.getProductById(idActualizar);
    
    
    res.status(200).send({ message: 'Producto Actualizado Exitosamente' })
    
} catch (error) {
    res.status(500).send({ message: error })
}
    
});


router.delete('/:pId', (req, res) => {

    const idAEliminar = req.params.pId;
    try{
        prodManager.deleteProduct(idAEliminar);
        io.emit("products", product);
        res.status(200).send({ message: 'Producto Eliminado Exitosamente' })
    }catch(error) {
        res.status(500).send({ message: error })
    }
})






export default router;