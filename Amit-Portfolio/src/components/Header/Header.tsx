import { useState, useCallback, type MouseEvent } from 'react';
import { Menu, X, Sun, Moon, Contrast, AArrowUp, AArrowDown } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { setTheme } from '../../store/slices/themeSlice';
import { increaseFontSize, decreaseFontSize } from '../../store/slices/uiSlice';
import type { NavLink, ThemeMode } from '../../types';
import styles from './Header.module.scss';

const NAV_LINKS: NavLink[] = [
  { id: 'hero', label: 'Home', href: '#hero' },
  { id: 'timeline', label: 'Timeline', href: '#timeline' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

const scrollToSection = (e: MouseEvent<HTMLAnchorElement>, href: string): void => {
  e.preventDefault();
  const targetId = href.replace('#', '');
  const element = document.getElementById(targetId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

interface ThemeButtonProps {
  mode: ThemeMode;
  currentMode: ThemeMode;
  onClick: (mode: ThemeMode) => void;
  icon: React.ReactNode;
  label: string;
}

const ThemeButton = ({ mode, currentMode, onClick, icon, label }: ThemeButtonProps): React.JSX.Element => (
  <button type="button" className={`${styles.themeButton} ${currentMode === mode ? styles.active : ''}`}
    onClick={() => onClick(mode)} aria-label={label} aria-pressed={currentMode === mode}>
    {icon}
  </button>
);

const Header = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const themeMode = useAppSelector((state) => state.theme.mode);
  const fontSize = useAppSelector((state) => state.ui.fontSize);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const handleThemeChange = useCallback(
    (mode: ThemeMode) => {
      dispatch(setTheme(mode));
    },
    [dispatch]
  );

  const handleIncreaseFontSize = useCallback(() => {
    dispatch(increaseFontSize());
  }, [dispatch]);

  const handleDecreaseFontSize = useCallback(() => {
    dispatch(decreaseFontSize());
  }, [dispatch]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const handleNavClick = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
    scrollToSection(e, href);
    setIsMobileMenuOpen(false);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href="#hero" className={styles.logo} aria-label="Go to home" onClick={(e) => scrollToSection(e, '#hero')}>
          AR
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.navLink} onClick={(e) => scrollToSection(e, link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Controls */}
        <div className={styles.controls}>
          {/* Font Size Controls */}
          <div className={styles.fontSizeControls} role="group" aria-label="Font size controls">
            <button type="button" className={styles.fontSizeButton} onClick={handleDecreaseFontSize}
              disabled={fontSize === 'small'} aria-label="Decrease font size">
              <AArrowDown size={18} />
            </button>
            <button type="button" className={styles.fontSizeButton} onClick={handleIncreaseFontSize}
              disabled={fontSize === 'large'} aria-label="Increase font size">
              <AArrowUp size={18} />
            </button>
          </div>

          {/* Theme Controls */}
          <div className={styles.themeControls} role="group" aria-label="Theme controls">
            <ThemeButton mode="light" currentMode={themeMode} onClick={handleThemeChange} icon={<Sun size={18} />} label="Light theme" />
            <ThemeButton mode="dark" currentMode={themeMode} onClick={handleThemeChange} icon={<Moon size={18} />} label="Dark theme" />
            <ThemeButton mode="high-contrast" currentMode={themeMode} onClick={handleThemeChange} icon={<Contrast size={18} />} label="High contrast theme" />
          </div>

          {/* Mobile Menu Toggle */}
          <button type="button" className={styles.mobileMenuButton} onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`} aria-label="Mobile navigation">
        <ul className={styles.mobileNavList}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={link.href} className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
