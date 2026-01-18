# PatternRipple 3D Pro - Pattern Pack System

Complete backend system for managing themed pattern collections with 3D environments and subtle shop promotions.

## 🎯 Overview

This system allows you to:
- Create themed pattern collections (currently: Wild West / Cowboy)
- Upload and manage pattern images
- Customize 3D environments with decorations
- Add subtle Spoonflower shop links when puzzles are solved
- Support multiple pattern packs (future expansion)

## 📂 Folder Structure

```
public/
├── patternripple-3d-pro.html        # Main game with pattern pack support
├── patternripple-admin.html         # Admin interface for managing patterns
└── patternripple-data/
    ├── pattern-packs.json           # Main configuration file
    ├── cowboy-pack/                 # Cowboy theme pattern images
    │   ├── western-bandana.jpg
    │   ├── cowboy-boots.jpg
    │   ├── rodeo-rope.jpg
    │   ├── cowgirl-hat.jpg
    │   ├── western-stars.jpg
    │   └── horseshoe-lucky.jpg
    └── assets/                      # 3D models for decorations
        ├── cowboy-hat.glb
        ├── cactus.glb
        └── horseshoe.glb
```

## 🚀 Quick Start

### Step 1: Access the Admin Panel

Visit: `https://patternripple.com/patternripple-admin.html`

### Step 2: Configure Your Collection

1. **Set Collection Info**:
   - Collection Name: "Wild West Collection"
   - Description: Describe your pattern theme
   - Theme Colors: Set sky, ground, and ambient colors

2. **Add Patterns**:
   - Upload pattern image (1024x1024px recommended)
   - Enter pattern name (e.g., "Classic Bandana")
   - Add Spoonflower shop URL
   - Click "Add Pattern to Collection"

3. **Export Configuration**:
   - Click "Download pattern-packs.json"
   - Save the file

### Step 3: Upload Files to Repository

```bash
# 1. Place the JSON file
cp pattern-packs.json /path/to/repo/public/patternripple-data/

# 2. Upload pattern images (rename to match IDs)
cp classic-bandana.jpg /path/to/repo/public/patternripple-data/cowboy-pack/western-bandana.jpg
cp cowboy-boots.jpg /path/to/repo/public/patternripple-data/cowboy-pack/cowboy-boots.jpg
# ... etc

# 3. Commit and push
git add public/patternripple-data/
git commit -m "Add cowboy pattern collection"
git push origin main
```

### Step 4: Test the Game

Visit: `https://patternripple.com/patternripple-3d-pro.html`

## 🎨 Pattern Image Requirements

### Specifications
- **Format**: JPG or PNG
- **Size**: 1024x1024 pixels (square)
- **Max File Size**: 500KB per image (for fast loading)
- **Naming**: Use lowercase with hyphens (e.g., `western-bandana.jpg`)

### Best Practices
- High contrast patterns work best for puzzles
- Seamless/tileable patterns create more engaging gameplay
- Avoid very dark or very light patterns
- Test patterns in the game before final upload

### Image Optimization
```bash
# Using ImageMagick to resize and optimize
convert input.jpg -resize 1024x1024 -quality 85 output.jpg
```

## 🤠 Cowboy Theme Configuration

### Current Setup

The Wild West Collection includes:
- **Environment**: Desert sky blue, tan ground
- **Decorations**: Cowboy hat, cactus, horseshoe (geometric placeholders)
- **Patterns**: 6 western-themed fabric designs

### Adding More Patterns

To add patterns to the cowboy collection:

1. Open admin panel
2. Upload new pattern image
3. Set name and shop URL
4. Export updated JSON
5. Upload new pattern image to `cowboy-pack/`
6. Replace `pattern-packs.json`
7. Deploy

## 🎯 Subtle Promotion Strategy

### Victory Screen Design

When a user solves the puzzle:

✅ **What it shows (subtle)**:
- Large "Solved!" message with cowboy emoji
- Pattern name displayed
- Small text: "Pattern: [Name]"
- Discrete link: "View on Spoonflower →"
- Link only appears if pattern has shop URL

❌ **What it doesn't show (not subtle)**:
- No giant "BUY NOW" buttons
- No pop-up overlays
- No flashy colors or animations
- No countdown timers or urgency tactics

### Customizing the Victory Message

Edit in `patternripple-3d-pro.html` around line 420:

```javascript
function onVictory() {
    // ... tile animation code ...

    setTimeout(() => {
        if (currentPattern && currentPattern.shopUrl) {
            document.getElementById('pattern-name').textContent = currentPattern.name;
            document.getElementById('pattern-shop-link').href = currentPattern.shopUrl;
            // Link is shown as small text, not a button
        }
        document.getElementById('victory-overlay').classList.add('show');
    }, 1000);
}
```

## 🎮 Game Features

### Pattern Selection
- Users choose from available patterns
- Thumbnail grid with pattern names
- Hover effects for engagement
- Click to load and play

### Puzzle Mechanics
- 3x3 sliding tile puzzle
- Smooth GSAP animations with elastic easing
- Move counter tracking
- Shuffle button for replay
- Custom pattern upload option

### 3D Environment
- Themed background colors
- Studio lighting for fabric realism
- MeshPhysicalMaterial with sheen effects
- Decorative 3D objects (placeholders for now)
- OrbitControls for camera movement

