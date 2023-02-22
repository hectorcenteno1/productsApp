import express from 'express';
import productManager from '../dao/dbManager/productManager.js'
import cartManager from '../dao/dbManager/cartManager.js'

const productM = new productManager();
const cartM = new cartManager();



const router = express.Router();

router.get('/chat', (req, res) => {
    console.log("entre al chat");
    res.render('chat');
})

router.get("/products", async (req, res) => {
    const { query, limit, page, sort } = req.query;
    const resultado = await productM.getProducts(query, limit, page, sort);
    console.log(resultado);
    let {
        payload,
        hasNextPage,
        hasPrevPage,
        nextLink,
        prevLink,
        page: resPage,
    } = resultado;

    if (hasNextPage)
        nextLink = `http://localhost:8080/view/products?${query ? "query=" + query + "&" : ""
            }${"limit=" + limit}${"&page=" + (+resPage + 1)}${sort ? "&sort=" + sort : ""
            }`;
    if (hasPrevPage)
        prevLink = `http://localhost:8080/view/products?${query ? "query=" + query + "&" : ""
            }${"limit=" + limit}${"&page=" + (+resPage - 1)}${sort ? "&sort=" + sort : ""
            }`;

    res.render("products", {
        payload,
        hasNextPage,
        hasPrevPage,
        nextLink,
        prevLink,
        resPage,
    });
});

router.get("/carts/:cid", async (req, res) => {
    const id = req.params.cid;
    const cart = await cartM.getCartById(id);
    console.log(cart);
    !cart.error ? res.render("cart", { cart }) : res.render("404", {});
});


export default router; 