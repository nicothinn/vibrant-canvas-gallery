
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
    name: "Sarah Johnson",
    role: "Café Owner",
    avatar: "https://source.unsplash.com/random/100x100/?woman,portrait",
    quote: "The mural transformed our café completely. We've had countless customers take photos with it, and it's become a signature part of our brand identity.",
    rating: 5,
    project: "Floral Revival"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Homeowner",
    avatar: "https://source.unsplash.com/random/100x100/?man,portrait",
    quote: "Working with such a talented decorator was a joy. The attention to detail and understanding of our vision exceeded our expectations.",
    rating: 5,
    project: "Urban Jungle"
  },
  {
    id: 3,
    name: "Jessica Miller",
    role: "Office Manager",
    avatar: "https://source.unsplash.com/random/100x100/?woman,businesswoman",
    quote: "Our office environment has been completely transformed. The mural creates such a positive impression for clients and has boosted team morale.",
    rating: 5,
    project: "Abstract Horizons"
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  return (
    <section id="testimonials" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
            Client Testimonials
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-montserrat">
            Don't just take my word for it — hear from clients who have experienced the transformative power of art in their spaces.
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
                  Project: <span className="text-primary">{testimonials[currentIndex].project}</span>
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
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 flex justify-between w-full left-0 px-4">
              <button
                onClick={prevTestimonial}
                className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary transition-colors duration-300"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>
              
              <button
                onClick={nextTestimonial}
                className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary transition-colors duration-300"
                aria-label="Next testimonial"
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
