# HandDraw

Whiteboard and chalkboard hand-draw animation desktop app. Offline-first, export to MP4 and WebM.

## Download

Go to [Releases](https://github.com/Nickpanek/patternripple-pages/releases) and download:
- **Linux**: `.AppImage` or `.deb`
- **macOS**: `.dmg` (macOS 13+)
- **Windows**: `.exe` installer (Windows 10 22H2+)

## Quickstart (GitHub Web UI Only)

1. Navigate to this repository on GitHub.
2. Go to the **Actions** tab to see builds.
3. When builds complete, check **Releases** for installers.
4. Download and run the installer for your platform.

## Usage

1. **Import SVG**: Click "Add SVG" to load vector artwork.
2. **Add Audio**: Click "Add Audio" to upload MP3/WAV/M4A.
3. **Create Segments**: In the timeline, add stroke segments with start/duration.
4. **Preview**: Click Play to preview animation with hand pointer.
5. **Export**: Click "Export MP4" or "Export WebM" to render final video at 1080p30 or 720p30.

## Project Storage

Projects are saved in:
- **Linux**: `~/.local/share/handdraw/`
- **macOS**: `~/Library/Application Support/HandDraw/`
- **Windows**: `%AppData%\HandDraw\`

Project files use `.handdraw` extension (JSON + asset folder).

## Licensing

### App License

This app is licensed under the MIT License. See [LICENSE](LICENSE).

### FFmpeg-kit LGPL Compliance

This app uses [ffmpeg-kit](https://github.com/arthenica/ffmpeg-kit) LGPL build with **dynamic linking** to comply with LGPL v2.1. See [third_party/ffmpeg-kit/NOTICE.md](third_party/ffmpeg-kit/NOTICE.md) for details.

FFmpeg-kit binaries are downloaded during CI builds and linked dynamically. Source code and build instructions are available at the ffmpeg-kit repository.

### Placeholder Assets

Placeholder hand pointers and chalk texture are CC0 (public domain):
- `hand-right.png`, `hand-left.png`, `chalk.png`

**Attribution**: Placeholders are minimal 1x1 PNGs. Replace with your own assets or download CC0 resources from [OpenGameArt](https://opengameart.org/) or [Pixabay](https://pixabay.com/).

## Development

Built with:
- **Tauri** (Rust + HTML/CSS/TypeScript)
- **FFmpeg-kit** (LGPL dynamic linking)
- **Web Audio API** for preview
- **SVG stroke reveal** with `stroke-dasharray`

CI builds on GitHub Actions for Linux, macOS, and Windows.

## Support

Open an issue on GitHub for bugs or feature requests.
