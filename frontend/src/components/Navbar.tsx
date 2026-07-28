import { useState, useEffect, useCallback, useRef } from 'react';
import styles from './Navbar.module.css';

/* ──────────────────────────────────────────────
   Inline SVG Icons (no external dependency)
   ────────────────────────────────────────────── */

const LogoIcon = () => (
  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    {/* Medical cross / plus mark */}
    <rect x="9" y="3" width="4" height="16" rx="2" fill="white" fillOpacity="0.95" />
    <rect x="3" y="9" width="16" height="4" rx="2" fill="white" fillOpacity="0.95" />
    {/* Small accent dot */}
    <circle cx="18.5" cy="5.5" r="2" fill="rgba(255,255,255,0.55)" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 5l4 4 4-4" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 3l4 4-4 4" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="3" width="12" height="11" rx="2" />
    <path d="M2 7h12M5 1v4M11 1v4" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

const ShieldIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 1.5L12 3.5v4c0 2.5-2.1 4.5-5 5-2.9-.5-5-2.5-5-5v-4l5-2z" />
    <path d="M5 7l1.5 1.5L9.5 5.5" />
  </svg>
);

/* ──────────────────────────────────────────────
   Nav Links Data
   ────────────────────────────────────────────── */
interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',       href: '#home'      },
  { label: 'Services',   href: '#services',  hasDropdown: true },
  { label: 'About Us',   href: '#about'     },
  { label: 'Resources',  href: '#resources', hasDropdown: true },
  { label: 'Contact',    href: '#contact'   },
];

/* ──────────────────────────────────────────────
   Navbar Component
   ────────────────────────────────────────────── */
export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false);
  const [drawerOpen, setDrawerOpen]   = useState(false);
  const [activeLink, setActiveLink]   = useState('#home');
  const drawerRef                     = useRef<HTMLDivElement>(null);
  const hamburgerRef                  = useRef<HTMLButtonElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const threshold = 60;
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    onScroll(); // initial read
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock body scroll when drawer is open */
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  /* Close drawer on Escape key */
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDrawer]);

  /* Handle nav link clicks */
  const handleNavClick = (href: string) => {
    setActiveLink(href);
    setDrawerOpen(false);
  };

  /* Trap focus inside drawer */
  useEffect(() => {
    if (drawerOpen) {
      const timeout = setTimeout(() => {
        drawerRef.current?.querySelector<HTMLElement>('button, a')?.focus();
      }, 50);
      return () => clearTimeout(timeout);
    } else {
      hamburgerRef.current?.focus();
    }
  }, [drawerOpen]);

  const navbarClass = [styles.navbar, isScrolled ? styles.scrolled : ''].join(' ').trim();
  const wrapperClass = [styles.navbarWrapper, isScrolled ? styles.scrolled : ''].join(' ').trim();
  const hamburgerClass = [styles.hamburgerBtn, drawerOpen ? styles.open : ''].join(' ').trim();
  const drawerClass = [styles.drawer, drawerOpen ? styles.open : ''].join(' ').trim();
  const overlayClass = [styles.drawerOverlay, drawerOpen ? styles.open : ''].join(' ').trim();

  return (
    <>
      {/* ── Floating Navbar ── */}
      <header className={wrapperClass} role="banner">
        <nav className={navbarClass} aria-label="Main navigation">

          {/* Logo */}
          <a
            href="#home"
            className={styles.logoSection}
            aria-label="Care2Solutions — Home"
            onClick={() => handleNavClick('#home')}
          >
            <div className={styles.logoMark} aria-hidden="true">
              <LogoIcon />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Care2Solutions</span>
              <span className={styles.logoTagline}>Healthcare RCM Platform</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className={styles.navCenter} role="list" aria-label="Site navigation">
            {NAV_ITEMS.map((item) => {
              const isActive = activeLink === item.href;
              return (
                <li key={item.href} className={styles.navItem}>
                  <a
                    href={item.href}
                    className={[styles.navLink, isActive ? styles.active : ''].join(' ').trim()}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={() => handleNavClick(item.href)}
                  >
                    <span className={styles.navLinkInner}>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDownIcon className={styles.navChevron} />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Section */}
          <div className={styles.navRight}>
            {/* Desktop CTA */}
            <a
              href="#contact"
              className={[styles.ctaButton, styles.desktopCta].join(' ')}
              id="navbar-cta-book-consultation"
              onClick={() => handleNavClick('#contact')}
            >
              <CalendarIcon />
              Book Consultation
            </a>

            {/* Hamburger (mobile) */}
            <button
              ref={hamburgerRef}
              className={hamburgerClass}
              aria-label={drawerOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={drawerOpen}
              aria-controls="mobile-drawer"
              onClick={() => setDrawerOpen((prev) => !prev)}
            >
              <span className={styles.hamburgerIcon} aria-hidden="true">
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
                <span className={styles.hamburgerLine} />
              </span>
            </button>
          </div>

        </nav>
      </header>

      {/* ── Mobile Drawer Overlay ── */}
      <div
        className={overlayClass}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      {/* ── Mobile Drawer ── */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={drawerClass}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        // Make inert when closed for a11y
        {...(!drawerOpen ? { inert: '' } : {})}
      >
        {/* Drawer Header */}
        <div className={styles.drawerHeader}>
          <a
            href="#home"
            className={styles.logoSection}
            aria-label="Care2Solutions — Home"
            onClick={() => handleNavClick('#home')}
          >
            <div className={styles.logoMark} aria-hidden="true">
              <LogoIcon />
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoName}>Care2Solutions</span>
              <span className={styles.logoTagline}>Healthcare RCM Platform</span>
            </div>
          </a>
          <button
            className={styles.drawerCloseBtn}
            aria-label="Close navigation"
            onClick={closeDrawer}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Drawer Nav Links */}
        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeLink === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={[styles.drawerNavLink, isActive ? styles.active : ''].join(' ').trim()}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => handleNavClick(item.href)}
              >
                {item.label}
                <ChevronRightIcon className={styles.drawerNavChevron} />
              </a>
            );
          })}
        </nav>

        {/* Drawer Footer CTA */}
        <div className={styles.drawerFooter}>
          <a
            href="#contact"
            className={styles.drawerCta}
            id="mobile-cta-book-consultation"
            onClick={() => handleNavClick('#contact')}
          >
            <CalendarIcon />
            Book Consultation
          </a>
          <div className={styles.drawerBadge}>
            <ShieldIcon />
            HIPAA Compliant · SOC 2 Certified
          </div>
        </div>
      </div>

      {/* Spacer so page content isn't hidden under fixed nav */}
      <div className={styles.navSpacer} aria-hidden="true" />
    </>
  );
}
