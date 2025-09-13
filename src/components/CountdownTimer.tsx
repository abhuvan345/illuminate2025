import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date('2025-09-30T23:59:59').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center mb-8">
          <Clock className="h-8 w-8 text-yellow-400 mr-3" />
          <h2 className="text-3xl font-bold text-white">Registration Deadline</h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-black/50 rounded-lg p-6 border border-yellow-400/30">
              <div className="text-3xl md:text-4xl font-bold text-yellow-400 mb-2">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-gray-300 text-sm uppercase tracking-wide">
                {unit}
              </div>
            </div>
          ))}
        </div>
        
        <p className="text-gray-400 text-lg">
          Registration closes on <span className="text-yellow-400 font-semibold">September 30, 2025</span>
        </p>
      </div>
    </section>
  );
};

export default CountdownTimer;