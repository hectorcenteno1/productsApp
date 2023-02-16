import { productModel } from "../models/product.js";

export default class Product {

    constructor() {
        console.log("working in mongoose");
    }

    getProducts = async (query = '{}', limit = 10, page = 1, sort) => {
        const options = {
            page,
            limit,
            sort:{price: sort}
          };
          if(!sort){
            delete options.sort
          }
        try {
                const result = await productModel.paginate(JSON.parse(query), options);
                return result
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