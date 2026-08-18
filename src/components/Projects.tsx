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
    image: "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_494224956_10239425514595297_3639531338437676164_n.jpg",
    images: [
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_494224956_10239425514595297_3639531338437676164_n.jpg",
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_494204421_10239425513595272_7202555764685478419_n.jpg",
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_494045495_10239425513435268_8080318881743614212_n.jpg",
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_493806494_10239425513075259_1434242538574443313_n.jpg",
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_493521267_10239425511395217_8310915540777113648_n.jpg",
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_493141379_10239425513395267_1442402771610715953_n.jpg",
      "/images/mural_Mural_comedor_de_paisaje_con_p_jaros_2022-07-22_492613626_10239425512715250_3595067001396455707_n.jpg",
    ],
    location: "Residencia privada, Cali",
    year: 2022,
  },
  {
    id: 2,
    title: "Mural palmas sin fondo",
    description: "Mural con palmas tropicales en estilo minimalista y sin fondo definido.",
    longDescription: "Un mural que enfatiza la belleza de las palmas tropicales a través de trazos limpios y sin distracciones. Ideal para espacios modernos que buscan un toque natural sin saturar el ambiente.",
    category: "mural",
    image: "/images/mural_Mural_palmas_sin_fondo_2022-09-13_493820138_10239482348856118_7486277446020013019_n.jpg",
    images: [
      "/images/mural_Mural_palmas_sin_fondo_2022-09-13_493820138_10239482348856118_7486277446020013019_n.jpg",
      "/images/1729036482435.jpg",
    ],
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
    image: "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_498589134_10239735081614279_3086576744632452453_n.jpg",
    images: [
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_498589134_10239735081614279_3086576744632452453_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_498925467_10239735082494301_5825528736668988951_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_498925678_10239735080974263_2596687581242017258_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_498943443_10239735078654205_2562820292423820739_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_499168131_10239735081774283_2655836894397021032_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-01-30_499237441_10239735081094266_3980342854668117591_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_498191408_10239736803337321_7104182620876595734_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_498278066_10239736805977387_6404489046111607693_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_498336375_10239736805657379_3547879807925059981_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_498632958_10239736802937311_3132409505961784483_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_498657958_10239736807697430_3350050083726299206_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499050468_10239736807737431_1899025697703148678_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499051598_10239736803097315_8223895831786598878_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499223323_10239736805697380_3857381335942777352_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499243327_10239736803137316_1415463444933064134_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499359738_10239736808217443_6628849658047351242_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499407460_10239736803497325_890566036473565376_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499668846_10239736806817408_78515284646543088_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499716383_10239736803577327_8688704242942068979_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-02_499756931_10239736806737406_9041892298694250220_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_498314304_10239736815577627_2579534843182663390_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_498626133_10239736814497600_7849590600901926100_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_498979934_10239736814577602_3346746071244585163_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_499407450_10239736813297570_1537817240706111174_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_499693808_10239736813257569_125314893028443370_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_499704809_10239736813817583_7766260436013743529_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_499724879_10239736813657579_8657275482035005401_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_499735260_10239736814697605_2287731135075270420_n.jpg",
      "/images/mural_Mural_ba_o_paisaje_de_yarumos_con_pericos_2023-02-03_499887351_10239736813737581_4679919288204423132_n.jpg",
    ],
    location: "Apartamento residencial, Medellín",
    year: 2023,
  },
  {
    id: 5,
    title: "Mural Aeropuerto Alfonso Bonilla Aragón",
    description: "Mural público de gran escala en uno de los aeropuertos principales del país.",
    longDescription: "Este proyecto conmemorativo busca resaltar la biodiversidad vallecaucana, dando la bienvenida a los viajeros con una obra de arte que combina fauna, flora y simbolismo cultural regional.",
    category: "mural",
    image: "/images/mural_murales_del_aeropuerto_2023-07-31_505725913_10240059673968885_2274919378495181605_n.jpg",
    images: [
      "/images/mural_murales_del_aeropuerto_2023-07-31_505725913_10240059673968885_2274919378495181605_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505692669_10240059672008836_5437300598033241516_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505581127_10240059673488873_4575802864761623828_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505496217_10240059673928884_1988031976829416754_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505424024_10240059673688878_7295982795210525405_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505417962_10240059670608801_3400643918472303999_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505393862_10240059672128839_4842944561318399344_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505241726_10240059673408871_4163331745019074848_n.jpg",
      "/images/mural_murales_del_aeropuerto_2023-07-31_505128798_10240059672648852_980496466207861629_n.jpg",
    ],
    location: "Aeropuerto A. B. Aragón, Palmira",
    year: 2023,
  },
  {
    id: 7,
    title: "Mural anime y jazz",
    description: "Mural con temática de anime y jazz, combinando cultura pop japonesa con música.",
    longDescription: "Este mural fusiona la estética del anime con la vibra del jazz, creando una pieza única que celebra dos formas de arte distintas pero complementarias.",
    category: "mural",
    image: "/images/mural_mural_anime_y_jazz_2020-10-08_121064455_10225802312183751_7605912708105540362_n.jpg",
    images: [
      "/images/mural_mural_anime_y_jazz_2020-10-08_121064455_10225802312183751_7605912708105540362_n.jpg",
      "/images/mural_mural_anime_y_jazz_2020-10-08_121034913_10225802311863743_4449379518009335339_n.jpg",
      "/images/mural_mural_anime_y_jazz_2020-10-20_122009356_10225901992635700_8628983404899876194_n.jpg",
      "/images/mural_mural_anime_y_jazz_2020-10-20_122050536_10225901992875706_6951679479327619685_n.jpg",
    ],
    location: "Cali",
    year: 2020,
  },
  {
    id: 8,
    title: "Mural cocina palmas",
    description: "Mural de palmas tropicales para cocina, aportando frescura al espacio.",
    longDescription: "Un mural diseñado para cocinas que busca traer la naturaleza al interior del hogar mediante palmas tropicales pintadas a mano.",
    category: "mural",
    image: "/images/mural_mural_cocina_palmas_2023-01-13_498336374_10239720004117351_2134616095515512935_n.jpg",
    images: [
      "/images/mural_mural_cocina_palmas_2023-01-13_498336374_10239720004117351_2134616095515512935_n.jpg",
    ],
    location: "Cali",
    year: 2023,
  },
  {
    id: 9,
    title: "Mural Doña Leo piscina",
    description: "Mural para piscina con motivos tropicales y acuáticos.",
    longDescription: "Este mural fue creado para el área de piscina de la residencia Doña Leo, combinando elementos acuáticos con la flora tropical del Valle del Cauca.",
    category: "mural",
    image: "/images/mural_Mural_do_a_leo_piscina_2025-05-30_503023629_18505005562050122_6838323277864976138_n.jpg",
    images: [
      "/images/mural_Mural_do_a_leo_piscina_2025-05-30_503023629_18505005562050122_6838323277864976138_n.jpg",
      "/images/mural_Mural_do_a_leo_piscina_2025-05-30_502755710_18505005544050122_8283234430120107699_n.jpg",
      "/images/mural_Mural_do_a_leo_piscina_2025-05-30_501727118_18505005553050122_6086512829538249647_n.jpg",
    ],
    location: "Cali",
    year: 2025,
  },
  {
    id: 10,
    title: "Mural de doodles",
    description: "Mural estilo doodle con ilustraciones divertidas y coloridas.",
    longDescription: "Un mural en estilo doodle que llena el espacio de ilustraciones creativas y coloridas, perfecto para ambientes juveniles y dinámicos.",
    category: "mural",
    image: "/images/mural_mural_de_doodles_2022-02-13_488870469_10239114448338835_7388159595846848507_n.jpg",
    images: [
      "/images/mural_mural_de_doodles_2022-02-13_488870469_10239114448338835_7388159595846848507_n.jpg",
      "/images/mural_mural_de_doodles_2022-02-12_488752762_10239108411867927_625275180538166608_n.jpg",
    ],
    location: "Cali",
    year: 2022,
  },
];

