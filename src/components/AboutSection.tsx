import React from 'react';
import { Target, Users, Award, Lightbulb } from 'lucide-react';

const AboutSection: React.FC = () => {
  const features = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Mission-Driven",
      description: "Fostering entrepreneurial mindset across India's educational institutions"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community",
      description: "Connect with like-minded entrepreneurs and industry experts"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Excellence",
      description: "Learn from IIT Bombay's prestigious entrepreneurship ecosystem"
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: "Innovation",
      description: "Transform ideas into viable business ventures"
    }
  ];

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            About Illuminate 2025
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <p className="text-lg text-gray-300 leading-relaxed">
              Illuminate is a distinguished initiative of E-Cell IIT Bombay, designed to ignite the entrepreneurial spirit across India's educational landscape. This comprehensive workshop series aims to transform students into confident entrepreneurs by providing them with essential knowledge, practical skills, and invaluable networking opportunities.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              Our mission extends beyond traditional education, focusing on cultivating an entrepreneurial mindset that empowers participants to identify opportunities, develop innovative solutions, and create sustainable business ventures. Through expert-led sessions, interactive workshops, and hands-on activities, Illuminate bridges the gap between academic learning and real-world entrepreneurship.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              As part of IIT Bombay's prestigious entrepreneurship ecosystem, Illuminate leverages decades of experience in nurturing successful startups and industry leaders. Participants gain access to exclusive resources, mentorship opportunities, and a vibrant community of entrepreneurs who continue to shape India's startup landscape.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-yellow-600/20 rounded-3xl blur-xl"></div>
            <div className="relative bg-black/50 backdrop-blur-sm rounded-3xl p-8 border border-yellow-400/30">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">1000+</div>
                  <div className="text-gray-300 text-sm">Students Impacted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">50+</div>
                  <div className="text-gray-300 text-sm">Colleges Reached</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">100+</div>
                  <div className="text-gray-300 text-sm">Startups Launched</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">25+</div>
                  <div className="text-gray-300 text-sm">Industry Experts</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;