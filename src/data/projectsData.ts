// src/data/projectsData.ts

export interface Project {
    id: number;
    title: string;
    date: string;
    category: string;
    images: string[];
    description: string;
  }
  
  export const projectsData: Project[] = [
    {
      id: 1,
      title: "Mural comedor de paisaje con pájaros",
      date: "Ago 2022",
      category: "Murales",
      images: [
        "/images/1729034563144.jpg",
        "/images/1729034563145.jpg",
        "/images/1729034563146.jpg"
      ],
      description: "Este mural representa un paisaje sereno con pájaros, diseñado para el comedor principal de una residencia privada."
    },
    // Agrega más proyectos según sea necesario
  ];
  