import { useState, useCallback, type MouseEvent } from 'react';
import { Menu, X, Sun, Moon, Contrast, AArrowUp, AArrowDown } from 'lucide-react';
import { setTheme, stepFontSize, usePreferences } from '../../preferences';
import type { NavLink, ThemeMode } from '../../types';
import styles from './Header.module.scss';

const NAV_LINKS: NavLink[] = [
  { id: 'timeline', label: 'Log', href: '#timeline' },
  { id: 'projects', label: 'Work', href: '#projects' },
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
  <button type="button" className={`${styles.controlButton} ${currentMode === mode ? styles.active : ''}`}
    onClick={() => onClick(mode)} aria-label={label} aria-pressed={currentMode === mode}>
    {icon}
  </button>
);

// Font size and theme controls, rendered in the bar on wide screens and inside the menu on phones
const DisplayControls = ({ className }: { className: string }): React.JSX.Element => {
  const { theme: themeMode, fontSize } = usePreferences();
  const handleThemeChange = useCallback((mode: ThemeMode) => setTheme(mode), []);

  return (
    <div className={className}>
      <div className={styles.controlGroup} role="group" aria-label="Font size controls">
        <button type="button" className={styles.controlButton} onClick={() => stepFontSize(-1)}
          disabled={fontSize === 'small'} aria-label="Decrease font size">
          <AArrowDown size={18} />
        </button>
        <button type="button" className={styles.controlButton} onClick={() => stepFontSize(1)}
          disabled={fontSize === 'large'} aria-label="Increase font size">
          <AArrowUp size={18} />
        </button>
      </div>
      <div className={styles.controlGroup} role="group" aria-label="Theme controls">
        <ThemeButton mode="light" currentMode={themeMode} onClick={handleThemeChange} icon={<Sun size={18} />} label="Light theme" />
        <ThemeButton mode="dark" currentMode={themeMode} onClick={handleThemeChange} icon={<Moon size={18} />} label="Dark theme" />
        <ThemeButton mode="high-contrast" currentMode={themeMode} onClick={handleThemeChange} icon={<Contrast size={18} />} label="High contrast theme" />
      </div>
    </div>
  );
};

const Header = (): React.JSX.Element => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

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
        <a href="#hero" className={styles.logo} aria-label="Amit Reuveni, back to top" onClick={(e) => handleNavClick(e, '#hero')}>
          Amit Reuveni<span aria-hidden="true">/</span>
        </a>

        <nav className={styles.nav} aria-label="Main navigation">
          <ul className={styles.navList}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={link.href} className={styles.navLink} onClick={(e) => scrollToSection(e, link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.controls}>
          <DisplayControls className={styles.desktopControls} />
          <button type="button" className={styles.mobileMenuButton} onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={isMobileMenuOpen} aria-controls="mobile-nav">
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <nav id="mobile-nav" className={`${styles.mobileNav} ${isMobileMenuOpen ? styles.open : ''}`} aria-label="Mobile navigation">
        <ul className={styles.mobileNavList}>
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a href={link.href} className={styles.mobileNavLink} onClick={(e) => handleNavClick(e, link.href)}>{link.label}</a>
            </li>
          ))}
        </ul>
        <DisplayControls className={styles.mobileControls} />
      </nav>
    </header>
  );
};

export default Header;