## 🔧 Adding 3D Models

### Decoration System

The game supports GLB/GLTF 3D models for decorations.

**Current placeholders**:
- Cowboy hat → Brown cylinder
- Cactus → Green cylinder
- Horseshoe → Silver torus

**To add real 3D models**:

1. Create or download GLB/GLTF models
2. Place in `/public/patternripple-data/assets/`
3. Update `pattern-packs.json` with file paths:

```json
"decorations": [
    {
        "type": "model",
        "url": "/patternripple-data/assets/cowboy-hat.glb",
        "position": [-3, 0.5, 2],
        "scale": 0.5,
        "rotation": [0, 0.5, 0]
    }
]
```

### Where to Get 3D Models

**Free sources**:
- [Sketchfab](https://sketchfab.com/) - Search "cowboy", "western", filter by "Downloadable"
- [Poly Pizza](https://poly.pizza/) - Free low-poly models
- [Quaternius](http://quaternius.com/) - CC0 asset packs

**Creating your own**:
- [Blender](https://www.blender.org/) - Free 3D modeling software
- Export as GLB format
- Keep poly count under 5,000 triangles per model
- Bake textures for best performance

### Model Optimization

```bash
# Using gltf-pipeline to optimize
npm install -g gltf-pipeline
gltf-pipeline -i input.glb -o output.glb -d
```

## 🎯 Creating Additional Pattern Packs

### Future Expansion

To add new themed collections (e.g., "Floral Fantasy", "Geometric Dreams"):

1. **In pattern-packs.json**, add new pack object:

```json
{
    "id": "floral-fantasy",
    "name": "Floral Fantasy Collection",
    "theme": "floral",
    "description": "Beautiful botanical patterns",
    "environment": {
        "skyColor": "#FFE4E1",
        "groundColor": "#90EE90",
        "ambientColor": "#FFF0F5"
    },
    "decorations": [
        {
            "type": "model",
            "url": "/patternripple-data/assets/flower-pot.glb",
            "position": [-3, 0.5, 2],
            "scale": 0.5,
            "rotation": [0, 0.5, 0]
        }
    ],
    "patterns": [
        // ... pattern list
    ]
}
```

2. **Create folder**: `/public/patternripple-data/floral-pack/`
3. **Upload patterns** to new folder
4. **Update game** to show pack selector (future enhancement)

## 📊 Analytics & Tracking

### Recommended Tracking

To understand which patterns are popular:

```html
<!-- Add to victory screen onclick -->
<script>
if (typeof gtag !== 'undefined') {
    gtag('event', 'puzzle_solved', {
        'pattern_id': currentPattern.id,
        'pattern_name': currentPattern.name,
        'move_count': moveCount,
        'collection': 'cowboy'
    });
}
</script>
```

## 🐛 Troubleshooting

### Patterns Not Loading

**Problem**: Pattern images show placeholders
**Solutions**:
- Check image paths match pattern IDs exactly
- Verify images are in `/public/patternripple-data/cowboy-pack/`
- Check browser console for 404 errors
- Ensure images are JPG format

### 3D Models Not Appearing

**Problem**: Decorations don't show
**Note**: Currently using geometric placeholders. To use real models:
- Upload GLB files to `assets/` folder
- Verify file paths in JSON
- Check model file size (keep under 1MB each)
- Test GLB files at [gltf.report](https://gltf.report/)

### Colors Not Applying

**Problem**: Theme colors don't change
**Solutions**:
- Clear browser cache
- Verify hex color codes in JSON
- Check pattern-packs.json is valid JSON
- Reload page completely

## 🔐 Security Notes

### Admin Panel

The admin panel (`patternripple-admin.html`) is client-side only:
- No server-side storage
- All processing happens in browser
- Downloads JSON for manual upload
- Consider adding authentication if public

### Shop URLs

Always validate Spoonflower URLs:
- Use full HTTPS URLs
- Format: `https://www.spoonflower.com/profiles/[yourshop]/[pattern]`
- Test links before deployment

## 📈 Performance Optimization

### Image Loading
- Lazy load pattern thumbnails
- Preload current pattern texture
- Use WebP format for smaller sizes
- Implement progressive JPEG

### 3D Assets
- Keep models under 1MB each
- Use Draco compression for GLB
- Limit to 3-5 decorations per scene
- Optimize texture sizes

### JavaScript
- Already using CDN for Three.js and GSAP
- Minify for production
- Enable gzip compression
- Cache pattern-packs.json

## 🚀 Deployment Checklist

Before pushing to production:

- [ ] Test all patterns load correctly
- [ ] Verify all shop URLs work
- [ ] Check theme colors look good
- [ ] Test on mobile devices
- [ ] Optimize all images (under 500KB each)
- [ ] Validate pattern-packs.json
- [ ] Test puzzle solve flow
- [ ] Verify victory screen links
- [ ] Check 3D decorations render
- [ ] Test custom upload still works

## 📞 Support

For issues or questions:
- Email: nick@patternripple.com
- Check browser console for errors
- Validate JSON at [jsonlint.com](https://jsonlint.com/)

---

**Built with**: Three.js, GSAP, vanilla JavaScript
**Version**: 1.0
**Last Updated**: January 2026
