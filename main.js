// Menu mobile
const header = document.querySelector('.header');
const toggle = document.querySelector('.header__toggle');
toggle.addEventListener('click', () => {
  const open = header.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', open);
  toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
});
document.querySelectorAll('.header__nav a[href^="#"]').forEach(a =>
  a.addEventListener('click', () => { header.classList.remove('is-open'); toggle.setAttribute('aria-expanded', false); })
);

// Logo de farmácia sem imagem → mostra o nome
document.querySelectorAll('.loja__logo img').forEach(img => {
  const fallback = () => { img.parentElement.textContent = img.alt; };
  if (img.complete && img.naturalWidth === 0) fallback(); else img.addEventListener('error', fallback);
});

// Carrossel de farmácias
document.querySelectorAll('[data-carousel]').forEach(c => {
  const track = c.querySelector('[data-track]');
  const dotsWrap = c.querySelector('[data-dots]');
  const items = [...track.children];
  const step = () => items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
  const pages = () => Math.max(1, Math.ceil((track.scrollWidth - track.clientWidth) / step()) + 1);

  const renderDots = () => {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < pages(); i++) {
      const b = document.createElement('button');
      b.setAttribute('aria-label', `Ir para ${i + 1}`);
      b.addEventListener('click', () => track.scrollTo({ left: i * step() }));
      dotsWrap.appendChild(b);
    }
    update();
  };
  const update = () => {
    const i = Math.round(track.scrollLeft / step());
    [...dotsWrap.children].forEach((d, k) => d.setAttribute('aria-current', k === i));
  };
  c.querySelector('[data-prev]').addEventListener('click', () => track.scrollBy({ left: -step() }));
  c.querySelector('[data-next]').addEventListener('click', () => track.scrollBy({ left: step() }));
  track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
  window.addEventListener('resize', renderDots);
  renderDots();
});
