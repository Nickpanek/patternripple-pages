"use client";

import { useEffect, useState } from "react";

export default function CheckerPage() {
  // Make the iframe fill the viewport minus a small header
  const [vh, setVh] = useState(0);
  useEffect(() => {
    const set = () => setVh(window.innerHeight);
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: "#0b0b0c",
        color: "#eaeaf0",
      }}
    >
      <header
        style={{
          padding: "12px 16px",
          borderBottom: "1px solid #232327",
          background: "#151518",
          fontSize: 14,
          letterSpacing: 0.2,
        }}
      >
        Seamless Pattern Checker
      </header>

      <div style={{ flex: 1, minHeight: 0 }}>
        <iframe
          src="/checker.html"
          title="Seamless Pattern Checker"
          style={{
            width: "100%",
            height: Math.max(0, vh - 50), // header ~50px
            border: "0",
            display: "block",
            background: "#0b0b0c",
          }}
        />
      </div>
    </main>
  );
}
