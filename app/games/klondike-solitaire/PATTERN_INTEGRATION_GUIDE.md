# Klondike Solitaire - Pattern Integration Guide

This guide explains how to integrate your custom pattern designs into the Klondike Solitaire game to create unique card backs that can be sold through the Pattern Pack system.

## 📁 File Structure

```
/public/games/klondike-solitaire/patterns/
├── plaid_back.png
├── cowboy_back.png
└── op_art_back.png
```

## 🎨 Pattern File Requirements

### File Naming Convention

Use the following naming pattern for your design files:
```
[pack-name]_back.png
```

Examples:
- `plaid_back.png` - For the Plaid pack
- `cowboy_back.png` - For the Cowboy pack
- `op_art_back.png` - For the Op Art pack

### File Format

- **Format**: PNG (recommended) or JPG
- **Recommended Dimensions**: 200px × 280px (standard card back ratio of 5:7)
- **Minimum Dimensions**: 150px × 210px
- **Maximum File Size**: Keep under 500KB for fast loading

### Design Considerations

1. **Orientation**: Design should work in portrait orientation (taller than wide)
2. **Safe Area**: Keep important design elements away from the edges (10px margin recommended)
3. **Color Depth**: Use 24-bit color for best quality
4. **Transparency**: Can use transparency, but solid backgrounds work best

## ⚙️ Configuring Your Pattern Pack

Open `/app/games/klondike-solitaire/page.tsx` and locate the `themePacks` object (around line 47).

### Basic Configuration

```typescript
yourPackName: {
  id: "yourPackName",
  name: "Your Pack Display Name",
  cardBackImage: "/games/klondike-solitaire/patterns/your_back.png",
  backgroundColor: "#1a1a1a",
  backgroundSize: "100% 100%",
  shopLink: "https://buy.stripe.com/your-product-link",
}
```

### Configuration Properties Explained

#### `id` (string)
- Unique identifier for the pack
- Use camelCase (e.g., "myCustomPack")
- Must match the object key

#### `name` (string)
- Display name shown in the pattern selector dropdown
- Example: "My Custom Pack" or "Vintage Western"

#### `cardBackImage` (string)
- Path to your pattern image file
- Must start with `/games/klondike-solitaire/patterns/`
- Example: `"/games/klondike-solitaire/patterns/vintage_back.png"`

#### `backgroundColor` (string)
- CSS color value for the game board background
- Should complement your card back design
- Examples:
  - `"#1a1a1a"` - Dark gray
  - `"#2a1810"` - Dark brown
  - `"#0a0a0a"` - Near black

#### `backgroundSize` (string) - **IMPORTANT FOR PATTERN SCALING**
This property controls how your pattern image fits on the card back.

**For Seamless/Tiling Patterns:**
```typescript
backgroundSize: "100% 100%"
```
- Stretches pattern to fill card exactly
- Best for patterns designed to tile seamlessly
- Pattern repeats if card dimensions differ from image

**For Non-Seamless/Single Image Designs:**
```typescript
backgroundSize: "cover"
```
- Scales pattern to cover entire card
- Maintains aspect ratio
- May crop edges if aspect ratios don't match
- Best for centered designs or full-card artwork

**For Oversized Patterns:**
```typescript
backgroundSize: "150% 150%"
```
- Makes pattern 1.5x larger than card
- Useful if your pattern file is too large
- Adjust percentage as needed (120%, 80%, etc.)

**For Fine-Tuning:**
```typescript
backgroundSize: "contain"
```
- Fits entire pattern inside card
- Maintains aspect ratio
- May show background color in gaps
- Best for logos or centered designs

#### `shopLink` (string)
- Full URL to your Stripe product page
- Where users can purchase the pattern pack
- Example: `"https://buy.stripe.com/test_abc123xyz"`
- Leave empty (`""`) for free/default packs

## 🎯 Step-by-Step Integration

### Step 1: Create Your Pattern Design

1. Design your pattern in your preferred graphics software
2. Export as PNG at 200×280 pixels (or larger, maintaining 5:7 ratio)
3. Optimize file size if needed

### Step 2: Add Pattern File

1. Place your PNG file in `/public/games/klondike-solitaire/patterns/`
2. Name it following the convention: `[packname]_back.png`

### Step 3: Configure the Pack

1. Open `/app/games/klondike-solitaire/page.tsx`
2. Find the `themePacks` object (line ~47)
3. Add or edit your pack configuration:

```typescript
const themePacks: Record<string, ThemePack> = {
  default: { /* ... existing default pack ... */ },

  // Your new pack here:
  myPack: {
    id: "myPack",
    name: "My Awesome Pack",
    cardBackImage: "/games/klondike-solitaire/patterns/my_pack_back.png",
    backgroundColor: "#2a1810",
    backgroundSize: "cover",  // Adjust based on your pattern type
    shopLink: "https://buy.stripe.com/your-link-here",
  },
};
```

