export const metadata = { title: 'PatternRipple', description: 'Seamless patterns' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 1200, margin: '0 auto' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
          <a href="/">PatternRipple</a>
          <nav><a href="/studio">Studio</a></nav>
        </header>
        {children}
      </body>
    </html>
  );
}
