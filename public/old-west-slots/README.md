# Old West Slots
Wild West Edition

This is a themed slot machine game featuring classic old west styled graphics with animated GIF wins.

## Setup Instructions

### Adding Your Images and Animations

Save your files to the public/old-west-slots/ folder (same location as index.html) with the following names. Lower numbers = rarer symbols!

**Required Images (7 total):**
- oldwest1.jpg - BONUS (8 Free Spins with 1.2x multiplier) - RAREST - Gets orange border
- oldwest2.jpg - WILD - Second rarest - Gets gold border
- oldwest3.jpg - High value symbol
- oldwest4.jpg - Medium value symbol
- oldwest5.jpg - Medium value symbol
- oldwest6.jpg - Low value symbol
- oldwest7.jpg - Low value symbol - MOST COMMON

**Required Animated GIFs (6 total - for win animations):**
- oldwest2.gif - Plays when WILD symbol wins
- oldwest3.gif - Plays when high value symbol wins
- oldwest4.gif - Plays when medium value symbol wins
- oldwest5.gif - Plays when medium value symbol wins
- oldwest6.gif - Plays when low value symbol wins
- bonus-trigger.gif - Full-screen animation when bonus is triggered

**Note:** oldwest1.jpg (BONUS) uses the full-screen bonus-trigger.gif instead of its own small animation. oldwest7.jpg (most common symbol) has no GIF animation to reduce visual noise.

**Optional Background:**
- old-west-background.jpg - Western texture for page background

**Required Music:**
- nicksgame.mp3 - Background music loop

You can use either .jpg or .png format for static images.

**Image Size Recommendations:**
- Ideal: 400x400px to 500x500px
- Minimum: 200x200px
- Maximum: 1000x1000px
- Square (1:1 ratio) works best

**GIF Size Recommendations:**
- Same dimensions as your JPG images
- Keep file size under 2MB per GIF for smooth loading
- 5 second loops work best for win animations

## Symbol Mapping

The game has 7 symbol types, each with its own static image. Symbols 2-6 also have animated GIFs that play during wins:

- **Symbol 6 (BONUS):** oldwest1.jpg - Triggers 8 Free Spins (1.2x win multiplier) - Orange border + "BONUS" label - Uses bonus-trigger.gif for full-screen animation
- **Symbol 5 (WILD):** oldwest2.jpg / oldwest2.gif - Substitutes for any symbol except Bonus - Gold border + "WILD" label
- **Symbol 4 (High Value):** oldwest3.jpg / oldwest3.gif - Best regular paying symbol
- **Symbol 3 (Medium Value):** oldwest4.jpg / oldwest4.gif
- **Symbol 2 (Medium Value):** oldwest5.jpg / oldwest5.gif
- **Symbol 1 (Low Value):** oldwest6.jpg / oldwest6.gif
- **Symbol 0 (Low Value):** oldwest7.jpg - Most common symbol - NO GIF (to reduce visual clutter)

## How the Animations Work

- During normal gameplay, all symbols display as static JPG images
- When a winning line is formed, symbols in the winning line switch from JPG to GIF
- **GIF animations play for 5 seconds in full** before symbols disappear
- After the win is collected, symbols reset to static JPG before disappearing
- Bonus symbol triggers use a full-screen overlay animation instead of inline GIF

## Updating the Spoonflower Link

In the HTML file, find this line (around line 485):
```html
<a href="#" class="promo-link" target="_blank" rel="noopener">VIEW COLLECTION</a>
```
Replace the # with your Spoonflower collection URL.

## Game Features

- **Cascading Reels:** Winning symbols disappear and new ones drop down
- **20 Paylines:** Multiple ways to win
- **Free Spins:** Land Bonus symbols in the first 3 columns to trigger 8 free spins with 1.2x win multiplier
- **Wild Symbols:** Wild symbols substitute for any symbol except Bonus
- **Animated Wins:** Winning symbols animate with custom GIFs for 5 seconds (symbols 2-6)
- **Auto Play:** Auto spin feature for continuous play
- **Background Music:** Looping western-themed music (nicksgame.mp3)
- **Volume Control:** Adjustable music volume with on-screen controls
- **Fullscreen Mode:** Play in fullscreen for immersive experience
- **Target RTP:** ~93% (optimized for balanced gameplay)

## Customization

The game uses an old west/western color scheme with:
- Dusty browns and tans
- Gold accent for wins
- Dark western-style background
- "Rye" font for headings (western saloon look)

All visual styling can be customized in the <style> section of the HTML file.

## File Structure

```
public/old-west-slots/
├── index.html (Main game file)
├── README.md (This file)
├── oldwest1.jpg (BONUS symbol - static)
├── oldwest2.jpg (WILD symbol - static)
├── oldwest2.gif (WILD symbol - animated)
├── oldwest3.jpg (High value - static)
├── oldwest3.gif (High value - animated)
├── oldwest4.jpg (Medium value - static)
├── oldwest4.gif (Medium value - animated)
├── oldwest5.jpg (Medium value - static)
├── oldwest5.gif (Medium value - animated)
├── oldwest6.jpg (Low value - static)
├── oldwest6.gif (Low value - animated)
├── oldwest7.jpg (Most common - static only, no GIF)
├── bonus-trigger.gif (Full-screen bonus animation)
├── old-west-background.jpg (Optional background texture)
└── nicksgame.mp3 (Background music)
```

## Testing

Open index.html in a web browser to play the game. Make sure all image files, GIF animations, and the music file are in the correct location for everything to display and play properly.

## Technical Notes

- The game automatically switches between JPG (static) and GIF (animated) for winning symbols
- **GIF animations display for 5 seconds** to show the full animation loop
- Symbol 0 (oldwest7.jpg) intentionally has no GIF to reduce visual noise since it's the most common symbol
- Symbol 6 (BONUS) uses a full-screen overlay animation (bonus-trigger.gif) instead of an inline animation
- Music starts on first user interaction due to browser autoplay policies
- All animations are hardware-accelerated for smooth performance

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile-friendly with touch controls
- Fullscreen support (not available on iOS Safari)

## Current Configuration

- RTP: ~93%
- Free Spins: 8 (with 1.2x multiplier)
- Bonus Trigger: ~0.33% (once per ~300 spins)
- Win Animation Duration: 5 seconds
- Balanced for demo/casual play
