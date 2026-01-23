# `www/` Folder (Web Resources)

Home Assistant serves files in this folder at `/local/`.

Example:
- `config/www/school_1_logo.png` → `http://YOUR_HA_IP:8123/local/school_1_logo.png`

---

## Required Files

### School Logos

If you use the school-related cards, the dashboard expects **two** logo images:

| File | Purpose | Recommended Size |
|------|---------|------------------|
| `school_1_logo.png` | First school logo | 75×75 px |
| `school_2_logo.png` | Second school logo | 75×75 px |

#### Add Your Logos

1. Find your school logos (school website usually works best).
2. Resize to ~75×75 px.
3. Save as **PNG** (transparent background recommended).
4. Name them exactly:
   - `school_1_logo.png`
   - `school_2_logo.png`
5. Copy into:
   - `config/www/`

Tip: Use Squoosh to resize and optimize: https://squoosh.app/

---

## Optional Files

### `hide_cursor.js`

Hides the mouse cursor after 3 seconds of inactivity. Useful for kiosk displays.

#### Enable in `configuration.yaml`

```yaml
frontend:
  extra_module_url:
    - /local/hide_cursor.js