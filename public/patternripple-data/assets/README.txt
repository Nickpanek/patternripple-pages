🎨 3D Model Assets

Place your 3D decoration models here.

Required format:
- GLB or GLTF format
- File size: Under 1MB per model
- Optimized for web (low poly count)
- Include baked textures

Cowboy Theme Models Needed:
✅ cowboy-hat.glb - Western hat model
✅ cactus.glb - Desert cactus
✅ horseshoe.glb - Lucky horseshoe

Current Status:
⚠️  Game uses geometric placeholders until you upload real models
⚠️  Placeholders: cylinders, torus shapes with themed colors

Where to Get Models:
1. Sketchfab.com - Search "cowboy western" with Downloadable filter
2. Poly.pizza - Free low-poly models (CC0)
3. Quaternius.com - Asset packs
4. Create in Blender and export as GLB

Model Requirements:
- Max 5,000 triangles per model
- Baked textures (PBR materials)
- Centered at origin
- Unit scale (will be scaled in game)
- GLB format (single file with embedded textures)

Optimization:
npm install -g gltf-pipeline
gltf-pipeline -i input.glb -o output.glb -d

Position & Scale:
Configured in pattern-packs.json:
{
  "position": [x, y, z],  // World coordinates
  "scale": 0.5,           // Size multiplier
  "rotation": [x, y, z]   // Rotation in radians
}

Tips:
- Keep models simple and clean
- Use western theme colors
- Test in game after upload
- Position decorations around puzzle area
- Don't block puzzle view
