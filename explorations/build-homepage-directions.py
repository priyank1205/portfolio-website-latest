"""Build a single HTML exploration with embedded product imagery, CSS and JS."""
from pathlib import Path
import base64
import io
import json
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
HERE = Path(__file__).resolve().parent
OUTPUT = ROOT / 'homepage-directions.html'

IMAGE_FILES = {
    'kpHome': ('assets/images/khiladipro/dab923c5_home_-_with_frame.png', 340),
    'kpDrill': ('assets/images/khiladipro/92205d06_Android_Large_-_235.png', 380),
    'kpSuccess': ('assets/images/khiladipro/9773a5e1_Android_Large_-_237.png', 380),
    'gmPoker': ('assets/images/getmega/d5983694_7._Play_Copy_73.png', 340),
    'gmWallet': ('assets/images/getmega/b6cb2746_1._Wallet.png', 340),
    'mpWithdraw': ('assets/images/megapoker/16250962_TDS_free_withdrawal.png', 340),
    'mpDeposit': ('assets/images/megapoker/d99a89c2_500_Deposit_Summary.png', 340),
    'chart': ('assets/images/sedp/clean/bar-workspace.webp', 1100),
}
ASSETS = {}
for name, (relative, width) in IMAGE_FILES.items():
    image = Image.open(ROOT / relative)
    image.thumbnail((width, 2000), Image.Resampling.LANCZOS)
    buffer = io.BytesIO()
    image.save(buffer, format='WEBP', quality=84, method=6)
    ASSETS[name] = 'data:image/webp;base64,' + base64.b64encode(buffer.getvalue()).decode()

PROJECTS = {
    'kp': {'name':'KhiladiPro','type':'Sports tech','title':'Every rep, readable across the room.', 'fact':'Sole designer · ~8 weeks · Rehired', 'url':'projects/khiladipro-redesign-claude.html','alt':'KhiladiPro app screens for a sports olympiad'},
    'gm': {'name':'Getmega','type':'Real-money gaming','title':'One card. Thirteen possible states.', 'fact':'In-house · Core flows · 2019–2021', 'url':'projects/getmega-redesign-claude.html','alt':'Getmega mobile game and wallet interface'},
    'sedp': {'name':'CEDA / SEDP','type':'Public data','title':'A workspace that starts with the chart.', 'fact':'Sole designer · Returning client', 'url':'projects/sedp-redesign-claude.html','alt':'CEDA Socio-Economic Data Portal design with a bar chart'},
    'mp': {'name':'Mega Poker','type':'Transaction design','title':'The money you move. The bonus you earn.', 'fact':'Sole designer · Money flows · 2024', 'url':'projects/mega-poker-redesign-claude.html','alt':'Mega Poker withdrawal and deposit interface'},
}

def arrow(size=14, diagonal=True):
    paths = '<path d="M5 19 19 5M5 5h14v14"/>' if diagonal else '<path d="M4 12h16M14 6l6 6-6 6"/>'
    return f'<svg width="{size}" height="{size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">{paths}</svg>'

def pic(key, alt='', cls='', extra=''):
    return f'<img data-image="{key}" alt="{alt}" class="{cls}" {extra}>'

def case_link(key, text='Read case study', cls='text-link'):
    p = PROJECTS[key]
    return f'<a class="{cls}" href="{p["url"]}" target="_blank" rel="noopener" aria-label="Read {p["name"]} case study">{text}{arrow(12)}</a>'

def status(text='Open to roles & projects'):
    return f'<span class="status"><i class="dot" aria-hidden="true"></i>{text}</span>'

def proof_line():
    return '<div class="proof-line"><span><b>IIT Guwahati</b> · B.Des</span><span><b>Getmega</b> · 2 years</span><span><b>2 of 3</b> clients returned</span></div>'

def nav(scene, symbol='✳', special=''):
    sound = '<button class="sound-button" type="button" data-sound aria-pressed="false"><span aria-hidden="true">♫</span><span data-sound-label>Sound off</span></button>' if special == 'sound' else ''
    return f'''<header class="site-nav"><a class="site-brand" href="#{scene}"><span class="brand-symbol" aria-hidden="true">{symbol}</span>Priyank Agarwal</a>
    <nav class="nav-links" aria-label="{scene.title()} homepage navigation"><a href="#{scene}-work">Work</a><a class="about-link" href="about-redesign-claude.html" target="_blank" rel="noopener">About</a>{sound}<a class="nav-contact" href="#{scene}-contact">Let’s talk {arrow(11)}</a></nav></header>'''

