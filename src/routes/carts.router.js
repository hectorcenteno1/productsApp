import { Router } from 'express';
const router = Router();
import cart from '../dao/dbManager/cartManager.js';



const cartManager = new cart();

router.get('/:cId', async (req, res) => {

    const idSolicitado = req.params.cId;
    const cartSolicitado = await cartManager.getCartById(idSolicitado);

    if (!cartSolicitado.error) {

        res.send(cartSolicitado);

    } else {

        res.send(`El carrito con ID:${idSolicitado} no existe`);
    }

});

router.post('/', async (req, res) => {

    const addCart = await cartManager.addCart();

    if (!addCart.error) {
        res.status(200).send(addCart);
    } else {
        res.status(addCart.status).send(addCart);

    }


});

router.post('/:cId/product/:pId', async (req, res) => {
    //const {cId: carritoId, pId: productId }= req.params
    const carritoId = req.params.cId;
    const productId = req.params.pId;


    const addProdToCart = await cartManager.addProductToCart(carritoId, productId);

    console.log("error", addProdToCart);
    try {
        if (!addProdToCart.error) {
            console.log("entre");
            res.send(addProdToCart);

        }
    } catch (error) {
        console.log(error);
    }

});


export default router;