import { useEffect } from 'react';
import { useAppSelector } from './store';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Timeline from './components/Timeline/Timeline';
import Projects from './components/Projects/Projects';
import Contact from './components/Contact/Contact';
import type { FontSize } from './types';
import './styles/global.scss';

const FONT_SIZE_MAP: Record<FontSize, string> = {
  small: '14px',
  medium: '16px',
  large: '18px',
};

const App = (): React.JSX.Element => {
  const themeMode = useAppSelector((state) => state.theme.mode);
  const fontSize = useAppSelector((state) => state.ui.fontSize);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', FONT_SIZE_MAP[fontSize]);
  }, [fontSize]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <Header />
      <main id="main-content">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </main>
    </>
  );
};

export default App;