def sports():
    return f'''<div class="demo sports-demo" data-sports aria-label="Interactive recreation of KhiladiPro's rep counter"><div class="sports-phone">{pic('kpDrill','KhiladiPro squat drill interface, with a player outlined by pose detection')}
    <div class="rep-count" aria-live="polite" aria-atomic="true"><span data-reps>13</span><small>/20</small></div><button class="rep-action" type="button" data-rep-button aria-label="Count a squat rep. 13 of 20.">Count a rep +</button></div></div>'''

def wallet():
    return '''<div class="demo wallet-demo" data-wallet aria-label="Interactive recreation of a Mega Poker wallet transfer">
    <div class="demo-top"><span>Mega Poker / Wallet</span><span aria-hidden="true">↗</span></div><p class="wallet-title">Transfer to deposit</p><p class="wallet-value"><small>₹</small><span data-wallet-value>4,050</span></p>
    <label><span class="sr-only">Amount to transfer, in rupees</span><input type="range" min="100" max="10000" step="50" value="4050" aria-label="Amount to transfer, in rupees"></label>
    <div class="range-ends" aria-hidden="true"><span>₹100</span><span>₹10,000</span></div><div class="money-lines" aria-live="polite" aria-atomic="true"><div><span>Your money</span><b data-principal>₹4,050</b></div><div class="bonus"><span data-bonus-label>Bonus · 10%</span><b data-bonus>₹405</b></div><div class="total"><span>Total received</span><b data-total>₹4,455</b></div></div>
    <p class="demo-caption">Interactive recreation · Sample tiers</p></div>'''

def states():
    return '''<div class="demo states-demo" data-states aria-label="Interactive recreation of Getmega's contest card">
    <div class="contest-brand"><span class="contest-icon" aria-hidden="true">♧</span><span>Carrom<small>Goal-based contest</small></span><span class="contest-badge" data-state-badge>Live</span></div>
    <p class="contest-prize">₹45,000</p><p class="contest-caption">Prize pool · a single card, thirteen states</p><div class="contest-cols"><div><small>Big blind</small><b>₹40</b></div><div><small>Players</small><b data-players>128</b></div><div><small>Format</small><b>Goal-based</b></div></div>
    <div class="contest-state" aria-live="polite" aria-atomic="true"><b data-state-entry>Entry ₹500</b><span data-state-status>Ends in 1d 3h</span></div><div class="state-controls"><button type="button" data-prev aria-label="Previous contest state">←</button><output><span data-state-index>01 / 13</span> · <span data-state-name>Paid</span></output><button type="button" data-next aria-label="Next contest state">→</button></div><p class="demo-caption">Interactive recreation · Sample contest</p></div>'''

def chart():
    bars = ''.join(f'<div class="chart-row"><span>{name}</span><i aria-hidden="true" style="--width:{width}%"></i><b>{val}</b></div>' for name,width,val in [('Kerala',89,'₹7,130'),('Tamil Nadu',79,'₹6,320'),('Maharashtra',71,'₹5,680'),('Karnataka',61,'₹4,910')])
    return f'''<div class="demo chart-demo" data-chart aria-label="Interactive recreation of CEDA's chart-first workspace"><div class="chart-brand"><b>CEDA / Socio-Economic Data</b><small>Sample data</small></div>
    <div class="chart-tabs" role="group" aria-label="Chart indicator"><button type="button" data-indicator="0" aria-pressed="true">Spending</button><button type="button" data-indicator="1" aria-pressed="false">Literacy</button><button type="button" data-indicator="2" aria-pressed="false">Internet</button></div>
    <p class="chart-question" data-chart-question>Monthly spend per person, by state</p><div class="chart-bars" aria-live="polite" aria-atomic="true">{bars}</div><div class="chart-footer"><span>Interactive recreation</span><button type="button" data-chart-share>Preview share ↗</button></div><p class="chart-summary" data-chart-summary hidden></p></div>'''

