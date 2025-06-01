import { useState } from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
    alert('¡Gracias por tu mensaje! Te responderé pronto.');
  };
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Ponte en contacto
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            ¿Interesado en encargar un mural o proyecto de decoración? Escríbeme y hablemos sobre cómo transformar tu espacio.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 rounded-lg h-full">
              <h3 className="text-2xl font-playfair font-semibold mb-6">
                Información de contacto
              </h3>
              
              <div className="space-y-6">
                {/* Dirección */}
                <div className="flex items-start">
                  <MapPin size={20} className="mr-4 mt-1 text-primary" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-800 mb-1">
                      Ubicación
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      Av. 3a #40N<br />
                      Cali, Valle del Cauca
                    </p>
                  </div>
                </div>
                
                {/* Teléfono */}
                <div className="flex items-start">
                  <Phone size={20} className="mr-4 mt-1 text-primary" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-800 mb-1">
                      Teléfono
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      +57 311 238 4260
                    </p>
                  </div>
                </div>
                
                {/* Correo */}
                <div className="flex items-start">
                  <Mail size={20} className="mr-4 mt-1 text-primary" />
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-800 mb-1">
                      Correo electrónico
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      caruritabarona@gmail.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-montserrat font-semibold text-gray-800 mb-4">
                  Horario de atención
                </h4>
                <p className="text-gray-600 font-montserrat mb-2">
                  <span className="font-semibold">Lunes – Viernes:</span> 9AM – 6PM
                </p>
                <p className="text-gray-600 font-montserrat">
                  <span className="font-semibold">Fines de semana:</span> Con cita previa
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-playfair font-semibold mb-6">
                Enviar un mensaje
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-montserrat mb-2">
                    Tu nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-montserrat"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-montserrat mb-2">
                    Tu correo
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-montserrat"
                    required
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="subject" className="block text-gray-700 font-montserrat mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-montserrat"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 font-montserrat mb-2">
                  Tu mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-montserrat"
                  required
                />
              </div>
              
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-montserrat py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center"
              >
                Enviar mensaje
                <Send size={18} className="ml-2" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
