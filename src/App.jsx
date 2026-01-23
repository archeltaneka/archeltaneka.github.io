import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Footer';
import FluidCursor from './components/FluidCursor';

function App() {
  useEffect(() => {
    // Fallback to a string if document.title is empty at mount
    const originalTitle = document.title || "My Portfolio";

    const handleBlur = () => {
      document.title = "Looking for other candidates?🤔 They are boring anyway...";
    };

    const handleFocus = () => {
      document.title = originalTitle;
    };

    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

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