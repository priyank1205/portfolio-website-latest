/* Timestamped Summary landing page: icons, FAQ, footer and the card demos. */(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const typing = (e) => /input|textarea|select/i.test(e.target.tagName) || e.target.isContentEditable;
  const fmt = (sec) => { sec = Math.max(0, Math.round(sec)); const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = sec % 60; return h ? `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}` : `${m}:${String(s).padStart(2, '0')}`; };
  const GH = 'https://github.com/priyank1205/youtube-timestamped-summary';

  /* Icons, one stroke family */
  const P = (d, extra = '') => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${d}</svg>`;
  const I = {
    lines: P('<path d="M5 7h14M5 12h14M5 17h9"/>'),
    play: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13l10.5-6.5z"/></svg>`,
    bars: `<svg viewBox="0 0 24 24" fill="currentColor"><rect x="4" y="11" width="2.6" height="8" rx="1.2"/><rect x="8.6" y="6" width="2.6" height="13" rx="1.2"/><rect x="13.2" y="9" width="2.6" height="10" rx="1.2"/><rect x="17.8" y="4.5" width="2.6" height="14.5" rx="1.2"/></svg>`,
    check: P('<circle cx="12" cy="12" r="8.5"/><path d="M8.2 12.3l2.6 2.6 5-5.4"/>'),
    lock: P('<rect x="5.5" y="10.5" width="13" height="9" rx="2.4"/><path d="M8.5 10.5V8a3.5 3.5 0 017 0v2.5"/>'),
    key: P('<circle cx="8" cy="12" r="3.6"/><path d="M11.6 12H20M17 12v3M20 12v2.5"/>'),
    clock: P('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>'),
    eye: P('<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.8"/>'),
    sliders: P('<path d="M5 6h9M18 6h1M5 12h3M12 12h7M5 18h11M20 18h-1"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    cap: P('<path d="M3 9.5l9-4.5 9 4.5-9 4.5z"/><path d="M7 11.5V16c1.5 1.5 3 2 5 2s3.5-.5 5-2v-4.5"/>'),
    mic: P('<rect x="9" y="3.5" width="6" height="11" rx="3"/><path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5"/>'),
    code: P('<path d="M9 7l-5 5 5 5M15 7l5 5-5 5"/>'),
    talk: P('<rect x="4" y="4.5" width="16" height="11" rx="2"/><path d="M9 20h6M12 15.5V20"/>'),
    users: P('<circle cx="9" cy="9" r="3.2"/><path d="M3.5 19c.6-3 2.8-4.5 5.5-4.5s4.9 1.5 5.5 4.5"/><circle cx="17" cy="8" r="2.4"/><path d="M16 13.8c2.4 0 4 1.3 4.6 3.8"/>'),
    star: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L3.6 9.6l5.8-.8z"/></svg>`,
    spark: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5c.7 4.6 4.3 8.2 8.9 8.9-4.6.7-8.2 4.3-8.9 8.9-.7-4.6-4.3-8.2-8.9-8.9 4.6-.7 8.2-4.3 8.9-8.9z"/></svg>`,
    chev: P('<path d="M6.5 9.5L12 15l5.5-5.5"/>'),
    dl: P('<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>'),
    gh: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.5a9.5 9.5 0 00-3 18.5c.5.1.7-.2.7-.5v-1.7c-2.7.6-3.2-1.2-3.2-1.2-.4-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.6.3-1.1.6-1.3-2.1-.2-4.4-1.1-4.4-4.8 0-1 .4-1.9 1-2.6-.1-.2-.4-1.2.1-2.6 0 0 .8-.3 2.6 1a9 9 0 014.8 0c1.8-1.3 2.6-1 2.6-1 .5 1.4.2 2.4.1 2.6.6.7 1 1.6 1 2.6 0 3.7-2.3 4.5-4.4 4.8.3.3.6.9.6 1.8v2.6c0 .3.2.6.7.5A9.5 9.5 0 0012 2.5z"/></svg>`
  };
  const TRI = '<svg viewBox="0 0 7 8"><path d="M0 0l7 4-7 4z" fill="currentColor"/></svg>';
  const CV = '<svg class="cv" viewBox="0 0 12 12"><path d="M2.5 4.5L6 8l3.5-3.5" stroke="currentColor" stroke-width="1.6" fill="none" stroke-linecap="round"/></svg>';
  $$('[data-i]').forEach((el) => { if (I[el.dataset.i]) el.innerHTML = I[el.dataset.i]; });
  $$('[data-ic]').forEach((el) => { if (I[el.dataset.ic]) el.insertAdjacentHTML('afterbegin', I[el.dataset.ic]); });

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-copy]');
    if (b) {
      const done = (m) => { const t = b.textContent; b.textContent = m; setTimeout(() => { b.textContent = t; }, 1400); };
      try { navigator.clipboard.writeText(b.dataset.copy).then(() => done('Copied'), () => done('Select it')); } catch (err) { done('Select it'); }
    }
    const a = e.target.closest('a[href^="#"]');
    if (a) { const el = document.getElementById(a.getAttribute('href').slice(1)); if (el) { e.preventDefault(); el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }); } }
  });

  /* Shared content */
  const FAQ = [
    ['Is it really free?', "The extension is free and open source. Summaries are written by an AI you connect, and Google Gemini's free tier covers everyday use without a card. If you'd rather use OpenAI or Anthropic, you pay them directly for what you generate."],
    ["Why isn't it on the Chrome Web Store?", "It hasn't been published there yet, so you add it from a folder. It takes about three minutes, and the code you run is exactly the code on GitHub."],
    ['Is my API key safe?', "It's kept in the extension's own storage, which the YouTube page can't read, and it's sent only to the provider it belongs to, over HTTPS. There's no server of ours in between."],
    ['Which videos does it work on?', "Any video with captions, including automatic ones and members-only videos your account can play. Live streams that are still in progress aren't supported."],
    ['Which browsers does it work in?', "Chrome, Edge, Brave, Arc, Opera and Vivaldi. Firefox and Safari aren't supported yet."],
    ['Can I use a local model?', "Yes. Add any OpenAI-compatible endpoint as a custom provider, including one on localhost. That's the one setup where nothing leaves your machine."]
  ];
  $$('[data-faq]').forEach((el) => { el.innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}<i></i></summary><p>${a}</p></details>`).join(''); });
  $$('[data-foot]').forEach((el) => {
    el.innerHTML = `<span>Timestamped Summary for YouTube · MIT licence · v1.9.0</span><nav><a href="${GH}" target="_blank" rel="noopener">GitHub</a><a href="${GH}/blob/main/CHANGELOG.md" target="_blank" rel="noopener">Changelog</a><a href="${GH}/issues/new/choose" target="_blank" rel="noopener">Report a bug</a></nav><span class="by"><span class="pa">pa</span><span>Designed and built by <a href="../index-redesign-claude.html">Priyank Agarwal</a></span></span>`;
  });

  /* Sample lecture, written for this page */
  const SECTIONS = ['Before the box', "One man's idea", 'The fight over sizes', 'Ports that won and lost', 'What the box changed'];
  const LECTURE = [
    [0, 0, 'Break-bulk cargo, one sack at a time', 'Ships were loaded by hand, piece by piece, and could spend as long in port as at sea.'],
    [192, 0, 'Why ports were the bottleneck', 'Handling, not sailing, was the expensive part, and theft was priced into every crossing.'],
    [468, 0, 'A trucker waiting at the pier', 'Malcom McLean watches his trucks queue for hours and asks why the trailer cannot go on the ship.'],
    [725, 1, 'Put the trailer on the ship', 'The wheels waste space, so the wheels go and only the box stays.'],
    [1000, 1, 'The Ideal X, April 1956', 'A converted tanker carries 58 containers from Newark to Houston.'],
    [1277, 1, 'Cranes built for boxes', 'A box only saves money if every step handles it the same way.'],
    [1590, 2, 'Every company, its own box', 'Incompatible sizes mean a container cannot move between competitors.'],
    [1865, 2, 'Twenty feet and forty feet', 'Common lengths and corner fittings turn a private system into infrastructure.'],
    [2158, 2, 'The corner casting', 'A small steel fitting lets any crane, truck or ship lock onto any box.'],
    [2480, 3, 'The end of longshore work', 'Container ports need a fraction of the labour, and dock jobs start to disappear.'],
    [2804, 3, 'The Pacific route', 'Military supply in the 1960s proves the system across the Pacific.'],
    [3130, 3, 'New ports on open ground', 'Old city piers have no room to stack boxes, so trade moves to new terminals.'],
    [3516, 4, 'Cheap distance', 'When moving goods is cheap, factories can sit far from their customers.'],
    [3902, 4, 'A world built on a standard', 'The container as a lesson in standards: dull, agreed upon, and consequential.']
  ];

  

  /* ================================================================ Deck */
  (() => {
    const bars = $('#k-bars');
    bars.innerHTML = Array.from({ length: 24 }, (_, i) => `<i style="height:${Math.round(38 + 26 * Math.sin(i * 0.7) + 16 * Math.sin(i * 1.9 + 1) + 14)}%"></i>`).join('');
    const rowsEl = $('#k-rows');
    rowsEl.innerHTML = LECTURE.slice(0, 5).map(([t, , title], i) => `<div class="ap-row${i === 0 ? ' is-now' : ''}"><span class="pill">${TRI}${fmt(t)}</span><span class="t">${title}</span></div>`).join('');
    let timers = [];
    const lit = (n) => $$('i', bars).forEach((b, i) => b.classList.toggle('on', Math.floor(((i + 1) * n) / 24) !== Math.floor((i * n) / 24)));
    lit(8);
    const cards = $$('.k-grid .k-card');
    cards[1].addEventListener('pointerenter', () => { let n = 8; clearInterval(timers[0]); timers[0] = setInterval(() => { n = n >= 24 ? 8 : n + 8; lit(n); }, 700); });
    cards[1].addEventListener('pointerleave', () => { clearInterval(timers[0]); lit(8); });
    cards[2].addEventListener('pointerenter', () => { let n = 0; clearInterval(timers[1]); timers[1] = setInterval(() => { n = (n + 1) % 5; $$('.ap-row', rowsEl).forEach((r, i) => r.classList.toggle('is-now', i === n)); }, 650); });
    cards[2].addEventListener('pointerleave', () => { clearInterval(timers[1]); $$('.ap-row', rowsEl).forEach((r, i) => r.classList.toggle('is-now', i === 0)); });
    cards[3].addEventListener('click', () => $('#k-exp').classList.toggle('open'));
  })();
})();
