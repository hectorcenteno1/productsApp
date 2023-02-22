import cartModel from "../models/cart.js"
import productManager from "./productManager.js"

const productMg = new productManager();


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
            const carts = await cartModel.find().populate("products.pid");
            return !carts.length
                ? {
                    error: "No carts found",
                }
                : carts;
        } catch (error) {
            return {
                error: "An error occurred while obtaining the carts",
            };
        }
    }

    getCartById = async (id) => {

        try {
            const cart = await cartModel.findById(id).lean().populate("products.pid");
            return cart === null
                ? {
                    status: 404,
                    error: `Cart with id ${id} not found`,
                }
                : cart.products;
        } catch (error) {
            return {
                status: 500,
                error: `An error occurred while obtaining the cart with id ${id}`,
            };
        }
    }

    addProductToCart = async (cartid, productId) => {
        try {

            const pid = productId;
            const cart = await cartModel.findById(cartid);
            if (cart === null) {
                return {
                    error: `cart with id ${cartid} does not exist`
                }
            }
            const prod = await productMg.getProductById(productId);
            if (prod === null) {
                return {
                    error: `product with id ${productId} does not exist`
                }
            }
            const productInCart = cart.products.find((product) => product.pid == pid);
            if (!productInCart) {
                    return await cartModel.findByIdAndUpdate(cartid, {
                        $push: { products: { pid, quantity: 1 } },
                    });
            }
            return await cartModel.findOneAndUpdate({ "_id": cartid, 'products._id': productInCart._id },{ $inc: { "products.$.quantity": 1 } });
            
        } catch (error) {
            return {
                error: error.message

            };
        }
    }

    deleteProdCart = async (cartid, productId) => {
        try {
            const cartId = await this.getCartById(cartid);
            if (cartId.error) {
                return {
                    error: 'Cart id not found'
                }
            }

            const products = cartId.find((product) => product.productId == productId);

            if (products) {
                await cartModel.findByIdAndUpdate(cartid, { $pull: { products: { productId } } });
                return {
                    mesasage: 'Product deleted successfully'
                }
            }

            return {
                error: 'Product not found'
            }

        } catch (error) {
            return {
                error: `an error occured while deleting the cart with id ${cartid}`
            }
        }

    }

    updateQuantity = async (cartid, productId, quantity) => {
        try {
            console.log(cartid, productId, quantity);

            const carts = await this.getCartById(cartid);
            if (carts.error) {
                return {
                    error: 'Cart id not found'
                }
            }

            const products = await productMg.getProductById(productId);

            
            
            if (products.error0) {
                return {
                    error: 'Product not found'
                }
            }
            console.log(carts, products);

            const productInCart = carts.find((product) => product.productId._id == productId);
            console.log(productInCart);
            if (productInCart) {
                const productIndex = carts.findIndex((product) => product.productId._id == productId);

                const newCart = [...carts];
                newCart[productIndex].quantity = quantity;
                console.log(newCart[productIndex].quantity);
                await cartModel.findByIdAndUpdate(cartid, { products: newCart });

                return {
                    message: 'Product updated successfully'
                }
            }
            return {
                error: 'Product not found'
            }
        } catch (error) {
            return {
                error: "An error occurred while updating the quantity",
            };



        }


    }

    updateProductInCart = async (cartid, products) => {

        try {

            const carts = await this.getCartById(cartid);
            if (carts.error) {
                return {
                    error: 'Cart id not found'
                }
            }
            const dbProducts = (await productMg.getProducts()).payload.map((product) =>
                product._id.toString()
            );
            const productsExist = products.map((product) => {
                const result = dbProducts.find((dbProduct) => dbProduct == product.productId);
                return result ? true : false;
            });

            if (productsExist.includes(false)) {
                return {
                    error: 'Product not found'
                }
            }

            await this.removeAllToCart(cartid);
            await cartModel.findByIdAndUpdate(cartid, { products: products });
            return {
                message: 'Product updated successfully'
            }

        } catch (error) {
            return {
                error: `an error occured while updating the product with  cartid: ${cartid}`
            }
        }
    }


    removeAllToCart = async (cartid) => {

        try {

            const carts = await this.getCartById(cartid);
            if (carts.error) {

                return {
                    error: 'Cart id not found'
                }
            }

            await cartModel.findByIdAndUpdate(cartid, { products: [] });
            return {
                message: 'All product deleted successfully'
            }
        } catch (error) {
            return {
                error: `an error occured while deleting the cart with id ${cartid}`
            }
        }

    }
}