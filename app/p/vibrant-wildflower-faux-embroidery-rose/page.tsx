import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Image preloads */}
        <link
          rel="preload"
          as="image"
          href="https://files.patternripple.com/PR-flo-20250916-001-preview.jpg"
        />
        <link
          rel="preload"
          as="image"
          href="https://files.patternripple.com/PR-flo-20250916-001-mockup1.jpg"
        />
        <link
          rel="preload"
          as="image"
          href="https://files.patternripple.com/PR-flo-20250916-001-mockup2.jpg"
        />
        <link
          rel="preload"
          as="image"
          href="https://files.patternripple.com/PR-flo-20250916-001-mockup3.jpg"
        />

        {/* CSS */}
        <link
          rel="stylesheet"
          href="/_next/static/css/5b208091ad916c5a.css"
          data-precedence="next"
        />

        {/* Metadata */}
        <meta name="description" content="Exclusive digital patterns that no one else will have. Once sold, it's yours forever." />
      </Head>
      <body className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
