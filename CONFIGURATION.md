# ⚙️ Configuration Guide

This guide explains how to configure the wallboard for your home.

---

## Configuration Files Overview

All user configuration is in `/config/wallboard/`. These files control the data displayed on your dashboard.

| File | Purpose | Required |
|------|---------|----------|
| `entities.yaml` | Maps your HA entities to dashboard sensors | ✅ Yes |
| `events.yaml` | Countdown events (birthdays, holidays) | ✅ Yes |
| `school_calendar.yaml` | School year dates & bus schedule | 🟡 If using school features |
| `school_menus.yaml` | Lunch menu rotation | 🟡 If using lunch cards |

---

## ⚠️ Important: Dashboard YAML Edits
While most settings are in the files below, **two specific settings** must be edited directly in the dashboard code because Home Assistant cards do not support templates for these values.

**You must edit your dashboard (Edit Dashboard → Raw Configuration Editor) to change:**
1. **Weather Radar Location:** Search for `center_latitude: 40.71` and update it to your location.
2. **Calendar Entities:** Search for `calendar.family` inside the `week-planner-card` section and update the entity IDs to match yours.

---

## entities.yaml

This file maps your Home Assistant entities to the dashboard's internal sensors.

### Copy the Example
```bash
cp /config/wallboard/entities.yaml.example /config/wallboard/entities.yaml
```

### Required Entities

```yaml
# ======================
# WEATHER (Required)
# ======================
# Your primary weather entity (Met.no, OpenWeatherMap, etc.)
weather_entity: weather.forecast_home

# ======================
# CALENDARS (Required for features)
# ======================
# Main family calendar (used for "Next Up" logic)
calendar_family: calendar.family

# Individual calendars (used for logic & sorting)
# Set to "none" if you don't have individual calendars
calendar_person_1: calendar.person_1
calendar_person_2: calendar.person_2
calendar_person_3: calendar.person_3
calendar_person_4: none

# Person names (displayed in UI)
person_1_name: "Person 1"
person_2_name: "Person 2"
person_3_name: "Person 3"

# Calendar colors (match these to your dashboard theme)
person_1_color: "#0A84FF"
person_2_color: "#34C759"
person_3_color: "#FF9F0A"
person_4_color: "#AF52DE"

# ======================
# MEALS CALENDAR (Optional)
# ======================
# Calendar for dinner planning (shows meal + image from description URL)
calendar_meals: calendar.meals
# Set to "none" to disable: calendar_meals: none

# ======================
# SPORTS TEAMS (Optional)
# ======================
# Requires Team Tracker integration from HACS
# Set to "none" to disable any slot
team_1: sensor.team_tracker_1
team_2: sensor.team_tracker_2
team_3: sensor.team_tracker_3
team_4: sensor.team_tracker_4
```

### Finding Your Entity IDs
1. Go to **Developer Tools** → **States**
2. Search for the entity type (e.g., "weather", "calendar")
3. Copy the full entity ID (e.g., `weather.home`)

---

## events.yaml

This file defines countdown events shown in the dashboard.

### Copy the Example
```bash
cp /config/wallboard/events.yaml.example /config/wallboard/events.yaml
```

### Event Format

```yaml
events:
  # Annual events (repeat every year automatically)
  - title: "Valentine's Day"
    date: "2/14"                    # Month/Day format
    icon: "mdi:heart-outline"
  
  # Specific year events (one-time)
  - title: "Spring Break"
    date: "4/4/2026"                # Month/Day/Year format
    icon: "mdi:beach"
  
  # Birthdays
  - title: "Mom's Birthday"
    date: "6/15"
    icon: "mdi:cake-variant-outline"
```

### Date Formats

| Format | Example | Behavior |
|--------|---------|----------|
| `M/D` | `2/14` | Repeats annually |
| `M/D/YY` | `3/25/26` | Specific date (2026) |
| `M/D/YYYY` | `3/25/2026` | Specific date (2026) |

