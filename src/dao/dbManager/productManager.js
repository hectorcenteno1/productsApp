import { productModel } from "../models/product.js";

export default class Product {

    constructor() {

        console.log("working in mongoose");

    }


    getProducts = async (limit) => {

        try {
            if (!limit) {

                return await productModel.find()
            } else {
                productModel.find().limit(limit)
            }
        }
        catch (error) {
            return console.log(error);;

        }
    }

    getProductById = async (id) => {
        try {
            

            let product = await productModel.findById(id);
            if (product === null) {
                return {
                    error: `Product with id ${id} not found`,
                }
            }
            
            return product;

        } catch (error) {
            return {
                error: `An error occurred while obtaining the product with id ${id}`,
            };
        }

    }

    addProduct = async (prod) => {
        let products = await productModel.create(prod);
        return products;
    }

    updateProduct = async (id, prod) => {
        try {
            let productUpdate = await productModel.findByIdAndUpdate(id, prod, { new: true });
            if (productUpdate === null) {
                return {
                    error: `Product with id ${id} not found`,
                }
            }
            return productUpdate;

        } catch (error) {
            return {
                error: `An error occurred while obtaining the product with id ${id}`,
            };
        }
        let product = await productModel.findByIdAndUpdate(id, prod);
        return product;

    }

    deleteProduct = async (id) => {
        try {
            let productDeleted = await productModel.findByIdAndDelete(id);

            if (productDeleted === null) {
                return {
                    error: `Product with id ${id} not found`,
                }
            } else {
                return `Product with id ${id} deleted`;

            }
        }
        catch (error) {
            return console.log(error);

        }

    }


}