# Harsh Singh — GSoC 2026 @ SciML

Personal portfolio and technical blog for **Google Summer of Code 2026** under **SciML (NumFOCUS)**.

🔗 **Live:** [singhharsh1708.github.io/Harsh_gsoc_blog](https://singhharsh1708.github.io/gsoc_blog/)

## Tech Stack

Pure static site — no build step, no frameworks.

- **HTML** — semantic markup
- **CSS** — vanilla, dark-first design system
- **JavaScript** — theme toggle, animations, filters
- **KaTeX** — LaTeX math rendering (CDN)

## Project Structure

```
├── index.html              # Main page (all sections)
├── css/style.css           # Design system
├── js/main.js              # Theme, nav, animations, filters
└── blog/
    ├── gsoc-selection.html
    ├── imex-runge-kutta.html
    ├── refactoring-tableaus.html
    ├── perform-step.html
    ├── zero-allocation-julia.html
    ├── multirate-solvers.html
    └── lessons-sciml.html
```

## Features

- Dark/light theme toggle
- 7 complete technical blog posts with academic references
- KaTeX math rendering
- GitHub contribution graph
- Category-filtered blog section
- Tabbed PR contribution cards
- Scroll animations
- Fully responsive

## Deploy

Static site — just push to GitHub and enable Pages from `main` branch. No build step needed.

