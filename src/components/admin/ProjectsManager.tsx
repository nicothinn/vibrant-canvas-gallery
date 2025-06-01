import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, 
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDown, Plus, Trash, Edit } from "lucide-react";
import { toast } from "sonner";

// Definición de un proyecto
interface Project {
  id: number;
  title: string;
  description: string;
  longDescription?: string;
  category: string;
  image: string;
  images?: string[];
  location: string;
  year: number;
}

export const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [category, setCategory] = useState("mural");
  const [mainImage, setMainImage] = useState("");
  const [additionalImages, setAdditionalImages] = useState<string[]>([""]);
  const [location, setLocation] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  
  useEffect(() => {
    // Cargar proyectos del localStorage al iniciar
    const storedProjects = JSON.parse(localStorage.getItem('projectsData') || '[]');
    setProjects(storedProjects);
  }, []);
  
  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('projectsData', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
    
    // Disparar evento personalizado para notificar cambios en la misma pestaña
    window.dispatchEvent(new CustomEvent('projectsUpdated'));
  };

  const handleOpenNewProject = () => {
    setIsEditing(false);
    setSelectedProject(null);
    resetForm();
    setIsDialogOpen(true);
  };
  
  const handleEditProject = (project: Project) => {
    setIsEditing(true);
    setSelectedProject(project);
    
    // Establecer valores del formulario con los datos del proyecto
    setTitle(project.title);
    setDescription(project.description);
    setLongDescription(project.longDescription || "");
    setCategory(project.category);
    setMainImage(project.image);
    setAdditionalImages(project.images || [""]);
    setLocation(project.location);
    setYear(project.year);
    
    setIsDialogOpen(true);
  };
  
  const handleDeleteProject = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };
  
  const confirmDeleteProject = () => {
    if (selectedProject) {
      const updatedProjects = projects.filter((p) => p.id !== selectedProject.id);
      saveProjects(updatedProjects);
      setIsDeleteDialogOpen(false);
      toast.success("Proyecto eliminado correctamente");
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filtrar imágenes vacías
    const filteredAdditionalImages = additionalImages.filter(img => img.trim() !== "");
    
    // Crear o actualizar el proyecto
    const projectData: Project = {
      id: isEditing && selectedProject ? selectedProject.id : Date.now(),
      title,
      description,
      longDescription: longDescription || undefined,
      category,
      image: mainImage,
      images: [mainImage, ...filteredAdditionalImages],
      location,
      year,
    };
    
    let updatedProjects: Project[];
    
    if (isEditing && selectedProject) {
      // Actualizar proyecto existente
      updatedProjects = projects.map((p) => 
        p.id === selectedProject.id ? projectData : p
      );
      toast.success("Proyecto actualizado correctamente");
    } else {
      // Crear nuevo proyecto
      updatedProjects = [...projects, projectData];
      toast.success("Proyecto creado correctamente");
    }
    
    saveProjects(updatedProjects);
    setIsDialogOpen(false);
  };
  
  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setCategory("mural");
    setMainImage("");
    setAdditionalImages([""]);
    setLocation("");
    setYear(new Date().getFullYear());
  };
  
  const handleAddImageField = () => {
    setAdditionalImages([...additionalImages, ""]);
  };
  
  const handleImageChange = (index: number, value: string) => {
    const newImages = [...additionalImages];
    newImages[index] = value;
    setAdditionalImages(newImages);
  };
  
  const handleRemoveImageField = (index: number) => {
    const newImages = additionalImages.filter((_, i) => i !== index);
    setAdditionalImages(newImages);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-playfair font-bold">Gestionar Proyectos</h2>
        <Button onClick={handleOpenNewProject}>
          <Plus size={16} />
          Nuevo Proyecto
        </Button>
      </div>
      
      {projects.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">No hay proyectos creados.</p>
          <Button variant="outline" onClick={handleOpenNewProject}>
            <Plus size={16} />
            Crear primer proyecto
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Imagen</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Título</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Año</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ubicación</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-16 h-16 object-cover rounded" 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {project.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.category === "mural" ? "Mural" : "Interior Design"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.year}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {project.location}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditProject(project)}>
                        <Edit size={14} />
                        Editar
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteProject(project)}>
                        <Trash size={14} />
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      
      {/* Dialog para añadir/editar proyecto */}
      
      {/* Dialog para añadir/editar proyecto */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Editar Proyecto" : "Nuevo Proyecto"}</DialogTitle>
            <DialogDescription>
              Complete los detalles del proyecto a continuación.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="title">Título</label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título del proyecto"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="category">Categoría</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-between"
                    >
                      {category === "mural" ? "Mural" : "Interior Design"}
                      <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <div className="flex flex-col">
                      <button
                        className="px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => setCategory("mural")}
                      >
                        Mural
                      </button>
                      <button
                        className="px-4 py-2 text-left hover:bg-gray-100"
                        onClick={() => setCategory("interior")}
                      >
                        Interior Design
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="description">Descripción Corta</label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve descripción del proyecto"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="longDescription">Descripción Larga</label>
              <Textarea
                id="longDescription"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                placeholder="Descripción detallada del proyecto"
                className="min-h-[120px]"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="location">Ubicación</label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Ubicación del proyecto"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="year">Año</label>
                <Input
                  id="year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  min={2000}
                  max={2100}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="mainImage">Imagen Principal (URL)</label>
              <Input
                id="mainImage"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                required
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium">Imágenes Adicionales (URLs)</label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleAddImageField}
                >
                  <Plus size={16} />
                  Añadir Imagen
                </Button>
              </div>
              
              {additionalImages.map((image, index) => (
                <div key={index} className="flex items-center gap-2">
                  <Input
                    value={image}
                    onChange={(e) => handleImageChange(index, e.target.value)}
                    placeholder="https://ejemplo.com/imagen.jpg"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveImageField(index)}
                    className="shrink-0"
                  >
                    <Trash size={16} className="text-red-500" />
                  </Button>
                </div>
              ))}
            </div>
            
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline" type="button">Cancelar</Button>
              </DialogClose>
              <Button type="submit">
                {isEditing ? "Actualizar Proyecto" : "Crear Proyecto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Dialog para confirmar eliminación */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Eliminará permanentemente el proyecto
              {selectedProject && <strong> "{selectedProject.title}"</strong>}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDeleteProject} className="bg-red-500 hover:bg-red-600">
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};