def visual(key, number='01', note=''):
    p = PROJECTS[key]
    if key == 'kp':
        content = pic('kpHome',p['alt'],'shot-phone') + pic('kpSuccess','','shot-phone second')
    elif key == 'gm':
        content = pic('gmPoker',p['alt'],'shot-phone') + pic('gmWallet','','shot-phone second')
    elif key == 'sedp':
        content = pic('chart',p['alt'],'shot-desktop')
    else:
        content = pic('mpWithdraw',p['alt'],'shot-phone') + pic('mpDeposit','','shot-phone second')
    return f'<div class="project-visual visual-{key}"><span class="visual-number" aria-hidden="true">{number}</span>{content}<span class="visual-note">{note or p["type"]} · Design preview</span></div>'

def work_card(key, number='01'):
    p = PROJECTS[key]
    return f'''<article class="work-card"><a href="{p['url']}" target="_blank" rel="noopener">{visual(key,number)}<div class="project-meta"><div><h3>{p['name']}</h3><p>{p['fact']}</p></div><span class="arrow">{arrow(13)}</span></div></a></article>'''

def lower(scene):
    return f'''<section class="proof-section" aria-labelledby="{scene}-approach"><div><p class="eyebrow muted" style="margin-bottom:17px">How I work</p><h2 id="{scene}-approach">The interesting part is usually in the details.</h2></div><div><p>At Getmega, I designed core game flows through two business-model pivots. For KhiladiPro, I took a camera-scored olympiad from early flows to shipped screens. With CEDA, I made complex public data easier to explore and share.</p><p style="margin-top:12px">I work through the awkward states, make the trade-offs explicit, and stay close to what gets built.</p><div class="proof-facts"><div><strong>2 years</strong><span>In-house at Getmega,<br>as the design team grew.</span></div><div><strong>2 of 3</strong><span>Freelance clients came<br>back for another project.</span></div></div><a class="text-link" href="about-redesign-claude.html" target="_blank" rel="noopener">More about my path {arrow(12)}</a></div></section>
    <section class="testimonial" aria-label="Client testimonial"><p class="eyebrow muted">From the people<br>I’ve worked with</p><blockquote>“He showed intuitive product thinking. He is very proactive with his contributions and gives a lot of attention to detail.”<cite>Aakash Verma · Product Head, KhiladiPro</cite></blockquote></section>
    <section class="contact-section" id="{scene}-contact" aria-labelledby="{scene}-contact-title"><div><p class="eyebrow muted" style="margin-bottom:14px">Next, together</p><h2 id="{scene}-contact-title">Let’s get to work.</h2><p>For a senior role, a founding team, or a focused design project. Based in Bengaluru, open to a good conversation.</p></div><div class="contact-right"><a class="button solid" href="mailto:hello@priyank.design">hello@priyank.design {arrow(13)}</a><div class="buttons"><a class="text-link" href="https://www.linkedin.com/in/priyank1205/" target="_blank" rel="noopener">LinkedIn {arrow(10)}</a><a class="text-link" href="https://drive.google.com/file/d/0B0y_QT-8mXwgRFhmWEdUWkpKOHc/view?usp=sharing&amp;resourcekey=0-Q4joErTGFsTqmVHZnpbYYw" target="_blank" rel="noopener">Résumé {arrow(10)}</a><button class="text-link" style="padding:0;background:transparent" type="button" data-copy-email>Copy email</button></div></div></section>
    <footer class="footer"><span>© 2026 Priyank Agarwal</span><span>Bengaluru · <span data-clock>IST</span> &nbsp; {status('Open to roles & projects')}</span></footer>'''

