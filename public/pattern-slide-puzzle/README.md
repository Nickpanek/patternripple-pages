# PatternRipple Slide Puzzle - Online Edition 2025

## Objective
Online only 3x3 sliding puzzle that promotes PatternRipple designs. Daily theme uses server time. Adds per pack looping music with a Gumroad CTA.

## Folders
```
public/pattern-slide-puzzle/
├─ index.html
├─ _headers
├─ img/                  # 900x900 jpg or png
├─ collections/
│  ├─ faux-embroidery.json
│  ├─ impasto-floral.json
│  ├─ midcentury.json
│  ├─ geometric.json
│  ├─ ufo-retro.json
│  ├─ tropical.json
│  ├─ minimal.json
│  ├─ maximalist.json
│  └─ audio.json         # per theme music meta
└─ audio/
   ├─ faux-embroidery.mp3
   ├─ impasto-floral.mp3
   └─ …
```

## Collection Item Example
```json
{
  "id": "rose-grid",
  "title": "Rose Grid Faux Embroidery",
  "img": "../img/rose-grid.jpg",
  "url": "https://www.spoonflower.com/en/fabric/rose-grid?utm_source=patternripple&utm_medium=slide-puzzle&utm_campaign=faux-embroidery"
}
```

## Audio.json Example
```json
{
  "faux-embroidery": {
    "title": "Faux Embroidery Theme",
    "src": "../audio/faux-embroidery.mp3",
    "buy": "https://gumroad.com/l/faux-embroidery-theme?utm_source=patternripple&utm_medium=slide-puzzle&utm_campaign=audio"
  }
}
```

## Worker Route
Create a Cloudflare Worker and route it to `/api/now`:

```javascript
export default {
  async fetch(req) {
    const d = new Date();
    const iso = d.toISOString().slice(0,10);
    return new Response(JSON.stringify({ date: iso }), {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'no-store'
      }
    });
  }
};
```

## Cache Headers
The `_headers` file ensures collections and content are not cached:

```
/pattern-slide-puzzle/*
  Cache-Control: no-store, no-cache, must-revalidate, max-age=0
  Pragma: no-cache
  Expires: 0

/pattern-slide-puzzle/collections/*
  Cache-Control: no-store, no-cache, must-revalidate, max-age=0
  Pragma: no-cache
  Expires: 0
```

## SEO and Analytics
- Canonical and OG tags in head
- UTM on all Spoonflower links
- Event `puzzle_complete` sent via gtag
- Optional link hub: https://heylink.me/nickpanek/

## Performance and UX
- Images ≤ 250 KB
- Pure JS and CSS grid
- Touch and keyboard supported
- Music starts only after user gesture per browser policy

## Asset Guidelines

### Image Assets (img/ folder)
- Format: JPG or PNG
- Dimensions: 900x900 pixels (square)
- File size: ≤ 250 KB per image
- Naming: Use descriptive kebab-case names matching the JSON IDs
- Example: `rose-grid.jpg`, `thick-paint-roses.jpg`

### Audio Assets (audio/ folder)
- Format: MP3
- Loop-ready: Ensure seamless looping
- File size: Recommended < 2 MB
- Naming: Match theme IDs (e.g., `faux-embroidery.mp3`)
- Quality: 128-192 kbps for web delivery

## Adding New Themes

1. Create a new JSON file in `collections/` (e.g., `seasonal-winter.json`)
2. Add 12 pattern entries following the template structure
3. Add theme to the THEMES array in `index.html`:
   ```javascript
   { id:"seasonal-winter", title:"Seasonal Winter" }
   ```
4. Add audio metadata to `collections/audio.json`
5. Upload pattern images to `img/`
6. Upload theme music to `audio/`

## Adding New Patterns to Existing Themes

1. Open the appropriate collection JSON file
2. Add new pattern object with required fields:
   - `id`: Unique kebab-case identifier
   - `title`: Display name
   - `img`: Path to image in img/ folder
   - `url`: Spoonflower link with proper UTM parameters
3. Upload the 900x900 image to `img/` folder
4. Ensure UTM campaign matches the theme name

## Weekly Content Cadence
- Add 1 new themed set per week
- Update ads and social to the new theme
- Review analytics by `utm_campaign` per theme

## Roadmap
- Screenshot share with watermark
- 4x4 and 5x5 difficulty modes
- Leaderboard via localStorage
- Seasonal themes (Halloween, Holiday)
- Random pattern of the day widget

## Launch Checklist
- [ ] All 8 theme collections populated with real Spoonflower links
- [ ] All pattern images uploaded (96 total at launch)
- [ ] Audio tracks uploaded for each theme
- [ ] Cloudflare Worker deployed at `/api/now`
- [ ] Test daily theme rotation
- [ ] Test puzzle mechanics on mobile and desktop
- [ ] Verify all Spoonflower links include proper UTM tags
- [ ] Test audio controls on all major browsers
- [ ] Verify cache headers are working
- [ ] Set up analytics tracking

## Support
For issues or questions, contact: nick@patternripple.com
