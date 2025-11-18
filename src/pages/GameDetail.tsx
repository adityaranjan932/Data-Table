import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaShoppingCart, FaArrowLeft, FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';
import { games } from '../data/games';
import { useCart } from '../context/CartContext';
import type { Game } from '../types/game';

const GameDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [game, setGame] = useState<Game | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const foundGame = games.find((g) => g.id === Number(id));
    if (foundGame) {
      setGame(foundGame);
    }
  }, [id]);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-white">Game not found</div>
      </div>
    );
  }

  const gameImages = game.images || [game.image];

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? gameImages.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === gameImages.length - 1 ? 0 : prev + 1));
  };

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(game);
    setTimeout(() => setIsAdding(false), 1500);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-white mb-8 hover:text-purple-400 transition-colors"
        >
          <FaArrowLeft />
          <span className="font-semibold">Back</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Carousel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative rounded-2xl overflow-hidden glass-effect p-4">
              {/* Main Image */}
              <div className="relative aspect-video rounded-xl overflow-hidden mb-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    src={gameImages[currentImageIndex]}
                    alt={game.title}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Navigation Arrows */}
                {gameImages.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      <FaChevronLeft />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all"
                    >
                      <FaChevronRight />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {gameImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {gameImages.map((image, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-purple-500 shadow-lg shadow-purple-500/50'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={image} alt={`${game.title} ${index + 1}`} className="w-full h-full object-cover" />
                    </motion.button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Game Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Title */}
            <h1 className="text-5xl font-bold text-gradient mb-4 font-['Orbitron']">
              {game.title}
            </h1>

            {/* Rating and Category */}
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-400 text-xl" />
                <span className="text-white text-xl font-semibold">{game.rating}</span>
                <span className="text-gray-400">({game.reviews.toLocaleString()} reviews)</span>
              </div>
              <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full font-semibold">
                {game.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {game.description}
            </p>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="glass-effect p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Developer</div>
                <div className="text-white font-semibold">{game.developer}</div>
              </div>
              <div className="glass-effect p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Publisher</div>
                <div className="text-white font-semibold">{game.publisher}</div>
              </div>
              <div className="glass-effect p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Release Date</div>
                <div className="text-white font-semibold">
                  {new Date(game.releaseDate).toLocaleDateString()}
                </div>
              </div>
              <div className="glass-effect p-4 rounded-xl">
                <div className="text-gray-400 text-sm mb-1">Platforms</div>
                <div className="text-white font-semibold">{game.platform.slice(0, 2).join(', ')}</div>
              </div>
            </div>

            {/* Features */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Features</h3>
              <div className="flex flex-wrap gap-2">
                {game.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg border border-purple-500/30"
                  >
                    <FaCheck className="text-green-400" />
                    <span className="text-white">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {game.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-white/5 text-gray-300 rounded-full text-sm border border-white/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price and Purchase */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="glass-effect p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <div>
                  {game.originalPrice && (
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-gray-500 line-through text-xl">
                        ${game.originalPrice}
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-bold">
                        -{game.discount}%
                      </span>
                    </div>
                  )}
                  <div className="text-5xl font-bold text-gradient font-['Orbitron']">
                    {game.price === 0 ? 'FREE' : `$${game.price}`}
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all ${
                  isAdding
                    ? 'bg-green-500 text-white'
                    : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/50'
                }`}
              >
                {isAdding ? (
                  <>
                    <FaCheck className="animate-bounce" />
                    Added to Cart!
                  </>
                ) : (
                  <>
                    <FaShoppingCart />
                    Add to Cart
                  </>
                )}
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* System Requirements (if available) */}
        {game.systemRequirements && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-3xl font-bold text-gradient mb-8 font-['Orbitron']">
              System Requirements
            </h2>
            <div className="glass-effect p-8 rounded-2xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(game.systemRequirements).map(([key, value]) => (
                  <div key={key} className="border-b border-white/10 pb-4">
                    <div className="text-purple-400 font-semibold mb-2 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-white">{value}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default GameDetail;
