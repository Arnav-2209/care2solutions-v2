import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';

/* ──────────────────────────────────────────────
   Inline SVG Icons (no external dependency)
   ────────────────────────────────────────────── */

const OfficialLogo = () => (
  <svg viewBox="0 0 240 54" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.officialLogoSvg} aria-hidden="true">
    <g transform="translate(0, 3)">
      <rect x="0" y="0" width="48" height="48" rx="14" fill="url(#c2s_official_logo_grad)" />
      <path d="M24 12v24M12 24h24" stroke="white" strokeWidth="4" strokeLinecap="round" />
      <path d="M14 32c3.5 3.5 9 4.5 13.5 1 4.5-3.5 8.5-2.5 10.5 1" stroke="rgba(255,255,255,0.75)" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="36" cy="13" r="3.5" fill="#60A5FA" />
    </g>
    <text x="58" y="30" fontFamily="var(--font-display, 'Manrope', sans-serif)" fontWeight="800" fontSize="22" fill="#0F4C81" letterSpacing="-0.4">
      Care<tspan fill="#2D9CDB">2</tspan>Solutions
    </text>
    <text x="58.5" y="44" fontFamily="var(--font-sans, 'Inter', sans-serif)" fontWeight="700" fontSize="8.5" fill="#64748B" letterSpacing="1.2">
      HEALTHCARE RCM PLATFORM
    </text>
    <defs>
      <linearGradient id="c2s_official_logo_grad" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
        <stop stopColor="#0F4C81" />
        <stop offset="1" stopColor="#2D9CDB" />
      </linearGradient>
    </defs>
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
  isRoute?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home',          href: '#home'         },
  { label: 'Services',      href: '/services', isRoute: true },
  { label: 'Why Choose Us', href: '#why-us'       },
  { label: 'Your Journey',  href: '#journey'      },
  { label: 'Resources',     href: '#resources'    },
  { label: 'Contact',       href: '#contact'      },
];

/* ──────────────────────────────────────────────
   Navbar Component
   ────────────────────────────────────────────── */
export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [isScrolled, setIsScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');
  const isClickScrollingRef = useRef(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  // Sync activeLink with route location
  useEffect(() => {
    if (location.pathname === '/services') {
      setActiveLink('/services');
    } else if (location.pathname === '/') {
      setActiveLink((prev) => (prev.startsWith('#') ? prev : '#home'));
    }
  }, [location.pathname]);


  /* Scroll spy — position-based, fires reliably on every scroll tick */
  useEffect(() => {
    if (location.pathname !== '/') return;

    // All section IDs in page order (contact lives in the Footer)
    const sectionIds = ['home', 'why-us', 'journey', 'resources', 'contact'];
    const NAV_HEIGHT = 80;

    const getActiveSection = (): string => {
      // At the very top → Home
      if (window.scrollY < NAV_HEIGHT) return '#home';

      // At the very bottom → Contact (footer)
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 60) return '#contact';

      // getBoundingClientRect().top + scrollY = true document position
      const scrollMid = window.scrollY + NAV_HEIGHT + 80;

      let active = '#home';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const docTop = el.getBoundingClientRect().top + window.scrollY;
        if (docTop <= scrollMid) {
          active = `#${id}`;
        }
      }
      return active;
    };

    const onScroll = () => {
      setIsScrolled(window.scrollY > 60);
      if (!isClickScrollingRef.current) {
        setActiveLink(getActiveSection());
      }
    };

    // Set correct active on mount
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [location.pathname]);


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

  /* Handle link click */
  const handleNavClick = (e: React.MouseEvent, item: NavItem) => {
    e.preventDefault();
    setDrawerOpen(false);

    if (item.isRoute) {
      setActiveLink(item.href);
      navigate(item.href);
      window.scrollTo(0, 0);
      return;
    }

    // If currently on /services and clicking a section link, navigate home first then scroll
    if (location.pathname !== '/') {
      setActiveLink(item.href);
      navigate('/');
      setTimeout(() => {
        const targetId = item.href.replace('#', '');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          const navOffset = 80;
          const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: elementPosition - navOffset,
            behavior: 'smooth',
          });
        }
      }, 120);
      return;
    }

    // Homepage smooth scroll
    setActiveLink(item.href);
    isClickScrollingRef.current = true;

    const targetId = item.href.replace('#', '');
    const targetEl = document.getElementById(targetId);

    if (targetEl) {
      const navOffset = 80;
      const elementPosition = targetEl.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navOffset,
        behavior: 'smooth',
      });
    }

    setTimeout(() => {
      isClickScrollingRef.current = false;
    }, 850);
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
      <motion.header
        className={wrapperClass}
        role="banner"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0 }}
      >
        <nav className={navbarClass} aria-label="Main navigation">

          {/* Logo */}
          <a
            href="#home"
            className={styles.logoSection}
            aria-label="Care2Solutions — Home"
            onClick={(e) => handleNavClick(e, { label: 'Home', href: '#home' })}
          >
            <OfficialLogo />
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
                    onClick={(e) => handleNavClick(e, item)}
                  >
                    <span className={styles.navLinkInner}>
                      {item.label}

                      {/* Smooth layoutId underline transition */}
                      {isActive && (
                        <motion.span
                          layoutId="activeNavUnderline"
                          className={styles.activeUnderline}
                          transition={{
                            duration: 0.28,
                            ease: [0.4, 0, 0.2, 1],
                          }}
                        />
                      )}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right Section */}
          <div className={styles.navRight}>
            <a
              href="#contact"
              className={[styles.ctaButton, styles.desktopCta].join(' ')}
              id="navbar-cta-book-consultation"
              onClick={(e) => handleNavClick(e, { label: 'Contact', href: '#contact' })}
            >
              <CalendarIcon />
              Book Consultation
            </a>

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
      </motion.header>

      {/* Mobile Drawer Overlay */}
      <div
        className={overlayClass}
        aria-hidden="true"
        onClick={closeDrawer}
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        className={drawerClass}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        inert={!drawerOpen ? true : undefined}
      >
        <div className={styles.drawerHeader}>
          <a
            href="#home"
            className={styles.logoSection}
            aria-label="Care2Solutions — Home"
            onClick={(e) => handleNavClick(e, { label: 'Home', href: '#home' })}
          >
            <OfficialLogo />
          </a>
          <button
            className={styles.drawerCloseBtn}
            aria-label="Close navigation"
            onClick={closeDrawer}
          >
            <CloseIcon />
          </button>
        </div>

        <nav className={styles.drawerNav} aria-label="Mobile navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeLink === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                className={[styles.drawerNavLink, isActive ? styles.active : ''].join(' ').trim()}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleNavClick(e, item)}
              >
                {item.label}
                <ChevronRightIcon className={styles.drawerNavChevron} />
              </a>
            );
          })}
        </nav>

        <div className={styles.drawerFooter}>
          <a
            href="#contact"
            className={styles.drawerCta}
            id="mobile-cta-book-consultation"
            onClick={(e) => handleNavClick(e, { label: 'Contact', href: '#contact' })}
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

      <div className={styles.navSpacer} aria-hidden="true" />
    </>
  );
}
