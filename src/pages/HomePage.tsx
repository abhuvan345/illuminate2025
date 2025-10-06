import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import AboutSection from "../components/AboutSection";
import WorkshopStructure from "../components/WorkshopStructure";
import IncentivesSection from "../components/IncentivesSection";
import ParticipationDetails from "../components/ParticipationDetails";
import Guidelines from "../components/Guidelines";
import RegistrationForm from "../components/RegistrationForm";
import ContactSection from "../components/ContactSection";
import FAQ from "../components/FAQ";
import Testimonials from "../components/Testimonials";
import CountdownTimer from "../components/CountdownTimer";
import ParticleBackground from "../components/ParticleBackground";
import Footer from "../components/Footer";

const HomePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-yellow-400 text-lg">Loading Illuminate 2025...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <ParticleBackground />
      <Navbar />
      <HeroSection />
      <CountdownTimer />
      <AboutSection />
      <WorkshopStructure />
      <IncentivesSection />
      <ParticipationDetails />
      {/* <RegistrationForm /> */}
      {/* <h1  className="min-h-screen bg-black flex items-center justify-center">Registration has been closed. <br/> For any other queries contact coodinators !!!</h1> */}
      <ContactSection />
      <Footer/>
    </div>
  );
};

export default HomePage;
