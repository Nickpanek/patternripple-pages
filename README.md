# PatternRipple - Free Creative Software for Creators

This repository contains the codebase for **PatternRipple**, a collection of free browser-based creative tools for designers, artists, and creators. Built with **Next.js**. All tools run entirely client-side with no server uploads required.

---

## 🚀 Features

- **Next.js 14+ (App Router)** - Modern React framework
- **Fully static export** - No backend required
- **Client-side processing** - Privacy-first, no data uploads
- **SEO optimized** - Open Graph, Twitter cards, JSON-LD structured data
- **Mobile responsive** - Works on desktop and mobile devices
- **Zero installation** - All tools run directly in the browser

---

## 🛠️ Available Tools

### Design Tools
- **Colorway Generator** - Recolor pattern images across 8 preset hues and export as ZIP
- **Seamless Pattern Creator** - Create repeating tile patterns with offset/wrap controls
- **PNG2SVG Fabric Design Vectorizer** - Convert PNG designs to vector SVG for fabric printing
- **Seamless Pattern Checker (SmoothSnap)** - Preview and validate seamless patterns

### Audio Tools
- **Audio Looper (Desktop Edition)** - Loop audio with adjustable controls and tempo
- **Audio Processor** - Add fades and normalize audio levels

### Video Tools
- **Property Slideshow Maker** - Create listing videos with custom branding

---

## 📂 Project Structure

```
app/
  software/page.tsx      # Main software listing page
  layout.tsx             # Root layout
  page.tsx               # Homepage
public/
  colorway-generator.html
  seamless-pattern-creator.html
  png2svg.html
  pattern-checker-smoothsnap.html
  audio-looper-panek.html
  audio-processor.html
  property-slideshow-maker.html
_archive/                # Non-published research archive
```

---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/) 14+
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- WebAssembly (for vector tracing)

---

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Export static site
npm run export
```

---

## ✨ Adding a New Tool

1. Create the tool as a standalone HTML file in `public/`
2. Add entry to `app/software/page.tsx`:
   ```typescript
   {
     slug: "tool-name",
     title: "Tool Name",
     href: "/tool-name.html",
     summary: "Brief description of the tool",
     badge: "Design" | "Audio" | "Video",
   }
   ```
3. Update the `order` object with the display order
4. Test locally and commit

---

## 📄 License

This repository is maintained by PatternRipple. All tools are free to use.

**Contact:** nick@patternripple.com

---

## 🎨 Design Philosophy

All tools prioritize:
- **Privacy** - No server uploads, all processing happens locally
- **Simplicity** - Clean interfaces, minimal learning curve
- **Accessibility** - Works offline, no registration required
- **Performance** - Fast, lightweight, browser-native when possible
