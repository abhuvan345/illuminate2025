import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is the  number of seats available?",
      answer: "Only 70 seats available This ensures vibrant group dynamics and meaningful peer-to-peer learning experiences."
    },
    {
      question: "What happens after I register?",
      answer: "After registration, you'll receive a confirmation email. Our team will verify your payment, and upon approval, you'll receive your official ticket with event details and a unique QR code for entry."
    },
    {
      question: "Can I get a refund if I can't attend?",
      answer: "Refunds are available up to 7 days before the event date. Please contact our support team with your registration details for refund processing."
    },
    {
      question: "What should I bring to the workshop?",
      answer: "Bring a notebook, pen, and your enthusiasm! All workshop materials, startup kits, and resources will be provided by E-Cell IIT Bombay."
    },
    {
      question: "Is the certificate recognized?",
      answer: "Yes, the certificate is issued by E-Cell IIT Bombay, one of India's most prestigious entrepreneurship cells, and is widely recognized by industry and academic institutions."
    },
    {
      question: "Can I attend if I'm not from the registered college?",
      answer: "The workshop is organized at the college level. You need to register through your college coordinator. Individual registrations from different colleges are not accepted."
    },
    {
      question: "What if my college doesn't meet the minimum participant requirement?",
      answer: "If your college doesn't reach 70 participants by the deadline, the workshop will be postponed to the next available slot when the requirement is met."
    },
    {
      question: "Are there any prerequisites for attending?",
      answer: "No specific prerequisites are required. The workshop is designed for students from all backgrounds and years who are interested in entrepreneurship."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-6">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mb-8"></div>
          <p className="text-xl text-gray-300">
            Got questions? We've got answers to help you get started.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-black/80 to-gray-900/80 backdrop-blur-sm rounded-xl border border-yellow-400/30 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-yellow-400/5 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <HelpCircle className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />
                  <span className="text-white font-semibold">{faq.question}</span>
                </div>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <div className="pl-8 text-gray-300 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-yellow-400/10 to-yellow-600/10 rounded-2xl p-6 border border-yellow-400/30">
            <h3 className="text-xl font-bold text-white mb-3">Still have questions?</h3>
            <p className="text-gray-300 mb-4">
              Our support team is here to help you with any additional queries.
            </p>
            <a
              href="mailto:illuminate@ecell.in"
              className="inline-flex items-center text-yellow-400 font-semibold hover:text-yellow-300 transition-colors duration-200"
            >
              Contact us at illuminate@ecell.in
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;