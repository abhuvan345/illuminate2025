import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Priya Sharma",
      college: "IIT Delhi",
      year: "3rd Year",
      text: "Illuminate 2025 completely transformed my perspective on entrepreneurship. The hands-on workshops and expert mentorship helped me validate my startup idea and create a solid business plan.",
      rating: 5
    },
    {
      name: "Arjun Patel",
      college: "NIT Trichy",
      year: "2nd Year",
      text: "The networking opportunities were incredible! I connected with like-minded entrepreneurs and even found my co-founder during the workshop. The startup kit was extremely valuable.",
      rating: 5
    },
    {
      name: "Sneha Reddy",
      college: "BITS Pilani",
      year: "4th Year",
      text: "As someone with no business background, I was initially hesitant. But the structured approach and supportive environment made complex concepts easy to understand. Highly recommended!",
      rating: 5
    },
    {
      name: "Rahul Kumar",
      college: "VIT Vellore",
      year: "3rd Year",
      text: "The certificate from E-Cell IIT Bombay has opened many doors for me. The workshop content was practical and immediately applicable to my startup journey.",
      rating: 5
    },
    {
      name: "Ananya Singh",
      college: "DTU Delhi",
      year: "2nd Year",
      text: "Illuminate gave me the confidence to pursue my entrepreneurial dreams. The mentors were incredibly supportive, and the resources provided were top-notch.",
      rating: 5
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            What Students Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">
            Hear from students who transformed their entrepreneurial journey with Illuminate.
          </p>
        </div>

        <div className="relative">
          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 min-h-[300px] flex items-center">
            <div className="w-full">
              <Quote className="h-12 w-12 text-yellow-400 mb-6 mx-auto" />
              
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-6 max-w-4xl mx-auto">
                  "{testimonials[currentIndex].text}"
                </p>
                
                <div className="flex justify-center mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="text-center">
                  <h4 className="text-xl font-bold text-white mb-1">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-yellow-400 font-semibold">
                    {testimonials[currentIndex].year}, {testimonials[currentIndex].college}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full p-3 transition-colors duration-200"
          >
            <ChevronLeft className="h-6 w-6 text-yellow-400" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-yellow-400/20 hover:bg-yellow-400/30 rounded-full p-3 transition-colors duration-200"
          >
            <ChevronRight className="h-6 w-6 text-yellow-400" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? 'bg-yellow-400' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;