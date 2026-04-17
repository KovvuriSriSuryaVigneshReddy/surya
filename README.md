# ⚡ SriSuryaVigneshReddy Kovvuri — Futuristic Portfolio

> A high-end, immersive 3D animated personal portfolio website built with pure HTML, CSS, and JavaScript. No frameworks. No build tools. Just clean, performant code.

---

## 📁 Project Structure

```
portfolio/
├── index.html       # Markup & structure
├── style.css        # All styles, animations & CSS variables
├── script.js        # Three.js 3D scene, interactions & form logic
└── README.md        # You are here
```

---

## 🚀 Quick Start

No installs. No build steps. Just open it.

```bash
# Option 1 — Open directly in browser
open index.html

# Option 2 — Serve locally (recommended to avoid CORS on fonts)
npx serve .
# or
python3 -m http.server 8000
# then visit http://localhost:8000
```

> **Note:** All 3 files (`index.html`, `style.css`, `script.js`) must be in the **same folder**.

---

## ✨ Features

### 🌌 3D Background (Three.js)
- **3,500 colored star particles** rendered with WebGL
- **Rotating wireframe grid** that slowly drifts
- **12 floating octahedron shapes** in neon blue, purple & pink
- Camera drifts smoothly with mouse movement for a parallax depth effect

### 🖱️ Custom Cursor
- Glowing neon dot replaces the default cursor
- Ring trail follows with a slight lag for fluid feel
- Cursor scales and changes color when hovering interactive elements
- Dynamic **spotlight glow** radiates from cursor position

### 🎨 Design System
- **Dark theme** — deep navy `#020818` base
- **Neon palette** — cyan `#00d4ff`, purple `#7b2fff`, pink `#ff2d78`
- **Glassmorphism** panels with `backdrop-filter: blur`
- **3 custom fonts** — Orbitron (headings), Rajdhani (body), Share Tech Mono (labels)
- CSS custom properties for easy theming via `:root` variables

### 🃏 3D Card Interactions
- Every glass card **tilts in 3D** on mouse hover using `rotateX` / `rotateY`
- Smooth `perspective(800px)` depth effect
- Cards lift with `translateZ` and a neon glow shadow

### 📜 Scroll Animations
- **Progress bar** at top of page fills as you scroll
- Sections **fade + slide up** into view via `IntersectionObserver`
- Staggered reveal delays for grouped elements
- Navbar shrinks and gains blur on scroll

### 🦸 Hero Section
- Animated gradient name with `drop-shadow` glow
- Floating badge elements that **parallax** with mouse movement
- 3 ambient orbs that drift and react to cursor position
- Staggered entrance animations on load

### 📬 Contact Form
- **Client-side validation** — name, email format, and message required
- Neon red inline error messages on invalid fields
- On submit, opens your **default mail client** pre-filled with sender details
- Success state animation + auto-reset after 4 seconds
- Input focus triggers glowing underline slide-in effect

### ⏳ Loading Screen
- Futuristic dual-ring counter-rotating spinner
- Auto-dismisses after 2.2 seconds with a fade-out

---

## 🗂️ Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Name, title, skills badges, CTA buttons |
| 02 | **About** | Bio card with stats grid |
| 03 | **Skills** | AWS, Lovable, Vibe Coding — 3D hover chips |
| 04 | **Education** | Timeline of academic history with scores |
| 05 | **Certifications** | Tata Group & AWS APAC certs with links |
| 06 | **Contact** | Social links + working contact form |

---

## 🎨 Customisation Guide

### Change Colors
Open `style.css` and edit the `:root` block at the top:

```css
:root {
  --navy:         #020818;   /* Page background */
  --neon:         #00d4ff;   /* Primary accent (cyan) */
  --neon2:        #7b2fff;   /* Secondary accent (purple) */
  --neon3:        #ff2d78;   /* Tertiary accent (pink) */
  --glass:        rgba(0, 212, 255, 0.05);   /* Card fill */
  --glass-border: rgba(0, 212, 255, 0.15);   /* Card border */
}
```

### Update Contact Email
In `script.js`, find the `mailto:` line and replace the email address:

```js
const mailto = 'mailto:YOUR_EMAIL_HERE?subject=' + subject + '&body=' + body;
```

### Add / Remove Sections
All sections in `index.html` follow this pattern:
```html
<section id="your-section">
  <div class="your-inner">
    <div class="section-title reveal">
      <span class="section-label">// 00X</span>
      <h2 class="section-heading">Section Name</h2>
      <div class="section-line"></div>
    </div>
    <!-- your content -->
  </div>
</section>
```
Add the corresponding nav link in the `<nav>` and update the `sections` array in `script.js`.

### Adjust 3D Star Count
In `script.js`, find the Three.js section and change `count`:
```js
const count = 3500; // increase for more stars, decrease for better performance
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| HTML5 | Semantic structure |
| CSS3 | Styling, glassmorphism, keyframe animations |
| Vanilla JavaScript (ES6+) | Interactions, form logic, scroll events |
| [Three.js r128](https://threejs.org/) | WebGL 3D background (CDN) |
| [Google Fonts](https://fonts.google.com/) | Orbitron · Rajdhani · Share Tech Mono |
| IntersectionObserver API | Scroll-triggered reveal animations |
| `requestAnimationFrame` | Optimised 3D render loop |

---

## 📱 Responsive Design

| Breakpoint | Behaviour |
|------------|-----------|
| Desktop (> 768px) | Full layout with nav links, floating elements, custom cursor |
| Mobile (≤ 768px) | Nav links hidden, floating badges hidden, single-column layout, reduced padding |

---

## ⚡ Performance Notes

- `requestAnimationFrame` used for all animations — no `setInterval` lag
- `IntersectionObserver` used instead of scroll event for reveal — zero scroll jank
- Pixel ratio capped at `2` for Three.js renderer — prevents 4K overdraw
- External libraries loaded from CDN — browser-cached after first visit
- No frameworks, no bundlers — zero build overhead

---

## 📄 License

This portfolio is personal and belongs to **SriSuryaVigneshReddy Kovvuri**.  
Feel free to use the code structure as inspiration for your own portfolio.

---

## 📬 Contact

| Platform | Link |
|----------|------|
| Email | kovvuri.srisuryavigneshreddy@gmail.com |
| LinkedIn | [srisuryavigneshreddy-kovvuri](https://www.linkedin.com/in/srisuryavigneshreddy-kovvuri-1a2751277/) |
| GitHub | [KovvuriSriSuryaVigneshReddy](https://github.com/KovvuriSriSuryaVigneshReddy) |
| Instagram | [@srisuryavignesh_reddy](https://www.instagram.com/srisuryavignesh_reddy) |

---

<p align="center">Built with ⚡ by SriSuryaVigneshReddy Kovvuri · Andhra Pradesh, India</p>
