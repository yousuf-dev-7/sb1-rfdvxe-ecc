import React, { useState } from 'react';
import { useCartStore } from '../store/cartStore';
import { Trash2, Edit2 } from 'lucide-react';
import CustomizationForm from '../components/CustomizationForm';

interface EditItemState {
  id: number | null;
  customization: any;
}

export default function Cart() {
  const { items, removeItem, updateItem } = useCartStore();
  const [editItem, setEditItem] = useState<EditItemState>({ id: null, customization: null });
  
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleEditSubmit = (formData: any) => {
    if (editItem.id) {
      const item = items.find(i => i.id === editItem.id);
      if (item) {
        updateItem(editItem.id, {
          ...item,
          quantity: formData.players.length,
          customization: formData
        });
      }
      setEditItem({ id: null, customization: null });
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Your cart is empty</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to your cart to continue shopping</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 dark:text-white">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <div key={item.id} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold dark:text-white">{item.name}</h3>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold">₹{item.price.toLocaleString('en-IN')}</p>
                  
                  {item.customization && (
                    <div className="mt-4 space-y-2">
                      <p className="text-gray-600 dark:text-gray-400">
                        <strong>Team:</strong> {item.customization.teamName}
                      </p>
                      <div className="flex gap-4">
                        {item.customization.logoUrl && (
                          <img
                            src={item.customization.logoUrl}
                            alt="Team Logo"
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        {item.customization.sponsorUrl && (
                          <img
                            src={item.customization.sponsorUrl}
                            alt="Sponsor Logo"
                            className="w-12 h-12 object-contain"
                          />
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {item.customization.players.map((player: any, index: number) => (
                          <p key={index} className="text-sm text-gray-600 dark:text-gray-400">
                            {player.name} (#{player.number})
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setEditItem({ id: item.id, customization: item.customization })}
                    className="text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>
          <div className="space-y-2 mb-4">
            <div className="flex justify-between dark:text-white">
              <span>Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between dark:text-white">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold dark:text-white">
                <span>Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
          <button className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
            Proceed to Checkout
          </button>
        </div>
      </div>

      {editItem.id && (
        <CustomizationForm
          initialData={editItem.customization}
          onSubmit={handleEditSubmit}
          onCancel={() => setEditItem({ id: null, customization: null })}
        />
      )}
    </div>
  );
}