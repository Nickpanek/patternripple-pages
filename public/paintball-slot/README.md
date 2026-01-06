# Tactical Patches Slot Machine
## Airsoft & Milsim Edition

This is a themed slot machine game featuring custom embroidered airsoft and milsim patch graphics.

## Setup Instructions

### Adding Your Patch Images

Save your embroidered patch images to the `images/` folder with the following names:

1. **crossed-rifles.jpg** - Brown embroidered crossed rifles patch (used for Symbol 0 and 4)
2. **skull-helmet.jpg** - Skull with helmet patch with blue background (used for Symbol 1 and Bonus)
3. **pistol-green.jpg** - Green camouflage pistol patch (used for Symbol 2 and Wild)
4. **pistol-flower.jpg** - Pistol with pink/red flower patch (used for Symbol 3)
5. **camo-background.jpg** - Camouflage pattern texture (used as page background)

You can use either `.jpg` or `.png` format for all images.

### Symbol Mapping

The game has 7 symbol types that use your 5 patch images:

- **Symbol 0 (Low Value)**: Crossed Rifles - Direct use
- **Symbol 1 (Low Value)**: Skull with Helmet - Direct use
- **Symbol 2 (Medium Value)**: Green Pistol - Direct use
- **Symbol 3 (Medium Value)**: Pistol with Flower - Direct use
- **Symbol 4 (High Value)**: Crossed Rifles with color variation
- **Symbol 5 (Wild)**: Green Pistol with gold border and "WILD" label
- **Symbol 6 (Bonus)**: Skull with Helmet with orange border and "BONUS" label

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
