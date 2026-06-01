import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import StackCarousel from './components/StackCarousel.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import VizcachiCTA from './components/VizcachiCTA.jsx';
import Footer from './components/Footer.jsx';
import Cursor from './components/Cursor.jsx';

export default function App() {
  return (
    <>
      {/* Cursor personalizado brutalista — cubre toda la web */}
      <Cursor />
      <Navbar />
      <main id="main-content">
        <Hero />
        <StackCarousel />
        <ProjectsSection />
        <VizcachiCTA />
      </main>
      <Footer />
    </>
  );
}
