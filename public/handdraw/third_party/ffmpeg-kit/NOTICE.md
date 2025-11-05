# FFmpeg-kit LGPL Notice

This application uses **FFmpeg-kit** under the LGPL v2.1 license.

## Dynamic Linking

To comply with LGPL v2.1, this application **dynamically links** to FFmpeg-kit libraries. The FFmpeg-kit binaries are:
- Downloaded during CI builds from the official FFmpeg-kit releases
- Packaged separately and loaded at runtime
- Not statically compiled into this application

## Source Code

FFmpeg-kit source code and build instructions are available at:
- **GitHub**: [https://github.com/arthenica/ffmpeg-kit](https://github.com/arthenica/ffmpeg-kit)
- **License**: LGPL v2.1

Users may replace the bundled FFmpeg-kit binaries with their own builds as permitted under LGPL.

## FFmpeg License

FFmpeg itself is licensed under LGPL v2.1 (or later) when built without GPL components. This application uses the LGPL build of FFmpeg-kit, which excludes GPL-only codecs.

For more information:
- FFmpeg: [https://ffmpeg.org/legal.html](https://ffmpeg.org/legal.html)
- LGPL v2.1: [https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html](https://www.gnu.org/licenses/old-licenses/lgpl-2.1.html)
