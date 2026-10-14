import { MotionConfig } from 'framer-motion';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Timeline from './components/Timeline/Timeline';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import './styles/global.scss';

const App = (): React.JSX.Element => {
  return (
    // reducedMotion="user" turns off movement animations for visitors who ask their system for less motion
    <MotionConfig reducedMotion="user">
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </main>
    </MotionConfig>
  );
};

export default App;
