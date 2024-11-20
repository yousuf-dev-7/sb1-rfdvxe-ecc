import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

interface PlayerDetail {
  name: string;
  number: string;
}

interface CustomizationFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
}

interface FormData {
  teamName: string;
  logo: File | null;
  sponsor: File | null;
  players: PlayerDetail[];
}

export default function CustomizationForm({ onSubmit, onCancel }: CustomizationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    logo: null,
    sponsor: null,
    players: [{ name: '', number: '' }],
  });

  const handleAddPlayer = () => {
    setFormData({
      ...formData,
      players: [...formData.players, { name: '', number: '' }],
    });
  };

  const handleRemovePlayer = (index: number) => {
    if (formData.players.length > 5) {
      const newPlayers = formData.players.filter((_, i) => i !== index);
      setFormData({ ...formData, players: newPlayers });
    }
  };

  const handlePlayerChange = (index: number, field: keyof PlayerDetail, value: string) => {
    const newPlayers = formData.players.map((player, i) => {
      if (i === index) {
        return { ...player, [field]: value };
      }
      return player;
    });
    setFormData({ ...formData, players: newPlayers });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.players.length < 5) {
      alert('Minimum 5 players required');
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold dark:text-white">Customize Your Order</h2>
          <button
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Name</label>
            <input
              type="text"
              required
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Team Logo</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={(e) => setFormData({ ...formData, logo: e.target.files?.[0] || null })}
              className="mt-1 block w-full text-gray-700 dark:text-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Sponsor Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, sponsor: e.target.files?.[0] || null })}
              className="mt-1 block w-full text-gray-700 dark:text-gray-300"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-4">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Players (Minimum 5)</label>
              <button
                type="button"
                onClick={handleAddPlayer}
                className="flex items-center gap-1 text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                <Plus className="h-4 w-4" /> Add Player
              </button>
            </div>

            <div className="space-y-4">
              {formData.players.map((player, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      required
                      placeholder="Player Name"
                      value={player.name}
                      onChange={(e) => handlePlayerChange(index, 'name', e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      required
                      placeholder="No."
                      value={player.number}
                      onChange={(e) => handlePlayerChange(index, 'number', e.target.value)}
                      className="block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                  </div>
                  {formData.players.length > 5 && (
                    <button
                      type="button"
                      onClick={() => handleRemovePlayer(index)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}