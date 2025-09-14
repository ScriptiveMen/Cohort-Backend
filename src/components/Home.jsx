import React, { useEffect, useState } from "react";

const Home = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [installedMessage, setInstalledMessage] = useState("");

  useEffect(() => {
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", () => {
      setInstalledMessage("App installed ✅");
      setDeferredPrompt(null);
    });
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", () => {});
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setInstalledMessage("Thanks for installing 🎉");
    } else {
      setInstalledMessage("Install dismissed");
    }
    setDeferredPrompt(null);
  };

  return (
    <main className="home-root">
      <header className="nav">
        <div className="brand">
          <svg className="logo" viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id="g" x1="0" x2="1">
                <stop offset="0" stopColor="#4f46e5" />
                <stop offset="1" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <rect x="2" y="2" width="20" height="20" rx="6" fill="url(#g)" />
            <path
              d="M7 12h10M7 8h6M7 16h10"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div>
            <div className="title">Beacon</div>
            <div className="subtitle">Progressive Web App Starter</div>
          </div>
        </div>

        <div className="controls">
          {deferredPrompt ? (
            <button
              className="btn primary"
              onClick={handleInstall}
              aria-live="polite"
            >
              Install
            </button>
          ) : (
            <a className="btn ghost" href="#features">
              Features
            </a>
          )}
        </div>
      </header>

      <section className="hero">
        <div className="hero-inner">
          <h1 className="hero-title">
            Build fast, reliable, installable web apps.
          </h1>
          <p className="hero-sub">
            Learn PWA fundamentals while using a clean, minimal starting UI.
            Offline-ready, responsive, and built mobile-first so you can ship
            quickly.
          </p>

          <div className="hero-cta">
            <a className="btn primary large" href="#get-started">
              Get started
            </a>
            <a
              className="btn ghost"
              href="https://web.dev/progressive-web-apps/"
              target="_blank"
              rel="noreferrer"
            >
              Learn PWAs
            </a>
          </div>

          <div className="meta">
            <span className="chip">Offline-ready</span>
            <span className="chip">Responsive</span>
            <span className="chip">Minimal UI</span>
          </div>

          {installedMessage && (
            <div className="installed">{installedMessage}</div>
          )}
        </div>

        <div className="hero-visual" aria-hidden="true">
          <svg viewBox="0 0 600 400" className="art">
            <defs>
              <linearGradient id="lg" x1="0" x2="1">
                <stop offset="0" stopColor="#eef2ff" />
                <stop offset="1" stopColor="#ecfeff" />
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" rx="20" fill="url(#lg)" />
            <g
              transform="translate(40,30)"
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M0 60 C80 20, 160 100, 240 60" opacity="0.9" />
              <path d="M20 120 C120 80, 210 160, 320 120" opacity="0.6" />
              <circle cx="480" cy="80" r="36" fill="#06b6d4" opacity="0.12" />
            </g>
          </svg>
        </div>
      </section>

      <section id="features" className="features">
        <h2 className="section-title">Designed for learners and builders</h2>
        <p className="section-desc">
          A compact set of patterns to get you shipping a PWA quickly.
        </p>

        <ul className="grid">
          <li className="card">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M12 2L12 12"
                stroke="#4f46e5"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5 8h14"
                stroke="#06b6d4"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <h3>Installable</h3>
            <p>
              Supports installation prompts and basic install UX so users can
              add your app to their device.
            </p>
          </li>

          <li className="card">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M3 12h18"
                stroke="#4f46e5"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M8 6h8"
                stroke="#06b6d4"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <h3>Offline-first</h3>
            <p>
              Use a service worker for caching and offline experiences — basic
              patterns are included in the starter.
            </p>
          </li>

          <li className="card">
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect
                x="3"
                y="3"
                width="18"
                height="18"
                rx="3"
                stroke="#4f46e5"
                strokeWidth="1.8"
              />
              <path
                d="M8 12h8"
                stroke="#06b6d4"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
            <h3>Mobile-first</h3>
            <p>
              Layout and interactions are built starting from small screens and
              scale gracefully to larger viewports.
            </p>
          </li>
        </ul>
      </section>

      <footer className="footer">
        <div>
          <strong>Beacon</strong> — PWA starter ·{" "}
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>
        <div className="foot-right">
          Made with care · {new Date().getFullYear()}
        </div>
      </footer>

      <style>{`
        :root{
          --bg: #ffffff;
          --muted: #6b7280;
          --accent: linear-gradient(90deg,#6366f1,#06b6d4);
          --card: #ffffff;
          --glass: rgba(255,255,255,0.6);
        }
        @media (prefers-color-scheme: dark){
          :root{
            --bg: #0b1220;
            --muted: #9ca3af;
            --card: #071027;
            --glass: rgba(255,255,255,0.04);
          }
        }

        *{box-sizing:border-box}
        .home-root{
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          background: radial-gradient(1200px 400px at 10% 10%, rgba(99,102,241,0.06), transparent), var(--bg);
          color: inherit;
          min-height:100vh;
          padding:20px;
        }

        .nav {
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:12px;
          max-width:1100px;
          margin:0 auto 18px;
        }
        .brand{display:flex;align-items:center;gap:12px}
        .logo{width:44px;height:44px;flex:none}
        .title{font-weight:700;font-size:18px;line-height:1}
        .subtitle{font-size:12px;color:var(--muted);margin-top:2px}

        .controls{display:flex;gap:10px;align-items:center}

        .hero{
          max-width:1100px;
          margin:0 auto;
          display:grid;
          grid-template-columns:1fr;
          gap:18px;
          align-items:center;
          padding:22px;
          border-radius:14px;
          background: linear-gradient(180deg, rgba(255,255,255,0.6), rgba(255,255,255,0.4));
          box-shadow: 0 6px 30px rgba(2,6,23,0.06);
        }

        .hero-inner{padding:6px}
        .hero-title{font-size:20px;margin:6px 0 8px 0;line-height:1.15}
        .hero-sub{color:var(--muted);margin:0 0 14px 0}
        .hero-cta{display:flex;gap:10px;flex-wrap:wrap}
        .btn{
          display:inline-flex;
          align-items:center;
          gap:8px;
          padding:8px 12px;
          border-radius:10px;
          border:1px solid transparent;
          text-decoration:none;
          font-weight:600;
          font-size:14px;
          cursor:pointer;
          background:transparent;
        }
        .btn.primary{
          background:var(--accent);
          color:#fff;
          box-shadow: 0 6px 18px rgba(99,102,241,0.12);
        }
        .btn.ghost{
          border-color: rgba(15,23,42,0.06);
          color:var(--muted);
          background:transparent;
        }
        .btn.large{padding:12px 18px;border-radius:12px}

        .meta{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}
        .chip{background:var(--glass);padding:6px 10px;border-radius:999px;font-size:12px;color:var(--muted)}

        .hero-visual{display:block;height:160px;border-radius:12px;overflow:hidden}
        .hero-visual .art{width:100%;height:100%}

        .installed{margin-top:10px;font-size:13px;color:var(--muted)}

        .features{max-width:1100px;margin:26px auto;padding:6px}
        .section-title{font-size:16px;margin-bottom:6px}
        .section-desc{color:var(--muted);margin-bottom:14px;font-size:14px}

        .grid{list-style:none;padding:0;margin:0;display:grid;grid-template-columns:1fr;gap:12px}
        .card{
          background:var(--card);
          padding:14px;border-radius:12px;
          box-shadow: 0 6px 18px rgba(2,6,23,0.04);
          display:flex;flex-direction:column;gap:8px;
        }
        .card .icon{width:36px;height:36px}
        .card h3{margin:0;font-size:15px}
        .card p{margin:0;color:var(--muted);font-size:13px}

        .footer{max-width:1100px;margin:28px auto 8px;display:flex;justify-content:space-between;align-items:center;color:var(--muted);font-size:13px}

        /* Larger screens */
        @media (min-width:720px){
          .hero{grid-template-columns:1fr 360px;padding:28px}
          .hero-title{font-size:28px}
          .hero-visual{height:220px}
          .grid{grid-template-columns:repeat(3,1fr)}
        }

        @media (min-width:1100px){
          .home-root{padding:40px}
          .hero{padding:36px}
          .hero-title{font-size:34px}
        }

        @media (prefers-reduced-motion: reduce){
          *{transition:none!important}
        }
      `}</style>
    </main>
  );
};

export default Home;
