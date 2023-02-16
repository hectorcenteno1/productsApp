import { Router } from 'express';
const router = Router();
import cart from '../dao/dbManager/cartManager.js';



const cartManager = new cart();

router.get('/', async (req, res) => {
    const cartList = await cartManager.getCarts();
    if (!cartList.error) {
        res.send(cartList);

    } else {
        res.status(500).send(cartList);

    }
})

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

router.put("/:cid/product", async (req, res) => {
    const cartId = req.params.cid;
    const products = req.body;
    const updateResponse = await cartManager.updateProducts(cartId, products);

    if (!updateResponse.error) {
        res.send(updateResponse)
    } else {
        res.status(updateResponse.status).send(updateResponse);
    }
});

router.put("/:cid/product/:pid", async (req, res) => {
    const { cartId, productId } = req.params;
    const { quantity } = req.body;
    console.log(quantity);
    const updateProduct = await cartManager.updateQuantity(cartId, productId, quantity);

    if (!updateProduct.error) {
        res.send(updateProduct)
    } else {
        res.status(updateProduct.status);
    }

});

router.delete("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const deleteProduct = await cartManager.removeToCart(cartId, productId);
  
    if(!deleteProduct.error){
        res.send(deleteProduct)
    }else{
        res.status(deleteProduct.status).send(deleteProduct);
    }
  });
  
  router.delete("/:cid/products", async (req, res) => {
    const cartId = req.params.cid;
    const deleteResponse = await dbcm.removeAllProductsToCart(cartId);
    if(!deleteResponse.error){
        res.send(deleteResponse)

    }else{
        res.status(deleteResponse.status).send(deleteResponse);
    }
    
  });


export default router;