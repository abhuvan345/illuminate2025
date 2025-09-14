import React from "react";
import { Mail, User, ExternalLink, MapPin, Phone } from "lucide-react";

const ContactSection: React.FC = () => {
  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-b from-black to-gray-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Get in Touch
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">
            Have questions or need assistance? We're here to help you get
            started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Main Contact */}
          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mr-4">
                <Mail className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Student Coordinator 1
              </h3>
            </div>
            <p className="text-gray-300 mb-4">
              Anirudh Muralidar - 3rd Year TE
            </p>
            <h3>+91 98867 57800</h3>
            <a
              href="mailto:illuminate@ecell.in"
              className="inline-flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200"
            >
              anirudhmuralidhar.te23@bmsce.ac.in
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>

          {/* Coordinator Contact */}
          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mr-4">
                <User className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Student Coordinator 2
              </h3>
            </div>
            <p className="text-gray-300 mb-4">Bhuvan A - 3rd Year CSE</p>
            <h3>+91 98447 76719</h3>
            <a
              href="mailto:bhuvana.cs24@bmsce.ac.in"
              className="inline-flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200"
            >
              bhuvana.cs24@bmsce.ac.in
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>

          {/* Official Website */}
          <div className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-yellow-400/30 hover:border-yellow-400/50 transition-all duration-300">
            <div className="flex items-center mb-4">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full text-black mr-4">
                <ExternalLink className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-white">
                Faculty Coordinator
              </h3>
            </div>
            <p className="text-gray-300 mb-4">Pradeep S</p>
            <h3>9980026114</h3>
            <a
              href="mailto:savithri.bt@bmsce.ac.in"
              className="inline-flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200"
            >
              pradeeps.bt@bmsce.ac.in
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-8 border border-yellow-400/30">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              BMS College Of Engineering
            </h3>
            <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
              BMS College of Engineering in colaboration with E-Cell IIT Bombay
              to transform your startup ideas into reality with expert guidance
              and exclusive resources.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <MapPin className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Address</h4>
                <p className="text-gray-300">
                  BMS College of Engineering
                  <br />
                  Bull Temple Road, Bengaluru
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Phone className="h-6 w-6 text-yellow-400 flex-shrink-0 mt-1" />
              <div>
                <h4 className="font-semibold text-white mb-2">Contact</h4>
                <p className="text-gray-300">
                  Anirudh Muralidar - +91 98867 57800
                  <br />
                  Bhuvan A - +91 98447 76719
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
