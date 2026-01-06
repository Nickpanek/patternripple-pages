# Tacticool Patches Slot Machine
## Airsoft & Milsim Edition

This is a themed slot machine game featuring custom embroidered airsoft and milsim patch graphics.

## Setup Instructions

### Adding Your Patch Images

Save your embroidered patch images to the `images/` folder with the following names. **Lower numbers = rarer symbols!**

**Required Images (7 total):**

1. **morelo1.jpg** - BONUS (Free Spins) - **RAREST** - Gets orange border
2. **morelo2.jpg** - WILD - Second rarest - Gets gold border
3. **morelo3.jpg** - High value symbol
4. **morelo4.jpg** - Medium value symbol
5. **morelo5.jpg** - Medium value symbol
6. **morelo6.jpg** - Low value symbol
7. **morelo7.jpg** - Low value symbol - **MOST COMMON**
8. **camo-background.jpg** - (Optional) Camouflage pattern texture for page background

You can use either `.jpg` or `.png` format for all images.

**Image Size Recommendations:**
- Ideal: 400x400px to 500x500px
- Minimum: 200x200px
- Maximum: 1000x1000px
- Square (1:1 ratio) works best

### Symbol Mapping

The game has 7 symbol types, each with its own unique image:

- **Symbol 6 (BONUS)**: morelo1.jpg - Triggers 6 Free Spins - Orange border + "BONUS" label
- **Symbol 5 (WILD)**: morelo2.jpg - Substitutes for any symbol except Bonus - Gold border + "WILD" label
- **Symbol 4 (High Value)**: morelo3.jpg - Best regular paying symbol
- **Symbol 3 (Medium Value)**: morelo4.jpg
- **Symbol 2 (Medium Value)**: morelo5.jpg
- **Symbol 1 (Low Value)**: morelo6.jpg
- **Symbol 0 (Low Value)**: morelo7.jpg - Most common symbol

### Updating the Spoonflower Link

In the HTML file, find this line (around line 485):

```html
<a href="#" class="promo-link" target="_blank" rel="noopener">VIEW COLLECTION</a>
```

Replace the `#` with your Spoonflower collection URL.

## Game Features

- **Cascading Reels**: Winning symbols disappear and new ones drop down
- **20 Paylines**: Multiple ways to win
- **Free Spins**: Land Bonus symbols in the first 3 columns to trigger 6 free spins
- **Wild Symbols**: Wild symbols substitute for any symbol except Bonus
- **Auto Play**: Auto spin feature for continuous play

## Customization

The game uses a tactical/military color scheme with:
- Camo green and tan colors
- Gold accent for wins
- Dark military-style background
- "Bebas Neue" font for headings (tactical look)

All visual styling can be customized in the `<style>` section of the HTML file.

## Testing

Open `index.html` in a web browser to play the game. Make sure all image files are in the correct location for the graphics to display properly.

## Original Template

The original slot machine template is preserved at `public/slot.html` and should not be modified. This themed version is completely separate.
