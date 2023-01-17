import { Router } from 'express';
const router = Router();
import { CartManager } from '../CartManager.js';
 

const cartManager = new CartManager();

router.get('/:cId', async (req, res) => {

    const idSolicitado = req.params.cId;
    const arrayCarts = cartManager.getCarts();
    
    if (parseInt(idSolicitado) <= arrayCarts.length) {
        
        const cartSolicitado = cartManager.getCartById(idSolicitado);
       
        res.send(cartSolicitado);
    } else {

        res.send(`El carrito con ID:${idSolicitado} no existe`);
    }

});

router.post('/', (req, res) => {
    
    try {
        cartManager.addCart();
        res.status(200).send({ message: 'Carga Exitosa' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
});

router.post('/:cId/product/:pId', (req, res) => {
    //const {cId: carritoId, pId: productId }= req.params
   const carritoId = req.params.cId;
   const productId = req.params.pId;
    try {
        cartManager.addProductToCart(carritoId, productId);
        res.status(200).send({ message: 'Carga Exitosa' })
    } catch (error) {
        res.status(500).send({ message: error })
    }
});


export default router;