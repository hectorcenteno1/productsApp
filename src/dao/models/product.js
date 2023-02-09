import mongoose from 'mongoose';

const productCollection = 'products';

const ProductSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: String,
    stock: {
        type: Number,
        required: true
    },
    thumbnail: String,

    statusbar: Boolean,
            
});

export const productModel = mongoose.model(productCollection, ProductSchema);