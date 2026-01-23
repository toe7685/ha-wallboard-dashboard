# 📦 Installation Guide

This guide walks you through installing the Family Wallboard Dashboard step by step.

**Estimated time:** 15-30 minutes

---

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] Home Assistant 2024.1.0 or newer
- [ ] HACS installed ([Install HACS](https://hacs.xyz/docs/setup/download))
- [ ] File editor access (File Editor add-on or VS Code)
- [ ] Access to your `configuration.yaml`

---

## Step 1: Install Required HACS Cards

1. Go to **HACS** → **Frontend**.
2. Click **+ Explore & Download Repositories**.
3. Install the following cards:

| Card | Search Term | Required |
|------|-------------|----------|
| **Button Card** | `button-card` | ✅ Yes |
| **Layout Card** | `layout-card` | ✅ Yes |
| **Card Mod** | `card-mod` | ✅ Yes |
| **Kiosk Mode** | `kiosk-mode` | ✅ Yes |
| **Weather Radar** | `weather-radar-card` | ✅ Yes |
| **Week Planner** | `week-planner-card` | ✅ Yes |

**After installing all cards:**
1. Go to **Settings** → **System** → **Restart**.
2. Restart Home Assistant to load the new resources.

---

## Step 2: Install Integrations

### 1. Met.no Weather (Required)
1. Settings → Devices & Services → Add Integration.
2. Search "**Met.no**".
3. Enter your location coordinates.
4. Name the entity `forecast_home` (or note your entity name for later).

### 2. Team Tracker (Optional - for sports)
1. HACS → Integrations → Search "**Team Tracker**".
2. Download and Restart Home Assistant.
3. Configure your teams via Settings → Devices & Services.

---

## Step 3: Copy Repository Files

### Option A: Download ZIP (Easiest)
1. Download this repository as a ZIP.
2. Extract it to your computer.
3. Use your File Editor to upload files to Home Assistant.

### Step 3.1: Copy Structure
Move the files from the download folder to your Home Assistant `/config/` directory:

| Source Folder | Destination on HA |
|---------------|-------------------|
| `themes/` | `/config/themes/` |
| `packages/` | `/config/packages/` |
| `examples/` | `/config/wallboard/` (Create this folder) |
| `www/` | `/config/www/` |
| `dashboards/` | Keep for Step 6 |

**Your final structure should look like this:**
```text
/config/
├── configuration.yaml
├── themes/
│   └── wallboard_theme.yaml
├── packages/
│   └── wallboard_package.yaml
├── wallboard/               <-- Files copied from 'examples' folder
│   ├── entities.yaml.example
│   ├── events.yaml.example
│   ├── school_calendar.yaml.example
│   └── school_menus.yaml.example
├── www/
│   ├── school_1_logo.png
│   └── school_2_logo.png
└── dashboards/              <-- Optional: store dashboard YAML files here
```

---

## Step 4: Enable Packages & Themes

Open your `/config/configuration.yaml` and ensure these lines exist:

```yaml
# Enable packages
homeassistant:
  packages: !include_dir_named packages

# Enable themes
frontend:
  themes: !include_dir_merge_named themes
```

**Note:** If you already have `packages:` or `themes:` defined, just ensure the paths align with the folders you created.

**✅ Action:** Check your configuration (Developer Tools → YAML → Check Configuration) and **Restart Home Assistant**.

---

## Step 5: Configure Configuration Files

1. Go to the `/config/wallboard/` folder.
2. Rename the files to remove `.example`:
   - `entities.yaml.example` → `entities.yaml`
   - `events.yaml.example` → `events.yaml`
   - (And the school files if you need them)
3. Open `entities.yaml` and update the values to match your Home Assistant entities (weather, calendars, etc.).

*See [CONFIGURATION.md](CONFIGURATION.md) for full details.*

---

## Step 6: Add the Dashboard

1. **Create Dashboard:**
   - Settings → Dashboards → Add Dashboard.
   - "New dashboard from scratch".
   - Title: `Wallboard` (Icon: `mdi:view-dashboard`).
   - Select "Show in sidebar".

2. **Paste Code:**
   - Open the new dashboard.
   - Click ⋮ (top right) → **Edit Dashboard**.
   - Click ⋮ (top right) → **Raw configuration editor**.
   - Delete all existing code.
   - Paste the contents of `dashboards/wallboard.yaml`.

3. **No manual edits required**
   - All entity IDs and location settings are configured in `/config/wallboard/entities.yaml`.
   - If the radar or week planner is wrong, fix it there (see [CONFIGURATION.md](CONFIGURATION.md)).
   - The only thing you may change here is the dashboard **title** (it affects the URL you use for kiosk mode).

4. Click **Save**.

---

## Step 7: Verify Installation

Open your new Wallboard dashboard.

| Card | Status Check |
|------|--------------|
| **Time** | Should show current time. |
| **Weather** | Should show temp/conditions (if unavailable, check entity name in `entities.yaml`). |
| **Calendar** | Should show events or "Nothing scheduled". |
| **Radar** | Should show your map location. |

### Common Issues
- **"Custom element doesn't exist":** You missed a card in Step 1 or didn’t restart HA after installing cards.
- **Radar is wrong location:** Update the radar latitude/longitude in `/config/wallboard/entities.yaml`.
- **Calendar shows errors:** Update the calendar entity IDs in `/config/wallboard/entities.yaml`.

---

## Step 8: Tablet Setup (Kiosk)

For a wall-mounted tablet (Fire Tablet, iPad, etc.):

1. Install **Fully Kiosk Browser** (Android) or use a fullscreen browser.
2. Open the Wallboard dashboard in Home Assistant on any computer and copy the URL from your browser.
3. Paste that URL into your tablet kiosk browser.
4. The dashboard will automatically hide the header and sidebar thanks to Kiosk Mode.

---

## 🎉 Done!

Next, customize your family events and school info by editing the files in `/config/wallboard/`.
