// app/not-found.tsx
export const metadata = {
  title: "404 - PatternRipple",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      role="main"
      aria-labelledby="page-title"
      className="pr404-root"
      style={{
        minHeight: "100dvh", // iOS safe viewport
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        margin: 0,
        background: "linear-gradient(180deg,#0b1020 0%, #0e1630 100%)",
        color: "#e6eefc",
        fontFamily:
          'ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
        WebkitFontSmoothing: "antialiased",
        MozOsxFontSmoothing: "grayscale",
      }}
    >
      {/* Scoped styles for responsive and sticky behavior */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .pr404-wrap{width:100%;max-width:960px;border:2px solid #243060;border-radius:16px;
            background:
            linear-gradient(transparent 23px,#1a2450 24px) 0 0/100% 24px,
            linear-gradient(90deg,transparent 23px,#1a2450 24px) 0 0/24px 100%,
            #111834;
            box-shadow:0 10px 30px rgba(0,0,0,.35),inset 0 0 0 1px rgba(255,255,255,.05);
            padding:20px;
          }
          .pr404-hdr{display:flex;align-items:center;gap:12px;margin-bottom:16px;border-bottom:2px solid #243060;padding-bottom:12px}
          .pr404-dot{width:10px;height:10px;border-radius:50%;
            background:radial-gradient(circle at 35% 35%,#fff,#6ee7ff 35%,#1a2b3f 60%);
            box-shadow:0 0 10px #6ee7ff;flex:0 0 auto}
          .pr404-title{font-weight:800;letter-spacing:.5px;font-size:18px;color:#b3e1ff;text-shadow:0 0 8px rgba(110,231,255,.35)}
          
          .pr404-grid{
            display:grid;gap:16px;
            grid-template-columns:1fr; /* mobile first */
          }
          .pr404-aside{
            border:1px solid #243060;border-radius:12px;background:#0e1533;padding:14px
          }
          .pr404-aside h3{margin:0 0 8px;font-size:14px;color:#b3e1ff}
          
          /* action buttons */
          .pr404-actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:16px;justify-content:center}
          .pr404-btn,.pr404-btnPrimary{
            border:1px solid #243060;background:#0f1a3a;color:#e6eefc;
            padding:12px 16px;border-radius:12px;text-decoration:none;font-weight:800;
            box-shadow:inset 0 0 0 1px rgba(255,255,255,.05);
            display:inline-flex;align-items:center;justify-content:center;line-height:1;min-width:44px;min-height:44px
          }
          .pr404-btnPrimary{background:linear-gradient(90deg,#102452,#123a5e);border-color:#275a86}
          .pr404-btn:focus,.pr404-btnPrimary:focus{outline:2px solid #6ee7ff;outline-offset:2px;border-radius:12px}
          .pr404-btn:active,.pr404-btnPrimary:active{transform:translateY(1px)}
          @media (prefers-reduced-motion:no-preference){
            .pr404-btn,.pr404-btnPrimary{transition:transform .12s ease,box-shadow .12s ease,background .12s ease}
            .pr404-btn:hover,.pr404-btnPrimary:hover{box-shadow:0 0 0 2px rgba(110,231,255,.15) inset}
          }

          /* fields */
          .pr404-field{
            flex:1;background:#0c1330;border:1px solid #243060;color:#e6eefc;
            padding:12px;border-radius:12px;outline:none;min-height:44px
          }
          .pr404-field::placeholder{color:#8ba0c8}

          /* nav links */
          .pr404-nav{display:grid;gap:8px}
          .pr404-link{
            color:#e6eefc;text-decoration:none;border:1px dashed #243060;
            padding:12px;border-radius:10px;display:flex;justify-content:space-between;align-items:center;gap:10px;min-height:44px
          }
          .pr404-link small{color:#8ba0c8}
          .pr404-link:focus{outline:2px solid #6ee7ff;outline-offset:2px}

          /* ascii block */
          .pr404-ascii{
            font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace;
            font-size:12px;line-height:1.1;color:#e6eefc;opacity:.9;background:#0e1533;
            border:1px solid #243060;border-radius:10px;padding:14px;max-height:240px;overflow:auto
          }

          /* grid upgrade on wider screens - makes aside sticky */
          @media (min-width: 860px){
            .pr404-grid{grid-template-columns:1fr 320px;gap:24px;align-items:start}
            .pr404-aside{position:sticky;top:16px}
            .pr404-actions{justify-content:flex-start}
          }

          /* footer */
          .pr404-ftr{margin-top:20px;padding-top:12px;border-top:2px solid #243060;display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;color:#8ba0c8;font-size:13px}

          /* ios chrome overscroll polish */
          .pr404-root{-webkit-overflow-scrolling:touch}

          /* color scheme support */
          @media (prefers-color-scheme: light){
            .pr404-wrap{box-shadow:0 10px 30px rgba(0,0,0,.15),inset 0 0 0 1px rgba(0,0,0,.03)}
          }
        `,
        }}
      />

      <div className="pr404-wrap">
        <header className="pr404-hdr">
          <div aria-hidden="true" className="pr404-dot" />
          <div id="page-title" className="pr404-title">PatternRipple system - 404</div>
        </header>

        <div className="pr404-grid">
          <section>
            <div
              aria-live="polite"
              style={{
                background: "linear-gradient(90deg,#6ee7ff,#88ffb4)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 88,
                lineHeight: 1,
                fontWeight: 900,
                margin: "6px 0 6px",
                textShadow: "0 0 18px rgba(136,255,180,.2)",
                textAlign: "center",
              }}
            >
              404
            </div>

            <p style={{ color: "#8ba0c8", marginBottom: 18, textAlign: "center" }}>
              The page you tried to reach is not here. Use the links below.
            </p>

            <pre aria-label="Decorative ascii art cat" role="img" className="pr404-ascii">{String.raw`  /\_/\      /\_/\      /\_/\
 ( o.o )    ( o.o )    ( o.o )   meow
  > ^ <      > ^ <      > ^ <`}</pre>

            <div className="pr404-actions">
              <a className="pr404-btnPrimary" href="/">Go home</a>
              <a className="pr404-btn" href="/tools/">All tools</a>
              <a className="pr404-btn" href="/collections">Collections</a>
              <a className="pr404-btn" href="/contact">Contact</a>
            </div>

            <form role="search" action="/search" method="get" style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <input
                className="pr404-field"
                type="search"
                name="q"
                placeholder="Search PatternRipple"
                aria-label="Search PatternRipple"
                inputMode="search"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck={false}
              />
              <button className="pr404-btn" type="submit">Search</button>
            </form>

            <div aria-hidden="true" style={{ marginTop: 10, border: "1px solid #243060", borderRadius: 10, padding: "6px 10px", background: "#0b122d", color: "#8ba0c8" }}>
              _ tip - drop any image into Pattern Checker to preview it as a seamless tile
            </div>

            <p style={{ marginTop: 10, color: "#8ba0c8", fontSize: 13, textAlign: "center" }}>
              No gifs. No audio. Pure html-css. Fast load.
            </p>
          </section>

          <aside className="pr404-aside" aria-labelledby="quick-links">
            <h3 id="quick-links">Quick links</h3>

            <nav aria-label="Popular pages" className="pr404-nav">
              <a href="/tools/pattern-checker.html" className="pr404-link">
                <span>Pattern Checker</span><small>preview seamless tiles</small>
              </a>
              <a href="/tools/seamless-pattern.html" className="pr404-link">
                <span>Seamless Pattern Maker</span><small>tile from an image</small>
              </a>
              <a href="/tools/video-audio-mixer.html" className="pr404-link">
                <span>Video Audio Mixer</span><small>mix audio into a video</small>
              </a>
              <a href="/tools/audio-loop-creator.html" className="pr404-link">
                <span>Audio Loop Creator</span><small>find loop points</small>
              </a>
            </nav>

            <form action="/contact" method="get" style={{ marginTop: 14, display: "flex", gap: 8 }}>
              <input
                type="text"
                placeholder="Report a broken link - optional"
                aria-label="Report a broken link"
                className="pr404-field"
              />
              <button className="pr404-btn" type="submit">Send</button>
            </form>
          </aside>
        </div>

        <footer className="pr404-ftr">
          <div>© {new Date().getFullYear()} PatternRipple - Nick Panek</div>
          <div>This 404 page is custom - noindex</div>
        </footer>
      </div>
    </main>
  );
}