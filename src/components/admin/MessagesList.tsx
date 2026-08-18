import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  created_at: string;
}

export const MessagesList = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchMessages();
  }, []);
  
  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching messages:', error);
    } else {
      setMessages(data || []);
    }
    setLoading(false);
  };
  
  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);
    
    if (error) {
      toast.error('Error al eliminar el mensaje');
    } else {
      setMessages(messages.filter(m => m.id !== id));
      toast.success('Mensaje eliminado');
    }
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-CO');
  };
  
  if (loading) {
    return <div className="p-8 text-center text-gray-500">Cargando mensajes...</div>;
  }
  
  if (messages.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">No hay mensajes todavía.</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-playfair font-bold mb-6">Mensajes de Contacto</h1>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asunto</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mensaje</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {messages.map((message) => (
              <tr key={message.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(message.created_at)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{message.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">
                  <a href={`mailto:${message.email}`} className="hover:underline">{message.email}</a>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{message.subject}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs truncate">{message.message}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(message.id)}>
                    <Trash size={14} className="text-red-500" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
