import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { MessagesList } from '../components/admin/MessagesList';
import { ProjectsManager } from '../components/admin/ProjectsManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const Admin = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Verificar sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Escuchar cambios de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Cuenta creada. Revisa tu correo para confirmar.');
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        toast.error('Correo o contraseña incorrectos');
      } else {
        toast.success('Sesión iniciada');
      }
    }
    
    setIsLoggingIn(false);
  };
  
  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Cargando...</div>;
  }
  
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-playfair font-bold mb-6 text-center">
            {isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </h1>
          
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-montserrat mb-2">
                Correo electrónico
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@correo.com"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-montserrat mb-2">
                Contraseña
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                minLength={6}
                required
              />
            </div>
            
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
              {isLoggingIn ? 'Procesando...' : (isSignUp ? 'Crear Cuenta' : 'Iniciar Sesión')}
            </Button>
          </form>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            {isSignUp ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-primary hover:underline font-medium"
            >
              {isSignUp ? 'Iniciar Sesión' : 'Crear una'}
            </button>
          </p>
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
            <span className="text-sm text-gray-500">{session.user.email}</span>
            <Button variant="outline" onClick={() => navigate('/')}>
              Ver Sitio
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
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