gallery = f'''<section class="direction gallery is-active" id="gallery" role="tabpanel" aria-labelledby="tab-gallery"><div class="page">{nav('gallery')}
<section class="gallery-hero" aria-label="Introduction and featured work"><div class="hero-copy">{status()}<p class="eyebrow muted">Senior product designer · Bengaluru</p><h1>Complex products.<br><em>Clear decisions.</em></h1><p class="intro">I’m Priyank. I design the screens people trust with their money, scores, and data, and the states around them.</p><div class="buttons"><a class="button solid" href="#gallery-work">Explore the work {arrow(12,False)}</a><a class="text-link" href="#gallery-contact">Let’s talk {arrow(12)}</a></div>{proof_line()}</div>
<article class="gallery-stage" aria-label="Featured work: KhiladiPro"><p class="stage-label eyebrow">01 / KhiladiPro</p><span class="stage-live"><i class="dot" aria-hidden="true"></i>Interactive recreation</span>{pic('kpHome','','support-phone')}{pic('kpSuccess','','support-phone right')}{sports()}<div class="stage-foot"><div>Every rep. Every state.<p class="micro" style="margin-top:5px">Sole designer · Web, Android & iOS · Rehired</p></div>{case_link('kp','','circle-button')}</div></article></section>
<section class="gallery-work" id="gallery-work" aria-labelledby="gallery-work-title"><div class="section-label"><h2 id="gallery-work-title">A few more things I’ve made clearer.</h2><span class="micro muted">Selected work / 2019–2025</span></div><div class="work-grid">{work_card('gm','02')}{work_card('sedp','03')}{work_card('mp','04')}</div></section>{lower('gallery')}</div></section>'''

def obsidian_card(key, number, demo, title, description):
    return f'''<article class="obsidian-card" data-spotlight><header class="card-head"><span>{PROJECTS[key]['name']}</span><span class="micro">{number} / {PROJECTS[key]['type']}</span></header><div class="card-stage">{demo}</div><div class="card-foot"><h2 class="project-title">{title}</h2><p>{description}</p>{case_link(key,'Inspect the work','')}</div></article>'''

obsidian = f'''<section class="direction obsidian" id="obsidian" role="tabpanel" aria-labelledby="tab-obsidian" hidden><div class="page">{nav('obsidian','◈')}
<section class="obsidian-hero" aria-label="Introduction"><div class="hero-copy"><p class="eyebrow muted">Senior product designer</p><h1>The details are<br><span>the product.</span></h1></div><div class="obsidian-intro">{status('Available for the next hard problem')}<p>I’m Priyank Agarwal. From a player’s next move to a researcher’s next question, I design for the moment that matters.</p><a class="text-link" href="#obsidian-contact">Let’s build something {arrow(12)}</a></div></section>
<section id="obsidian-work" aria-label="Selected interactive work"><div class="obsidian-wall">{obsidian_card('kp','01',sports(),'A score you can trust.','Sole designer · ~8 weeks · Every screen shipped')}{obsidian_card('gm','02',states(),'Thirteen states. One card.','Two years in-house · Core game flows')}{obsidian_card('sedp','03',chart(),'The chart comes first.','Sole designer · CEDA, Ashoka University')}</div></section>
<div class="obsidian-proof"><span class="eyebrow">Built on experience</span><span><b>IIT Guwahati</b> / Bachelor of Design</span><span><b>Getmega</b> / In-house, 2019–2021</span><span><b>CEDA + KhiladiPro</b> / Returning clients</span></div>{lower('obsidian')}</div></section>'''

atelier_rows = ''.join(f'<a href="{PROJECTS[k]["url"]}" target="_blank" rel="noopener"><span class="index-number">0{n}</span><span>{PROJECTS[k]["name"]}</span><span>{PROJECTS[k]["fact"]}</span><span class="arrow">{arrow(12)}</span></a>' for n,k in enumerate(['kp','gm','sedp','mp'],1))
atelier = f'''<section class="direction atelier" id="atelier" role="tabpanel" aria-labelledby="tab-atelier" hidden><div class="page">{nav('atelier','✳')}
<section class="atelier-hero" aria-label="Introduction and featured work"><div class="hero-copy"><p class="eyebrow muted">Senior product designer / IIT Guwahati</p><h1>Thoughtful by nature.<br><em>Playful by design.</em></h1><p class="intro">I’m Priyank. I bring structure to complicated products and care to the small things people feel.</p><div class="buttons"><a class="button solid" href="#atelier-work">Selected work {arrow(12,False)}</a><a class="text-link" href="#atelier-contact">Say hello {arrow(12)}</a></div><p class="atelier-note"><svg width="36" height="25" viewBox="0 0 50 30" fill="none" stroke="currentColor" aria-hidden="true"><path d="M3 10Q18 5 25 22Q30 29 44 13M35 13h9v10"/></svg>A little order. A little curiosity.</p></div>
<article class="atelier-desk" aria-label="KhiladiPro app design previews"><span class="desk-star" aria-hidden="true">✳</span>{pic('kpHome','KhiladiPro home screen','desk-back')}{pic('kpSuccess','KhiladiPro drill completion screen','desk-back right')}{sports()}<button class="shuffle-desk" type="button" data-shuffle-desk aria-pressed="false">Rearrange ↺</button><a class="desk-label" href="{PROJECTS['kp']['url']}" target="_blank" rel="noopener">KhiladiPro · Designed & shipped {arrow(10)}</a></article></section>
<section class="atelier-index" id="atelier-work" aria-labelledby="atelier-work-title"><div class="index-head"><p class="eyebrow muted">A selected collection</p><h2 id="atelier-work-title">Products, with care.</h2></div><div class="atelier-index-list">{atelier_rows}</div></section>{lower('atelier')}</div></section>'''

