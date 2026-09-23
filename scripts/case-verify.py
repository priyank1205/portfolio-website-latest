#!/usr/bin/env python3
"""Verify a case study built on the case study system.

Needs Playwright with its bundled Chromium, and the site served locally
(the `portfolio` entry in .claude/launch.json serves it on port 8901):

    pip install playwright && python3 -m playwright install chromium

Usage (the page is a path under the site root):

    scripts/case-verify.py check projects/getmega.html
        Static and live checks: dashes, hover gating, CSS parse, sideways
        scroll at every width, console errors, pinned-stage stability.

    scripts/case-verify.py shots projects/getmega.html [out_dir]
        Viewport-sized captures down the whole page at 390x844 and 1440x900,
        plus 3-up contact sheets, for reading section by section.

    scripts/case-verify.py snap projects/getmega.html name
    scripts/case-verify.py diff name_a name_b
        Computed style of every element and pseudo-element at five widths,
        and the difference between two snapshots. Use it to prove a
        refactor changed nothing: the extraction of this system did.

Phones are emulated properly (touch, device pixel ratio, mobile viewport),
which a --window-size capture from headless Chrome cannot do below 500px.
"""
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
BASE = os.environ.get('CASE_BASE', 'http://localhost:8901/')
OUT = ROOT / 'audits' / 'captures'
WIDTHS = [(360, 800), (375, 667), (390, 844), (430, 932), (768, 1024), (1080, 900), (1440, 900)]
SNAP_WIDTHS = [(360, 800), (390, 844), (768, 1024), (1080, 900), (1440, 900)]
IPHONE_UA = ('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 '
             '(KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1')


def playwright():
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        sys.exit('Playwright is missing: pip install playwright && python3 -m playwright install chromium')
    return sync_playwright


def open_page(p, page, w, h, dsf=1):
    mobile = w < 800
    browser = p.chromium.launch()
    ctx = browser.new_context(viewport={'width': w, 'height': h}, device_scale_factor=dsf,
                              is_mobile=mobile, has_touch=mobile,
                              **({'user_agent': IPHONE_UA} if mobile else {}))
    pg = ctx.new_page()
    errors = []
    pg.on('console', lambda m: errors.append(f'{m.type}: {m.text}') if m.type in ('error', 'warning') else None)
    pg.on('pageerror', lambda e: errors.append(f'pageerror: {e}'))
    pg.goto(BASE + page + ('&' if '?' in page else '?') + f'v={os.getpid()}', wait_until='networkidle')
    pg.wait_for_timeout(500)
    return browser, pg, errors


def assets_of(page):
    html = (ROOT / page).read_text(encoding='utf-8')
    base = (ROOT / page).parent
    css = [(base / h.split('?')[0]).resolve() for h in re.findall(r'href="([^"]+\.css[^"]*)"', html)]
    js = [(base / s.split('?')[0]).resolve() for s in re.findall(r'src="([^"]+\.js[^"]*)"', html)]
    return html, [c for c in css if c.exists()], [j for j in js if j.exists()]


# --- check -------------------------------------------------------------------

