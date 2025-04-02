
import { PaintBucket, Palette, Image, LineChart } from 'lucide-react';

const About = () => {
  const skills = [
    {
      icon: <PaintBucket size={24} />,
      title: "Mural Painting",
      description: "Specializing in large-scale murals for both interior and exterior spaces."
    },
    {
      icon: <Palette size={24} />,
      title: "Color Theory",
      description: "Expert understanding of color combinations that create harmony and impact."
    },
    {
      icon: <Image size={24} />,
      title: "Texture Design",
      description: "Creating unique textural elements that add depth and character to spaces."
    },
    {
      icon: <LineChart size={24} />,
      title: "Space Planning",
      description: "Strategic planning for optimal decoration placement and visual flow."
    }
  ];

  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <div className="relative">
              <img 
                src="https://source.unsplash.com/random/600x800/?artist,studio" 
                alt="Artist in studio" 
                className="rounded-lg shadow-xl image-glow max-w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg hidden md:block">
                <p className="text-gray-800 font-playfair italic text-lg">
                  "Art is not what you see, but what you make others see."
                </p>
                <p className="text-right text-gray-500 mt-2 font-montserrat text-sm">
                  — Edgar Degas
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-6">
              About The Artist
            </h2>
            
            <p className="text-gray-600 mb-6 font-montserrat">
              With over 10 years of experience in mural painting and interior decoration, 
              I bring spaces to life through color, texture, and storytelling. My journey 
              began with a deep passion for transforming blank walls into immersive visual 
              experiences that connect with people.
            </p>
            
            <p className="text-gray-600 mb-8 font-montserrat">
              Each project is approached with a unique perspective, taking into consideration 
              the architecture, the purpose of the space, and the client's vision. I believe 
              that successful decoration should not only be visually stunning but should also 
              enhance the functionality and emotional atmosphere of a space.
            </p>
            
            <h3 className="text-xl font-playfair font-semibold mb-6">
              Specialties & Skills
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