signal_minis = ''.join(f'<a class="signal-mini" href="{PROJECTS[k]["url"]}" target="_blank" rel="noopener">{visual(k,str(n).zfill(2))}<div><h3>{PROJECTS[k]["name"]}</h3><p>{PROJECTS[k]["fact"]}</p></div><span class="arrow">{arrow(12)}</span></a>' for n,k in enumerate(['gm','sedp','mp'],2))
signal = f'''<section class="direction signal" id="signal" role="tabpanel" aria-labelledby="tab-signal" hidden><div class="page">{nav('signal','↗')}
<section class="signal-hero" aria-label="Introduction and featured work"><div class="signal-intro"><p class="eyebrow">Priyank Agarwal / Senior product designer</p><h1>Good design<br><em>moves</em><br>people.</h1><p>From camera-scored sports to money flows and public data. I turn the complicated bits into a clear next move.</p>{status('Open to senior & founding roles + projects')}<span class="signal-ring" aria-hidden="true"></span></div>
<article class="signal-feature"><header class="signal-feature-head"><span>FEATURED / KHILADIPRO</span><span class="caption">Try the counter ↓</span></header><span class="feature-number" aria-hidden="true">01</span>{sports()}<div class="feature-callout">From first flow to<strong></strong><b>shipped screens.</b></div><footer class="signal-feature-foot"><div><h2>A paid olympiad. Played at home.</h2><p>Sole designer · Web + mobile · Rehired</p></div><a class="circle-button" href="{PROJECTS['kp']['url']}" target="_blank" rel="noopener" aria-label="Read KhiladiPro case study">{arrow(14)}</a></footer></article></section>
<section class="signal-work" id="signal-work" aria-label="More selected work">{signal_minis}</section><div class="signal-proof"><span>Product thinking, backed by the work.</span>{proof_line()}</div>{lower('signal')}</div></section>'''

ENTRY_DATA = [
    ('sedp','01','Public data','From filters to a living workspace.','Explore, compare, and share public data without losing its context.','Sole designer · Returning client',chart()),
    ('kp','02','Sports tech','Make the score readable from a distance.','A phone camera referees the drill. Each rep has to be clear from across the room.','Sole designer · ~8 weeks · Rehired',sports()),
    ('gm','03','Real-money gaming','Core flows through two product pivots.','The same contest card communicates thirteen states without changing shape.','In-house · 2019–2021',states()),
    ('mp','04','Money flows','Keep principal and bonus distinct.','The amount you move and the reward you earn stay in separate rows.','Sole designer · 2024',wallet()),
]
entries = ''
for key,num,kind,title,desc,fact,demo in ENTRY_DATA:
    entries += f'''<details class="work-entry" {'open' if num == '01' else ''}><summary><span class="entry-number">{num}</span><h2>{PROJECTS[key]['name']}</h2><span class="entry-type">{kind}</span><span class="entry-plus" aria-hidden="true">+</span></summary><div class="entry-body"><div class="entry-copy"><h3>{title}</h3><p>{desc}</p><p class="entry-fact">{fact}</p>{case_link(key)}</div><div class="entry-preview">{demo}</div></div></details>'''

