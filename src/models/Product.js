import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for the product.'],
    unique: true,
    trim: true,
  },
  category: {
    type: String,
    required: [true, 'Please provide a category.'],
    enum: [
      'Sanitation & Upkeep',
      'Plumbing & Controls',
      'Atmospheric Lighting',
      'Spa & Wellness',
      'Structural Accents',
      'Turnkey Services',
    ],
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    min: [0, 'Price cannot be negative.'],
  },
  specs: {
    type: Map,
    of: String,
    default: {},
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL for the product.'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
