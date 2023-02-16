import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        pid: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number || 1,
          required: true,
        },
      },
    ],
    default: [],
    required: true,
  },
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;