# Homepage directions

The deliverable is `../homepage-directions.html`: one HTML file containing six
complete, interactive homepage concepts. Its styles, JavaScript, and eight
compressed product images are embedded. Google Fonts is optional; system fonts
provide a fallback. Case-study and About links use the existing portfolio pages.

1. **Living Gallery:** compact introduction beside a featured product, then a
   visible project gallery. The recommended starting point.
2. **Obsidian:** a dark wall of three working product fragments.
3. **Atelier:** editorial type, warm paper, a tactile product composition, and
   a concise work index.
4. **Signal:** a bold blue introduction and a product demonstration in one canvas.
5. **Index:** persistent personal context beside expandable project entries.
6. **Playground:** three playable product windows with optional sound.

Use the tabs or number keys 1–6 to switch. “Compare all” gives a visual overview;
“Design notes” explains each direction. “Full preview” removes the exploration
controls. Sound starts off; motion can be paused, and reduced-motion preferences
are respected.

The product fragments are interactive recreations rather than production embeds.
Chart data, contests, and wallet tiers are explicitly labelled samples. Images
come from the existing portfolio. No business-performance metrics are invented.
Role and client facts follow the current homepage and case studies.

## Editing

Edit `homepage-directions.css`, `homepage-directions.js`, or the markup and
components in `build-homepage-directions.py`. Regenerate with:

```sh
python3 explorations/build-homepage-directions.py
```

The builder requires Pillow, already available in this workspace. It only writes
the new HTML artifact and does not modify the existing homepage or case studies.

## Verification

Visually reviewed all six directions at desktop and mobile breakpoints. At
1280 × 720, every direction presents work in the first viewport. Checked phone
layouts at 390 × 844 and 320 × 740 with no horizontal page overflow. Verified:

- Rep counter completes at 20 and resets.
- Contest card cycles through all 13 states and wraps back to the first.
- Wallet input recalculates principal, tiered bonus, and total.
- Desk reset restores the starting interaction state.
- Chart indicators redraw values, and share previews open and close.
- The project index keeps one entry open at a time.
- Motion pause preserves the visibility of incoming content.
- IDs are unique and every linked local case-study page exists.
