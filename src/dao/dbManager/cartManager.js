import cartModel from "../models/cart.js"
import productManager from "./productManager.js"

const product = new productManager();


export default class Cart {
    constructor() {
        console.log('working in mongoose');
    }

    addCart = async () => {
        try {
            return await cartModel.create({ products: [] });

        } catch (error) {
            return {
                error: `an error occured while creating the cart`

            }
        }
    }

    getCarts = async () => {
        try {
            let carts = await cartModel.find();
            return carts;
        } catch (error) {
            return {
                error: `an error occured while getting the carts`
            };
        }
    }

    getCartById = async (id) => {

        try{
            const cart = await cartModel.findById(id);
            if(cart === null){
                return {
                    error: `cart with id ${id} does not exist`
                }
            }
            return cart;
        }catch(error){
            return {
                error: `an error occured while getting the cart with id ${id}`
            }
        }
    }

    addProductToCart = async (cartid, productId) => {
        try{
            

            const cart = await cartModel.findById(cartid);
            
            if(cart === null){
                return {
                    error: `cart with id ${cartid} does not exist`
                }
            }
            
            const prod = await product.getProductById(productId);
            
            if(prod === null){
                return {
                    error: `product with id ${productId} does not exist`
                }
            }
            
            const productInCart = await cartModel.findById(productId);

            if (productInCart) {
                const productIndex = cart.findIndex(product => product.productId === productId);
                const newCart = cart;
                newCart[productIndex].quantity ++;
                
                return await cartModel.findByIdAndUpdate(cartid, { products: newCart});
            }
            
            return await cartModel.findByIdAndUpdate(cartid, {
                $push: { products: {productId, quantity: 1} },
            });
        }catch(error){
            return{
                error: `an error ocurred while adding the product`,
            };
        }
    }


}