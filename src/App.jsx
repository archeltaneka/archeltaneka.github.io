import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Impact from './components/Impact';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Footer';

// Easter Egg: Console Log
console.log(`%c
    █▀▀█ █░█ █▀▀ █▀▀▄ █▀▀█ ▀▀█▀▀ ░░ █░░ █▀▀ █▀▀ █░░█ █▀▀█ █▀▀█ 
    █▄▄█ █▀▄ █▀▀ █░░█ █▄▄█ ░░█░░ ░░ █░░ █▀▀ █░░ █▀▀█ █▄▄▀ █▄▄█ 
    ▀░░▀ ▀░▀ ▀▀▀ ▀░░▀ ▀░░▀ ░░▀░░ ░░ ▀▀▀ ▀▀▀ ▀▀▀ ▀░░▀ ▀░▀▀ ▀░░▀
%c
If you can read this, then congrats! You're not a typical HR guy.
There's nothing to see here actually, but the fact that you can see this means we might talk within the same frequency.

Here's a little extra context beyond the resume:
- Nationality: Indonesian.
- MBTI: ISTJ.
- Blood type: O
- Zodiac: Taurus
- Hobbies: Listening to music, watching tech reviews on YouTube, gym.
- Sports I played: Table tennis, fencing.

Now tell your hiring manager I care about both signal and implementation.
`,
  "color: #E6E6FA; font-weight: bold;",
  "color: #6594B1; font-style: italic;");

function App() {
  // Web page title change easter egg
  useEffect(() => {
    // Fallback to a string if document.title is empty at mount
    const originalTitle = document.title || "My Portfolio";

    const handleBlur = () => {
      document.title = "Still reviewing data science candidates?";
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
    <div className="bg-white min-h-screen text-slate-900 font-inter">
      <Navbar />
      <main>
        <Hero />
        <Impact />
        <Projects />
        <Timeline />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}

export default App;
