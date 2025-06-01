import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessagesList } from '../components/admin/MessagesList';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Simple authentication - in a real app, use a proper auth system
  const adminPassword = "admin123"; // CAMBIA ESTO A UNA CONTRASEÑA SEGURA
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      setIsAuthenticated(true);
      // Store authentication in session storage
      sessionStorage.setItem('isAdminAuthenticated', 'true');
    } else {
      alert('Contraseña incorrecta');
    }
  };
  
  useEffect(() => {
    // Check if already authenticated
    if (sessionStorage.getItem('isAdminAuthenticated') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('isAdminAuthenticated');
    navigate('/');
  };
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-playfair font-bold mb-6 text-center">Área de Administrador</h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-montserrat mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat py-3 rounded-md transition-all duration-300"
            >
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-playfair font-bold">Panel de Administración</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              Ver Sitio
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="messages">
          <TabsList className="mb-8">
            <TabsTrigger value="messages">Mensajes de Contacto</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="messages">
            <MessagesList />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