def check(page):
    html, css, js = assets_of(page)
    problems = []

    # 1. Copy hygiene: no em or en dashes anywhere a reader or a diff can see.
    for f in [ROOT / page, *css, *js]:
        n = len(re.findall('[\u2014\u2013]', f.read_text(encoding='utf-8')))
        if n:
            problems.append(f'{f.relative_to(ROOT)}: {n} em/en dashes')

    # 2. Hover only where hover exists: every :hover rule inside @media (hover: hover).
    for f in css:
        text = re.sub(r'/\*.*?\*/', '', f.read_text(encoding='utf-8'), flags=re.S)
        # walk the blocks, tracking the enclosing at-rule preludes
        preludes = []
        for m in re.finditer(r'([^{}]*)([{}])', text):
            prelude, brace = m.group(1).strip(), m.group(2)
            if brace == '{':
                preludes.append(prelude)
                if ':hover' in prelude and not prelude.startswith('@') and \
                        not any('hover: hover' in p for p in preludes[:-1]):
                    problems.append(f'{f.relative_to(ROOT)}: ungated hover rule: {prelude[:80]}')
            else:
                if preludes:
                    preludes.pop()

        # 3. Braces balance (one stray brace silently kills every rule after it).
        if text.count('{') != text.count('}'):
            problems.append(f'{f.relative_to(ROOT)}: unbalanced braces')

    sync_playwright = playwright()
    with sync_playwright() as p:
        # 4. The browser parsed every rule the files contain.
        browser, pg, errors = open_page(p, page, 1440, 900)
        parsed = pg.evaluate("""() => [...document.styleSheets].filter(s => s.href).map(s => {
            let n = 0; const walk = r => { for (const x of r) { n++; if (x.cssRules) walk(x.cssRules); } };
            try { walk(s.cssRules); } catch (e) { return [s.href, -1]; } return [s.href.split('?')[0], n]; })""")
        for href, n in parsed:
            local = [c for c in css if href.endswith(str(c.relative_to(ROOT)))]
            if local:
                blocks = re.sub(r'/\*.*?\*/', '', local[0].read_text(encoding='utf-8'), flags=re.S).count('{')
                if n != blocks:
                    problems.append(f'{local[0].relative_to(ROOT)}: browser parsed {n} rules of {blocks} blocks')
        browser.close()

        # 5. Every width: no sideways scroll, no console errors; pinned stages hold still.
        for w, h in WIDTHS:
            browser, pg, errors = open_page(p, page, w, h)
            total = pg.evaluate('document.documentElement.scrollHeight')
            for y in range(0, total, int(h * 0.8)):
                pg.evaluate(f'scrollTo({{top: {y}, behavior: "instant"}})')
                pg.wait_for_timeout(30)
            sw = pg.evaluate('document.documentElement.scrollWidth')
            if sw > w:
                wide = pg.evaluate("""(w) => [...document.querySelectorAll('body *')].filter(el => {
                    const r = el.getBoundingClientRect(); if (!r.width || r.right <= w + 0.5) return false;
                    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement)
                      if (getComputedStyle(p).overflowX !== 'visible') return false;
                    return true; }).slice(0, 5).map(el => el.className || el.tagName)""", w)
                problems.append(f'{w}x{h}: page scrolls sideways ({sw}px): {wide}')
            for e in errors:
                problems.append(f'{w}x{h}: {e}')
            problems += stability(pg, w, h)
            browser.close()

    if problems:
        print('\n'.join('FAIL ' + p for p in problems))
        sys.exit(1)
    print(f'OK {page}: dashes, hover gating, CSS parse, {len(WIDTHS)} widths, console, pinned stages')


def stability(pg, w, h):
    """A pinned stage must not resize its device or move its copy between steps."""
    out = []
    roots = pg.evaluate("""() => [...document.querySelectorAll('.flow')].map((f, i) => {
        f.dataset.verifyIndex = i; return i; })""")
    for i in roots:
        info = pg.evaluate(f"""() => {{
            const f = document.querySelector('[data-verify-index="{i}"]');
            const sticky = f.querySelector('.flow-sticky');
            if (!sticky) return null;
            const steps = parseInt(getComputedStyle(f).getPropertyValue('--steps')) || 1;
            return {{ top: f.getBoundingClientRect().top + scrollY, travel: f.offsetHeight - sticky.offsetHeight, steps }};
        }}""")
        if not info or info['travel'] <= 0:
            continue
        seen = set()
        for s in range(info['steps']):
            pg.evaluate(f"scrollTo({{top: {int(info['top'] + info['travel'] * (s + 0.5) / info['steps'])}, behavior: 'instant'}})")
            pg.wait_for_timeout(600)  # past the text swap, which moves the title while it runs
            seen.add(pg.evaluate(f"""() => {{
                const f = document.querySelector('[data-verify-index="{i}"]');
                const d = f.querySelector('.phone'), h3 = f.querySelector('h3');
                return [d ? Math.round(d.getBoundingClientRect().width) : 0,
                        h3 ? Math.round(h3.getBoundingClientRect().top) : 0].join('/');
            }}"""))
        if len(seen) > 1:
            out.append(f'{w}x{h}: pinned stage {i} moves between steps (device width / title top: {sorted(seen)})')
    return out


# --- shots -------------------------------------------------------------------

