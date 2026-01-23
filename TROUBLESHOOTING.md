# 🔧 Troubleshooting Guide

Fast fixes first, then deeper dives by category.

## Quick Fixes Checklist (try in order)

1. Hard refresh the browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Restart Home Assistant (Settings → System → Restart)
3. Validate YAML (Developer Tools → YAML → Check Configuration)
4. Confirm entity IDs (Developer Tools → States)
5. Confirm dashboard resources (Settings → Dashboards → Resources)
6. Check logs (Settings → System → Logs)

---

## Installation Issues

### "Custom element doesn't exist" error

**Symptom:** One or more cards show a missing custom element error.

**Most common cause:** The custom card is not installed via HACS, not added as a resource, or your browser is still using an old cached frontend.

**Fix:**
1. Confirm the card is installed: HACS → Frontend
2. Confirm the resource exists: Settings → Dashboards → Resources
3. Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
4. Restart Home Assistant

**If it still fails:**
- Open Settings → System → Logs and search for the card name
- Verify you are on the same HA instance and not a cached bookmark to another URL

---

### Configuration check fails ("Invalid config")

**Symptom:** YAML validation fails or HA reports an invalid configuration.

**Fix:**
1. Confirm indentation (2 spaces, no tabs)
2. Confirm all `!include` paths exist and match your folder structure
3. Look for missing colons, mismatched quotes, or list dashes
4. Re-run: Developer Tools → YAML → Check Configuration

---

### Package not loading (wallboard sensors missing)

**Symptom:** Sensors from `wallboard_package.yaml` (or other package files) do not appear.

**Most common cause:** Packages are not enabled or the package file is not in the expected path.

**Fix:**
1. Confirm `configuration.yaml` contains:

    homeassistant:
      packages: !include_dir_named packages

2. Confirm the package file is located in:

    /config/packages/

3. Restart Home Assistant (a full restart, not a YAML reload)

**Tip:** If you changed only templates, YAML reload may not be enough. Restarting is the safest.

---

## Weather Issues

### Weather shows "unavailable" or "unknown"

**Symptom:** Weather cards display unavailable/unknown.

**Fix:**
1. Confirm coordinates exist in `secrets.yaml`:
   - `wallboard_latitude`
   - `wallboard_longitude`

2. Confirm the values are valid:
   - Latitude: -90 to 90
   - Longitude: -180 to 180

3. Confirm the weather entity ID is correct:
   - Developer Tools → States → search for `weather.`
   - Update the referenced entity in your dashboard config (often `entities.yaml`)

4. Check HA logs for API errors or rate limiting.

**Notes:**
- Open-Meteo can rate limit. If logs show rate limiting, wait and retry.
- If you run HA behind strict DNS/firewall rules, allow outbound HTTPS.

---

### Radar map not loading

**Symptom:** Radar card is blank, stuck loading, or errors.

**Fix:**
1. Confirm the card is installed (if you are using `weather-radar-card`):
   - HACS → Frontend → `weather-radar-card`

2. Confirm HA can reach the external radar provider (commonly RainViewer):
   - Settings → System → Logs for network/REST errors
   - Check your firewall/DNS settings

3. Confirm your location has radar coverage (some providers have regional gaps)

---

## Calendar Issues

### Calendar shows empty

**Symptom:** Week planner shows no events.

**Fix:**
1. Confirm calendar entities exist:
   - Developer Tools → States → search for `calendar.`

2. Confirm the dashboard references the correct entity IDs.

3. Confirm the integration is connected and syncing:
   - Google Calendar: re-authenticate if needed
   - Local Calendar: add a test timed event

4. If your planner hides all-day events, add a timed event to test.

---

### "Next Up" card always empty

**Symptom:** "Nothing scheduled" even when you have events.

**Fix:**
1. Check the sensor state:
   - Developer Tools → States → `sensor.next_event_custom_ts`

2. Confirm the calendars used by the template match your actual entity IDs.

3. Check logs for template errors (Settings → System → Logs).

---

