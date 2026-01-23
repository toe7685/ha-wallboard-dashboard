# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-23

### 🚀 Initial Release
First public release of the Family Wallboard Dashboard.

### Added

#### Dashboard UI
- **Time & Date:** Large clock with dynamic AM/PM and date display.
- **Weather:** Current conditions (OpenMeteo) with dynamic clothing recommendations.
- **Forecast:** Daily high/precipitation chance and 5-day weekly outlook.
- **Radar:** Animated weather radar map card.
- **Calendar:** Unified family view with color-coded events for individual members.
- **Sports:** Live score tracking for up to 4 teams (via Team Tracker).
- **Fun Section:** Daily rotating thoughts, jokes, and fun facts.

#### Logic & Automation
- **Bus Timer:** Countdown logic with "Late Start" day support.
- **School Menus:** Rotating lunch menu support for 2 schools (3-week cycle).
- **Countdown Events:** Automatic sorting of upcoming birthdays and holidays.
- **Meal Planning:** "Dinner Tonight" integration with image support.

#### System
- **Theme:** Custom `wallboard_theme` with Apple-style aesthetics.
- **Kiosk Mode:** Full support for header/sidebar hiding on tablets.
- **Documentation:** Complete installation, configuration, and troubleshooting guides.

### Security
- Personal data abstracted to `secrets.yaml` and mapping files.
- GPS coordinates removed from core code.
- Family names and specific school details replaced with placeholders.

---

*For installation instructions, please refer to [INSTALL.md](INSTALL.md).*
```