const Projects = () => {
  const [filter, setFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [projectsData, setProjectsData] = useState<Project[]>(defaultProjectsData);
  
  // Cargar proyectos desde localStorage al montar el componente
  useEffect(() => {
    const loadProjects = () => {
      const storedProjects = localStorage.getItem('projectsData');
      if (storedProjects) {
        try {
          let parsedProjects = JSON.parse(storedProjects);
          if (Array.isArray(parsedProjects) && parsedProjects.length > 0) {
            // ponytail: force sync with defaults — merge new projects and update images
            const merged = defaultProjectsData.map(def => {
              const cached = parsedProjects.find((p: Project) => p.id === def.id);
              return cached ? { ...def, ...cached, images: def.images, image: def.image } : def;
            });
            // Add any cached projects not in defaults (admin-created)
            const adminOnly = parsedProjects.filter((p: Project) => !defaultProjectsData.find(d => d.id === p.id));
            const final = [...merged, ...adminOnly];
            localStorage.setItem('projectsData', JSON.stringify(final));
            setProjectsData(final);
          } else {
            localStorage.setItem('projectsData', JSON.stringify(defaultProjectsData));
            setProjectsData(defaultProjectsData);
          }
        } catch (error) {
          console.error('Error parsing projects from localStorage:', error);
          localStorage.setItem('projectsData', JSON.stringify(defaultProjectsData));
          setProjectsData(defaultProjectsData);
        }
      } else {
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
              Todos
            </button>
            <button
              onClick={() => setFilter('mural')}
              className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors duration-300 ${
                filter === 'mural' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Murales
            </button>
            <button
              onClick={() => setFilter('interior')}
              className={`px-4 py-2 rounded-full text-sm font-montserrat transition-colors duration-300 ${
                filter === 'interior' 
                  ? 'bg-primary text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              Decoración Interior
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} onOpen={openProjectDetails} />
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
                        <div
                          className="h-64 md:h-80 cursor-pointer"
                          onClick={() => setLightboxImage(image)}
                        >
                          <img 
                            src={image} 
                            alt={`${selectedProject.title} - Image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity" 
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

      {/* Lightbox - imagen a pantalla completa */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center cursor-pointer"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Imagen completa"
            className="max-w-[95vw] max-h-[95vh] object-contain"
          />
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxImage(null); }}
            className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 rounded-full w-10 h-10 flex items-center justify-center text-xl"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
};

// Componente de card simple (sin carrusel hover)
const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: (p: Project) => void }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md group">
      <div className="relative overflow-hidden h-64">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-playfair font-bold">{project.title}</h3>
          <span className="text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-700">{project.year}</span>
        </div>
        <p className="text-gray-600 mb-4 font-montserrat text-sm">{project.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500 font-montserrat">{project.location}</span>
          <button
            onClick={() => onOpen(project)}
            className="inline-flex items-center text-primary hover:text-primary/80 font-montserrat text-sm transition-colors duration-300"
          >
            Ver detalles <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
