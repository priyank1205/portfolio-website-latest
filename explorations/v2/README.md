# Homepage directions — second exploration

Open `../../homepage-directions-v2.html` in a browser. The opening comparison shows captures of all six designs. Select a direction, use the top tabs, or use keys 1–6 when a control is not focused. “Full view” hides the review controls; “Concept” explains the current direction.

## Six directions

1. **Selected** — a compact personal column and an asymmetric gallery, with screen switching and project inspection.
2. **Cinema** — a large product stage, project rail, pointer depth, and product-decision annotations.
3. **Typographic** — a bold work index with responsive image previews and direct case-study links.
4. **Spatial** — a studio surface with bounded dragging, adjustable shadows, and reset controls.
5. **Colour Field** — an expanding exhibition of four projects; the fields become a vertical accordion on phones.
6. **Frequency** — a kinetic name, optional sound, a draggable project filmstrip, and a quick-scan index.

## Source and build

- `shell.html`: document and review dialogs.
- `directions.css`: six visual systems and responsive layouts.
- `directions.js`: homepage content, product compositions, and interactions.
- `build.py`: packages the source and existing product imagery into the root HTML artifact.
- `previews/`: browser captures used in the comparison dialog.

Rebuild with `python3 explorations/v2/build.py` from the repository root. The build uses Pillow, which is already present in the local environment. Product images, CSS, and JavaScript are embedded. Google Fonts are requested when online, with system fallbacks. Case-study links resolve to the existing portfolio files alongside the artifact.

## Verification

Visually checked at 1440 × 900, 1280 × 720, 390 × 844, and 320 × 740. Checked first-screen work visibility, page overflow, original image loading, duplicate IDs, and browser errors. Exercised direction and comparison navigation; gallery screen changes; the project dialog and screen selector; cinema project switching and annotations; typographic selection; spatial dragging, depth, and reset; colour-field selection; gallery/index switching; filmstrip navigation; and the optional sound control. Checked mobile project selection scrolls its preview into view. Reduced-motion rules disable decorative motion, and standard links remain available alongside the interactions.

Product facts and screens come from the existing portfolio. No new outcome metrics were invented for these explorations.
