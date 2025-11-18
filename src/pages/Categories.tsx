import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import { categories } from '../types/game';
import { 
  FaGamepad, 
  FaRunning, 
  FaDragon, 
  FaChess, 
  FaBasketballBall, 
  FaCar,
  FaRobot,
  FaPalette,
  FaUsers
} from 'react-icons/fa';

const Categories = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const categoryIcons: { [key: string]: React.ReactElement } = {
    Action: <FaRunning className="text-5xl" />,
    Adventure: <FaGamepad className="text-5xl" />,
    RPG: <FaDragon className="text-5xl" />,
    Strategy: <FaChess className="text-5xl" />,
    Sports: <FaBasketballBall className="text-5xl" />,
    Racing: <FaCar className="text-5xl" />,
    Simulation: <FaRobot className="text-5xl" />,
    Indie: <FaPalette className="text-5xl" />,
    Multiplayer: <FaUsers className="text-5xl" />,
  };

  const categoryColors = [
    'from-purple-600 to-pink-600',
    'from-blue-600 to-cyan-600',
    'from-green-600 to-emerald-600',
    'from-orange-600 to-red-600',
    'from-yellow-600 to-orange-600',
    'from-pink-600 to-rose-600',
    'from-indigo-600 to-purple-600',
    'from-teal-600 to-green-600',
    'from-red-600 to-pink-600',
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-gradient mb-4 font-['Orbitron']">
            GAME CATEGORIES
          </h1>
          <p className="text-gray-400 text-xl">
            Explore games by your favorite genres
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category}
              to={`/store?category=${category}`}
              data-aos="zoom-in"
              data-aos-delay={index * 100}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                whileTap={{ scale: 0.95 }}
                className={`relative overflow-hidden rounded-2xl p-8 bg-gradient-to-br ${
                  categoryColors[index % categoryColors.length]
                } group cursor-pointer`}
                style={{
                  boxShadow: '0 10px 40px rgba(139, 92, 246, 0.3)',
                }}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff20_1px,transparent_1px),linear-gradient(to_bottom,#ffffff20_1px,transparent_1px)] bg-[size:2rem_2rem]" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <motion.div
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-6 text-white"
                  >
                    {categoryIcons[category]}
                  </motion.div>

                  <h3 className="text-3xl font-bold text-white mb-3 font-['Orbitron']">
                    {category}
                  </h3>

                  <p className="text-white/80 mb-4">
                    Discover the best {category.toLowerCase()} games
                  </p>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-white font-semibold"
                  >
                    <span>Explore</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </motion.div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                  }}
                />
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="glass-effect rounded-2xl p-12 backdrop-blur-md border border-purple-500/20">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '500+', label: 'Total Games' },
                { value: '9', label: 'Categories' },
                { value: '2M+', label: 'Active Players' },
                { value: '4.8', label: 'Avg Rating' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.1 }}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-5xl font-bold text-gradient mb-2 font-['Orbitron']">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-lg">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Categories;
