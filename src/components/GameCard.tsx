import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaStar, FaShoppingCart, FaWindows, FaPlaystation, FaXbox } from 'react-icons/fa';
import { SiNintendoswitch } from 'react-icons/si';
import type { Game } from '../types/game';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

interface GameCardProps {
  game: Game;
  index: number;
}

const GameCard = ({ game, index }: GameCardProps) => {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'windows':
        return <FaWindows />;
      case 'playstation':
        return <FaPlaystation />;
      case 'xbox':
        return <FaXbox />;
      case 'nintendo switch':
        return <SiNintendoswitch />;
      default:
        return null;
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdding(true);
    addToCart(game);
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      <Link to={`/game/${game.id}`}>
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all duration-300">
          {/* Image Container with 3D effect */}
          <div className="relative overflow-hidden aspect-[16/9]">
            <motion.img
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
            />
            
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Discount Badge */}
            {game.discount && (
              <motion.div
                initial={{ scale: 0, rotate: -45 }}
                animate={{ scale: 1, rotate: 0 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full font-bold text-sm shadow-lg"
              >
                -{game.discount}%
              </motion.div>
            )}

            {/* Platform Icons */}
            <div className="absolute top-4 left-4 flex gap-2">
              {game.platform.slice(0, 3).map((platform) => (
                <div
                  key={platform}
                  className="bg-black/50 backdrop-blur-sm p-2 rounded-lg text-white/80"
                >
                  {getPlatformIcon(platform)}
                </div>
              ))}
            </div>

            {/* Quick View Button */}
            <motion.div
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="px-6 py-3 bg-white/20 backdrop-blur-md rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all"
              >
                View Details
              </motion.button>
            </motion.div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Title */}
            <h3 className="text-xl font-bold text-white mb-2 font-['Orbitron'] line-clamp-1">
              {game.title}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span className="text-white font-semibold">{game.rating}</span>
              </div>
              <span className="text-gray-400 text-sm">({game.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Category */}
            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                {game.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">
              {game.description}
            </p>

            {/* Price and Cart */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {game.originalPrice && (
                  <span className="text-gray-500 line-through text-sm">
                    ${game.originalPrice}
                  </span>
                )}
                <span className="text-2xl font-bold text-gradient font-['Orbitron']">
                  {game.price === 0 ? 'FREE' : `$${game.price}`}
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`p-3 rounded-full ${
                  isAdding
                    ? 'bg-green-500'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600'
                } text-white shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50`}
              >
                <FaShoppingCart className={isAdding ? 'animate-bounce' : ''} />
              </motion.button>
            </div>
          </div>

          {/* Glow Effect */}
          <motion.div
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default GameCard;
