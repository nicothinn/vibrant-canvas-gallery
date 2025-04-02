
import { Heart, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-6">Artistry</h3>
            <p className="text-gray-400 font-montserrat mb-6">
              Creating beautiful murals and decorative art that transforms spaces and tells stories.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 font-montserrat">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Projects
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6">Services</h4>
            <ul className="space-y-3 font-montserrat">
              <li className="text-gray-400">
                Custom Murals
              </li>
              <li className="text-gray-400">
                Interior Decoration
              </li>
              <li className="text-gray-400">
                Residential Projects
              </li>
              <li className="text-gray-400">
                Commercial Spaces
              </li>
              <li className="text-gray-400">
                Consultation Services
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 font-montserrat text-sm">
          <p>
            © {new Date().getFullYear()} Artistry Portfolio. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center">
            Made with <Heart size={14} className="mx-1 text-primary" /> for beautiful spaces
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