### Step 4: Test Your Pattern

1. Run the development server: `npm run dev`
2. Navigate to `/games/klondike-solitaire`
3. Select your pattern from the dropdown
4. Check:
   - Pattern displays correctly on card backs
   - No stretching or unwanted cropping
   - Pattern looks good with the background color
   - "Buy this Pattern" button appears and links correctly

### Step 5: Adjust backgroundSize if Needed

If your pattern doesn't look right:

**Pattern is stretched or distorted?**
- Try: `backgroundSize: "cover"` or `backgroundSize: "contain"`

**Pattern is too small?**
- Try: `backgroundSize: "150% 150%"` (or higher percentage)

**Pattern is too large?**
- Try: `backgroundSize: "80% 80%"` (or lower percentage)

**Pattern doesn't tile well?**
- Redesign pattern to be seamless, or use `backgroundSize: "cover"`

## 🔍 Testing Checklist

Before deploying your pattern:

- [ ] Pattern file loads without errors
- [ ] Pattern displays correctly on card backs
- [ ] Pattern looks good at different screen sizes (test mobile)
- [ ] Background color complements the pattern
- [ ] No visible stretching or pixelation
- [ ] "Buy this Pattern" button appears when pack is selected
- [ ] Shop link opens correct product page in new tab
- [ ] Pattern selector shows correct name in dropdown
- [ ] Cards remain playable and readable with the pattern

## 💡 Design Tips

1. **High Contrast**: Ensure pattern contrasts with white card faces
2. **Symmetry**: Symmetrical patterns look professional on card backs
3. **Test at Small Size**: Card backs are small on mobile - ensure pattern is visible
4. **Color Harmony**: Choose a background color from your pattern's palette
5. **Seamless Tiling**: For repeating patterns, make them seamlessly tileable
6. **Visual Interest**: Balance detail with simplicity - too busy can be distracting

## 🛒 Setting Up Stripe Shop Links

1. Create a product in your Stripe Dashboard
2. Generate a payment link
3. Copy the full URL (e.g., `https://buy.stripe.com/...`)
4. Add to the `shopLink` property in your pack configuration

## 🐛 Troubleshooting

### Pattern doesn't show up
- Check file path is correct (case-sensitive)
- Verify file exists in `/public/games/klondike-solitaire/patterns/`
- Check browser console for 404 errors

### Pattern looks stretched
- Adjust `backgroundSize` property
- Ensure original image has correct aspect ratio (5:7)

### Pattern is blurry
- Use higher resolution source image
- Ensure image is at least 200×280 pixels
- Export as PNG with no compression

### Colors look wrong
- Check image color profile (use sRGB)
- Test on different devices/browsers
- Adjust `backgroundColor` to complement pattern

### Pattern doesn't appear in dropdown
- Verify pack is added to `themePacks` object
- Check there are no syntax errors in the configuration
- Restart development server

## 📝 Example Pack Configurations

### Example 1: Seamless Tiling Pattern
```typescript
geometric: {
  id: "geometric",
  name: "Geometric Tiles",
  cardBackImage: "/games/klondike-solitaire/patterns/geometric_back.png",
  backgroundColor: "#1a1a2e",
  backgroundSize: "100% 100%",  // Pattern tiles seamlessly
  shopLink: "https://buy.stripe.com/geometric",
}
```

### Example 2: Centered Logo Design
```typescript
vintage: {
  id: "vintage",
  name: "Vintage Logo",
  cardBackImage: "/games/klondike-solitaire/patterns/vintage_back.png",
  backgroundColor: "#3d2817",
  backgroundSize: "contain",  // Centers logo, maintains aspect ratio
  shopLink: "https://buy.stripe.com/vintage",
}
```

### Example 3: Full-Card Artwork
```typescript
artistic: {
  id: "artistic",
  name: "Artist Series",
  cardBackImage: "/games/klondike-solitaire/patterns/artistic_back.png",
  backgroundColor: "#0d0d0d",
  backgroundSize: "cover",  // Fills card completely, may crop edges
  shopLink: "https://buy.stripe.com/artistic",
}
```

## 🚀 Ready to Deploy?

Once your pattern is configured and tested:

1. Commit your changes:
   ```bash
   git add .
   git commit -m "Add [Your Pattern Name] pack"
   ```

2. Build for production:
   ```bash
   npm run build
   ```

3. Deploy to your hosting platform

4. Test the live version to ensure everything works in production

---

**Need Help?** Check the comments in `/app/games/klondike-solitaire/page.tsx` for additional guidance, or refer to the CSS `background-size` documentation.
