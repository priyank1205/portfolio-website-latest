"""Prepare lossless, unretouched crops of supplied CEDA mockups.

Run from any directory with Pillow installed. Coordinates are left/top/right/bottom
in the original image. Never replace sample values or infer dates from the UI.
"""
from pathlib import Path
import hashlib
import json
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/images/ecometer'
OUT = ROOT / 'assets/images/sedp/supporting'
CROPS = [
    ('ecometer-workspace', 'e6f9dcfb_1._Main.png', (0, 84, 1600, 1001), 'Inconsistent plot/range dates and repeated range labels; layout evidence only.'),
    ('ecometer-series', 'e6f9dcfb_1._Main.png', (1250, 265, 1580, 645), 'Selected-series detail from the same workspace; no sample values changed.'),
    ('ecometer-growth', '0849b72d_3._Chart_Growth_Rate.png', (510, 198, 935, 694), 'Transformation selector and explanation only; no transformed-result frame supplied.'),
    ('ecometer-provenance', 'e4652152_4._Chart_Description.png', (302, 199, 885, 645), 'Indicator definition, notes and methodology; historical wording retained.'),
    ('agrimarket-entry', 'e0b09fb2_before1.png', (145, 76, 1495, 710), 'Supplied old interface state; not a matched before/after task.'),
    ('agrimarket-configuration', '981dbc44_before2.png', (99, 45, 1502, 272), 'Supplied old configuration state; displayed dates do not date the engagement.'),
    ('agrimarket-workspace', '27977c07_1._Default_View.png', (0, 84, 1600, 1001), 'Inconsistent sample arithmetic; table/chart layout and explanation evidence only.'),
    ('agrimarket-price-explanation', '27977c07_1._Default_View.png', (273, 532, 696, 689), 'Last-available-price rule as written; sample arithmetic does not verify it.'),
    ('agrimarket-isolation', '66609919_4._Hover_on_Modal_Prices_Legend.png', (583, 435, 1567, 915), 'Separate design state, not transition capture. 30-day average and source/footer differ from default (7-day).'),
    ('agrimarket-map-workspace', '74b2db68_Map_View.png', (0, 84, 1600, 1001), 'Retains table, context, map and readouts. Displayed table/map dates differ; no synchronization proof.'),
    ('agrimarket-download', '3a8ce847_3._Download_Modal.png', (610, 270, 990, 774), 'Complete export configuration; no exported output supplied.'),
]

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    records = []
    for name, filename, bounds, caveat in CROPS:
        source = SOURCE / filename
        target = OUT / f'{name}.webp'
        with Image.open(source) as image:
            crop = image.crop(bounds)
            crop.save(target, 'WEBP', lossless=True, exact=True, method=6)
        records.append({
            'asset': str(target.relative_to(ROOT)),
            'product': 'Ecometer' if name.startswith('ecometer') else 'Agrimarket',
            'source': str(source.relative_to(ROOT)),
            'source_sha256': hashlib.sha256(source.read_bytes()).hexdigest(),
            'crop_bounds': bounds,
            'dimensions': crop.size,
            'source_type': 'supplied old interface capture' if name in ('agrimarket-entry', 'agrimarket-configuration') else 'supplied design/mockup frame',
            'capture_or_version_date': None,
            'shipping': 'Not applicable: supplied old interface, not a Priyank redesign frame.' if name in ('agrimarket-entry', 'agrimarket-configuration') else 'Represented redesign shipped, confirmed by Priyank on 21 September 2026; independent of image provenance.',
            'sample_data': name not in ('agrimarket-entry', 'agrimarket-configuration'),
            'presentation_limit': caveat,
            'treatment': 'Crop only; lossless WebP, no retouching or numerical edits.',
        })
    (OUT / 'manifest.json').write_text(json.dumps(records, indent=2) + '\n')
    print(f'Prepared {len(records)} crops and source manifest.')

if __name__ == '__main__':
    main()
