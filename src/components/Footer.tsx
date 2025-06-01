import { Heart, Instagram, Facebook, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-6">CARURA</h3>
            <p className="text-gray-400 font-montserrat mb-6">
              Creando murales artísticos y decorativos que transforman espacios y cuentan historias.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/caruritabarona/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/carolina.irurita" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://wa.me/573112384260?text=Hola%20Carolina%2C%20quiero%20conocer%20más%20sobre%20tus%20murales
" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-primary transition-colors duration-300">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6">Enlaces rápidos</h4>
            <ul className="space-y-3 font-montserrat">
              <li>
                <a href="#hero" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Proyectos
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Sobre mí
                </a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Testimonios
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-playfair font-semibold mb-6">Servicios</h4>
            <ul className="space-y-3 font-montserrat">
              <li className="text-gray-400">
                Murales personalizados
              </li>
              <li className="text-gray-400">
                Decoración interior
              </li>
              <li className="text-gray-400">
                Proyectos residenciales
              </li>
              <li className="text-gray-400">
                Espacios comerciales
              </li>
              <li className="text-gray-400">
                Asesoría artística
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 text-center text-gray-500 font-montserrat text-sm">
          <p>
            © {new Date().getFullYear()} CARURA Portfolio. Todos los derechos reservados.
          </p>
          <p className="mt-2 flex items-center justify-center">
            Creado con <Heart size={14} className="mx-1 text-primary" /> para espacios hermosos
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
