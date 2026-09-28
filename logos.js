const strip = document.querySelector('.logo-marquee');
const control = strip?.querySelector('.logo-pause');
control?.addEventListener('click', () => {
  const paused = strip.classList.toggle('paused');
  control.setAttribute('aria-pressed', String(paused));
  control.setAttribute('aria-label', paused ? 'Resume logo animation' : 'Pause logo animation');
  control.innerHTML = paused ? 'Resume <span aria-hidden="true">▷</span>' : 'Pause <span aria-hidden="true">Ⅱ</span>';
});