index = f'''<section class="direction index-direction" id="index" role="tabpanel" aria-labelledby="tab-index" hidden><div class="index-shell"><aside class="index-sidebar" aria-label="About Priyank"><div><a class="site-brand" href="#index"><span class="brand-symbol" aria-hidden="true">✳</span>Priyank Agarwal</a><p class="sidebar-title">Senior product designer</p><p class="sidebar-bio">I design clear interfaces for complex products.<span class="sidebar-domains"><br><br>Money, scores, data.<br>And the details in between.</span></p>{status('Open to roles & projects')}<nav class="sidebar-nav" aria-label="Index homepage navigation"><a href="#index-work">Selected work <span>04</span></a><a class="sidebar-nav-about" href="about-redesign-claude.html" target="_blank" rel="noopener">About me {arrow(10)}</a><a href="#index-contact">Get in touch {arrow(10)}</a></nav></div><div class="sidebar-foot"><p>B.Des, IIT Guwahati<br>Previously, Getmega<br>Independent, 2022 onwards</p><a class="text-link" href="https://www.linkedin.com/in/priyank1205/" target="_blank" rel="noopener">LinkedIn {arrow(10)}</a><p style="margin-top:25px">Bengaluru · <span data-clock>IST</span></p></div></aside>
<div class="index-content"><header class="index-intro"><h1>A few things I’ve<br>helped make <em>clearer.</em></h1><span class="index-star" aria-hidden="true">✳</span></header><section id="index-work" aria-label="Selected work collection"><header class="index-work-head"><span>Selected work (04)</span><span class="micro">Open a project to explore</span></header>{entries}</section>{lower('index')}</div></div></section>'''

def play_window(key, number, demo, title, desc):
    return f'''<article class="play-window"><header class="window-head"><span>{PROJECTS[key]['name']}</span><span class="micro">{number}</span><span class="window-dots" aria-hidden="true"><i></i><i></i><i></i></span></header><div class="window-stage">{demo}</div><footer class="window-foot"><h2>{title}</h2><p>{desc}</p>{case_link(key,'See the thinking','')}</footer></article>'''

playground = f'''<section class="direction playground" id="playground" role="tabpanel" aria-labelledby="tab-playground" hidden><div class="page">{nav('playground','✳','sound')}
<section class="playground-hero" aria-label="Introduction"><h1>Serious about the work.<br><span>Curious about everything.</span></h1><div class="hero-aside"><p><span class="name-play" aria-label="Priyank Agarwal">{''.join(f'<span aria-hidden="true">{c if c != " " else "&nbsp;"}</span>' for c in 'Priyank Agarwal')}</span>, senior product designer.<br>I make complicated products feel clear.<br>Here’s a little of that work, in your hands.</p>{status('Open to roles, founding teams & projects')}</div></section>
<section id="playground-work" aria-label="Interactive selected work"><header class="workspace-bar"><span class="eyebrow">A working collection / 03 product fragments</span><div class="workspace-tools"><button type="button" data-arrange aria-pressed="false">Rearrange ↺</button><button type="button" data-reset-desk>Reset demos</button></div></header><div class="workspace">{play_window('kp','01',sports(),'Every rep counts.','Tap the counter. Finish the drill. Sole designer · Rehired.')}{play_window('gm','02',states(),'Same card. New state.','Move through thirteen states. In-house · 2019–2021.')}{play_window('mp','03',wallet(),'Money, made legible.','Move the slider. Keep the bonus distinct. Sole designer.')}</div></section>
<div class="playground-proof"><p>Play with the surface.<br>The decisions are one click deeper.</p>{proof_line()}<a class="text-link" href="{PROJECTS['sedp']['url']}" target="_blank" rel="noopener">Also: CEDA’s data workspace {arrow(11)}</a></div>{lower('playground')}</div></section>'''

