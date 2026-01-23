# 📦 Required HACS Components

This dashboard relies on custom elements from HACS (Home Assistant Community Store). You must install these before the dashboard will render correctly.

## 📋 Prerequisites

**HACS is required.** If you haven't installed it yet, follow the [Official HACS Installation Guide](https://hacs.xyz/docs/setup/download).

---

## 🎨 Part 1: Frontend Cards

**Instructions:**
1. Go to **HACS** → **Frontend**.
2. Click **+ Explore & Download Repositories**.
3. Search for and download each of the following cards.

| Card Name | Search Term | Purpose | Repository |
|-----------|-------------|---------|------------|
| **Button Card** | `button-card` | Core dashboard elements | [View Repo](https://github.com/custom-cards/button-card) |
| **Layout Card** | `layout-card` | CSS Grid layout control | [View Repo](https://github.com/thomasloven/lovelace-layout-card) |
| **Card Mod** | `card-mod` | Advanced CSS styling | [View Repo](https://github.com/thomasloven/lovelace-card-mod) |
| **Kiosk Mode** | `kiosk-mode` | Hides header/sidebar | [View Repo](https://github.com/NemesisRE/kiosk-mode) |
| **Weather Radar** | `weather-radar-card` | Animated map display | [View Repo](https://github.com/Makin-Things/weather-radar-card) |
| **Week Planner** | `week-planner-card` | Family calendar view | [View Repo](https://github.com/FamousWolf/week-planner-card) |

> **Note:** You do not need to add these to your `configuration.yaml`. HACS handles the resource registration automatically.

---

## 🔌 Part 2: Backend Integrations

### Team Tracker (Optional)
Required only if you want the Sports Scores row.

1. Go to **HACS** → **Integrations**.
2. Click **+ Explore & Download Repositories**.
3. Search for `Team Tracker`.
4. Download the integration.
5. **Restart Home Assistant**.
6. Go to **Settings** → **Devices & Services** → **Add Integration**.
7. Search for **Team Tracker** and add your teams.

---

## 🔄 Part 3: Final Setup

After downloading all components:

1. **Restart Home Assistant**
   *   Settings → System → Restart
   *   *This ensures all new resources are loaded.*

2. **Clear Browser Cache**
   *   Refresh your dashboard page.
   *   If cards look broken, perform a Hard Reload (`Ctrl` + `Shift` + `R`).

3. **Verify Installation**
   *   Go to **Settings** → **Dashboards** → **Resources**.
   *   Ensure the cards listed above appear in this list.

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Custom element doesn't exist"** | The card is not loaded. Try a full system restart and clear your browser cache. |
| **Card not found in HACS** | In HACS, click the 3 dots (top right) → "Update information", then try searching again. |
| **Red Box Error** | This usually means `button-card` is missing. It is the most critical dependency. |
| **Layout looks wrong** | Ensure `layout-card` is installed. Without it, the grid will collapse. |