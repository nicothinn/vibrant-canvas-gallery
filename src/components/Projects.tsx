
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  location: string;
  year: number;
}

const projectsData: Project[] = [
  {
    id: 1,
    title: "Floral Revival",
    description: "A vibrant floral mural bringing life to an urban café space.",
    category: "mural",
    image: "https://source.unsplash.com/random/800x600/?floral,mural",
    location: "Bloom Café, Downtown",
    year: 2023
  },
  {
    id: 2,
    title: "Urban Jungle",
    description: "Tropical-themed interior decoration for a modern apartment.",
    category: "interior",
    image: "https://source.unsplash.com/random/800x600/?tropical,interior",
    location: "Private Residence",
    year: 2022
  },
  {
    id: 3,
    title: "Abstract Horizons",
    description: "Bold abstract mural for a corporate office reception area.",
    category: "mural",
    image: "https://source.unsplash.com/random/800x600/?abstract,mural",
    location: "Nexus Technologies HQ",
    year: 2023
  },
  {
    id: 4,
    title: "Coastal Dreams",
    description: "Seaside-inspired bedroom decoration with subtle textures.",
    category: "interior",
    image: "https://source.unsplash.com/random/800x600/?coastal,bedroom",
    location: "Oceanview Apartments",
    year: 2021
  },
  {
    id: 5,
    title: "Heritage Reimagined",
    description: "Cultural heritage-inspired mural for a community center.",
    category: "mural",
    image: "https://source.unsplash.com/random/800x600/?cultural,mural",
    location: "Community Arts Center",
    year: 2022
  },
  {
    id: 6,
    title: "Minimalist Harmony",
    description: "Clean, Scandinavian-inspired living room design.",
    category: "interior",
    image: "https://source.unsplash.com/random/800x600/?minimalist,interior",
    location: "Modern Living Showcase",
    year: 2023
  },
];

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Featured Projects</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Explore my portfolio of murals and interior decorating projects, each created with passion and attention to detail.
          </p>
          
          <div className="flex justify-center mt-8 space-x-2 flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors duration-300 ${
                filter === 'all' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('mural')}
              className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors duration-300 ${
                filter === 'mural' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Murals
            </button>
            <button
              onClick={() => setFilter('interior')}
              className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors duration-300 ${
                filter === 'interior' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Interior Decoration
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md group">
              <div className="relative overflow-hidden h-64">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover gallery-image" 
                />
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-playfair font-bold">{project.title}</h3>
                  <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">
                    {project.year}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 font-montserrat text-sm">
                  {project.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 font-montserrat">
                    {project.location}
                  </span>
                  
                  <a href="#" className="inline-flex items-center text-primary hover:text-primary/80 font-montserrat text-sm transition-colors duration-300">
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
