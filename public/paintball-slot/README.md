# Tacticool Patches Slot Machine
## Airsoft & Milsim Edition

This is a themed slot machine game featuring custom embroidered airsoft and milsim patch graphics with balanced 94% RTP (Return to Player).

## Setup Instructions

### Adding Your Patch Images

Save your embroidered patch images to the `public/paintball-slot/` folder (same location as index.html) with the following names. **Lower numbers = rarer symbols!**

**Required Images (7 total):**

1. **morelo1.jpg** - BONUS (Free Spins) - **8% chance** - Gets orange border
2. **morelo2.jpg** - WILD - **10% chance** - Gets gold border
3. **morelo3.jpg** - High value symbol - **15% chance**
4. **morelo4.jpg** - Medium-high value symbol - **16% chance**
5. **morelo5.jpg** - Medium value symbol - **17% chance**
6. **morelo6.jpg** - Low value symbol - **17% chance**
7. **morelo7.jpg** - Low value symbol - **17% chance** - **MOST COMMON**
8. **camo-background.jpg** - (Optional) Camouflage pattern texture for page background

You can use either `.jpg` or `.png` format for all images.

**Image Size Recommendations:**
- Ideal: 400x400px to 500x500px
- Minimum: 200x200px
- Maximum: 1000x1000px
- Square (1:1 ratio) works best

### Symbol Mapping & Probabilities

The game has 7 symbol types, each with its own unique image and appearance rate:

- **Symbol 6 (BONUS)**: morelo1.jpg - **8% chance** - Triggers 4 Free Spins - Orange border + "BONUS" label
- **Symbol 5 (WILD)**: morelo2.jpg - **10% chance** - Substitutes for any symbol except Bonus - Gold border + "WILD" label
- **Symbol 4 (High Value)**: morelo3.jpg - **15% chance** - Best regular paying symbol
- **Symbol 3 (Medium-High Value)**: morelo4.jpg - **16% chance**
- **Symbol 2 (Medium Value)**: morelo5.jpg - **17% chance**
- **Symbol 1 (Low Value)**: morelo6.jpg - **17% chance**
- **Symbol 0 (Low Value)**: morelo7.jpg - **17% chance** - Most common symbol

### Updating the Spoonflower Link

In the HTML file, find this line (around line 702):

```html
<a href="#" class="promo-link" target="_blank" rel="noopener">VIEW COLLECTION</a>
```

Replace the `#` with your Spoonflower collection URL.

## Game Features

- **Cascading Reels**: Winning symbols disappear and new ones drop down
- **20 Paylines**: Multiple ways to win
- **Free Spins**: Land Bonus symbols in the first 3 columns to trigger 4 free spins
- **Wild Symbols**: Wild symbols substitute for any symbol except Bonus
- **Auto Play**: Auto spin feature for continuous play
- **Fullscreen Mode**: Play in fullscreen with fully functional controls
- **Background Music**: Toggle music on/off and adjust volume
- **Balanced RTP**: ~94% Return to Player (verified via Monte Carlo simulation)

## Game Mathematics

### RTP (Return to Player)
The game is configured with a ~94% RTP, meaning for every $100 wagered, the game returns approximately $94 to players over the long term. This has been verified through 10,000+ spin Monte Carlo simulations.

**Key Settings:**
- Payout multiplier: 0.112
- Free spins per bonus: 4
- Hit frequency: ~52%
- Bonus trigger frequency: ~2.5%

### Testing RTP
Use the included `test-rtp.js` file to verify RTP:

```bash
node test-rtp.js
```

This runs 10,000 simulated spins and displays:
- Actual RTP percentage
- Hit frequency
- Bonus trigger frequency
- Total wagered vs. total won

## Customization

The game uses a tactical/military color scheme with:
- Camo green and tan colors
- Gold accent for wins
- Dark military-style background
- "Bebas Neue" font for headings (tactical look)

All visual styling can be customized in the `<style>` section of the HTML file.

## Testing

Open `index.html` in a web browser to play the game. Make sure all image files are in the correct location for the graphics to display properly.

## Technical Notes

- The game uses a wrapper-based fullscreen approach to ensure all controls remain functional in fullscreen mode
- Background music file includes cache-busting parameter to force reload when updated
- Monte Carlo testing framework included for RTP verification
- Cascading reels simulate multiple spins per bet for increased entertainment value

## Original Template

The original slot machine template is preserved at `public/slot.html` and should not be modified. This themed version is completely separate.
