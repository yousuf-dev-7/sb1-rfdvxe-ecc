import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import toast from 'react-hot-toast';
import { Switch } from '@headlessui/react';
import { Plus, Minus } from 'lucide-react';

interface PlayerDetails {
  name: string;
  number: string;
  size: string;
}

export default function ProductDetail() {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState('front');
  const [isTeamOrder, setIsTeamOrder] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [singleName, setSingleName] = useState('');
  const [singleSize, setSingleSize] = useState('');
  const [players, setPlayers] = useState<PlayerDetails[]>([
    { name: '', number: '', size: '' }
  ]);
  const addItem = useCartStore((state) => state.addItem);

  // In a real app, this would come from an API or store
  const product = {
    id: Number(id),
    name: 'Pro Football Jersey',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1580089595767-98745d7025c5?auto=format&fit=crop&w=800&q=80',
    backImage: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=800&q=80',
    description: 'Professional grade football jersey for your team.',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
  };

  const handleQuantityChange = (newQuantity: number) => {
    const minQuantity = isTeamOrder ? 5 : 1;
    const validQuantity = Math.max(minQuantity, newQuantity);
    setQuantity(validQuantity);

    if (isTeamOrder) {
      const currentPlayers = [...players];
      if (validQuantity > currentPlayers.length) {
        // Add more player forms
        for (let i = currentPlayers.length; i < validQuantity; i++) {
          currentPlayers.push({ name: '', number: '', size: '' });
        }
      } else {
        // Remove excess player forms
        currentPlayers.splice(validQuantity);
      }
      setPlayers(currentPlayers);
    }
  };

  const handlePlayerChange = (index: number, field: keyof PlayerDetails, value: string) => {
    const newPlayers = players.map((player, i) => {
      if (i === index) {
        return { ...player, [field]: value };
      }
      return player;
    });
    setPlayers(newPlayers);
  };

  const validateForm = () => {
    if (isTeamOrder) {
      return players.every(player => 
        player.name.trim() !== '' && 
        player.number.trim() !== '' && 
        player.size !== ''
      );
    }
    return singleName.trim() !== '' && singleSize !== '';
  };

  const handleAddToCart = () => {
    if (!validateForm()) {
      toast.error('Please fill in all required fields');
      return;
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: quantity,
      customization: isTeamOrder ? {
        isTeamOrder: true,
        players: players
      } : {
        isTeamOrder: false,
        name: singleName,
        size: singleSize
      }
    };

    addItem(cartItem);
    toast.success('Added to cart!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
            <img
              src={activeImage === 'front' ? product.image : product.backImage}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveImage('front')}
              className={`w-24 h-24 rounded-lg overflow-hidden ${
                activeImage === 'front' ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <img
                src={product.image}
                alt="Front view"
                className="w-full h-full object-cover"
              />
            </button>
            <button
              onClick={() => setActiveImage('back')}
              className={`w-24 h-24 rounded-lg overflow-hidden ${
                activeImage === 'back' ? 'ring-2 ring-indigo-600' : ''
              }`}
            >
              <img
                src={product.backImage}
                alt="Back view"
                className="w-full h-full object-cover"
              />
            </button>
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{product.name}</h1>
          <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 mb-6">
            ₹{product.price.toLocaleString('en-IN')}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{product.description}</p>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium">Team Order</span>
              <Switch
                checked={isTeamOrder}
                onChange={(checked) => {
                  setIsTeamOrder(checked);
                  setQuantity(checked ? 5 : 1);
                  if (checked) {
                    setPlayers(Array(5).fill({ name: '', number: '', size: '' }));
                  }
                }}
                className={`${
                  isTeamOrder ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    isTeamOrder ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </Switch>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-lg font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center">{quantity}</span>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {isTeamOrder ? (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Player Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {players.map((player, index) => (
                    <div key={index} className="p-4 border rounded-lg space-y-3">
                      <input
                        type="text"
                        placeholder="Player Name"
                        value={player.name}
                        onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700"
                      />
                      <input
                        type="number"
                        placeholder="Number"
                        value={player.number}
                        onChange={(e) => handlePlayerChange(index, 'number', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700"
                      />
                      <select
                        value={player.size}
                        onChange={(e) => handlePlayerChange(index, 'size', e.target.value)}
                        className="w-full p-2 border rounded-md dark:bg-gray-700"
                      >
                        <option value="">Select Size</option>
                        {product.sizes.map((size) => (
                          <option key={size} value={size}>{size}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name on Jersey</label>
                  <input
                    type="text"
                    value={singleName}
                    onChange={(e) => setSingleName(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700"
                    placeholder="Enter name for jersey"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Size</label>
                  <select
                    value={singleSize}
                    onChange={(e) => setSingleSize(e.target.value)}
                    className="w-full p-2 border rounded-md dark:bg-gray-700"
                  >
                    <option value="">Select Size</option>
                    {product.sizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={!validateForm()}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}