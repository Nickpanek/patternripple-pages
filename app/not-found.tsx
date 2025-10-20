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
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        margin: 0,
        background: "linear-gradient(180deg,#0b1020 0%, #0e1630 100%)",
        color: "#e6eefc",
        fontFamily:
          'ui-sans-serif,system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif',
      }}
    >
      <div
        className="wrap"
        style={{
          width: "100%",
          maxWidth: 920,
          border: "2px solid #243060",
          borderRadius: 16,
          background:
            "linear-gradient(transparent 23px, #1a2450 24px) 0 0/100% 24px," +
            "linear-gradient(90deg, transparent 23px, #1a2450 24px) 0 0/24px 100%," +
            "#111834",
          boxShadow:
            "0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.05)",
          padding: 28,
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 18,
            borderBottom: "2px solid #243060",
            paddingBottom: 12,
          }}
        >
          <div
            aria-hidden="true"
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background:
                "radial-gradient(circle at 35% 35%, #fff, #6ee7ff 35%, #1a2b3f 60%)",
              boxShadow: "0 0 10px #6ee7ff",
            }}
          />
          <div
            id="page-title"
            className="title"
            style={{
              fontWeight: 800,
              letterSpacing: 0.5,
              fontSize: 18,
              color: "#b3e1ff",
              textShadow: "0 0 8px rgba(110,231,255,.35)",
            }}
          >
            PatternRipple system - 404
          </div>
        </header>

        <div
          className="content"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 24,
          }}
        >
          <section>
            <div
              aria-live="polite"
              style={{
                background:
                  "linear-gradient(90deg,#6ee7ff,#88ffb4)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontSize: 96,
                lineHeight: 1,
                fontWeight: 900,
                margin: "8px 0 4px",
                textShadow: "0 0 18px rgba(136,255,180,.2)",
              }}
            >
              404
            </div>

            <p style={{ color: "#8ba0c8", marginBottom: 18 }}>
              The page you tried to reach is not here. Try these options.
            </p>

            <pre
              aria-label="Decorative ascii art cat"
              role="img"
              style={{
                fontFamily:
                  "ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,monospace",
                fontSize: 12,
                lineHeight: 1.1,
                color: "#e6eefc",
                opacity: 0.9,
                background: "#0e1533",
                border: "1px solid #243060",
                borderRadius: 10,
                padding: 14,
                maxHeight: 240,
                overflow: "auto",
              }}
            >{String.raw`  /\_/\      /\_/\      /\_/\
 ( o.o )    ( o.o )    ( o.o )   meow
  > ^ <      > ^ <      > ^ <`}</pre>

            <div
              className="actions"
              style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 16 }}
            >
              <a className="btn primary" href="/" style={btnPrimary}>
                Go home
              </a>
              <a className="btn" href="/tools/" style={btn}>
                All tools
              </a>
              <a className="btn" href="/collections" style={btn}>
                Collections
              </a>
              <a className="btn" href="/contact" style={btn}>
                Contact
              </a>
            </div>

            <form
              role="search"
              action="/search"
              method="get"
              style={{ marginTop: 14, display: "flex", gap: 8 }}
            >
              <input
                className="field"
                type="search"
                name="q"
                placeholder="Search PatternRipple"
                aria-label="Search PatternRipple"
                style={field}
              />
              <button className="btn" type="submit" style={btn}>
                Search
              </button>
            </form>

            <div
              aria-hidden="true"
              style={{
                marginTop: 10,
                border: "1px solid #243060",
                borderRadius: 10,
                padding: "6px 10px",
                background: "#0b122d",
                color: "#8ba0c8",
              }}
            >
              _ tip - drop any image into Pattern Checker to preview it as a seamless tile
            </div>

            <p style={{ marginTop: 10, color: "#8ba0c8", fontSize: 13 }}>
              No gifs. No audio. Pure html-css. Fast load.
            </p>
          </section>

          <aside
            aria-labelledby="quick-links"
            style={{
              border: "1px solid #243060",
              borderRadius: 12,
              background: "#0e1533",
              padding: 14,
            }}
          >
            <h3 id="quick-links" style={{ margin: "0 0 8px", fontSize: 14, color: "#b3e1ff" }}>
              Quick links
            </h3>

            <nav aria-label="Popular pages" style={{ display: "grid", gap: 8 }}>
              <a href="/tools/pattern-checker.html" style={navLink}>
                <span>Pattern Checker</span><small style={{ color: "#8ba0c8" }}>preview seamless tiles</small>
              </a>
              <a href="/tools/seamless-pattern.html" style={navLink}>
                <span>Seamless Pattern Maker</span><small style={{ color: "#8ba0c8" }}>tile from an image</small>
              </a>
              <a href="/tools/video-audio-mixer.html" style={navLink}>
                <span>Video Audio Mixer</span><small style={{ color: "#8ba0c8" }}>mix audio into a video</small>
              </a>
              <a href="/tools/audio-loop-creator.html" style={navLink}>
                <span>Audio Loop Creator</span><small style={{ color: "#8ba0c8" }}>find loop points</small>
              </a>
            </nav>

            <form
              action="/contact"
              onSubmit={(e) => { e.preventDefault(); location.href = "/contact"; }}
              style={{ marginTop: 14, display: "flex", gap: 8 }}
            >
              <input
                type="text"
                placeholder="Report a broken link - optional"
                aria-label="Report a broken link"
                style={field}
              />
              <button className="btn" type="submit" style={btn}>
                Send
              </button>
            </form>
          </aside>
        </div>

        <footer
          style={{
            marginTop: 20,
            paddingTop: 12,
            borderTop: "2px solid #243060",
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 10,
            color: "#8ba0c8",
          }}
        >
          <div>© {new Date().getFullYear()} PatternRipple - Nick Panek</div>
          <div>This 404 page is custom - noindex</div>
        </footer>
      </div>
    </main>
  );
}

const btn = {
  appearance: "none",
  border: "1px solid #243060",
  background: "#0f1a3a",
  color: "#e6eefc",
  padding: "10px 14px",
  borderRadius: 10,
  textDecoration: "none",
  fontWeight: 700 as const,
  boxShadow: "inset 0 0 0 1px rgba(255,255,255,.05)",
};

const btnPrimary = {
  ...btn,
  background: "linear-gradient(90deg,#102452,#123a5e)",
  borderColor: "#275a86",
};

const field = {
  flex: 1,
  background: "#0c1330",
  border: "1px solid #243060",
  color: "#e6eefc",
  padding: "10px 12px",
  borderRadius: 10,
  outline: "none",
} as const;

const navLink = {
  color: "#e6eefc",
  textDecoration: "none",
  border: "1px dashed #243060",
  padding: "10px 12px",
  borderRadius: 8,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};