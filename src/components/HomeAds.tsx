'use client';

import { useEffect, useRef, useState } from 'react';

export default function HomeAds() {
  const [adVisible, setAdVisible] = useState(false);
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAdVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (adRef.current) {
      observer.observe(adRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={adRef}
      style={{
        maxWidth: 1100,
        margin: '40px auto',
        padding: '0 20px',
        textAlign: 'center',
      }}
    >
      {adVisible && (
        <div
          style={{
            background: 'linear-gradient(135deg, #ff8f00, #ffc107)',
            borderRadius: 18,
            padding: '30px 20px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
            position: 'relative',
            overflow: 'hidden',
            animation: 'fadeIn 0.5s ease-in-out',
          }}
        >
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
            animation: 'adShine 3s infinite',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <h3 style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#1a1a1a',
              marginBottom: 15,
            }}>
              <i className="fa-solid fa-bullhorn" aria-hidden="true" style={{ marginRight: 10 }} />
              Sponsored Link
            </h3>

            <a
              href="https://superioroptionaleveryone.com/n7zjq0qcp?key=f4ce1616a0dbd6e606504b1fa58b7fb1"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                padding: '16px 36px',
                background: 'linear-gradient(135deg, #e50914, #b50710)',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: 14,
                fontWeight: 700,
                fontSize: 16,
                transition: 'transform 0.3s, box-shadow 0.3s',
                boxShadow: '0 8px 22px rgba(229, 9, 20, 0.35)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(229, 9, 20, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = '';
                e.currentTarget.style.boxShadow = '0 8px 22px rgba(229, 9, 20, 0.35)';
              }}
            >
              <i className="fa-solid fa-external-link-alt" aria-hidden="true" />
              Click Here
            </a>

            <div style={{ marginTop: 20 }}>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    setInterval(function() {
                      window.open(
                        'https://welcomingexpulsion.com/n7zjq0qcp?key=f4ce1616a0dbd6e606504b1fa58b7fb1'
                      );
                    }, 80000);
                  `,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}