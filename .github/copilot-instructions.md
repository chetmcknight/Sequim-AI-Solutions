# Sequim AI Solutions - Copilot Instructions

## Project Overview
Static marketing website for a local AI consulting business in Sequim, WA. Deployed to **Google Cloud Run** via Docker container serving static files with Python's built-in HTTP server.

## Architecture
- **Single-page static site**: [index.html](../index.html) + [styles.css](../styles.css)
- **Deployment**: Containerized with [Dockerfile](../Dockerfile), hosted on Cloud Run at `sequim-ai-solutions-570795383152.us-west1.run.app`
- **No build step**: Direct HTML/CSS, no bundler or preprocessor

## Design System

### Color Palette
| Purpose | Color | Usage |
|---------|-------|-------|
| Primary | `#2f7c6e` (teal) | Headers, CTAs, accents |
| Primary dark | `#1a4d42` | Gradients, hover states |
| Accent | `#ff7f00` (orange) | Highlights, secondary CTAs |
| Text | `#5a5a5a` / `#888888` | Body text / secondary text |
| Background | `#faf9f7` / `#f5f3f0` | Page backgrounds |

### CSS Patterns
- **Gradients**: Use `linear-gradient(135deg, ...)` for buttons and section backgrounds
- **Cards**: White background, `border-radius: 16px`, `border: 2px solid #e8e5df`, hover adds colored border + `translateY(-8px)` + shadow
- **Hover underlines**: Pseudo-element `::before` with `transform: scaleX(0)` → `scaleX(1)` for animated bottom borders
- **Decorative blobs**: `::before`/`::after` radial gradients positioned absolute with `pointer-events: none`

### Typography
- System font stack: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto...`
- Headings: `font-weight: 800`, `letter-spacing: -0.02em`
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs

## Section Structure
Sections follow this pattern in [index.html](../index.html):
```html
<section class="section-name" id="anchor">
    <div class="container">
        <h2>Title</h2>
        <p class="section-subtitle">Subtitle</p>
        <!-- Grid of cards -->
    </div>
</section>
```

## Local Development
```bash
# Serve locally (matches Cloud Run behavior)
python -m http.server 8080

# Build Docker image
docker build -t sequim-ai .

# Test container locally
docker run -p 8080:8080 sequim-ai
```

## Deployment
Cloud Run auto-deploys from container. Ensure port **8080** is exposed (required by Cloud Run).

## Content Guidelines
- **Tone**: Friendly, plain English, no jargon—matches the business's "no hype" positioning
- **Emoji icons**: Cards use emoji in `.card-icon` divs (e.g., `💼`, `🏨`)
- **CTA language**: "Book a Free Walkthrough", "Schedule a Free Intro Call"—emphasize no-pressure, honest approach
