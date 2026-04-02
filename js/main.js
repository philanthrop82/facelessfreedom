const liveCounter = document.getElementById('live-counter');

// simple live counter animation (demo)
let count = 5430;
setInterval(() => {
  count += Math.floor(Math.random() * 3);
  if (liveCounter) liveCounter.textContent = count.toLocaleString('de-DE');
}, 4000);

document.querySelectorAll('[data-action="scroll"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const target = btn.getAttribute('data-target');
    if (!target) return;
    const el = document.querySelector(target);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
});

document.querySelectorAll('[data-action="cta"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('CTA geklickt – hier kannst du weiterleiten oder ein Modal öffnen.');
  });
});

document.querySelectorAll('[data-action="open-calculator"]').forEach((btn) => {
  btn.addEventListener('click', () => {
    alert('Hier den Umsatz‑Rechner öffnen oder verlinken.');
  });
});
