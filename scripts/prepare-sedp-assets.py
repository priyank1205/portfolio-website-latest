"""Reproducible crops of source evidence; no data or UI is reconstructed."""
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'assets/images/sedp/clean'
OUT.mkdir(exist_ok=True)
def crop(prefix, name, box=None, group='sedp'):
    source = next((ROOT / 'assets/images' / group).glob(prefix+'*'))
    raw = Image.open(source).convert('RGBA')
    im = Image.new('RGBA', raw.size, 'white')
    im.alpha_composite(raw)
    im = im.convert('RGB')
    if box: im = im.crop(box)
    im.save(OUT / (name+'.webp'), quality=94, method=6)
for prefix,name in [('abf7a91d','workspace'),('9345e24a','compare-pair'),('357f6b4f','bar-workspace'),('326e4183','landing-design')]:
    im=Image.open(next((ROOT/'assets/images/sedp').glob(prefix+'*')))
    crop(prefix,name,(0,84,1600,im.height-2))
crop('fcd1ef8b','old-portal')
crop('fcd1ef8b','old-controls',(995,430,1420,1305))
crop('fcd1ef8b','old-gate-detail',(995,935,1420,1310))
crop('abf7a91d','category-rail',(16,207,251,650))
crop('abf7a91d','compare-action',(304,192,999,249))
crop('d0f2f7e0','compare-modal',(438,267,1197,760))
crop('0b119b0f','ecometer-modal',(533,315,1060,688),'ecometer')
for prefix,name in [('cb7c9aa7','heatmap'),('b37ade72','tooltip'),('c505a00f','selectors'),('51fd44d7','timeline'),('7415e220','export-map'),('d14c954d','export-bar'),('3f28812d','export-line')]: crop(prefix,name)
crop('28b166f2','published-export-2026-03-08',(41,610,1171,1740))
crop('28b166f2','ceda-post-2026-03-08',(8,115,1199,1742))
crop('6a82ca54','ceda-post-2026-03-24',(9,110,1200,1805))
crop('abf7a91d','sedp-header',(18,97,815,164))
crop('27977c07','agrimarket-header',(18,97,815,164),'ecometer')
crop('74b2db68','agrimarket-map',(590,390,1538,903),'ecometer')
crop('abf7a91d','sedp-map',(301,344,1221,859))
crop('abf7a91d','sedp-actions',(303,939,591,986))
crop('e6f9dcfb','ecometer-actions',(340,890,690,949),'ecometer')
for prefix,name in [('e0b09fb2','agrimarket-before'),('981dbc44','agrimarket-form')]: crop(prefix,name,group='ecometer')
crop('27977c07','agrimarket-after',(0,84,1600,998),'ecometer')
for name,box in [('landing',(0,145,2544,1914)),('login',(97,138,621,532))]:
    im=Image.open(ROOT/f'audits/sedp-review-2026-09-19/{name}-archive-original.png').convert('RGB').crop(box)
    im.save(OUT/f'{name}-archive.webp',quality=94,method=6)

# Readable excerpts of the archived shipped landing page, alongside the full capture.
im=Image.open(OUT/'landing-archive.webp')
for name,box in [('landing-region-detail',(395,1170,1050,1280)),('landing-source-detail',(75,1550,1000,1660)),('landing-search-detail',(75,1300,1480,1420))]:
    im.crop(box).save(OUT/(name+'.webp'),quality=94,method=6)
