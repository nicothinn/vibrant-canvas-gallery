
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
    // In a real application, you would process the form data here
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Show success message (in a real app you'd use a toast notification)
    alert('Thanks for your message! I will get back to you soon.');
  };
  
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Get In Touch
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Interested in commissioning a mural or decorating project? Reach out and let's discuss how we can transform your space.
          </p>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3">
            <div className="bg-gray-50 p-8 rounded-lg h-full">
              <h3 className="text-2xl font-playfair font-semibold mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-primary">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-800 mb-1">
                      Location
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      123 Artist Avenue<br />
                      Creative District<br />
                      Designville, DV 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-primary">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-800 mb-1">
                      Phone
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      (555) 123-4567
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="mr-4 mt-1 text-primary">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-montserrat font-semibold text-gray-800 mb-1">
                      Email
                    </h4>
                    <p className="text-gray-600 font-montserrat">
                      hello@artistryportfolio.com
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-montserrat font-semibold text-gray-800 mb-4">
                  Working Hours
                </h4>
                <p className="text-gray-600 font-montserrat mb-2">
                  <span className="font-semibold">Monday - Friday:</span> 9AM - 6PM
                </p>
                <p className="text-gray-600 font-montserrat">
                  <span className="font-semibold">Weekends:</span> By appointment
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-playfair font-semibold mb-6">
                Send a Message
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 font-montserrat mb-2">
                    Your Name
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
                    Your Email
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
                  Subject
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
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 font-montserrat"
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white font-montserrat py-3 px-6 rounded-md transition-all duration-300 inline-flex items-center"
              >
                Send Message
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