def shots(page, out_dir=None):
    from PIL import Image, ImageDraw
    stem = Path(page).stem
    out = Path(out_dir) if out_dir else OUT / stem
    out.mkdir(parents=True, exist_ok=True)
    sync_playwright = playwright()
    with sync_playwright() as p:
        for w, h in [(390, 844), (1440, 900)]:
            d = out / f'{w}'
            d.mkdir(exist_ok=True)
            browser, pg, _ = open_page(p, page, w, h, dsf=2 if w < 800 else 1)
            total = pg.evaluate('document.documentElement.scrollHeight')
            files, y, i = [], 0, 0
            while y < total:
                pg.evaluate(f'scrollTo({{top: {y}, behavior: "instant"}})')
                pg.wait_for_timeout(700)
                f = d / f'{i:02d}.png'
                pg.screenshot(path=str(f))
                files.append(f)
                y += int(h * 0.82)
                i += 1
            browser.close()
            per = 3 if w < 800 else 2
            scale = 0.5 if w < 800 else 0.5
            for k in range(0, len(files), per):
                group = [Image.open(f).convert('RGB') for f in files[k:k + per]]
                gw, gh = int(group[0].width * scale), int(group[0].height * scale)
                sheet = Image.new('RGB', (per * (gw + 12), gh + 22), (60, 60, 70))
                draw = ImageDraw.Draw(sheet)
                for j, im in enumerate(group):
                    sheet.paste(im.resize((gw, gh), Image.LANCZOS), (j * (gw + 12), 22))
                    draw.text((j * (gw + 12) + 4, 4), files[k + j].name, fill=(255, 255, 0))
                sheet.save(d / f'sheet-{k // per:02d}.jpg', quality=86)
            print(f'{w}: {len(files)} frames in {d}')


# --- snap / diff ---------------------------------------------------------------

SNAP_JS = r"""() => {
  document.querySelectorAll('.rise').forEach(e => e.classList.add('is-in'));
  document.getAnimations().forEach(a => {
    const t = a.effect && a.effect.getComputedTiming();
    if (t && t.iterations === Infinity) { a.pause(); a.currentTime = 0; }
    else { try { a.finish(); } catch (e) { a.pause(); a.currentTime = 0; } }
  });
  const props = [...getComputedStyle(document.body)].filter(p => !p.startsWith('--') && p !== 'transition-delay');
  const out = {};
  [...document.body.querySelectorAll('*')].forEach((el, i) => {
    const key = i + ':' + el.tagName + (typeof el.className === 'string' && el.className.trim() ? '.' + el.className.trim().split(/\s+/).join('.') : '');
    for (const pseudo of [null, '::before', '::after']) {
      const cs = getComputedStyle(el, pseudo);
      if (pseudo && (cs.content === 'none' || cs.content === 'normal')) continue;
      const rec = {}; for (const p of props) rec[p] = cs.getPropertyValue(p);
      out[key + (pseudo || '')] = rec;
    }
  });
  return out;
}"""


def snap(page, name):
    (OUT / 'snaps').mkdir(parents=True, exist_ok=True)
    data = {}
    sync_playwright = playwright()
    with sync_playwright() as p:
        for w, h in SNAP_WIDTHS:
            browser, pg, _ = open_page(p, page, w, h)
            pg.evaluate("document.querySelectorAll('.rise').forEach(e => e.classList.add('is-in'))")
            pg.wait_for_timeout(50)
            data[f'{w}x{h}'] = pg.evaluate(SNAP_JS)
            browser.close()
    (OUT / 'snaps' / f'{name}.json').write_text(json.dumps(data))
    print('saved', name, {k: len(v) for k, v in data.items()})


def diff(a, b, limit=40):
    A = json.loads((OUT / 'snaps' / f'{a}.json').read_text())
    B = json.loads((OUT / 'snaps' / f'{b}.json').read_text())
    total = 0
    for size in A:
        ea, eb = A[size], B.get(size, {})
        n = 0
        for k in sorted(set(ea) | set(eb), key=lambda s: int(s.split(':')[0])):
            ra, rb = ea.get(k), eb.get(k)
            if ra is None or rb is None:
                if n < limit:
                    print(size, 'only in', 'a' if rb is None else 'b', k)
                n += 1
                continue
            d = {p: (ra[p], rb.get(p)) for p in ra if ra[p] != rb.get(p)}
            if d:
                if n < limit:
                    print(size, k, d)
                n += 1
        print(f'== {size}: {n} elements differ')
        total += n
    print('TOTAL', total)
    sys.exit(1 if total else 0)


if __name__ == '__main__':
    if len(sys.argv) < 3:
        sys.exit(__doc__)
    cmd, args = sys.argv[1], sys.argv[2:]
    {'check': check, 'shots': shots, 'snap': snap, 'diff': diff}[cmd](*args)
