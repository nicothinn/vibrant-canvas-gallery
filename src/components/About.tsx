import { PaintBucket, Palette, Image, LineChart } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: <PaintBucket size={24} />,
      title: "Pintura de murales",
      description: "Especializado en murales de gran formato para espacios interiores y exteriores."
    },
    {
      icon: <Palette size={24} />,
      title: "Teoría del color",
      description: "Experto en combinaciones de color que generan armonía e impacto."
    },
    {
      icon: <Image size={24} />,
      title: "Diseño de texturas",
      description: "Creo elementos texturales únicos que aportan profundidad y carácter."
    },
    {
      icon: <LineChart size={24} />,
      title: "Planificación de espacios",
      description: "Estrategias para la colocación óptima de la decoración y flujo visual."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="/images/1729094403820.jpg"
                alt="Artista en su estudio" 
                className="rounded-lg shadow-xl w-80 h-auto mx-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-gray-800 font-playfair italic text-lg">
                  «El arte no es lo que ves, sino lo que haces ver a los demás.»
                </p>
                <p className="text-right text-gray-500 mt-2 font-montserrat text-sm">
                  — Edgar Degas
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              Sobre la artista
            </h2>
            
            <p className="text-gray-600 mb-6 font-montserrat">
            Soy Carolina Irurita Barona, una dedicada educadora y artista especializada en pedagogía de artes plásticas y diseño gráfico. Mi carrera profesional se ha enfocado en inspirar a través de la enseñanza y la creación artística, utilizando diversas técnicas para establecer conexiones profundas con el ser interior y fomentar la expresión personal en mis estudiantes y clientes.
            </p>
            
            <p className="text-gray-600 mb-8 font-montserrat">
            Desde Arte y Hobby Bogotá (1994-2003), ejercí como administradora y profesora, enseñando técnicas como acuarela, acrílico y cerámica, guiando a mis estudiantes a descubrir y potenciar sus habilidades artísticas. En 2010 fundé CARURA, mi propia empresa, especializándome en acabados de muebles y textiles personalizados para marcas y eventos, además de restauración de muebles. He desarrollado proyectos de arte mural en espacios comerciales y residenciales, enriqueciendo cada lugar con obras significativas.
            </p>
            
            <h3 className="text-xl font-playfair font-semibold mb-6">
              Especialidades y habilidades
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-start">
                  <div className="mr-4 mt-1 text-primary">
                    {skill.icon}
                  </div>
                  <div>
                    <h4 className="font-playfair font-semibold text-gray-800 mb-1">
                      {skill.title}
                    </h4>
                    <p className="text-gray-600 text-sm font-montserrat">
                      {skill.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
