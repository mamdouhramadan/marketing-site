# Trufla Task

A **mobile-first**, **bilingual (English / Arabic)** static marketing site for Trufla — insurance templates and claims support. Built with Pug, Gulp, Tailwind CSS, and vanilla JavaScript. Includes RTL support, dark mode, PWA setup, and accessibility features.

**[View Demo](https://mamdouhramadan.github.io/trufla-task/dist/)** · Demo is served from the `dist/` build.

### Screenshots

| Light mode | Dark mode |
|------------|-----------|
| ![Home — Light mode](screenshots/home-light.png) | ![Home — Dark mode](screenshots/home-dark.png) |

---

## What’s in the project

- **Bilingual:** Every page has an English and an Arabic (RTL) version (e.g. `index.html` / `index-ar.html`).
- **Tailwind CSS** for layout and utilities; **SCSS** for global styles (fonts, skip link, etc.).
- **Pug** templates with a shared layout, components, and data files.
- **Vanilla JS** (no jQuery): theme toggle, cookie consent, accordion, blog listing/detail, scroll-to-top.
- **PWA:** manifest and service worker for offline and installability.
- **Accessibility:** skip link, focus styles, semantic HTML, single h1 per page, RTL and reduced-motion support.

---

## Tech stack & tools

| Tool | Purpose |
|------|--------|
| **Node.js** | Runtime |
| **Gulp 4** | Task runner: HTML, CSS, JS, images, Tailwind, manifest, service worker |
| **Pug** | HTML templating (layouts, pages, components, data) |
| **Tailwind CSS v3** | Utility-first CSS (PostCSS + cssnano) |
| **SCSS (Sass)** | Global styles, fonts (Roboto / Almarai for Arabic) |
| **Vanilla JavaScript** | All interactivity (minified to `main-min.js`) |
| **Express** | Dev server for `dist/` (port 6001) with live reload |

**Fonts:** Poppins and Almarai (Google Fonts); Roboto via local files. Almarai is applied automatically on Arabic (RTL) pages.

---

## Project structure

```
trufla-task/
├── dev/                        # Source (edit these)
│   ├── pages/                  # One .pug per page (EN + AR pairs)
│   │   ├── index.pug, index-ar.pug
│   │   ├── about.pug, about-ar.pug
│   │   ├── blogs.pug, blogs-ar.pug
│   │   ├── blog-detail.pug, blog-detail-ar.pug
│   │   ├── contact.pug, contact-ar.pug
│   │   ├── pricing.pug, pricing-ar.pug
│   │   ├── login.pug, login-ar.pug
│   │   └── 404.pug, 404-ar.pug
│   ├── layouts/
│   │   └── layout.pug           # Main layout (html lang/dir, head, body, footer)
│   ├── components/             # Shared UI (navbar, footer, head, variables, etc.)
│   ├── partials/                # Page-specific content (index-content, about-content, …)
│   ├── data/                   # Pug data (blogs, team, testimonials, FAQ)
│   ├── scss/                   # SCSS entry + utilities (main.scss → main.css)
│   ├── css/
│   │   └── tailwind.css        # Tailwind entry (processed by PostCSS)
│   ├── js/                     # Concatenated and minified (main, theme-toggle, cookie-consent, …)
│   ├── libs/                   # normalize.css, font-awesome
│   ├── images/                 # Copied as-is to dist/images
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
├── dist/                       # Build output (do not edit by hand)
├── tailwind.config.js          # Tailwind theme (colors, animations)
├── gulpfile.js                 # Gulp tasks
├── server.js                   # Serves dist/ on port 6001
└── package.json
```

---

## Prerequisites

- **Node.js** (v18+ recommended; v16+ may work)
- **npm** (comes with Node)

Optional: install Gulp CLI globally for `gulp` in the terminal:

```bash
npm install -g gulp-cli
```

---

## How to run the project

### 1. Install dependencies

```bash
npm install
```

### 2. Build the site

Builds HTML, CSS (main, libs, Tailwind), JS, images, manifest, and service worker into `dist/`:

```bash
npm run build
```

Or:

```bash
gulp build
```

### 3. Development (watch + live reload)

Starts the dev server, opens **http://localhost:6001**, and watches source files. Edits to Pug, SCSS, JS, etc. trigger a rebuild and browser refresh:

```bash
npm start
```

Or:

```bash
gulp watch
```

### 4. Production-style preview (no watch)

If you only want to serve the built site without watch:

```bash
npm run build
npm run serve
```

Then open **http://localhost:6001** (port is defined in `server.js`).

---

## NPM scripts summary

| Command | Description |
|--------|-------------|
| `npm install` | Install dependencies |
| `npm run build` | Full build → output in `dist/` |
| `npm start` | Dev: build + watch + server + live reload (port 6001) |
| `npm run serve` | Serve `dist/` only (run after `npm run build`) |

---

## Pages and languages

Each “page” has two files: English (e.g. `index.pug`) and Arabic (e.g. `index-ar.pug`). They set `isArabic` and `langSwitchBase` in `block vars` and include the same content partials. The layout sets `html` `lang` and `dir` (e.g. `lang="ar" dir="rtl"`) and applies the Almarai font on Arabic pages.

| English | Arabic | Route |
|--------|--------|--------|
| Home | الرئيسية | `index.html` / `index-ar.html` |
| About | من نحن | `about.html` / `about-ar.html` |
| Blogs | المدونة | `blogs.html` / `blogs-ar.html` |
| Blog detail | المقال | `blog-detail.html` / `blog-detail-ar.html` |
| Contact | اتصل بنا | `contact.html` / `contact-ar.html` |
| Pricing | الأسعار | `pricing.html` / `pricing-ar.html` |
| Login | تسجيل الدخول | `login.html` / `login-ar.html` |
| 404 | الصفحة غير موجودة | `404.html` / `404-ar.html` |

---

## PWA

- **Manifest:** `dev/manifest.json` is copied to `dist/`; defines scope, start URL, icons, theme.
- **Service worker:** `dev/sw.js` is copied to `dist/sw.js` and caches pages and assets for offline use.
- **Icons:** Expects `dev/images/android-chrome-192x192.png` and `android-chrome-512x512.png` (copied to `dist/images/`). Add these for installability.
- **HTTPS:** PWA install and service worker need HTTPS (or `localhost`).

---

## Accessibility and UX

- **Semantic HTML:** `<main>`, `<header>`, `<footer>`, `<nav>`, one `h1` per page.
- **Skip link:** “Skip to main content” (visible on keyboard focus).
- **Focus styles:** Visible outlines on links, buttons, and form controls.
- **RTL:** `dir="rtl"` and `text-start` / logical properties for Arabic; Almarai font on `lang="ar"`.
- **Dark mode:** Toggle with `class="dark"` on `<html>`; preference stored in `localStorage`.
- **Reduced motion:** Marquee and other motion respect `prefers-reduced-motion`.

---

## License

ISC.
