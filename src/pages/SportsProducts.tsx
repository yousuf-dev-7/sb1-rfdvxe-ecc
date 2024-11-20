import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';

const products = [
  {
    id: 1,
    name: 'Training Jersey',
    price: 999,
    category: 'sports',
    image: 'https://images.unsplash.com/photo-1580089595767-98745d7025c5?auto=format&fit=crop&w=800&q=80',
    description: 'High-quality training jersey for individual athletes.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  // Add more individual sports products
];

export default function SportsProducts() {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (product: typeof products[0]) => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      customization: {
        size: selectedSize,
      },
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Sports Apparel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-64 object-cover"
              onClick={() => navigate(`/products/sports/${product.id}`)}
              style={{ cursor: 'pointer' }}
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full mb-4 p-2 border rounded-md dark:bg-gray-700"
              >
                <option value="">Select Size</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
              <button
                onClick={() => handleAddToCart(product)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}