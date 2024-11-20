import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  id: number;
  name: string;
  price: number;
  image: string;
  backImage: string;
  description: string;
  sizes: string[];
}

export default function ProductCard({ 
  id, 
  name, 
  price, 
  image, 
  backImage,
  description,
  sizes 
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate(`/products/${id}`)}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl h-[700px] flex flex-col cursor-pointer"
    >
      <div 
        className="relative h-[70%] overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <img
          src={isHovered ? backImage : image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => (
              <span 
                key={size}
                className="px-2 py-1 bg-white/20 backdrop-blur-sm rounded text-white text-sm"
              >
                {size}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6 flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
          <p className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">₹{price.toLocaleString('en-IN')}</p>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors mt-4"
        >
          View Details
        </button>
      </div>
    </div>
  );
}