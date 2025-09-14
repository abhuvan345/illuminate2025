import React from 'react';
import { IndianRupee, Users, Calendar, CheckCircle } from 'lucide-react';

const ParticipationDetails: React.FC = () => {
  const details = [
    {
      icon: <IndianRupee className="h-8 w-8" />,
      title: "Registration Fee",
      value: "₹250",
      subtitle: "Reduced from ₹799",
      description: "Heavily subsidized by BMS College of Engineering to make entrepreneurship education accessible"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Seats Available",
      value: "70",
      subtitle: "Students",
      description: "Ensures vibrant group dynamics and meaningful peer-to-peer learning"
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      title: "Confirmation Deadline",
      value: "Sept 30",
      subtitle: "2025",
      description: "Final date for registration confirmation and payment verification"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Participation Details
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {details.map((detail, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mb-6 group-hover:scale-110 transition-transform duration-300">
                  {detail.icon}
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-2">{detail.title}</h3>
                <div className="text-4xl font-bold gradient-text mb-2">{detail.value}</div>
                <div className="text-yellow-400 font-semibold mb-4">{detail.subtitle}</div>
                <p className="text-gray-300 leading-relaxed">{detail.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-green-400/10 to-green-600/10 rounded-2xl p-8 border border-green-400/30">
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-green-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">Why This Pricing?</h3>
              <div className="grid md:grid-cols-2 gap-6 text-gray-300">
                <div>
                  <h4 className="font-semibold text-white mb-2">Subsidized Education</h4>
                  <p>Bms College of Engineering subsidizes 70% of the actual cost to make quality entrepreneurship education accessible to students across BMS College Of Engineering.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">Value Proposition</h4>
                  <p>At ₹250, you receive resources and knowledge worth thousands, including expert mentorship, premium materials, and networking opportunities.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ParticipationDetails;