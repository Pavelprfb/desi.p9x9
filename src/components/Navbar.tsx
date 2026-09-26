'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

export default function Navbar({ query }: { query?: string }) {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        background: 'var(--nav-bg)',
        backdropFilter: 'blur(14px)',
        borderBottom: '1px solid var(--border)',
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '14px',
        padding: '12px 22px',
      }}
      aria-label="Main navigation"
    >
      <Link
        href="/"
        className="logo"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '9px',
          fontSize: '1.5rem',
          fontWeight: 800,
          letterSpacing: '0.5px',
          background: 'var(--gradient)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textDecoration: 'none',
          whiteSpace: 'nowrap',
        }}
        aria-label="Desi.P9X9 home"
      >
        <img
          src="/favicon.png"
          width={34}
          height={34}
          alt=""
          decoding="async"
          style={{
            width: 34,
            height: 34,
            borderRadius: 9,
            objectFit: 'cover',
            boxShadow: '0 4px 12px var(--shadow)',
            WebkitTextFillColor: 'initial',
            flex: '0 0 34px',
          }}
        />
        Desi.P9X9
      </Link>

      <form
        action="/"
        method="GET"
        role="search"
        style={{
          flex: 1,
          minWidth: 200,
          maxWidth: 460,
          marginLeft: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'var(--input-bg)',
          border: '1px solid var(--border)',
          borderRadius: '40px',
          padding: '4px 6px 4px 16px',
          transition: 'border-color 0.3s, box-shadow 0.3s',
        }}
      >
        <i className="fa-solid fa-magnifying-glass" aria-hidden="true" style={{ color: 'var(--text-2)', fontSize: 14 }} />
        <input
          type="search"
          name="q"
          placeholder="Search videos..."
          aria-label="Search videos"
          defaultValue={query || ''}
          autoComplete="off"
          style={{
            flex: 1,
            minWidth: 0,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text)',
            fontSize: 15,
            padding: '7px 4px',
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          style={{
            background: 'var(--gradient)',
            color: '#fff',
            border: 'none',
            borderRadius: '32px',
            minWidth: 42,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'filter 0.3s, transform 0.3s',
          }}
        >
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
        </button>
      </form>

      <button
        className="menu-toggle"
        id="menuToggle"
        aria-label="Menu"
        aria-controls="navLinks"
        aria-expanded={menuOpen}
        style={{
          display: mounted && window.innerWidth <= 900 ? 'flex' : 'none',
          fontSize: '1.4rem',
          border: 'none',
          background: 'transparent',
          color: 'var(--text)',
          cursor: 'pointer',
          padding: '6px',
        }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <i className="fa-solid fa-bars" aria-hidden="true" />
      </button>

      <ul
        id="navLinks"
        style={{
          listStyle: 'none',
          display: 'flex',
          alignItems: mounted && window.innerWidth <= 900 ? 'stretch' : 'center',
          gap: mounted && window.innerWidth <= 900 ? '6px' : '4px',
          position: mounted && window.innerWidth <= 900 ? 'fixed' : 'static',
          top: mounted && window.innerWidth <= 900 ? 0 : 'auto',
          right: mounted && window.innerWidth <= 900 && menuOpen ? 0 : mounted && window.innerWidth <= 900 ? '-280px' : 'auto',
          width: mounted && window.innerWidth <= 900 ? 250 : 'auto',
          height: mounted && window.innerWidth <= 900 ? '100vh' : 'auto',
          flexDirection: mounted && window.innerWidth <= 900 ? 'column' : 'row',
          padding: mounted && window.innerWidth <= 900 ? '66px 16px 20px' : 0,
          background: mounted && window.innerWidth <= 900 ? 'var(--nav-bg)' : 'transparent',
          backdropFilter: mounted && window.innerWidth <= 900 ? 'blur(16px)' : 'none',
          borderLeft: mounted && window.innerWidth <= 900 ? '1px solid var(--border)' : 'none',
          boxShadow: mounted && window.innerWidth <= 900 ? '-8px 0 30px var(--shadow)' : 'none',
          transition: mounted && window.innerWidth <= 900 ? 'right 0.35s ease' : 'none',
          zIndex: mounted && window.innerWidth <= 900 ? 999 : 'auto',
        }}
      >
        <li>
          <Link
            href="/"
            style={{
              color: 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 13px',
              borderRadius: 12,
              transition: 'color 0.3s, background 0.3s',
            }}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-house" aria-hidden="true" />
            Home
          </Link>
        </li>
        <li>
          <Link
            href="/l"
            style={{
              color: 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 13px',
              borderRadius: 12,
              transition: 'color 0.3s, background 0.3s',
            }}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-film" aria-hidden="true" />
            Videos
          </Link>
        </li>
        <li>
          <a
            href="https://bd.p9x9.com/pages/about"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 13px',
              borderRadius: 12,
              transition: 'color 0.3s, background 0.3s',
            }}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-circle-info" aria-hidden="true" />
            About
          </a>
        </li>
        <li>
          <a
            href="https://bd.p9x9.com/pages/contact"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--text-2)',
              textDecoration: 'none',
              fontSize: '0.95rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '9px 13px',
              borderRadius: 12,
              transition: 'color 0.3s, background 0.3s',
            }}
            onClick={() => setMenuOpen(false)}
          >
            <i className="fa-solid fa-envelope" aria-hidden="true" />
            Contact
          </a>
        </li>
      </ul>

      <button
        className="theme-toggle"
        id="themeToggle"
        aria-label="Toggle dark or light theme"
        title="Toggle theme"
        onClick={toggleTheme}
        style={{
          width: 42,
          height: 42,
          borderRadius: '50%',
          border: '1px solid var(--border)',
          background: 'var(--input-bg)',
          color: 'var(--text)',
          fontSize: 17,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'transform 0.3s, box-shadow 0.3s, color 0.3s',
        }}
      >
        {theme === 'light' ? (
          <i className="fa-solid fa-sun" aria-hidden="true" />
        ) : (
          <i className="fa-solid fa-moon" aria-hidden="true" />
        )}
      </button>

      <style jsx>{`
        nav .logo:hover {
          filter: brightness(1.1);
        }
        nav .search-form:focus-within {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(77, 163, 255, 0.18);
        }
        nav .search-form .fa-magnifying-glass {
          color: var(--text-2);
          font-size: 14px;
        }
        nav .search-form input::placeholder {
          color: var(--text-2);
        }
        nav .search-form button:hover {
          filter: brightness(1.12);
          transform: scale(1.04);
        }
        nav ul li a:hover {
          color: var(--accent);
          background: var(--input-bg);
        }
        nav .theme-toggle:hover {
          transform: rotate(18deg) scale(1.08);
          color: var(--accent);
          box-shadow: 0 0 0 4px var(--input-bg);
        }
        @media (max-width: 900px) {
          nav { padding: 12px 16px; }
          nav .logo { font-size: 1.3rem; }
          nav .search-form { order: 3; flex-basis: 100%; max-width: none; margin-left: 0; }
          nav .menu-toggle { display: flex; order: 4; margin-left: auto; }
          nav .theme-toggle { order: 4; margin-left: 10px; }
        }
        @media (max-width: 480px) {
          nav { padding: 10px 12px; }
          nav .logo { font-size: 1.2rem; }
        }
      `}</style>

      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var menuToggle = document.getElementById('menuToggle');
              var navLinks = document.getElementById('navLinks');
              if (menuToggle && navLinks) {
                menuToggle.addEventListener('click', function() {
                  var open = navLinks.classList.toggle('active');
                  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
                });
                navLinks.querySelectorAll('a').forEach(function(a) {
                  a.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                  });
                });
              }
            })();
          `,
        }}
      />
    </nav>
  );
}