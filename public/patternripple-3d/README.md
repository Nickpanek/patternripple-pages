# PatternRipple 3D - Fabric Puzzle Game

A beautiful 3D sliding tile puzzle game built with Three.js to showcase fabric patterns from your Spoonflower shop. The tiles feature realistic fabric materials with sheen effects and smooth, physics-inspired animations.

## 🎨 Features

- **Realistic Fabric Materials**: Uses Three.js MeshPhysicalMaterial with sheen properties to simulate textile swatches
- **Studio Lighting**: Professional lighting setup with directional lights and blue-tinted rim lighting
- **Smooth Animations**: GSAP-powered animations with elastic easing for satisfying tile movement
- **Interactive Puzzle**: Classic 3x3 sliding puzzle with move counter and shuffle functionality
- **Victory State**: Seamless reveal with direct link to your Spoonflower shop

## 📁 Project Structure

```
patternripple-3d/
├── index.html          # Main HTML file with UI overlay
├── main.js            # Three.js game logic
├── assets/            # Pattern textures folder
│   └── pattern1.jpg   # Your fabric pattern (ADD THIS!)
└── README.md          # This file
```

## 🖼️ Adding Your Patterns

### Asset Requirements

1. **Image Format**: JPG or PNG
2. **Recommended Size**: 1024x1024 pixels (square)
3. **Aspect Ratio**: Must be square (1:1) for best results
4. **File Size**: Keep under 2MB for fast loading

### Steps to Add a Pattern

1. **Add your pattern image** to the `assets/` folder:
   ```
   assets/pattern1.jpg
   ```

2. **To use different patterns**, update the path in `main.js`:
   ```javascript
   const CONFIG = {
       // ...
       patternPath: './assets/pattern1.jpg', // Change this
       spoonflowerURL: 'https://www.spoonflower.com/profiles/YOUR-SHOP' // Update this!
   };
   ```

3. **For multiple patterns**, you can create different versions:
   - `pattern1.jpg` - Floral design
   - `pattern2.jpg` - Geometric design
   - `pattern3.jpg` - Abstract design

## 🎮 How to Play

1. **Click** on any tile adjacent to the empty space
2. The tile will **slide** into the empty spot with a satisfying bounce
3. **Arrange all tiles** to complete the pattern
4. When solved, gaps disappear and a **"Shop on Spoonflower"** button appears

## 🔧 Customization Options

### Change Grid Size

In `main.js`, modify the `CONFIG` object:

```javascript
const CONFIG = {
    gridSize: 4,  // Change from 3x3 to 4x4
    // ...
};
```

### Adjust Tile Appearance

Modify the material properties for different fabric effects:

```javascript
const material = new THREE.MeshPhysicalMaterial({
    // ...
    roughness: 0.7,        // Higher = more matte (0.0 - 1.0)
    sheen: 1.0,           // Fabric sheen intensity (0.0 - 1.0)
    sheenRoughness: 0.5,  // Sheen smoothness (0.0 - 1.0)
    bumpScale: 0.02,      // Fabric weave depth (0.0 - 0.1)
});
```

### Adjust Animation Speed

Change the GSAP animation duration:

```javascript
gsap.to(tile.position, {
    // ...
    duration: 0.6,  // Increase for slower, decrease for faster
    ease: "back.out(1.7)",  // Adjust the number for more/less bounce
});
```

### Update Spoonflower Link

In `main.js`, update your shop URL:

```javascript
const CONFIG = {
    // ...
    spoonflowerURL: 'https://www.spoonflower.com/profiles/your-shop-name'
};
```

## 🧪 Local Testing

To test locally, run from the repository root:

```bash
npm run dev
```

Then visit: `http://localhost:3000/patternripple-3d/`

Or use a simple HTTP server:

```bash
# Python
python -m http.server 8000

# Node.js
npx http-server -p 8000
```

Then visit: `http://localhost:8000/public/patternripple-3d/`

## 🎨 Creating Pattern Images

### Tips for Best Results

1. **High Contrast**: Patterns with good contrast work best for the puzzle
2. **Seamless Tiles**: If your Spoonflower pattern tiles, the puzzle will show this beautifully
3. **Square Crops**: Crop your patterns to square format before uploading
4. **Central Focus**: Patterns with a central focal point create more engaging puzzles

### Recommended Tools

- **Photoshop/GIMP**: For cropping and adjusting
- **Figma**: For creating test patterns
- **Spoonflower's Preview Tool**: Export your pattern preview

## 📝 File Descriptions

### `index.html`
- Main HTML structure
- UI overlays (title, move counter, victory message)
- Three.js and GSAP imports via CDN
- Responsive styling

### `main.js`
- Three.js scene setup and rendering
- Studio lighting configuration
- Puzzle logic and state management
- Click detection with raycasting
- GSAP animations
- Victory detection
- Shuffle algorithm

## 🐛 Troubleshooting

### Pattern Not Loading

**Problem**: "Error loading pattern" message appears

**Solutions**:
- Verify `pattern1.jpg` exists in the `assets/` folder
- Check the file name matches exactly (case-sensitive)
- Ensure you're running a local server (not opening `index.html` directly)
- Check browser console for CORS errors

### Tiles Look Plastic, Not Fabric-Like

**Problem**: Materials don't look like fabric

**Solutions**:
- Increase `sheen` value (try 1.5)
- Adjust `sheenRoughness` (try 0.3 for silkier fabric)
- Add a proper bump map texture for fabric weave
- Adjust lighting intensity

### Animations Are Too Fast/Slow

**Problem**: Tile movement feels wrong

**Solutions**:
- Adjust `duration` in `gsap.to()` calls
- Change the ease function (try "elastic.out" for more bounce)
- Modify the `back.out()` parameter for different spring effects

### Victory Detection Not Working

**Problem**: Puzzle solved but victory screen doesn't appear

**Solutions**:
- Check browser console for errors
- Ensure tiles are fully animated before checking victory
- Verify empty slot is in bottom-right corner

## 🎯 Future Enhancement Ideas

- **Multiple Patterns**: Add a pattern selector
- **Difficulty Levels**: 2x2, 3x3, 4x4, 5x5 grids
- **Timer Mode**: Speed-run challenge
- **Leaderboard**: Track best times
- **Preview Button**: Show completed pattern
- **Mobile Touch**: Swipe gestures for tile movement
- **Sound Effects**: Satisfying audio feedback
- **Share Feature**: Share your solve time on social media

## 🚀 Deployment

This tool is part of the PatternRipple website and deploys automatically via Cloudflare Pages when pushed to the main branch.

Access the live version at: `https://patternripple.com/patternripple-3d/`

---

**Enjoy showcasing your beautiful fabric patterns with PatternRipple 3D!** 🎨✨
