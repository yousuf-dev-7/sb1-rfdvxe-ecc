import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Store, LogOut, Sun, Moon, ChevronDown } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { useDarkMode } from '../store/darkModeStore';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showProductMenu, setShowProductMenu] = useState(false);
  const items = useCartStore((state) => state.items);
  const { user, signOut } = useAuthStore();
  const { darkMode, toggleDarkMode } = useDarkMode();
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-lg my-2 mx-4 rounded-2xl'
        : 'bg-white dark:bg-gray-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Store className="h-8 w-8 text-indigo-600 dark:text-indigo-400 transition-transform duration-500 group-hover:rotate-12" />
            <span className="font-bold text-xl dark:text-white">Sleek Sports</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <div 
              className="relative group"
              onMouseEnter={() => setShowProductMenu(true)}
              onMouseLeave={() => setShowProductMenu(false)}
            >
              <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {showProductMenu && (
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    <Link
                      to="/products/sports"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Sports
                    </Link>
                    <Link
                      to="/products/team-sports"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Team Sports
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
              About
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            <Link to="/cart" className="relative group">
              <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-indigo-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
                  {itemCount}
                </span>
              )}
            </Link>
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600 dark:text-gray-300 hidden md:block">{user.full_name}</span>
                <button
                  onClick={handleSignOut}
                  className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400"
                >
                  <LogOut className="h-6 w-6" />
                </button>
              </div>
            ) : (
              <Link to="/signin" className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400">
                <User className="h-6 w-6" />
                <span className="hidden md:block">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}