## School Features Issues

### Lunch shows "No School" on school days

**Symptom:** Lunch card says "No School" when school is in session.

**Fix:**
1. Verify `school_calendar.yaml` dates (and that you are editing the file HA is actually using)
2. Check:
   - Developer Tools → States → `binary_sensor.school_day`

3. Use `input_boolean.school_day_override` to test toggling behavior.

---

### Bus timer not showing

**Symptom:** Bus countdown never appears.

**Fix:**
1. Confirm it is a school day (or enable test mode):
   - `input_boolean.bus_test_mode`

2. Confirm you are inside the timer window:
   - Timer typically shows ~90 minutes before bus time
   - Verify bus times in `school_calendar.yaml`

3. Check:
   - Developer Tools → States → `binary_sensor.bus_timer_active`

---

## Display Issues

### Cards do not fit the grid

**Symptom:** Cards overflow, stretch incorrectly, or grid proportions look wrong.

**Fix:**
1. This dashboard targets 1920×1080.
2. For other resolutions, adjust layout rows in the dashboard YAML, for example:

    layout:
      grid-template-rows: 260px 120px 120px 360px 170px

---

### Text too small or too large

**Fix:**
1. Adjust device/browser zoom and display scaling first.
2. If still needed, adjust font sizes in your card definitions (advanced).

---

### Scrollbars appearing

**Symptom:** Unwanted scrollbars on cards or the view.

**Fix:** If your theme supports card-mod root styles, add:

    wallboard_theme:
      # ... existing theme ...
      card-mod-root: |
        ::-webkit-scrollbar { display: none !important; }

**Note:** Some browsers ignore scrollbar hiding rules.

---

## Sports Card Issues

### "No game found" always

**Symptom:** Sports cards never find a game.

**Fix:**
1. Confirm Team Tracker is installed from HACS as an **Integration** (not only Frontend).
2. Configure it:
   - Settings → Devices & Services → Team Tracker

3. Confirm entity IDs:
   - Developer Tools → States → search for your team sensors

4. Update your dashboard references (often `entities.yaml`) to match.

**Note:** Off-season can legitimately mean no games.

---

### Wrong team showing

**Fix:**
1. Confirm Team Tracker configuration.
2. Confirm each dashboard slot points to the intended sensor entity.

---

## Performance Issues

### Dashboard loads slowly

**Common causes and fixes:**
- Frequent sensor updates (for example, a 1-second clock sensor)
  - Reduce update frequency if your hardware struggles
- Large images
  - Compress images (aim < 100 KB where possible)
- Browser cache
  - Hard refresh and retry

---

### High CPU usage

**Fix:**
1. Reduce REST sensor scan intervals, for example:

    scan_interval: 600  # 10 minutes

2. Check Settings → System → Logs for template or integration errors.

---

## Debug Mode

### Enable debug logging

Add to `configuration.yaml`:

    logger:
      default: warning
      logs:
        custom_components.teamtracker: debug
        homeassistant.components.rest: debug
        homeassistant.components.template: debug

---

### Test mode helpers

These helpers let you validate school and bus logic without waiting for real conditions.

| Helper | Purpose |
|--------|---------|
| `input_boolean.school_day_override` | Force school day on/off |
| `input_boolean.bus_test_mode` | Test bus timer anytime |
| `input_boolean.late_start_test` | Test late start schedule |

Toggle them in Developer Tools → States or in the UI helper controls.

---

## Getting Help

### Before opening a GitHub issue

1. Confirm you completed the Quick Fixes Checklist
2. Confirm entity IDs match your instance
3. Collect relevant log lines (Settings → System → Logs)

### What to include in an issue

- Home Assistant version
- HACS card versions (and Team Tracker integration version if used)
- Exact error text and where it appears
- Relevant log entries
- Steps to reproduce

### Community resources

- Home Assistant Community Forum: https://community.home-assistant.io/
- Home Assistant Discord: https://discord.gg/home-assistant
- Reddit r/homeassistant: https://reddit.com/r/homeassistant