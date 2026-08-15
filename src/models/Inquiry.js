import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: [true, 'Please provide your name.'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: [true, 'Please provide your contact number.'],
    trim: true,
  },
  company: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    trim: true,
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: [1, 'Quantity must be at least 1.'],
      },
    },
  ],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'completed'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Inquiry || mongoose.model('Inquiry', InquirySchema);
