(() => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  let saved;
  try { saved = localStorage.getItem('jixuan-theme'); } catch {}
  const applyTheme = theme => {
    root.dataset.theme = theme;
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  };
  applyTheme(saved === 'dark' ? 'dark' : 'light');
  toggle.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);
    try { localStorage.setItem('jixuan-theme', theme); } catch {}
  });
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const papers = [...document.querySelectorAll('.paper')];
  buttons.forEach(button => button.addEventListener('click', () => {
    buttons.forEach(item => {
      const active = item === button;
      item.classList.toggle('active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    let count = 0;
    papers.forEach(paper => {
      paper.hidden = button.dataset.filter !== 'all' && button.dataset.filter !== paper.dataset.year;
      if (!paper.hidden) count++;
    });
    document.getElementById('filter-result').textContent = `${count} publications shown`;
  }));
})();
