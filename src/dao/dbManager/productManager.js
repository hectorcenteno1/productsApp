import { productModel } from "../models/product.js";

export default class Product {

    constructor() {
        console.log("working in mongoose");
    }

    getProducts = async (query = '{}', limit = 10, page = 1, sort) => {
        const options = {
            page,
            limit,
            lean: true,
            sort: { price: sort }
        };
        if (!sort) {
            delete options.sort
        }
        try {
            const result = await productModel.paginate(JSON.parse(query), options);

            if (result.hasNextPage)
                result.nextLink = `http://localhost:8080/api/products/?${query ? "query=" + query + "&" : ""
                    }${"limit=" + limit}${"&page=" + (+page + 1)}${sort ? "&sort=" + sort : ""
                    }`;
            if (result.hasPrevPage)
                result.prevLink = `http://localhost:8080/api/products/?${query ? "query=" + query + "&" : ""
                    }${"limit=" + limit}${"&page=" + (+page - 1)}${sort ? "&sort=" + sort : ""
                    }`;

            return {
                status: "success",
                payload: result.docs,
                totalDocs: result.totalDocs,
                limit: result.limit,
                totalPages: result.totalPages,
                page: result.page,
                pagingCounter: result.pagingCounter,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                prevLink: result.prevLink,
                nextLink: result.nextLink,
            }
        }
        catch (error) {
            return console.log(error);

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