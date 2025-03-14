
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Portfolio from "@/components/Portfolio";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";

const Index = () => {
  console.log("Index component rendering");
  
  useEffect(() => {
    document.title = "Digital Alchemist Portfolio";
    console.log("Index component mounted");
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <BackButton />
      <Hero />
      <About />
      <Portfolio />
      <Resume />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
