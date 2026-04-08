const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'ffmpeg');

// Create target directory if it doesn't exist
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Copy files from @ffmpeg/core
const coreSourceDir = path.join(__dirname, '..', 'node_modules', '@ffmpeg', 'core', 'dist', 'umd');
const coreMtSourceDir = path.join(__dirname, '..', 'node_modules', '@ffmpeg', 'core-mt', 'dist', 'umd');

// Files to copy from @ffmpeg/core
const filesToCopy = [
  'ffmpeg-core.js',
  'ffmpeg-core.wasm',
];

// Copy @ffmpeg/core files
filesToCopy.forEach(file => {
  const source = path.join(coreSourceDir, file);
  const dest = path.join(targetDir, file);

  if (fs.existsSync(source)) {
    fs.cpSync(source, dest, { force: true });
    console.log(`Copied ${file} from @ffmpeg/core`);
  } else {
    console.warn(`Source file not found: ${source}`);
  }
});

// Copy @ffmpeg/core-mt files if package exists
if (fs.existsSync(coreMtSourceDir)) {
  filesToCopy.forEach(file => {
    const source = path.join(coreMtSourceDir, file);
    const dest = path.join(targetDir, `${path.parse(file).name}-mt.${path.parse(file).ext}`);

    if (fs.existsSync(source)) {
      fs.cpSync(source, dest, { force: true });
      console.log(`Copied ${file} from @ffmpeg/core-mt as ${path.basename(dest)}`);
    }
  });
} else {
  console.log('@ffmpeg/core-mt not installed, skipping multi-thread files');
}

console.log('FFmpeg files copied successfully to public/ffmpeg/');
