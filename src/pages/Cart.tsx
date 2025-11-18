import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTrash, FaShoppingCart, FaMinus, FaPlus } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            🛒
          </motion.div>
          <h2 className="text-4xl font-bold text-white mb-4 font-['Orbitron']">
            Your Cart is Empty
          </h2>
          <p className="text-gray-400 mb-8 text-lg">
            Looks like you haven't added any games yet
          </p>
          <Link to="/store">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50"
            >
              Browse Games
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div>
            <h1 className="text-5xl font-bold text-gradient mb-2 font-['Orbitron']">
              SHOPPING CART
            </h1>
            <p className="text-gray-400 text-lg">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearCart}
            className="px-6 py-3 bg-red-500/20 text-red-400 rounded-lg font-semibold hover:bg-red-500/30 transition-all border border-red-500/30"
          >
            Clear Cart
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-effect rounded-2xl p-6 backdrop-blur-md border border-purple-500/20 hover:border-purple-500/40 transition-all"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <Link to={`/game/${item.id}`}>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-32 h-24 rounded-lg overflow-hidden flex-shrink-0"
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </Link>

                    {/* Details */}
                    <div className="flex-1">
                      <Link to={`/game/${item.id}`}>
                        <h3 className="text-xl font-bold text-white mb-2 hover:text-purple-400 transition-colors font-['Orbitron']">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-semibold">
                          {item.category}
                        </span>
                        <span className="text-gray-400 text-sm">
                          {item.platform.slice(0, 2).join(', ')}
                        </span>
                      </div>
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex flex-col items-end justify-between">
                      {/* Price */}
                      <div className="text-right">
                        {item.originalPrice && (
                          <div className="text-gray-500 line-through text-sm">
                            ${item.originalPrice}
                          </div>
                        )}
                        <div className="text-2xl font-bold text-gradient font-['Orbitron']">
                          {item.price === 0 ? 'FREE' : `$${item.price}`}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all flex items-center justify-center"
                        >
                          <FaMinus className="text-sm" />
                        </motion.button>
                        <span className="text-white font-semibold w-8 text-center">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all flex items-center justify-center"
                        >
                          <FaPlus className="text-sm" />
                        </motion.button>
                      </div>

                      {/* Remove Button */}
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <FaTrash />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-effect rounded-2xl p-6 backdrop-blur-md border border-purple-500/20 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-white mb-6 font-['Orbitron']">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.title} x {item.quantity}
                    </span>
                    <span className="text-white font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Tax (0%)</span>
                  <span className="text-white font-semibold">$0.00</span>
                </div>
                <div className="flex justify-between text-xl font-bold mt-4">
                  <span className="text-white">Total</span>
                  <span className="text-gradient font-['Orbitron']">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-500/50 flex items-center justify-center gap-3"
              >
                <FaShoppingCart />
                Proceed to Checkout
              </motion.button>

              <Link to="/store">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 py-4 bg-white/5 rounded-xl text-white font-semibold hover:bg-white/10 transition-all border border-white/10"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
