from pathlib import Path
from PIL import Image
import base64, io, json

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent.parent
FILES = {
 'kpHome': ('khiladipro/dab923c5_home_-_with_frame.png', 570),
 'kpStage': ('khiladipro/7c76d0dd_Stage_Details.png', 570),
 'kpDrill': ('khiladipro/92205d06_Android_Large_-_235.png', 570),
 'kpWin': ('khiladipro/9773a5e1_Android_Large_-_237.png', 570),
 'kpWeb': ('khiladipro/69b8b1c0_Homepage.png', 1400),
 'kpRegistration': ('khiladipro/242735a7_2.1_Registration_Flow_Step_1_-_Basic_Details.png', 1400),
 'gmGame': ('getmega/d5983694_7._Play_Copy_73.png', 540),
 'gmLobby': ('getmega/58229c98_7._Play_Copy_72.png', 540),
 'gmStates': ('getmega/4b854647_states.png', 1300),
 'gmLeaderboard': ('getmega/On Demad 4 - Leaderboard.png', 540),
 'mpWallet': ('megapoker/4780d26a_Wallet_dark_theme.png', 570),
 'mpDeposit': ('megapoker/b0ce1de6_500_selected.png', 570),
 'mpWithdraw': ('megapoker/16250962_TDS_free_withdrawal.png', 570),
 'cedaBar': ('sedp/clean/bar-workspace.webp', 1400),
 'cedaCompare': ('sedp/clean/compare-pair.webp', 1400),
 'cedaAgri': ('sedp/supporting/agrimarket-map-workspace.webp', 1400),
 'portrait': ('home/about-portrait.jpg', 400),
 'summary': ('timestamped-summary/summary-generated.webp', 900),
}
assets = {}
for key, (name, width) in FILES.items():
    img = Image.open(ROOT / 'assets/images' / name)
    img.thumbnail((width, 2000), Image.Resampling.LANCZOS)
    out = io.BytesIO()
    img.save(out, format='WEBP', quality=87, method=4)
    assets[key] = 'data:image/webp;base64,' + base64.b64encode(out.getvalue()).decode()

for path in sorted((HERE / 'previews').glob('*.jpg')):
    if path.stem not in {'selected', 'cinema', 'typographic', 'spatial', 'colour', 'frequency'}:
        continue
    img = Image.open(path)
    img.thumbnail((760, 500), Image.Resampling.LANCZOS)
    out = io.BytesIO()
    img.save(out, format='WEBP', quality=88, method=4)
    assets['preview_' + path.stem] = 'data:image/webp;base64,' + base64.b64encode(out.getvalue()).decode()

html = (HERE / 'shell.html').read_text()
html = html.replace('/*__CSS__*/', (HERE / 'directions.css').read_text())
html = html.replace('/*__ASSETS__*/', 'const ASSETS = '+json.dumps(assets, separators=(',',':'))+';')
html = html.replace('/*__JS__*/', (HERE / 'directions.js').read_text())
target = ROOT / 'homepage-directions-v2.html'
target.write_text(html)
print(f'Built {target.name}: {target.stat().st_size:,} bytes, {len(assets)} embedded assets.')
