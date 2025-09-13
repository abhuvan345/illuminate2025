import React from 'react';
import { Megaphone, UserCheck, Play, Upload, CheckCircle } from 'lucide-react';

const Guidelines: React.FC = () => {
  const guidelines = [
    {
      icon: <Megaphone className="h-8 w-8" />,
      title: "Promotion Phase",
      steps: [
        "College coordinators promote the event across campus",
        "Share event details through official channels and social media",
        "Encourage student participation and answer queries",
        "Maintain registration records and participant lists"
      ]
    },
    {
      icon: <UserCheck className="h-8 w-8" />,
      title: "Faculty Confirmation",
      steps: [
        "Obtain official approval from college administration",
        "Confirm faculty support and venue arrangements",
        "Ensure minimum 70 participants before deadline",
        "Submit faculty endorsement letter if required"
      ]
    },
    {
      icon: <Play className="h-8 w-8" />,
      title: "Workshop Execution",
      steps: [
        "Set up venue with proper audio-visual equipment",
        "Welcome participants and distribute materials",
        "Follow the structured 6-hour workshop agenda",
        "Facilitate interactive sessions and networking"
      ]
    },
    {
      icon: <Upload className="h-8 w-8" />,
      title: "Submission Process",
      steps: [
        "Collect participant feedback and evaluations",
        "Document workshop highlights with photos/videos",
        "Submit completion report to E-Cell IIT Bombay",
        "Distribute certificates and follow-up resources"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Implementation Guidelines
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A step-by-step guide for colleges to successfully organize and execute 
            the Illuminate 2025 workshop.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {guidelines.map((guideline, index) => (
            <div key={index} className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mr-4">
                  {guideline.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">{guideline.title}</h3>
              </div>
              
              <div className="space-y-3">
                {guideline.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-400/10 to-blue-600/10 rounded-2xl p-8 border border-blue-400/30">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Important Notes</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">All materials and resources will be provided by E-Cell IIT Bombay</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Dedicated support team available throughout the process</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Flexible scheduling to accommodate college calendars</p>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">Post-event support and follow-up resources included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Guidelines;