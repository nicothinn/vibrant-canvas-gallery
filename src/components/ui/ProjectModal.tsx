import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    date: string;
    category: string;
    images: string[];
    description?: string;
    location?: string;
    technique?: string;
  } | null;
}

const ProjectModal = ({ isOpen, onClose, project }: ProjectModalProps) => {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />

        <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full z-50 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
          >
            <X size={24} />
          </button>

          <Dialog.Title className="text-2xl font-bold font-playfair mb-2">
            {project.title}
          </Dialog.Title>

          <div className="text-sm text-gray-500 font-montserrat mb-4">
            {project.date} • {project.category} {project.location ? `• ${project.location}` : ''}
          </div>

          <div className="flex gap-2 overflow-x-auto snap-x">
            {project.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Imagen ${i + 1} de ${project.title}`}
                className="h-56 rounded-lg object-cover snap-center"
                loading="lazy"
              />
            ))}
          </div>

          {project.description && (
            <p className="text-gray-700 mt-6 font-montserrat text-sm">
              {project.description}
            </p>
          )}

          {project.technique && (
            <p className="text-gray-500 mt-2 font-montserrat text-sm italic">
              Técnica: {project.technique}
            </p>
          )}
        </div>
      </div>
    </Dialog>
  );
};

export default ProjectModal;