### Available Icons
Browse all icons at [Material Design Icons](https://materialdesignicons.com/)

| Event Type | Icon |
|------------|------|
| Birthday | `mdi:cake-variant-outline` |
| Holiday | `mdi:party-popper` |
| Vacation | `mdi:airplane` |
| Sports | `mdi:football` |
| School | `mdi:school-outline` |

---

## school_calendar.yaml

Defines school days, breaks, and special schedules.

### Copy the Example
```bash
cp /config/wallboard/school_calendar.yaml.example /config/wallboard/school_calendar.yaml
```

### Configuration

```yaml
# School year dates
school_year_start: "2025-08-06"
school_year_end: "2026-05-22"

# Days with no school (holidays, teacher days, etc.)
no_school_days:
  - "2025-09-01"   # Labor Day
  - "2025-11-07"   # Teacher Day
  - "2026-01-19"   # MLK Day

# School breaks (inclusive date ranges)
breaks:
  - name: "Fall Break"
    start: "2025-10-06"
    end: "2025-10-10"
  - name: "Winter Break"
    start: "2025-12-22"
    end: "2026-01-02"

# Late start days (delayed bus schedule)
late_start_days:
  - "2026-01-07"
  - "2026-02-04"

# Bus schedule (minutes from midnight)
# Example: 7:10 AM = 430 minutes
bus_times:
  normal:
    - 430   # 7:10 AM
    - 470   # 7:50 AM
  late_start_offset: 40  # Minutes added on late start days
```

### Bus Time Calculation
- 6:00 AM = 360 (6 × 60)
- 7:10 AM = 430 (7 × 60 + 10)
- 7:50 AM = 470 (7 × 60 + 50)
- 8:00 AM = 480 (8 × 60)

---

## school_menus.yaml

Defines rotating lunch menus for up to 2 schools.

### Copy the Example
```bash
cp /config/wallboard/school_menus.yaml.example /config/wallboard/school_menus.yaml
```

### Configuration

```yaml
# School information
schools:
  school_1:
    name: "Elementary School"
    logo: "/local/school_1_logo.png"
    accent_color: "#0A84FF"
  school_2:
    name: "Middle School"
    logo: "/local/school_2_logo.png"
    accent_color: "#FF3B30"

# Menu cycle start date (when cycle 0 begins)
menu_cycle_start: "2026-01-05"
starting_cycle_index: 1  # Which cycle week starts on menu_cycle_start

# Menus rotate on a 3-week cycle
# Each week has 5 days (Monday=0 through Friday=4)

school_1_menus:
  # Week 0
  - monday: ["Chicken Nuggets", "Salad"]
    tuesday: ["Tacos", "Nachos"]
    wednesday: ["Pizza", "Yogurt Parfait"]
    thursday: ["Pasta", "Salad"]
    friday: ["Chicken Sandwich", "Salad"]
  # Week 1
  - monday: ["Hot Dog", "Salad"]
    # ... continue ...
```

---

## Disabling Features

To disable features you don't need:

### Disable School Features
1. In `entities.yaml`, set `calendar_school: none`.
2. In the Dashboard YAML, delete the `lunch` grid area cards.

### Disable Sports
1. In `entities.yaml`, set `team_1` through `team_4` to `none`.
2. In the Dashboard YAML, delete the team cards.

### Disable Meals Calendar
1. In `entities.yaml`, set `calendar_meals: none`.

---

## Calendar Setup Tips

### Google Calendar
1. **Settings** → **Devices & Services** → **Add Integration** → **Google Calendar**.
2. Follow OAuth setup.
3. Your calendars appear as `calendar.your_calendar_name`.

### Local Calendar
1. **Settings** → **Devices & Services** → **Add Integration** → **Local Calendar**.
2. Create calendars for each family member.
3. Add events via the HA calendar UI.

### Meals Calendar (for Dinner Card)
1. Create a calendar called "Meals".
2. Add events with the **Meal Name** as the title.
3. Put an **Image URL** in the event description.
4. The dashboard will automatically pull the image and display it.

---

## Next Steps
- [TROUBLESHOOTING.md](TROUBLESHOOTING.md) — Fix common issues
- [docs/CUSTOMIZATION.md](docs/CUSTOMIZATION.md) — Advanced customization
```