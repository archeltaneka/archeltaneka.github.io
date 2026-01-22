import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Footer';
import FluidCursor from './components/FluidCursor';

function App() {
  return (
    <div className="bg-[#faf9f7] selection:bg-sage selection:text-white">
      <FluidCursor />
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;