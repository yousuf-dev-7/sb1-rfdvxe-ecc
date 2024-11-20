import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Truck, Shield, Clock } from 'lucide-react';
import Carousel from '../components/Carousel';

const sportCategories = [
  {
    name: 'Football',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Rugby',
    image: 'https://images.unsplash.com/photo-1544621678-2f0e8eec7b64?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Hockey',
    image: 'https://images.unsplash.com/photo-1580138535497-00800b2a4acd?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Volleyball',
    image: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&w=800&q=80',
  },
];

export default function Home() {
  const features = [
    {
      icon: <ShoppingBag className="h-6 w-6" />,
      title: 'Wide Selection',
      description: 'Browse through thousands of products',
    },
    {
      icon: <Truck className="h-6 w-6" />,
      title: 'Fast Delivery',
      description: 'Get your items delivered quickly',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Secure Shopping',
      description: 'Your transactions are protected',
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: '24/7 Support',
      description: 'We re here to help anytime',
    },
  ];

  return (
    <div className="min-h-screen">
      <Carousel />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Create Customised Sports Uniforms</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the sport you are interested in and customise your product with the configurator.
            If you don't see your sport contact us, we will probably be able to offer you a solution
            even if you don't see it on the website.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sportCategories.map((sport, index) => (
            <Link
              key={index}
              to={`/products?category=${sport.name.toLowerCase()}`}
              className="relative group overflow-hidden rounded-xl aspect-[4/3]"
            >
              <img
                src={sport.image}
                alt={sport.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 flex items-center justify-center">
                <h3 className="text-white text-3xl font-bold transform transition-transform duration-500 group-hover:scale-110">
                  {sport.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md text-center"
            >
              <div className="text-indigo-600 mb-4 inline-block">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}