import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Timeline from './components/Timeline';
import Contact from './components/Footer';
import FluidCursor from './components/FluidCursor';


console.log(`%c
    █▀▀█ █░█ █▀▀ █▀▀▄ █▀▀█ ▀▀█▀▀ ░░ █░░ █▀▀ █▀▀ █░░█ █▀▀█ █▀▀█ 
    █▄▄█ █▀▄ █▀▀ █░░█ █▄▄█ ░░█░░ ░░ █░░ █▀▀ █░░ █▀▀█ █▄▄▀ █▄▄█ 
    ▀░░▀ ▀░▀ ▀▀▀ ▀░░▀ ▀░░▀ ░░▀░░ ░░ ▀▀▀ ▀▀▀ ▀▀▀ ▀░░▀ ▀░▀▀ ▀░░▀
%c
If you can read this, then congrats! You're not a typical HR guy.
There's nothing to see here actually 😆, but the fact that you can see this, we might talk within the same frequency.

Here's my other useless info that are useless and unrelated with my profile:
- Nationality: Indonesian. Yeah yeah I know, you might think I'm a Japanese cuz of my name but I'm a proud Indonesian! Except for the government🤪.
- MBTI: ISTJ (99% introverted lol)
- Blood type: O
- Zodiac: Taurus
- Hobbies: Listening to music, watching tech reviews on youtube, gym.
- Sports I played: Table tennis, fencing. (Emphasis on the 'ed' so I don't play them regularly anymore lol)

Now tell your HR manager to hire me before my mom does!
`,
  "color: #E6E6FA; font-weight: bold;",
  "color: #6594B1; font-style: italic;");

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