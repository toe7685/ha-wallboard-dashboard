# Contributing to Family Wallboard Dashboard

Thank you for your interest in contributing! We welcome community improvements to make this dashboard better for everyone.

## 🚨 Security Warning (Read First)
**Never commit personal data.**
Before submitting a Pull Request, ensure you have **redacted**:
- Passwords / API Keys
- GPS Coordinates
- Real names or addresses
- Your `secrets.yaml` file

---

## How to Contribute

### 🐛 Reporting Bugs
1. **Search existing issues** to avoid duplicates.
2. **Open a new issue** and include:
   - Home Assistant version
   - Browser/Tablet model (e.g., Fire Tablet 10, Chrome Desktop)
   - Relevant YAML snippets (use code blocks)
   - Error logs from Home Assistant

### 💡 Suggesting Features
1. **Search existing issues** first.
2. **Describe the "Why":** How does this help a family wallboard?
3. **Mockups:** If changing UI, provide a sketch or screenshot example.

---

## Pull Request Guidelines

1. **Fork** the repository.
2. **Branch** off `main`: `git checkout -b feature/my-cool-feature`.
3. **Make changes** following the style guide below.
4. **Test** on a live Home Assistant instance.
5. **Sanitize** your code (remove secrets/personal info).
6. **Submit** the PR with a clear description of what changed.

### 🎨 Code Style Guide
This repo relies heavily on YAML and Jinja2.

*   **Indentation:** Use **2 spaces** strictly. No tabs.
*   **Jinja Templates:** Add spaces inside brackets for readability.
    *   *Good:* `{{ states('sensor.time') }}`
    *   *Bad:* `{{states('sensor.time')}}`
*   **Comments:** Comment complex logic, especially in `button-card` templates.
*   **Line Length:** Keep lines readable, but do not break Jinja logic just to satisfy a line limit.

---

## What We Accept

✅ **Yes, please:**
- Bug fixes in logic (e.g., bus timer math).
- CSS/Styling improvements that fit the "Apple-like" theme.
- Documentation fixes (typos, clearer instructions).
- New optional cards (must fit the grid layout).

⚠️ **Discuss first:**
- Major layout changes (changing the grid areas).
- Adding new dependencies (new HACS cards).
- Breaking changes to the configuration structure.

❌ **No thanks:**
- Hardcoded personal data.
- Features requiring paid-only APIs.

---

## Support Boundaries

This is a community project maintained in spare time.

*   **We DO support:** Bugs in the dashboard code, layout issues, and configuration errors specific to this repo.
*   **We DO NOT support:** General Home Assistant setup, HACS installation, networking, or issues with the underlying integrations (e.g., Team Tracker).

**Need general help?**
- [Home Assistant Community Forum](https://community.home-assistant.io/)
- [Home Assistant Discord](https://discord.gg/home-assistant)

---

## Development Setup

To test your changes locally:

1. **Fork & Clone** this repo.
2. **Copy** the contents of `dashboards/` and `packages/` to your test Home Assistant instance.
3. **Reload** YAML configuration in Developer Tools.
4. **Refresh** your browser dashboard.

Thank you for helping make this project better! 🙏
```