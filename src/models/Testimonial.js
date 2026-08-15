import mongoose from 'mongoose';

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide client name.'],
    trim: true,
  },
  location: {
    type: String,
    required: [true, 'Please provide client location.'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please provide rating.'],
    min: [1, 'Rating must be at least 1.'],
    max: [5, 'Rating cannot exceed 5.'],
    default: 5,
  },
  message: {
    type: String,
    required: [true, 'Please provide review message.'],
    trim: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Testimonial || mongoose.model('Testimonial', TestimonialSchema);
