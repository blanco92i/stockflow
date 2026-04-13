import mongoose from 'mongoose';

const saleSchema = new mongoose.Schema(
  {
    items:[
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true
        },
        name: {
          type: String,
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0
        },
        quantity: {
          type: Number,
          required: true,
          min: 1
        }
      }
    ],
    totalAmount:Number,
    paymentMethod: {
      type: String,
      enum: ['cash', 'card', 'mobile'],
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'paid','cancelled'],
      default: 'pending'
    },
    profit: {
      type: Number,
      required: true,
      min: 0,
    },
   createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Sale', saleSchema);
