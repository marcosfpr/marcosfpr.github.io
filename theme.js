(() => {
  const html   = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') {
    html.classList.add(saved);
  } else {
    const osDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.add(osDark ? 'dark' : 'light');
  }

  toggle.addEventListener('click', () => {
    if (html.classList.contains('light')) {
      html.classList.replace('light', 'dark');
      localStorage.setItem('theme', 'dark');
    } else {
      html.classList.replace('dark', 'light');
      localStorage.setItem('theme', 'light');
    }
  });
})();
