import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    id: 1,
    name: 'Pro Football Jersey',
    price: 1499,
    category: 'team-sports',
    image: 'https://images.unsplash.com/photo-1580089595767-98745d7025c5?auto=format&fit=crop&w=800&q=80',
    backImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grade football jersey for your team.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  },
  // Add more team sports products
];

export default function TeamSportsProducts() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Team Sports Uniforms</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <img
                  src={product.backImage}
                  alt={`${product.name} back view`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{product.name}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{product.description}</p>
              <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400 mb-4">
                ₹{product.price.toLocaleString('en-IN')}
              </p>
              <button
                onClick={() => navigate(`/products/team-sports/${product.id}`)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}