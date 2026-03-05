# Wide Cascade Slots — Asset Upload Instructions

## Directory to upload into
```
/public/wide-slot-game/
```
(same folder as `index.html`)

---

## Required Image Files

All images should be **16:9 aspect ratio** to match the symbol cells.
Recommended resolution: **320×180 px** or **640×360 px** (higher is fine, they scale down).

### Static symbols (JPG format)

| Filename    | Symbol       | Rarity     | Notes                   |
|-------------|--------------|------------|-------------------------|
| `slot7.jpg` | Symbol 1     | Most common | Lowest-value symbol     |
| `slot6.jpg` | Symbol 2     | Common      |                         |
| `slot5.jpg` | Symbol 3     | Mid         |                         |
| `slot4.jpg` | Symbol 4     | Mid-high    |                         |
| `slot3.jpg` | Symbol 5     | High value  |                         |
| `slot2.jpg` | **WILD**     | Uncommon    | Used on outer reels too |
| `slot1.jpg` | **BONUS**    | Middle reels only | Triggers free spins |

### Win animations (GIF format)

Shown **instead of the JPG** when that symbol is on a winning payline.
Only symbols 2–6 (slot2–slot6) get GIF animations; symbols 1 & 7 do not.

| Filename    | Symbol   | When shown                    |
|-------------|----------|-------------------------------|
| `slot6.gif` | Symbol 2 | Winning combination           |
| `slot5.gif` | Symbol 3 | Winning combination           |
| `slot4.gif` | Symbol 4 | Winning combination           |
| `slot3.gif` | Symbol 5 | Winning combination           |
| `slot2.gif` | WILD     | Winning combination with WILD |

### Bonus overlay GIF

| Filename           | When shown                                        |
|--------------------|---------------------------------------------------|
| `bonus-trigger.gif`| Full-screen overlay when BONUS scatter is triggered (needs BONUS symbol on both middle reels, cols 2 & 3) |

### Audio (optional)

| Filename      | Notes                                |
|---------------|--------------------------------------|
| `nicksgame.mp3` | Background music — replace with your own file or keep same name |

---

## Uploading via GitHub

1. Go to the repository on GitHub.
2. Navigate to `public/wide-slot-game/`.
3. Click **"Add file" → "Upload files"**.
4. Drag in your JPG/GIF/MP3 files.
5. Commit directly to the `claude/clone-slot-game-grid-NGH5u` branch.
6. The site will rebuild automatically (Vercel/Next.js deployment).

---

## Going Public

When ready to publish, edit `index.html` line 8:

```html
<!-- Change this: -->
<meta name="robots" content="noindex, nofollow">

<!-- To this: -->
<meta name="robots" content="index, follow">
```

Also update the `<title>` and add proper SEO meta tags at that time.

---

## Payline Reference (25 lines)

The game uses **25 paylines** across **4 reels × 5 rows** (16:9 aspect ratio).
Wins pay left-to-right with **2, 3, or 4 matching symbols**.

| Pattern          | Count | Examples                            |
|------------------|-------|-------------------------------------|
| Horizontal rows  | 5     | All 5 rows straight across          |
| Full diagonals   | 4     | TL→BR, BL→TR, and shifted variants  |
| V / M shapes     | 4     | Peak or valley at centre column     |
| Zigzag / wave    | 4     | Alternating high-low paths          |
| Step / staircase | 4     | Two-step patterns top and bottom    |
| Gentle slopes    | 4     | Spanning from outer rows            |

BONUS scatter requires the BONUS symbol to appear on **both** of the two middle reels (columns 2 & 3) simultaneously.
Triggers **8 free spins** with **1.2× payout multiplier**.
