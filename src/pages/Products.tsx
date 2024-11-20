import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const categories = ['All', 'Football', 'Basketball', 'Rugby', 'Cricket', 'Hockey', 'Volleyball'];

const products = [
  {
    id: 1,
    name: 'Pro Football Jersey',
    price: 1499,
    category: 'Football',
    image: 'https://images.unsplash.com/photo-1580089595767-98745d7025c5?auto=format&fit=crop&w=800&q=80',
    backImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grade football jersey for your team.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  {
    id: 2,
    name: 'Elite Basketball Jersey',
    price: 1299,
    category: 'Basketball',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=800&q=80',
    backImage: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=800&q=80',
    description: 'High-quality basketball jersey with customizable options.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  // Add more products with front and back images
];

export default function Products() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === 'All' || product.category.toLowerCase() === selectedCategory.toLowerCase()) &&
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="mb-4 md:mb-0">
          <h1 className="text-3xl font-bold mb-4">Our Products</h1>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
}