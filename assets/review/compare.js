(() => {
  'use strict';
  const data = window.caseReview;
  const query = new URLSearchParams(location.search);
  let project = Object.hasOwn(data, query.get('project')) ? query.get('project') : 'khiladipro';
  const versions = document.querySelector('.versions');
  const panes = ['original', 'redesign'];
  let size = 'desktop';
  function resize() {
    const width = size === 'desktop' ? 1280 : 390;
    const height = size === 'desktop' ? 850 : 844;
    panes.forEach(version => {
      const pane = document.getElementById(`${version}-pane`);
      if (pane.hidden) return;
      const scale = Math.min(1, (pane.clientWidth - 32) / width);
      const stage = pane.querySelector('.frame-stage');
      stage.style.width = `${width * scale}px`;
      stage.style.height = `${height * scale}px`;
      const frame = pane.querySelector('iframe');
      frame.style.width = `${width}px`;
      frame.style.height = `${height}px`;
      frame.style.transform = `scale(${scale})`;
    });
  }
  function row(asset, index) {
    const item = document.createElement('div'); item.className = 'asset-row';
    const number = document.createElement('span'); number.className = 'asset-number'; number.textContent = String(index).padStart(2,'0');
    const thumb = document.createElement('a'); thumb.href = asset.src; thumb.target = '_blank'; thumb.rel = 'noopener'; thumb.setAttribute('aria-label', `Open image ${index}`);
    const image = document.createElement('img'); image.src = asset.src; image.alt = ''; image.loading = 'lazy'; thumb.append(image);
    const label = document.createElement('a'); label.href = asset.src; label.target = '_blank'; label.rel = 'noopener'; label.textContent = asset.label;
    const placement = document.createElement('span'); placement.className = `placement${asset.placement === 'Not included' ? ' removed' : ''}`; placement.textContent = asset.placement;
    item.append(number,thumb,label,placement); return item;
  }
  function selectProject(next) {
    project = next; const info = data[project];
    document.querySelectorAll('[data-project]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.project === project)));
    panes.forEach(version => {
      const frame = document.getElementById(`${version}-frame`);
      if (frame.getAttribute('src') !== info[version]) frame.src = info[version];
      frame.title = `${version === 'original' ? 'Original' : 'Redesigned'} ${info.name} case study`;
      document.getElementById(`${version}-link`).href = info[version];
    });
    const removed = info.rows.filter(asset => asset.placement === 'Not included').length;
    document.getElementById('inventory-summary').textContent = `${info.originalCount} original images · ${removed} not included in the redesign`;
    document.getElementById('inventory').replaceChildren(...info.rows.map((asset,index) => row(asset,index + 1)));
    const added = document.getElementById('added'); added.replaceChildren();
    if (info.added.length) {
      const title = document.createElement('h3'); title.textContent = 'Images added in the redesign'; added.append(title,...info.added.map((asset,index)=>row(asset,index+1)));
    }
    const url = new URL(location.href); url.searchParams.set('project',project); history.replaceState(null,'',url);
    resize();
  }
  document.querySelectorAll('[data-project]').forEach(button => button.addEventListener('click',()=>selectProject(button.dataset.project)));
  document.querySelectorAll('[data-view]').forEach(button => {
    if (button.tagName !== 'BUTTON') return;
    button.addEventListener('click',()=>{
      const view = button.dataset.view;
      document.querySelectorAll('button[data-view]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));
      versions.dataset.view = view;
      panes.forEach(version=>document.getElementById(`${version}-pane`).hidden = view !== 'both' && view !== version);
      resize();
    });
  });
  document.getElementById('viewport').addEventListener('change',event=>{size=event.target.value;resize();});
  window.addEventListener('resize',resize,{passive:true});
  selectProject(project);
})();
