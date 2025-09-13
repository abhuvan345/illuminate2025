import React from 'react';
import { Award, Gift, Ticket, Star, BookOpen, Trophy } from 'lucide-react';

const IncentivesSection: React.FC = () => {
  const incentives = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Official Certificate",
      description: "Receive a prestigious certificate from E-Cell IIT Bombay upon completion",
      highlight: true
    },
    {
      icon: <Gift className="h-8 w-8" />,
      title: "Comprehensive Startup Kit",
      description: "Self-help books, BMC templates, premium stationery, badges, and skill development resources",
      highlight: false
    },
    {
      icon: <Ticket className="h-8 w-8" />,
      title: "E-Summit Benefits",
      description: "Exclusive discounts on E-Summit passes and accommodation at IIT Bombay",
      highlight: false
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Coordinator Recognition",
      description: "Special recognition and additional resources for college coordinators",
      highlight: false
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "Premium Subscriptions",
      description: "First 30 colleges get limited OTT platform and online course subscriptions",
      highlight: true
    },
    {
      icon: <Trophy className="h-8 w-8" />,
      title: "Winner Rewards",
      description: "Exclusive merchandise and books for outstanding participants and winners",
      highlight: false
    }
  ];

  return (
    <section id="incentives" className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            What You'll Receive
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Illuminate 2025 participants receive exclusive benefits and resources 
            to accelerate their entrepreneurial journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {incentives.map((incentive, index) => (
            <div 
              key={index} 
              className={`relative group ${
                incentive.highlight 
                  ? 'bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-yellow-400/50' 
                  : 'bg-black/50 border-gray-700/50'
              } backdrop-blur-sm rounded-xl p-6 border hover:border-yellow-400/50 transition-all duration-300`}
            >
              {incentive.highlight && (
                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold px-3 py-1 rounded-full">
                  PREMIUM
                </div>
              )}
              
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300 ${
                incentive.highlight 
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black' 
                  : 'bg-gray-800 text-yellow-400'
              }`}>
                {incentive.icon}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3">{incentive.title}</h3>
              <p className="text-gray-300 leading-relaxed">{incentive.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-8 border border-yellow-400/30 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Limited Time Offer</h3>
          <p className="text-lg text-gray-300 mb-6">
            The first 30 colleges to register will receive additional premium subscriptions 
            and exclusive access to advanced entrepreneurship resources.
          </p>
          <div className="inline-flex items-center text-yellow-400 font-semibold">
            <Star className="h-5 w-5 mr-2" />
            Don't miss out on these exclusive benefits!
          </div>
        </div>
      </div>
    </section>
  );
};

export default IncentivesSection;