names = [('gallery','Gallery'),('obsidian','Obsidian'),('atelier','Atelier'),('signal','Signal'),('index','Index'),('playground','Playground')]
tabs = ''.join(f'<button id="tab-{key}" type="button" role="tab" aria-controls="{key}" aria-selected="{"true" if n == 1 else "false"}" tabindex="{0 if n == 1 else -1}"><span>0{n}</span>{name}</button>' for n,(key,name) in enumerate(names,1))
OVERVIEW = [
    ('gallery','Living Gallery','Complex<br>products.','kpHome','Quiet, confident, product-led.'),
    ('obsidian','Obsidian','The details<br>are the product.','gmPoker','Dark, cinematic, architectural.'),
    ('atelier','Atelier','Thoughtful.<br>Playful.','kpSuccess','Warm, editorial, personal.'),
    ('signal','Signal','Good<br>design.','kpDrill','Bold, blue, full of energy.'),
    ('index','Index','A few things<br>made clearer.','chart','A quiet collection. Fast to scan.'),
    ('playground','Playground','Serious work.<br>Curious mind.','mpWithdraw','Tactile, playable, full of craft.'),
]
overview_cards = ''.join(f'<button class="overview-card" type="button" data-choose="{n}" aria-label="Preview direction {n+1}: {name}"><div class="overview-art ov-{key}"><span class="mini-label">PRIYANK AGARWAL</span><span class="mini-rule"></span><span class="mini-word">{words}</span>{pic(img,"",extra="aria-hidden=\"true\"")}</div><h3><span>0{n+1} / {name}</span><span aria-hidden="true">↗</span></h3><p>{desc}</p></button>' for n,(key,name,words,img,desc) in enumerate(OVERVIEW))
chrome = f'''<a class="skip-link" href="#gallery-work" data-skip>Skip to the work</a><header class="explorer"><div class="explorer-brand"><span class="explorer-mark" aria-hidden="true">✳</span><div><b>Six homepage directions</b><small>Priyank Agarwal / Design exploration</small></div></div><nav class="direction-tabs" role="tablist" aria-label="Homepage directions">{tabs}</nav><div class="viewer-actions"><button class="viewer-action" type="button" data-overview>Compare all</button><button class="viewer-action" type="button" data-focus>Full preview ↗</button></div></header>
<aside class="viewer-info" aria-label="About this exploration"><p><strong data-current-name>01 / Living Gallery</strong><span class="info-description" data-current-description>Quiet confidence. A product is the hero.</span></p><div style="display:flex;align-items:center;gap:22px"><span class="keys">Press 1–6 to switch</span><button type="button" data-motion aria-pressed="false">Pause motion</button><button type="button" data-notes>Design notes ↗</button></div></aside><button class="back-to-viewer" type="button" data-back>← Back to directions</button>
<dialog data-overview-dialog aria-labelledby="overview-title"><div class="dialog-head"><div><h2 id="overview-title">Six different ways in.</h2><p>Same designer. Same work. Six distinct first impressions.</p></div><button class="dialog-close" type="button" data-close-dialog aria-label="Close overview">×</button></div><div class="overview-grid">{overview_cards}</div></dialog>
<dialog class="notes-dialog" data-notes-dialog aria-labelledby="notes-title"><div class="dialog-head"><div><h2 id="notes-title" data-notes-title>01 / Living Gallery</h2><p>The thinking behind this direction</p></div><button class="dialog-close" type="button" data-close-dialog aria-label="Close design notes">×</button></div><div class="notes-content"><p class="notes-intro" data-notes-intro></p><div class="notes-grid"><div><h3>Information architecture</h3><p data-note="structure"></p></div><div><h3>Typography</h3><p data-note="type"></p></div><div><h3>Colour & material</h3><p data-note="material"></p></div><div><h3>Interaction & motion</h3><p data-note="interaction"></p></div><div style="grid-column:1/-1"><h3>Where it fits</h3><p data-note="fit"></p></div></div><p class="notes-recommendation"><b>My take:</b> <span data-note="recommendation"></span></p></div></dialog><div class="toast" role="status" aria-live="polite" data-toast></div><span class="sr-only" role="status" aria-live="polite" data-announcement></span>'''

CSS = (HERE / 'homepage-directions.css').read_text()
JS = (HERE / 'homepage-directions.js').read_text()
HTML = f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#f6f5f1"><meta name="description" content="Six interactive homepage directions for Priyank Agarwal: Living Gallery, Obsidian, Atelier, Signal, Index and Playground."><title>Six homepage directions · Priyank Agarwal</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;450;500;550;600;650;700&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&family=Space+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">
<style>.sr-only{{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}}{CSS}</style></head><body>{chrome}<noscript>These six interactive directions need JavaScript. Open this HTML in a modern browser with JavaScript enabled.</noscript><main id="directions">{gallery}{obsidian}{atelier}{signal}{index}{playground}</main>
<script>const ASSETS={json.dumps(ASSETS,separators=(',',':'))};</script><script>{JS}</script></body></html>'''
OUTPUT.write_text(HTML)
print(f'Created {OUTPUT.name}: {OUTPUT.stat().st_size:,} bytes; 6 directions; 8 embedded product images.')
