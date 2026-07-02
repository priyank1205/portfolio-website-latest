# Priyank Agarwal — Portfolio Website

Live at https://priyank1205.github.io/portfolio-website-latest/

Static portfolio site generated from the public Notion portfolio
(https://priyank1205.notion.site/Priyank-Agarwal-367ded138bca807abce1e3a94ad95822).

No build step, no dependencies — plain HTML/CSS/JS. Deploy the folder as-is to
Netlify, Vercel, GitHub Pages, or any static host.

Dark, minimal design (Inter + JetBrains Mono). Interactions: press `C` anywhere
to copy the email (with toast), cursor-spotlight on project cards, magnetic
buttons, staggered scroll reveals (IntersectionObserver + scroll fallback),
company marquee, image lightbox, live IST clock in the footer. No scrolljacking.

When editing CSS/JS, bump the `?v=N` query on the asset references in the HTML
files so browsers pick up the new version.

## Run locally

```sh
python3 -m http.server 4173
# open http://localhost:4173
```

## Structure

```
index.html                        Home: hero, projects, hobby, testimonials, contact
projects/
  khiladipro.html                 Khiladipro — website & mobile app (2024–2025)
  sedp-dashboard.html             Ashoka Univ. — SEDP dashboard redesign (2023–2024)
  mega-poker.html                 Mega Poker — app flows redesign (2024)
  getmega.html                    Getmega mobile app (2019–2021)
  ecometer-agrimarket.html        Ashoka Univ. — Ecometer & Agrimarket (2022–2023)
assets/
  css/style.css                   Single shared stylesheet (design tokens in :root)
  js/main.js                      Lightbox, scroll reveal, copy-email
  images/<project>/               All images downloaded from Notion (optimized)
  favicon.svg
```

## External links

- LinkedIn: https://www.linkedin.com/in/priyank1205/
- Resume: Google Drive (linked from the hero "Resume" button)
- YouTube Timestamped Summary repo: https://github.com/priyank1205/yt-transcript-ext
