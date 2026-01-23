import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
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
  // Loading screen state
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const imagesToPreload = [
      '/assets/img/profile-au.webp',
      '/assets/img/profile-uk.webp',
      '/assets/img/profile.webp',
      '/assets/img/monash.webp',
      '/assets/img/tiket.webp',
      '/assets/img/nottingham.webp',
      '/assets/img/binus.webp',
      '/assets/img/mobiles-analysis.webp',
      '/assets/img/melbourne-air-quality-pedestrian-traffic-analysis.webp',
      '/assets/img/common-chest-x-ray-classification.webp'
    ];

    // Create a promise for image loading
    const imagePromises = imagesToPreload.map((src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve; // Resolve when image is cached
        img.onerror = resolve; // Resolve anyway on error so we don't get stuck
      });
    });

    // Create a promise for the minimum timer (2.5s)
    const timerPromise = new Promise((resolve) => setTimeout(resolve, 2500));

    // Wait for BOTH (Images cached AND timer finished)
    Promise.all([...imagePromises, timerPromise]).then(() => {
      setIsLoading(false);
    });

  }, []);

  // Web page title change easter egg
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
    <div className="bg-deep-sea min-h-screen">
      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          <main>
            <Hero />
            <Timeline />
            <Skills />
            <Projects />
            <Contact />
          </main>
          <FluidCursor />
        </motion.div>
      )}
    </div>
  );
}

export default App;