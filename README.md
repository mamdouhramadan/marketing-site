# Trufla Task

Mobile-first, semantic HTML/SCSS/JS site for the Trufla developer task. Includes a PWA setup (manifest + service worker), multiple pages (Home, About, Contact), and accessibility improvements (skip link, focus styles, contrast).

[**View Demo**](https://mamdouhramadan.github.io/trufla-task/dist/) · Demo runs from the `dist/` build.

---

## Built with

- **Gulp** – task runner (HTML, CSS, JS, images, manifest, service worker)
- **Pug** – HTML templates with a shared layout
- **SCSS** – styles with variables and mixins
- **Bootstrap 4** – layout and components (via libs)
- **jQuery 3.6** – DOM and scroll behavior
- **Static server** – dev server on port 6001

---

## Project structure

```
trufla-task/
├── dev/                    # Source
│   ├── html/
│   │   ├── index.pug       # Home
│   │   ├── about.pug       # About
│   │   └── contact.pug     # Contact
│   ├── layouts/
│   │   └── layout.pug      # Default layout (add more layouts here)
│   ├── components/        # Reusable partials (head, navbar, footer, etc.)
│   │   ├── head.pug
│   │   ├── navbar.pug
│   │   ├── footer.pug
│   │   ├── scripts.pug
│   │   └── variables.pug
│   ├── scss/               # Styles
│   ├── js/                 # Scripts (main.js + SW registration)
│   ├── images/             # Images (add PWA icons here for installability)
│   ├── libs/               # Bootstrap, normalize, etc.
│   ├── manifest.json       # PWA manifest (scope, start_url, icons)
│   └── sw.js               # Service worker (caches pages + assets)
├── dist/                   # Build output (do not edit by hand)
├── gulpfile.js
├── server.js               # Serves dist/ on port 6001
└── package.json
```

---

## Prerequisites

- **Node.js** (e.g. v16+; older may need different `gulp-sass`/node-sass)
- **Gulp CLI** (optional but convenient): `npm install -g gulp-cli`

---

## Commands

| Command | Description |
|--------|--------------|
| `npm install` | Install dependencies |
| `npm start` | Start dev server + watch (Gulp watch) → open **http://localhost:6001** |
| `npm run build` | Full build (HTML, CSS, JS, images, manifest, service worker) |
| `npm run serve` | Serve `dist/` only (run after `npm run build` for production preview) |

Without npm scripts:

- `gulp watch` – dev with live reload
- `gulp build` or `gulp` – one-off build

---

## Pages

- **Home** (`index.html`) – hero, team section, content blocks
- **About** (`about.html`) – short about and mission
- **Contact** (`contact.html`) – contact form (name, email, message)

### Adding a new page

1. Add a new file in `dev/html/`, e.g. `dev/html/services.pug`.
2. Extend a layout and fill the content block:

   ```pug
   extends ../layouts/layout
   block head
     title Services | Trufla
   block content
     section
       h1 Services
       p Your content.
   ```

3. Add a nav entry in `dev/components/variables.pug` in the `navLinks` array, e.g. `{ label: 'Services', href: 'services.html' }`.
4. Run `npm run build` (or `gulp build`). The new page will be in `dist/services.html`.

To use a different layout later, add `dev/layouts/other.pug` and use `extends ../layouts/other` in your page.

---

## PWA

The app is set up as a Progressive Web App:

- **Manifest** – `dev/manifest.json` is copied to `dist/` on build. It defines `scope`, `start_url`, icons, theme and background colors, and `display: standalone`.
- **Service worker** – `dev/sw.js` is copied to `dist/sw.js` and caches the main pages and assets for offline use.
- **Icons** – The manifest expects `images/android-chrome-192x192.png` and `images/android-chrome-512x512.png`. Add these under `dev/images/` (they are copied to `dist/images/` by the `img` task) for installability.
- **HTTPS** – Installing the PWA and using the service worker requires HTTPS (or `localhost`).

---

## Accessibility and contrast

- **Semantic HTML** – `<main>`, `<header>`, `<footer>`, `<nav>`, one `h1` per page, logical heading order.
- **Skip link** – “Skip to main content” at the top of the page (visible on keyboard focus).
- **Focus styles** – Visible `:focus-visible` outlines on links, buttons, form controls, and the scroll-to-top button.
- **Labels** – Contact form fields use `<label for="...">` and required attributes.
- **Contrast** – Theme colors are chosen for readable text (e.g. dark on light). Hero section uses a subtle overlay to improve contrast for white text on the background image.
- **Reduced motion** – Scroll-to-top and other motion respect `prefers-reduced-motion`.

---

## About the original task

This repo implements the Trufla full-stack developer task: code the provided Invision screens in mobile-first, semantic HTML, SCSS, and JavaScript. Responsive breakpoints (desktop, tablet, mobile) are included. You can use Invision Inspect for fonts, sizes, and assets; see the [Invision Inspect docs](https://support.invisionapp.com/hc/en-us/sections/360007928472-Inspect) if needed.

![Screenshot](https://raw.githubusercontent.com/mamdouhramadan/trufla-task/main/screen-shot.png)

---

## License

ISC.
