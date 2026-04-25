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
- **Pattern Repeat Engine** - Generate seamless pattern tiles with vector motif creation using Paper.js
- **Motif Painter** - Browser-based paint tool with multiple brush styles (round, square, marker, spray, eraser)
- **PNG2SVG Fabric Design Vectorizer** - Convert PNG designs to vector SVG for fabric printing
- **Seamless Pattern Checker (SmoothSnap v1)** - Preview and validate seamless patterns with smooth snapping

### Audio Tools
- **Audio Looper (Desktop Edition)** - Loop audio with adjustable start/end points, tempo, and panning
- **Audio Processor** - Browser-based fades and normalize using Web Audio API

### Video Tools
- **Property Slideshow Maker** - Create quick listing videos with custom branding and aspect ratios

### Beta Tools
- **Nonogram Generator** - Convert images to nonogram puzzles with logic clues
- **QR Code Generator** - Convert text or URLs to QR codes instantly
- **EXIF Stripper** - Remove metadata from images for privacy
- **Favicon Generator** - Generate favicon sets (16px, 32px, 180px, 192px)
- **Bulk Image Resizer** - Batch resize multiple images
- **Image to ASCII Art** - Convert images to ASCII text art
- **Color Blindness Simulator** - Test design accessibility (protanopia, deuteranopia, tritanopia)

---

## 📂 Project Structure

```
app/
  software/page.tsx              # Main software listing page
  layout.tsx                     # Root layout
  page.tsx                       # Homepage
  about/                         # About page
  licenses/                      # License information
  privacy/                       # Privacy policy
  search/                        # Search functionality
public/
  colorway-generator.html
  pattern-repeat-engine.html
  motif-painter.html
  png2svg.html
  pattern-checker-smoothsnap.html
  audio-looper-panek.html
  audio-processor.html
  property-slideshow-maker.html
  nonogram-generator.html
  qr-code-generator.html
  exif-stripper.html
  favicon-generator.html
  bulk-image-resizer.html
  image-to-ascii.html
  color-blindness-simulator.html
_archive/                       # Non-published research archive
```

---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/) 14+
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- WebAssembly (for vector tracing)

---

## 📄 License

This repository is maintained by PatternRipple. All tools are free to use.

**Contact:** nickpanek.ks@gmail.com

---

## 🎨 Design Philosophy

All tools prioritize:
- **Privacy** - No server uploads, all processing happens locally
- **Simplicity** - Clean interfaces, minimal learning curve
- **Accessibility** - Works offline, no registration required
- **Performance** - Fast, lightweight, browser-native when possible
