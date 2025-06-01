import { ArrowDown } from 'lucide-react';

const Hero = () => {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: 'url(/images/1729094403747.jpg',
          filter: 'brightness(0.7)'
        }}
      ></div>
      
      <div className="container mx-auto px-4 pt-20 z-10 flex flex-col justify-center items-center text-center h-full">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold text-white mb-6 leading-tight">
          Transformando espacios<br />a través de <span className="text-primary">CARURA</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8 font-montserrat">
          Creando hermosos murales y arte decorativo que cuentan historias, evocan emociones y dan nueva vida a los espacios.
        </p>
        
        <a 
          href="#projects" 
          className="bg-primary hover:bg-primary/90 text-white font-montserrat py-3 px-8 rounded-md transition-all duration-300 inline-flex items-center group"
        >
          Ver mi trabajo
          <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform duration-300" size={18} />
        </a>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#projects" className="text-white/80 hover:text-white">
          <ArrowDown size={30} />
        </a>
      </div>
    </section>
  );
};

export default Hero;
