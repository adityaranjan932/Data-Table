import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaDiscord, FaGamepad } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Company: ['About Us', 'Careers', 'Press', 'Blog'],
    Support: ['Help Center', 'Safety', 'Community Guidelines', 'Contact Us'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'],
    Games: ['Browse All', 'New Releases', 'Top Rated', 'Free Games'],
  };

  const socialLinks = [
    { icon: <FaFacebook />, href: '#', label: 'Facebook' },
    { icon: <FaTwitter />, href: '#', label: 'Twitter' },
    { icon: <FaInstagram />, href: '#', label: 'Instagram' },
    { icon: <FaYoutube />, href: '#', label: 'YouTube' },
    { icon: <FaDiscord />, href: '#', label: 'Discord' },
  ];

  return (
    <footer className="bg-gradient-to-b from-gaming-dark to-gaming-darker border-t border-purple-500/20 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 mb-4"
              >
                <FaGamepad className="text-3xl text-gradient" />
                <span className="text-2xl font-bold text-gradient font-['Orbitron']">
                  NEXUS GAMES
                </span>
              </motion.div>
            </Link>
            <p className="text-gray-400 mb-6">
              Your ultimate destination for next-gen gaming experiences.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/5 hover:bg-gradient-to-r hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center text-white transition-all border border-white/10"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-bold mb-4 font-['Orbitron']">{title}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <motion.a
                      whileHover={{ x: 5 }}
                      href="#"
                      className="text-gray-400 hover:text-purple-400 transition-colors"
                    >
                      {link}
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {currentYear} Nexus Games. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-400">
            <motion.a whileHover={{ color: '#a78bfa' }} href="#">
              Privacy
            </motion.a>
            <motion.a whileHover={{ color: '#a78bfa' }} href="#">
              Terms
            </motion.a>
            <motion.a whileHover={{ color: '#a78bfa' }} href="#">
              Cookies
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
