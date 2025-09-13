import React from 'react';
import { Clock, Users, Target, Lightbulb, TrendingUp, Award } from 'lucide-react';

const WorkshopStructure: React.FC = () => {
  const sessions = [
    {
      number: 1,
      topic: "Introduction to Entrepreneurship",
      activity: "Interactive session on entrepreneurial mindset and opportunity identification",
      duration: "60 minutes",
      icon: <Lightbulb className="h-6 w-6" />
    },
    {
      number: 2,
      topic: "Idea Validation & Market Research",
      activity: "Hands-on workshop on validating business ideas and understanding target markets",
      duration: "90 minutes",
      icon: <Target className="h-6 w-6" />
    },
    {
      number: 3,
      topic: "Business Model Canvas",
      activity: "Practical session on creating and refining business models",
      duration: "75 minutes",
      icon: <TrendingUp className="h-6 w-6" />
    },
    {
      number: 4,
      topic: "Funding & Investment",
      activity: "Expert talk on funding options, investor pitching, and financial planning",
      duration: "60 minutes",
      icon: <Award className="h-6 w-6" />
    },
    {
      number: 5,
      topic: "Team Building & Leadership",
      activity: "Interactive workshop on building effective teams and leadership skills",
      duration: "45 minutes",
      icon: <Users className="h-6 w-6" />
    },
    {
      number: 6,
      topic: "Pitch Presentation",
      activity: "Final presentations and feedback session with industry experts",
      duration: "90 minutes",
      icon: <Target className="h-6 w-6" />
    }
  ];

  return (
    <section id="workshop" className="py-20 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Workshop Structure
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive 6-hour journey through the fundamentals of entrepreneurship, 
            designed to transform ideas into actionable business plans.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="timeline-line hidden md:block"></div>
          
          <div className="space-y-12">
            {sessions.map((session, index) => (
              <div key={session.number} className={`timeline-item relative flex items-center ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mr-4 group-hover:scale-110 transition-transform duration-300">
                        {session.icon}
                      </div>
                      <div>
                        <div className="text-sm text-yellow-400 font-semibold">Session {session.number}</div>
                        <h3 className="text-xl font-bold text-white">{session.topic}</h3>
                      </div>
                    </div>
                    
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {session.activity}
                    </p>
                    
                    <div className="flex items-center text-yellow-400">
                      <Clock className="h-4 w-4 mr-2" />
                      <span className="text-sm font-medium">{session.duration}</span>
                    </div>
                  </div>
                </div>
                
                {/* Mobile timeline dot */}
                <div className="md:hidden absolute left-4 w-4 h-4 bg-yellow-400 rounded-full border-4 border-black"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-8 border border-yellow-400/30">
            <h3 className="text-2xl font-bold text-white mb-4">Total Workshop Duration</h3>
            <div className="flex items-center justify-center text-yellow-400 text-3xl font-bold">
              <Clock className="h-8 w-8 mr-3" />
              6 Hours of Intensive Learning
            </div>
            <p className="text-gray-300 mt-4">
              Includes networking breaks, Q&A sessions, and hands-on activities
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkshopStructure;