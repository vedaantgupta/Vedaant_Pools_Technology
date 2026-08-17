import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Product from '@/models/Product';

// POST: Add a new review to a product
export async function POST(req, { params }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { name, city, rating, title, comment } = await req.json();

    if (!name || !rating || !title || !comment) {
      return NextResponse.json(
        { error: 'Name, star rating, title, and review comments are required.' },
        { status: 400 }
      );
    }

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      return NextResponse.json(
        { error: 'Rating must be a valid number between 1 and 5.' },
        { status: 400 }
      );
    }

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    }

    const newReview = {
      name: name.trim(),
      city: city ? city.trim() : 'India',
      rating: numRating,
      title: title.trim(),
      comment: comment.trim(),
      verified: true,
      createdAt: new Date(),
    };

    product.reviews.unshift(newReview);

    // Recalculate average rating & total reviews
    const totalRating = product.reviews.reduce((acc, rev) => acc + rev.rating, 0);
    product.numReviews = product.reviews.length;
    product.rating = Number((totalRating / product.reviews.length).toFixed(1));

    await product.save();

    return NextResponse.json({
      success: true,
      message: 'Review submitted successfully!',
      review: newReview,
      rating: product.rating,
      numReviews: product.numReviews,
      reviews: product.reviews,
    });
  } catch (err) {
    console.error('Error submitting review:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
