(() => {
  'use strict';
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const directions = [
    {id:'gallery', name:'Living Gallery', character:'Quiet confidence. A product is the hero.',
      intro:'The strongest all-round starting point. A short introduction and a prominent, playable product share the first screen. The smaller work gallery gives a recruiter the next click immediately.',
      structure:'Identity + availability → featured product beside the thesis → three work previews → evidence → contact. Work appears alongside the introduction on desktop and immediately after a compact introduction on mobile.',
      type:'DM Sans with tight display tracking. One italic serif phrase softens the precision. A restrained scale separates the proposition from role facts.',
      material:'Warm off-white, muted lilac, product-led colour. 12–17 px media corners; hairlines instead of heavy shadows. Spacious, without making the introduction a full-screen detour.',
      interaction:'The phone stack fans apart on hover. Tap the rep counter to complete the drill. Small arrows and cards respond quickly. Product interactions carry the personality.',
      fit:'Senior product roles, founding teams, and independent engagements. This has the best balance of scan speed, craft and approachability.',
      recommendation:'My first choice as the foundation. Pair its hierarchy with the interaction variety in Playground.'},
    {id:'obsidian', name:'Obsidian', character:'A cinematic wall of working products.',
      intro:'The closest evolution of your current dark homepage. The oversized name becomes a compact identity, and three functional product fragments take centre stage.',
      structure:'Compact proposition + personal context → three parallel product previews → background facts → detailed working style → client voice → contact. No introductory screen before the work.',
      type:'Low-contrast off-white sans, bold enough to anchor the page. Headlines use a tight rhythm; project captions keep roles readable.',
      material:'Green-black with a restrained sage accent. Architectural columns, illuminated edges, small corner radii. Product screens provide the colour and depth.',
      interaction:'A pointer-following light passes over each work panel. Count reps, cycle thirteen contest states, and change chart indicators. Each case study has a separate, persistent entry point.',
      fit:'Design managers and teams hiring for systems thinking, complex products, and interaction craft.',
      recommendation:'Choose this if you want to retain the current homepage’s atmosphere while making it more decisive.'},
    {id:'atelier', name:'Atelier', character:'Editorial warmth. Objects with a little gravity.',
      intro:'A more personal, art-directed portfolio. An expressive serif and a tactile composition give the page an individual voice, while the work index supplies the practical information.',
      structure:'Personal thesis + visible featured work → compact project index with role evidence → working approach → testimonial → direct contact. A visual focal point paired with a fast reading path.',
      type:'Instrument Serif as the expressive voice; compact sans for evidence and navigation. The contrast between the two creates hierarchy without lots of sizes.',
      material:'Warm paper, rust-red ink, square editorial rules. An arched product stage and softly lit objects break the grid in one contained place.',
      interaction:'Phones fan out as you approach the desk. “Rearrange” changes their composition. The centre phone counts reps; project-row arrows respond to hover and keyboard focus.',
      fit:'Founders and clients who value taste, collaboration, and a designer with a distinctive point of view.',
      recommendation:'The most personal direction. Keep the role evidence and work index as crisp as they are here.'},
    {id:'signal', name:'Signal', character:'High energy. A clear first impression.',
      intro:'An assertive, contemporary direction with an unmistakable colour signature. The bold introduction and a real product demonstration occupy one shared composition.',
      structure:'Name and direct contact → blue proposition beside featured work → three compact alternate projects → credentials → approach and client proof → contact.',
      type:'Space Grotesk in large, tight display settings. A serif verb adds movement. Compact product labels and role facts stay calm around it.',
      material:'Electric blue against cool paper. A large divided canvas, 18 px outer corners and smaller project tiles. One strong colour provides identity.',
      interaction:'The blue rings expand on approach. The phone rotates slightly into the composition, the rep count responds, and the project tiles lift a few pixels. Motion is energetic but contained.',
      fit:'Consumer products, early-stage teams, sports and gaming, and founders seeking a confident first design hire.',
      recommendation:'The boldest visual identity. Useful if you want people to remember the portfolio after a long review session.'},
    {id:'index', name:'Index', character:'A living collection. Clarity at every level.',
      intro:'A quieter, senior-feeling portfolio that behaves like a well-kept collection. Persistent personal context and a readable project index make it especially quick to evaluate.',
      structure:'Persistent profile beside the work → one expanded project + three immediately readable entries → approach → client proof → contact. On mobile the profile becomes a short introduction.',
      type:'A compact sans scale, with a single serif gesture in the title. Hierarchy comes from alignment, spacing, and weight. The information earns the attention.',
      material:'Pale botanical neutrals, forest ink, six-pixel media corners. Flat, precise, and soft. Thin rules organise the collection.',
      interaction:'Project entries expand inline, one at a time. The active project includes a functional demonstration. Native disclosure controls support keyboard use and retain a clear reading order.',
      fit:'Recruiters scanning quickly, senior design leaders assessing judgement, and enterprise or data-product teams.',
      recommendation:'The clearest architecture. It can borrow a little of Atelier’s warmth without losing its strength.'},
    {id:'playground', name:'Playground', character:'Craft you can feel. Work you can inspect.',
      intro:'A product designer’s interactive desk. Three tangible product windows make the first screen an invitation to inspect the craft, with the evidence directly underneath.',
      structure:'Short personal thesis + availability → three playable product windows → credibility strip → approach → testimonial → contact. The projects are the homepage’s main event.',
      type:'A compact two-line proposition in DM Sans, with warm small text and deliberately readable project labels. No huge name competing with the products.',
      material:'Warm graphite with a pale yellow signature. Layered physical shadows, lightly rotated windows and product-specific backgrounds. A small amount of asymmetry makes the work feel handled.',
      interaction:'Count a rep, cycle a contest’s thirteen states, or adjust a wallet transfer. Rearrange the desk and reset its demos. Optional sound adds pentatonic notes; it starts off. The name also responds to hover.',
      fit:'Founding designer roles and teams who value prototyping, interaction quality, and a builder’s curiosity.',
      recommendation:'The strongest expression of “alive.” Use its interactive work windows in the more restrained Living Gallery structure.'}
  ];
  const panels = $$('.direction');
  const tabs = $$('.direction-tabs button');
  let current = 0;
  let soundOn = false;
  let audioContext;
  let lastNote = 0;
  let toastTimer;
  const noteFrequencies = [293.66,329.63,369.99,440,493.88,587.33,659.25];
  const toast = message => {
    $('[data-toast]').textContent = message;
    $('[data-toast]').classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('[data-toast]').classList.remove('is-visible'), 2200);
  };
  function note(index = 0) {
    if (!soundOn || Date.now() - lastNote < 70) return;
    lastNote = Date.now();
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      if (audioContext.state === 'suspended') audioContext.resume();
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();
      oscillator.type = 'sine';
      oscillator.frequency.value = noteFrequencies[index % noteFrequencies.length];
      oscillator.connect(gain); gain.connect(audioContext.destination);
      const t = audioContext.currentTime;
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(.032, t + .015);
      gain.gain.exponentialRampToValueAtTime(.0001, t + .42);
      oscillator.start(t); oscillator.stop(t + .45);
    } catch { /* Sound is optional, even in browsers without Web Audio. */ }
  }
  function choose(index, {focus = false, updateHash = true, scroll = true} = {}) {
    if (index < 0 || index >= directions.length) return;
    current = index;
    panels.forEach((panel, n) => { panel.hidden = n !== index; panel.classList.toggle('is-active', n === index); });
    tabs.forEach((button, n) => { button.setAttribute('aria-selected', String(n === index)); button.tabIndex = n === index ? 0 : -1; });
    $('[data-current-name]').textContent = `${String(index + 1).padStart(2,'0')} / ${directions[index].name}`;
    $('[data-current-description]').textContent = directions[index].character;
    $('[data-skip]').href = `#${directions[index].id}-work`;
    $('[data-announcement]').textContent = `${directions[index].name} direction selected.`;
    document.title = `${directions[index].name} · Priyank Agarwal · Six homepage directions`;
    if (updateHash) {
      try { history.replaceState(null, '', `#${directions[index].id}`); } catch { /* file previews can restrict history. */ }
    }
    if (scroll) window.scrollTo({top:0, behavior:'instant'});
    if (focus) tabs[index].focus({preventScroll:true});
    note(index);
  }
  tabs.forEach((button, n) => {
    button.addEventListener('click', () => choose(n));
    button.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (current + 1) % 6;
      if (event.key === 'ArrowLeft') next = (current + 5) % 6;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = 5;
      if (next !== undefined) { event.preventDefault(); choose(next, {focus:true}); }
    });
  });
  document.addEventListener('keydown', event => {
    if ($('dialog[open]') || event.ctrlKey || event.metaKey || event.altKey || event.target.closest('input,textarea,button,summary,[contenteditable]')) return;
    if (/^[1-6]$/.test(event.key)) choose(Number(event.key) - 1);
  });
  function syncHash() {
    const index = directions.findIndex(d => location.hash === `#${d.id}` || location.hash.startsWith(`#${d.id}-`));
    if (index !== -1 && index !== current) choose(index, {updateHash:false,scroll:false});
  }
  addEventListener('hashchange', syncHash);
  const initial = directions.findIndex(d => location.hash === `#${d.id}` || location.hash.startsWith(`#${d.id}-`));
  choose(initial < 0 ? 0 : initial, {updateHash:false,scroll:false});
  $('[data-overview]').addEventListener('click', () => $('[data-overview-dialog]').showModal());
  $$('[data-choose]').forEach(button => button.addEventListener('click', () => {
    button.closest('dialog').close(); choose(Number(button.dataset.choose));
  }));
  $$('[data-close-dialog]').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
  $$('dialog').forEach(dialog => dialog.addEventListener('click', event => {
    const rect = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
  }));
  $('[data-notes]').addEventListener('click', () => {
    const data = directions[current];
    $('[data-notes-title]').textContent = `${String(current + 1).padStart(2,'0')} / ${data.name}`;
    $('[data-notes-intro]').textContent = data.intro;
    for (const key of ['structure','type','material','interaction','fit','recommendation']) $(`[data-note="${key}"]`).textContent = data[key];
    $('[data-notes-dialog]').showModal();
  });
  const setFocus = value => {
    document.body.classList.toggle('focus-mode', value);
    window.scrollTo({top:0,behavior:'instant'});
    if (!value) tabs[current].focus({preventScroll:true});
  };
  $('[data-focus]').addEventListener('click', () => setFocus(true));
  $('[data-back]').addEventListener('click', () => setFocus(false));
  $('[data-motion]').addEventListener('click', event => {
    const paused = document.body.classList.toggle('motion-paused');
    event.currentTarget.setAttribute('aria-pressed', String(paused));
    event.currentTarget.textContent = paused ? 'Resume motion' : 'Pause motion';
  });
  $$('[data-image]').forEach(img => { img.src = ASSETS[img.dataset.image]; });
  function confetti(root) {
    if (reduced.matches || document.body.classList.contains('motion-paused')) return;
    const burst = document.createElement('span'); burst.className = 'burst'; burst.setAttribute('aria-hidden','true');
    for (let i = 0; i < 22; i++) {
      const bit = document.createElement('i');
      bit.style.setProperty('--x', `${(Math.random() - .5) * 300}px`);
      bit.style.setProperty('--y', `${(Math.random() - .65) * 350}px`);
      bit.style.setProperty('--angle', `${Math.random() * 720}deg`);
      bit.style.setProperty('--color', ['#e97858','#c8d999','#e3be6b','#c5b5d9'][i%4]);
      burst.append(bit);
    }
    root.append(burst); setTimeout(() => burst.remove(), 900);
  }
  function resetSports(demo) {
    demo.dataset.reps = '13';
    $('.sports-phone', demo).classList.remove('is-done','is-repping');
    $('[data-image]', demo).src = ASSETS.kpDrill;
    $('[data-reps]', demo).textContent = '13';
    $('[data-rep-button]', demo).textContent = 'Count a rep +';
    $('[data-rep-button]', demo).setAttribute('aria-label','Count a squat rep. 13 of 20.');
  }
  $$('[data-sports]').forEach(demo => {
    demo.dataset.reps = '13';
    $('[data-rep-button]', demo).addEventListener('click', () => {
      let count = Number(demo.dataset.reps);
      if (count >= 20) { resetSports(demo); note(0); return; }
      count++; demo.dataset.reps = String(count);
      $('[data-reps]', demo).textContent = String(count);
      const phone = $('.sports-phone', demo);
      phone.classList.remove('is-repping');
      if (!reduced.matches) { void phone.offsetWidth; phone.classList.add('is-repping'); }
      $('[data-rep-button]', demo).setAttribute('aria-label', `Count a squat rep. ${count} of 20.`);
      note(count - 13);
      if (count === 20) {
        phone.classList.add('is-done');
        $('[data-image]', demo).src = ASSETS.kpSuccess;
        $('[data-rep-button]', demo).textContent = 'Try again ↺';
        $('[data-rep-button]', demo).setAttribute('aria-label','Drill complete. Try again.');
        $('[data-announcement]').textContent = 'Drill complete. 20 of 20 reps.';
        confetti(demo);
      }
    });
  });
  const currency = n => `₹${n.toLocaleString('en-IN')}`;
  function updateWallet(demo) {
    const amount = Number($('input', demo).value);
    const percent = amount >= 5000 ? 20 : amount >= 2000 ? 10 : 5;
    $('[data-wallet-value]', demo).textContent = amount.toLocaleString('en-IN');
    $('[data-principal]', demo).textContent = currency(amount);
    $('[data-bonus]', demo).textContent = currency(amount * percent / 100);
    $('[data-bonus-label]', demo).textContent = `Bonus · ${percent}%`;
    $('[data-total]', demo).textContent = currency(amount * (1 + percent / 100));
    $('input', demo).setAttribute('aria-valuetext', `${currency(amount)} transfer plus ${percent}% bonus; total ${currency(amount * (1 + percent / 100))}.`);
  }
  $$('[data-wallet]').forEach(demo => {
    $('input', demo).addEventListener('input', () => updateWallet(demo));
    $('input', demo).addEventListener('change', () => note(3));
    updateWallet(demo);
  });
  const states = [
    ['Paid','Live','128','Entry ₹500','Ends in 1d 3h'],
    ['Free','Free','128','Entry free','Ends in 1d 3h'],
    ['Early bird','Early bird','84','Entry ₹350','Early bird offer'],
    ['Not started','Upcoming','64','Entry ₹500','Starts tomorrow'],
    ['Starting soon','Soon','122','Entry ₹500','Starts in 5m'],
    ['In progress','Live','128','Joined','Contest in progress'],
    ['Currently playing','Playing','128','You are playing','Return to game'],
    ['Re-entry','Re-entry','124','Entry ₹500','Try again'],
    ['Goal reached','Complete','128','Goal reached','Contest complete'],
    ['Ranked','Ranked','128','Rank 23 / 128','View leaderboard'],
    ['You won','Won','128','You won ₹2,500','View winnings'],
    ['Ended','Ended','128','Contest ended','View results'],
    ['Cancelled','Cancelled','64','Entry refunded','Contest cancelled']
  ];
  function updateState(demo, index) {
    index = (index + states.length) % states.length; demo.dataset.state = String(index);
    const state = states[index];
    $('[data-state-name]', demo).textContent = state[0];
    $('[data-state-badge]', demo).textContent = state[1];
    $('[data-players]', demo).textContent = state[2];
    $('[data-state-entry]', demo).textContent = state[3];
    $('[data-state-status]', demo).textContent = state[4];
    $('[data-state-index]', demo).textContent = `${String(index+1).padStart(2,'0')} / 13`;
  }
  $$('[data-states]').forEach(demo => {
    updateState(demo, 0);
    $('[data-prev]', demo).addEventListener('click', () => { updateState(demo, Number(demo.dataset.state)-1); note(1); });
    $('[data-next]', demo).addEventListener('click', () => { updateState(demo, Number(demo.dataset.state)+1); note(4); });
  });
  const chartData = [
    {question:'Monthly spend per person, by state', values:[7130,6320,5680,4910], max:8000, format:currency},
    {question:'Literacy rate, by state', values:[96,82,83,76], max:100, format:n=>`${n}%`},
    {question:'Households with internet, by state', values:[65,54,51,47], max:100, format:n=>`${n}%`}
  ];
  function updateChart(demo, index) {
    demo.dataset.indicator = String(index);
    const data = chartData[index];
    $('[data-chart-question]', demo).textContent = data.question;
    $$('[data-indicator]', demo).forEach(button => button.setAttribute('aria-pressed', String(Number(button.dataset.indicator) === index)));
    $$('.chart-row', demo).forEach((row,n) => {
      $('i', row).style.setProperty('--width', `${data.values[n] / data.max * 100}%`);
      $('b', row).textContent = data.format(data.values[n]);
    });
    $('[data-chart-summary]', demo).hidden = true;
    $('[data-chart-share]', demo).textContent = 'Preview share ↗';
  }
  $$('[data-chart]').forEach(demo => {
    updateChart(demo, 0);
    $$('[data-indicator]', demo).forEach(button => button.addEventListener('click', () => { updateChart(demo, Number(button.dataset.indicator)); note(Number(button.dataset.indicator)+2); }));
    $('[data-chart-share]', demo).addEventListener('click', () => {
      const summary = $('[data-chart-summary]', demo);
      summary.hidden = !summary.hidden;
      summary.textContent = `${chartData[Number(demo.dataset.indicator)].question}. Includes state labels, units and a link back to the workspace. Demonstration with sample data.`;
      $('[data-chart-share]', demo).textContent = summary.hidden ? 'Preview share ↗' : 'Close preview ×';
    });
  });
  $$('[data-shuffle-desk]').forEach(button => button.addEventListener('click', () => {
    const arranged = button.closest('.atelier-desk').classList.toggle('is-shuffled');
    button.setAttribute('aria-pressed', String(arranged)); note(5);
  }));
  const entries = $$('.work-entry');
  entries.forEach(entry => entry.addEventListener('toggle', () => {
    if (entry.open) entries.forEach(other => { if (other !== entry) other.open = false; });
  }));
  $('[data-arrange]').addEventListener('click', event => {
    const arranged = $('.workspace').classList.toggle('is-arranged');
    event.currentTarget.setAttribute('aria-pressed', String(arranged)); note(5);
  });
  $('[data-reset-desk]').addEventListener('click', () => {
    const root = $('.playground');
    $('.workspace').classList.remove('is-arranged');
    $('[data-arrange]').setAttribute('aria-pressed','false');
    $$('[data-sports]', root).forEach(resetSports);
    $$('[data-states]', root).forEach(demo => updateState(demo,0));
    $$('[data-wallet]', root).forEach(demo => { $('input', demo).value = 4050; updateWallet(demo); });
    toast('Desk reset. Ready to play again.');
  });
  $('[data-sound]').addEventListener('click', event => {
    soundOn = !soundOn;
    event.currentTarget.setAttribute('aria-pressed',String(soundOn));
    $('[data-sound-label]').textContent = soundOn ? 'Sound on' : 'Sound off';
    if (soundOn) note(0);
  });
  $$('.name-play span').forEach((letter, index) => letter.addEventListener('pointerenter', () => note(index)));
  const pointerFine = matchMedia('(hover:hover) and (pointer:fine)');
  $$('[data-spotlight]').forEach(card => card.addEventListener('pointermove', event => {
    if (!pointerFine.matches || reduced.matches) return;
    const r = card.getBoundingClientRect();
    card.style.setProperty('--px', `${event.clientX-r.left}px`);
    card.style.setProperty('--py', `${event.clientY-r.top}px`);
  }));
  $$('[data-copy-email]').forEach(button => button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('hello@priyank.design');
      toast('Email copied: hello@priyank.design');
    } catch { toast('Email: hello@priyank.design'); }
  }));
  const clock = () => {
    const time = new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date());
    $$('[data-clock]').forEach(span => span.textContent = `${time} IST`);
  };
  clock(); setInterval(clock,60000);
})();
