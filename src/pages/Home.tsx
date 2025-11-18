import { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '../components/Hero';
import GameCard from '../components/GameCard';
import { games } from '../data/games';
import { FaFire, FaTrophy, FaCrown } from 'react-icons/fa';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-out-cubic',
    });
  }, []);

  const featuredGames = games.slice(0, 3);
  const popularGames = games.slice(3, 6);
  const newReleases = games.slice(0, 4);

  return (
    <div className="min-h-screen">
      <Hero />

      {/* Featured Games Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-darker to-gaming-dark opacity-50" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaFire className="text-4xl text-orange-500" />
              <h2 className="text-5xl font-bold text-gradient font-['Orbitron']">
                FEATURED GAMES
              </h2>
              <FaFire className="text-4xl text-orange-500" />
            </div>
            <p className="text-gray-400 text-lg">
              Handpicked titles that define excellence in gaming
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredGames.map((game, index) => (
              <div key={game.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <GameCard game={game} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Games Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-gaming-dark to-gaming-darker relative">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaTrophy className="text-4xl text-yellow-500" />
              <h2 className="text-5xl font-bold text-gradient font-['Orbitron']">
                POPULAR PICKS
              </h2>
              <FaTrophy className="text-4xl text-yellow-500" />
            </div>
            <p className="text-gray-400 text-lg">
              Join millions of players in these trending titles
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularGames.map((game, index) => (
              <div key={game.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <GameCard game={game} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Releases Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gaming-darker to-gaming-dark opacity-50" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
            data-aos="fade-up"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <FaCrown className="text-4xl text-purple-500" />
              <h2 className="text-5xl font-bold text-gradient font-['Orbitron']">
                NEW RELEASES
              </h2>
              <FaCrown className="text-4xl text-purple-500" />
            </div>
            <p className="text-gray-400 text-lg">
              Experience the latest and greatest in gaming
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {newReleases.map((game, index) => (
              <div key={game.id} data-aos="zoom-in" data-aos-delay={index * 100}>
                <GameCard game={game} index={index} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/50 to-pink-900/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=1920&h=400&fit=crop')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            data-aos="zoom-in"
          >
            <h2 className="text-5xl font-bold text-white mb-6 font-['Orbitron']">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join millions of gamers worldwide and discover your next favorite game today
            </p>
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(139, 92, 246, 0.6)' }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full text-white font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-2xl"
            >
              Browse All Games
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
