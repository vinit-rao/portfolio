# Portfolio — Handoff (2026-07-31)

> Working notes for continuing in a new chat. Not part of the site.
> A new Claude Code session in this repo also auto-loads the same info from memory.

## Basics
- **Repo:** github.com/vinit-rao/portfolio · **Stack:** React 19 + Vite + react-router HashRouter → GitHub Pages (CI builds only; lint not gated). Run `npm run dev`.
- **Rules:** no video >100MB in git (use Vimeo); **never add a Claude co-author trailer** to commits.

## Design direction: "Cutting Room" → going Bauhaus
Quiet editorial gallery for a **motion/3D artist** ("CG Generalist"). Light gallery default `#F4F3EF` + dark toggle · monochrome + one **REC-red** `#E5322D` · **Archivo + JetBrains Mono** · sharp edges. Now evolving toward a **Bauhaus** aesthetic built from the VR logo.

## File map
```
src/
  App.jsx                 routes + ThemeProvider + Navbar + ExternalLinkGuard
  index.css               design tokens (light default, .dark-theme, --accent, --bau-blue/yellow, .shape system)
  context/ThemeContext.jsx  light default; toggles .dark-theme
  components/
    Navbar.jsx            Work·Archive·About·Contact + theme toggle + <Logo/>
    Logo.jsx              inline VR monogram SVG (currentColor)
    WorkTile.jsx          hover-to-play loop tile + timecode meta
    ArchiveModal.jsx      in-site detail modal for archive items
    ExternalLinkGuard.jsx global "leaving the site" confirm before any target=_blank
    Footer.jsx
  pages/
    Home.jsx              first screen = reel (REEL_VIMEO const) + Selected Work (placeholders)
    ProjectDetail.jsx     /work/:slug case study (from work.js)
    Archive.jsx           "The sandbox" — all old projects + type filter + modal
    About.jsx             story + vinit.jpg + both résumé downloads
    Contact.jsx           minimal form + relocate note + Winter 2027 co-op
  data/
    work.js               4 aspirational PLACEHOLDERS (front page)
    projects.js           42 real old projects (Archive)
    lab.js                dev/hardware list (Archive section — TO BE REMOVED)
public/
  images/bauhaus.svg      the VR logo (triangle · bar · circle · triangle)
  favicon-vr.svg          theme-aware favicon
  Vinit_Rao_Creative_Resume.pdf, Vinit_Rao_Developer_Resume.pdf
```

## ✅ Done
Cutting Room rebuild; reel as Home's first screen; Archive with type filter + in-site detail modal; global external-link warning; all current work moved to Archive (front = placeholders); VR logo + favicon; both résumés on About; CG-Generalist label; REC gimmick removed.

## 🔜 Next (start here)
1. **Fix Bauhaus shapes** to match the logo's real primitives (triangle, bar, circle, triangle — NO square). Current `.shape` accent in index.css is wrong.
2. **Remove the "Development & Hardware" section** from `Archive.jsx` (redundant). Note: "Marcan Order-Entry App" only exists in `lab.js` — add to `projects.js` or drop.
3. **Add Archive pagination** (~12–16/page) to cut memory; keep filter working.
4. **Design a UNIQUE Bauhaus look** (user disliked the generic first pass). Reference: quarter-circle geometric grids, red/blue/yellow/black, big display type — but original + rooted in the VR-logo shapes. Decide: how bold, tri-color vs red-only, Lottie-animate the logo?
5. Later: real reformed motion/3D on Vimeo → Work; record + wire the showreel.

## Note
Preview-sandbox **screenshots are blocked**; verify via Browser-pane `read_page` + `javascript_tool` or `preview_inspect`. React modals render next tick — check after a small timeout. Everything is in the working tree; **nothing committed.**
