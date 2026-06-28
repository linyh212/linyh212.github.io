# [linyh212.github.io](https://linyh212.github.io/)

Personal website and blog built with [Astro](https://astro.build/) and deployed on GitHub Pages.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) – static site generator
- **Styling**: Custom CSS
- **Languages**: TypeScript, JavaScript
- **Deployment**: GitHub Pages (automated via GitHub Actions)

## Project Structure

```
linyh212.github.io/
├── .github/workflows/      # GitHub Actions workflow for auto‑deployment
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Reusable Astro / UI components
│   ├── content/            # Content collections (blog posts, pages data)
│   ├── layouts/            # Page layout templates
│   ├── lib/                # Utility functions and shared logic
│   ├── pages/              # File‑based routing – each file becomes a route
│   └── content.config.ts   # Content collection configuration
├── .gitignore
├── astro.config.mjs        # Astro configuration
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🚀 Development

```bash
# Install dependencies
npm install

# Start the development server
npm run dev

# Build for production
npm run build

# Preview the production build locally
npm run preview
```

## Routing & Pages

- Astro uses **file‑based routing** – every `.astro` or `.md` file inside `src/pages/` becomes a page.
- Global layout is managed by `src/layouts/`, ensuring a consistent design across all pages.

## Components & Content

- **`components/`** – Contains reusable UI pieces (e.g., navigation, footer, cards).
- **`content/`** – Manages blog posts and other content (Markdown / MDX), with schemas defined in `content.config.ts`.
- **`lib/`** – Houses helper functions (date formatting, tag processing, etc.).

## Styling

- Styles are written in custom CSS; some components may leverage Astro's built‑in scoping.
- Recent updates refined color schemes and sidebar styling for a cleaner look.

---

> This project is a personal portfolio and blog, actively maintained. Feedback and suggestions are welcome via Issues.