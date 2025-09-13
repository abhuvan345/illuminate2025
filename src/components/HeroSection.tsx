import React from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';

const HeroSection: React.FC = () => {
  const scrollToRegistration = () => {
    const element = document.querySelector('#register');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse-custom"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-400/5 rounded-full blur-3xl animate-pulse-custom" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="animate-fadeInUp">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="h-12 w-12 text-yellow-400 mr-4" />
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold gradient-text">
              Illuminate 2025
            </h1>
            <Sparkles className="h-12 w-12 text-yellow-400 ml-4" />
          </div>
          
          <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-8 font-light">
            Igniting the entrepreneurial spirit across India
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join India's most prestigious entrepreneurship workshop by E-Cell IIT Bombay. 
            Transform your startup ideas into reality with expert guidance and exclusive resources.
          </p>
          
          <button
            onClick={scrollToRegistration}
            className="btn-primary text-black font-bold py-4 px-8 rounded-full text-lg hover:scale-105 transform transition-all duration-300 animate-glow"
          >
            Register Now
          </button>
          
          <div className="mt-16 animate-bounce">
            <ArrowDown className="h-8 w-8 text-yellow-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;