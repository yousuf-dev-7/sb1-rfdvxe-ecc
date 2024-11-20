import React from 'react';
import { Heart, Users, Globe, Shield } from 'lucide-react';

const values = [
  {
    icon: <Heart className="h-8 w-8 text-indigo-600" />,
    title: 'Customer First',
    description: 'We prioritize our customers needs in everything we do.',
  },
  {
    icon: <Users className="h-8 w-8 text-indigo-600" />,
    title: 'Community',
    description: 'Building strong relationships with our customers and partners.',
  },
  {
    icon: <Globe className="h-8 w-8 text-indigo-600" />,
    title: 'Sustainability',
    description: 'Committed to environmental responsibility.',
  },
  {
    icon: <Shield className="h-8 w-8 text-indigo-600" />,
    title: 'Trust',
    description: 'Maintaining the highest standards of security and privacy.',
  },
];

export default function CompanyValues() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((value, index) => (
          <div
            key={index}
            className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="inline-block mb-4">{value.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
            <p className="text-gray-600">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}