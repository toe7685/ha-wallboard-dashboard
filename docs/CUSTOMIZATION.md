# Customization Guide

This guide covers advanced customization options for the wallboard dashboard.

---

## Theme Customization

### Changing Colors

To change the core colors, edit `/config/themes/wallboard_theme.yaml`:

```yaml
wallboard_theme:
  # Backgrounds
  primary-background-color: "#F5F5F7"    # Dashboard background (Light Gray)
  card-background-color: "#FFFFFF"        # Card background (White)

  # Text & Accents
  primary-text-color: "#111111"           # Main text
  primary-color: "#0A84FF"                # Active states/Links (Blue)
  
  # Custom Dashboard Variables
  bp-card-radius: "24px"                  # Roundness of cards
  bp-card-pad: "20px"                     # Padding inside cards
```

### Adding Dark Mode Support

Instead of creating a new file, simply add a `modes:` block to your existing `wallboard_theme.yaml`:

```yaml
wallboard_theme:
  # ... Light mode variables here ...

  modes:
    dark:
      primary-background-color: "#1C1C1E"
      card-background-color: "#2C2C2E"
      primary-text-color: "#FFFFFF"
      bp-secondary: "rgba(255,255,255,0.35)"
```

---

## Layout Customization

### Understanding the Grid

The dashboard uses CSS Grid. The layout is defined in the top section of `dashboards/wallboard.yaml`.

**The Visual Map (grid-template-areas):**
```yaml
grid-template-areas: |
  "time      weather    forecast  next"
  "lunch     lunch      weekly     family"
  "dinner    dinner     weekly     family"
  "fun       countdown  radar     family"
  "team1     team2      team3     team4"
```

**The Row Heights (grid-template-rows):**
```yaml
grid-template-rows: 260px 120px 120px 360px 170px
#                   ^Row1 ^Row2 ^Row3 ^Row4 ^Row5
```

### Removing a Row (Example: Removing Sports)

If you don't watch sports, you can reclaim that space or delete it.

1. **Delete the row from the visual map:**
   ```yaml
   grid-template-areas: |
     "time      weather    forecast  next"
     "lunch     lunch      weekly     family"
     "dinner    dinner     weekly     family"
     "fun       countdown  radar     family"
     # Removed the "team" row here
   ```

2. **Remove the height definition:**
   Change `grid-template-rows` to remove the last `170px`.

3. **Delete the cards:**
   Scroll down and delete the YAML blocks for `team1` through `team4`.

### Resize Columns

```yaml
grid-template-columns: 1fr 1fr 1fr 1fr
# 1fr = "1 fraction" of available space.
# To make the first column wider: 2fr 1fr 1fr 1fr
```

---

## Card Customization

### Modifying Temperature Colors

The thermometer color logic is inside the `weather` card javascript template in `wallboard.yaml`. Look for `const tempColor`:

```javascript
const tempColor = (t) => {
  if (t < 32)  return '#0088FF';  // Freezing - Blue
  if (t < 50)  return '#00C8B3';  // Cold - Teal
  if (t < 68)  return '#34C759';  // Cool - Green
  if (t < 80)  return '#FFCC00';  // Warm - Yellow
  if (t < 94)  return '#FF8D28';  // Hot - Orange
  return '#FF383C';               // Very Hot - Red
};
```

### Adding a New Card

To match the existing style, use the YAML anchor `*card_style` that is defined in the Time card.

```yaml
- type: custom:button-card
  view_layout:
    grid-area: my_new_area  # Must match a name in grid-template-areas
    place-self: stretch
  show_icon: false
  show_name: false
  card_mod: *card_mod_fill  # Re-uses global CSS
  styles:
    card: *card_style       # Re-uses global card styling
  custom_fields:
    content: |
      [[[
        return `<div>My New Card Content</div>`;
      ]]]
```

---

## Resolution & Screen Size

### 1080p Tablets (Fire HD 10)
This dashboard is native to **1920x1080** (or **1920x1200**). It will look perfect out of the box.

### 4K Displays (TVs)
Everything will look small. You can either:
1. **Use Browser Zoom:** Set the browser zoom to 200%.
2. **Double the Pixels:** Edit `grid-template-rows` in `wallboard.yaml` and double every pixel value (e.g., `260px` → `520px`).

### Smaller Tablets (iPad Mini / Fire 8)
You may need to switch to a 2-column layout.

**Example 2-Column Layout:**
```yaml
grid-template-columns: 1fr 1fr
grid-template-areas: |
  "time      weather"
  "forecast  next"
  "lunch     weekly"
  "dinner    weekly"
  "family    family"
```

---

## Performance Tips

1. **Weather Radar:** The radar card is the heaviest element. If your tablet is old/slow, disable the animation in the card settings or remove the card entirely.
2. **Image Sizes:** Ensure school logos in `/config/www/` are small (under 50KB). Large PNGs will slow down loading.
3. **Sensor Updates:** The `wallboard_package.yaml` uses `time_pattern` triggers.
   - `seconds: /1` (Bus Timer) - High CPU. Disable the "Bus Timer" features in the package file if you don't use them.

---

## Backup Strategy

Before making big changes, backup these core files:

```text
/config/wallboard/           # Your settings
/config/themes/              # Your colors
/dashboards/wallboard.yaml   # The layout
```

---

## Getting Help

For customization questions:
- Check existing GitHub issues.
- Open a **Discussion** on the repo.
- Post screenshots of your layout issues.
```