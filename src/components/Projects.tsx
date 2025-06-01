import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  images?: string[]; // Array de imágenes adicionales
  location: string;
  year: number;
  longDescription?: string; // Descripción larga para el modal
}

// Datos iniciales por defecto
const defaultProjectsData: Project[] = [
  {
    id: 1,
    title: "Mural comedor de paisaje con pájaros",
    description: "Mural que representa un paisaje natural lleno de aves, ideal para ambientar espacios de comedor.",
    longDescription: "Este mural fue diseñado para transmitir serenidad en un comedor familiar. Las aves y la vegetación representan la conexión con la naturaleza, generando una experiencia visual calmada y acogedora.",
    category: "mural",
    image: "/images/1729034563144.jpg",
    images: ["/images/1729034563144.jpg"],
    location: "Residencia privada, Cali",
    year: 2022,
  },
  {
    id: 2,
    title: "Mural palmas sin fondo",
    description: "Mural con palmas tropicales en estilo minimalista y sin fondo definido.",
    longDescription: "Un mural que enfatiza la belleza de las palmas tropicales a través de trazos limpios y sin distracciones. Ideal para espacios modernos que buscan un toque natural sin saturar el ambiente.",
    category: "mural",
    image: "/images/1729036482435.jpg",
    images: ["/images/1729036482435.jpg"],
    location: "Oficina privada, Cali",
    year: 2022,
  },
  {
    id: 3,
    title: "Mural flores réplica de fresco italiano",
    description: "Inspirado en frescos italianos, este mural floral añade elegancia clásica a cualquier espacio.",
    longDescription: "Esta réplica artística rinde homenaje al estilo renacentista italiano, con flores pintadas en tonos cálidos que evocan frescura y tradición europea.",
    category: "mural",
    image: "/images/1729035669577.jpg",
    images: ["/images/1729035669577.jpg"],
    location: "Restaurante El Italiano, Palmira",
    year: 2022,
  },
  {
    id: 4,
    title: "Mural baño paisaje de yarumos con pericos",
    description: "Mural en baño con yarumos y pericos que transportan a un ambiente selvático.",
    longDescription: "Diseñado para baños modernos con un giro artístico, este mural presenta un entorno selvático que transforma completamente el espacio habitual en una experiencia visual inmersiva.",
    category: "mural",
    image: "/images/1729093390316.jpg",
    images: ["/images/1729093390316.jpg"],
    location: "Apartamento residencial, Medellín",
    year: 2023,
  },
  {
    id: 5,
    title: "Mural Aeropuerto Alfonso Bonilla Aragón",
    description: "Mural público de gran escala en uno de los aeropuertos principales del país.",
    longDescription: "Este proyecto conmemorativo busca resaltar la biodiversidad vallecaucana, dando la bienvenida a los viajeros con una obra de arte que combina fauna, flora y simbolismo cultural regional.",
    category: "mural",
    image: "https://scontent.fclo3-2.fna.fbcdn.net/v/t39.30808-6/500884651_9652179548227351_1047890239159481394_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=BXwP51rDrKsQ7kNvwEhLQxd&_nc_oc=AdmBrc1j5Vq54Q3pMAeqGpna5LuPPXvUV6d_BTcHAyp9RaXG4DW9F0gxEqyRyJlOwKU&_nc_zt=23&_nc_ht=scontent.fclo3-2.fna&_nc_gid=7kmGhFXAuHIeRpEQhTEx_w&oh=00_AfKMpsclFTIohOe_vEVayl4tbIlggG6ao3hRzIQj1Wd8Ww&oe=68416BE5",
    images: ["/images/1729093711494.jpg"],
    location: "Aeropuerto A. B. Aragón, Palmira",
    year: 2023,
  },
  {
    id: 6,
    title: "Mural Restaurante Hotel Las Camelias",
    description: "Obra mural que embellece el restaurante de un hotel turístico en Quindío.",
    longDescription: "Este mural fue creado para ambientar el restaurante del hotel Las Camelias, integrando elementos de la cultura cafetera con motivos florales típicos de la región.",
    category: "mural",
    image: "/images/1729094403863.jpg",
    images: ["/images/1729094403863.jpg"],
    location: "Hotel Las Camelias, Quindío",
    year: 2023,
  },
];

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectsData, setProjectsData] = useState<Project[]>(defaultProjectsData);
  
  // Cargar proyectos desde localStorage al montar el componente
  useEffect(() => {
    const loadProjects = () => {
      const storedProjects = localStorage.getItem('projectsData');
      if (storedProjects) {
        try {
          const parsedProjects = JSON.parse(storedProjects);
          // Asegurarse de que hay proyectos válidos
          if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
            setProjectsData(parsedProjects);
          } else {
            // Si no hay proyectos válidos, usar los por defecto
            localStorage.setItem('projectsData', JSON.stringify(defaultProjectsData));
            setProjectsData(defaultProjectsData);
          }
        } catch (error) {
          console.error('Error parsing projects from localStorage:', error);
          localStorage.setItem('projectsData', JSON.stringify(defaultProjectsData));
          setProjectsData(defaultProjectsData);
        }
      } else {
        // Si no hay proyectos en localStorage, usar los datos por defecto y guardarlos
        localStorage.setItem('projectsData', JSON.stringify(defaultProjectsData));
        setProjectsData(defaultProjectsData);
      }
    };

    loadProjects();

    // Escuchar cambios en localStorage para actualizar automáticamente
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'projectsData' && e.newValue) {
        try {
          const updatedProjects = JSON.parse(e.newValue);
          setProjectsData(updatedProjects);
        } catch (error) {
          console.error('Error parsing updated projects:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // También escuchar un evento personalizado para cambios en la misma pestaña
    const handleProjectsUpdate = () => {
      loadProjects();
    };

    window.addEventListener('projectsUpdated', handleProjectsUpdate);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('projectsUpdated', handleProjectsUpdate);
    };
  }, []);
  
  const filteredProjects = filter === 'all' 
    ? projectsData 
    : projectsData.filter(project => project.category === filter);
  
  const openProjectDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };
  
  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">Proyectos destacados</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Explora mi portafolio de murales y proyectos de decoración interior, cada uno creado con pasión y atención al detalle.


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
                  
                  <button 
                    onClick={() => openProjectDetails(project)}
                    className="inline-flex items-center text-primary hover:text-primary/80 font-montserrat text-sm transition-colors duration-300"
                  >
                    View Details
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Modal para detalles del proyecto */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-3xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-playfair">{selectedProject.title}</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <Carousel className="w-full">
                  <CarouselContent>
                    {selectedProject.images?.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="h-64 md:h-80">
                          <img 
                            src={image} 
                            alt={`${selectedProject.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg" 
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="-left-4 sm:-left-5" />
                  <CarouselNext className="-right-4 sm:-right-5" />
                </Carousel>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {selectedProject.category === 'mural' ? 'Mural' : 'Interior Design'}
                    </span>
                    <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                      {selectedProject.year}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500 font-montserrat">
                    {selectedProject.location}
                  </span>
                </div>
                
                <p className="text-gray-700 font-montserrat leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
