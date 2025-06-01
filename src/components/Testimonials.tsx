import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  project: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Cliente 1',
    role: 'Propietaria de residencia',
    avatar: '/images/testimonials/sarah.jpg',
    quote: 'El mural del comedor es una verdadera obra de arte. Cada visita lo elogia y se ha vuelto el alma del espacio. No podríamos estar más felices con el resultado.',
    rating: 5,
    project: 'Mural comedor de paisaje con pájaros',
  },
  {
    id: 2,
    name: 'Cliente 2',
    role: 'Dueño de oficina',
    avatar: '/images/testimonials/michael.jpg',
    quote: 'Las palmas sin fondo fueron una elección perfecta para nuestra oficina. Aporta frescura sin saturar el ambiente. Sutil y elegante.',
    rating: 5,
    project: 'Mural palmas sin fondo',
  },
  {
    id: 3,
    name: 'Cliente 3',
    role: 'Restaurador italiano',
    avatar: '/images/testimonials/jessica.jpg',
    quote: 'El mural floral inspirado en frescos italianos transformó por completo el ambiente del restaurante. Los clientes quedan fascinados con su belleza.',
    rating: 5,
    project: 'Mural flores réplica de fresco italiano',
  },
  {
    id: 4,
    name: 'Cliente 4',
    role: 'Diseñadora de interiores',
    avatar: '/images/testimonials/user4.jpg',
    quote: 'El mural del baño es simplemente mágico. Convierte un espacio común en una experiencia tropical cada vez que se entra.',
    rating: 5,
    project: 'Mural baño paisaje de yarumos con pericos',
  },
  {
    id: 5,
    name: 'Cliente 5',
    role: 'Coordinador de cultura',
    avatar: '/images/testimonials/user5.jpg',
    quote: 'Este mural en el aeropuerto es un orgullo regional. Representa nuestra biodiversidad y ha recibido comentarios muy positivos de turistas.',
    rating: 5,
    project: 'Mural Aeropuerto Alfonso Bonilla Aragón',
  },
  {
    id: 6,
    name: 'Cliente 6',
    role: 'Gerente hotelero',
    avatar: '/images/testimonials/user6.jpg',
    quote: 'Los huéspedes aman el mural del restaurante. Agrega carácter, color y un toque de la cultura cafetera que representa perfectamente nuestra región.',
    rating: 5,
    project: 'Mural Restaurante Hotel Las Camelias',
  },
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () =>
    setCurrentIndex(prev =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  const prevTestimonial = () =>
    setCurrentIndex(prev =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Testimonios de clientes
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            No te quedes solo con mi palabra — conoce a los clientes que han experimentado el poder transformador del arte en sus espacios.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-white rounded-xl shadow-md p-6 md:p-10">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="md:w-1/4 flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover mb-4"
                />
                <h4 className="font-playfair font-semibold text-center">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-500 text-sm text-center font-montserrat">
                  {testimonials[currentIndex].role}
                </p>
                <div className="flex mt-2">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
              </div>

              <div className="md:w-3/4">
                <div className="mb-6">
                  <svg
                    className="w-10 h-10 text-gray-200 mb-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 14"
                  >
                    <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                  </svg>
                  <p className="text-gray-700 text-lg italic font-montserrat">
                    {testimonials[currentIndex].quote}
                  </p>
                </div>
                <div className="text-sm text-gray-500 font-montserrat">
                  Proyecto: <span className="text-primary">{testimonials[currentIndex].project}</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
                    index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full left-0 px-4">
              <button
                onClick={prevTestimonial}
                className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary transition-colors duration-300"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextTestimonial}
                className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary transition-colors duration-300"
                aria-label="Siguiente testimonio"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
