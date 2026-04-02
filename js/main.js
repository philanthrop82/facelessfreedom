const counterEl = document.querySelector("[data-live-counter]");
const viewsEl = document.querySelector("[data-views-count]");
const feedEl = document.querySelector(".plf-registration-feed");
const feedMessageEl = document.querySelector(".plf-registration-message");
const mainCtaEl = document.querySelector('[data-testid="plf-main-cta"]');
const calculatorCtaEl = document.querySelector('[data-testid="plf-download-cta"]');
const loadMoreEl = document.querySelector('[data-testid="plf-load-more-comments"]');
const commentsRoot = document.querySelector('[data-testid="plf-load-more-comments"]')?.parentElement;
const toastEl = document.querySelector(".plf-toast");

const feedMessages = [
  "Angelika Schreiber hat sich gerade registriert.",
  "Murat Klein ist jetzt live dabei.",
  "Tanja Westerberg hat den Rechner geöffnet.",
  "Karl-Heinz Wirth hat Kommentar abgegeben."
];

let counterValue = 5430;
let viewsValue = 18366;
let feedIndex = 0;

function showToast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.style.opacity = "1";
  toastEl.style.transform = "translateY(0)";
  window.setTimeout(() => {
    toastEl.style.opacity = "0";
    toastEl.style.transform = "translateY(80px)";
  }, 2200);
}

window.setInterval(() => {
  counterValue += Math.floor(Math.random() * 4) + 1;
  if (counterEl) {
    counterEl.textContent = counterValue.toLocaleString("de-DE");
    counterEl.style.animation = "plf-counter-pop 260ms ease";
    window.setTimeout(() => {
      counterEl.style.animation = "";
    }, 280);
  }
}, 5000);

window.setInterval(() => {
  viewsValue += Math.floor(Math.random() * 9) + 2;
  if (viewsEl) {
    viewsEl.textContent = viewsValue.toLocaleString("de-DE");
  }
}, 6000);

window.setInterval(() => {
  if (!feedEl || !feedMessageEl) return;
  feedIndex = (feedIndex + 1) % feedMessages.length;
  feedEl.style.opacity = "0";
  feedEl.style.transform = "translateY(8px)";
  window.setTimeout(() => {
    feedMessageEl.textContent = feedMessages[feedIndex];
    feedEl.style.opacity = "1";
    feedEl.style.transform = "translateY(0)";
  }, 220);
}, 3800);

mainCtaEl?.addEventListener("click", () => {
  showToast("✅ Super! Weiterleitung zum nächsten Schritt …");
});

calculatorCtaEl?.addEventListener("click", () => {
  showToast("🧮 Rechner wird geöffnet …");
});

loadMoreEl?.addEventListener("click", () => {
  if (!commentsRoot) return;
  const comment = document.createElement("div");
  comment.className = "plf-comment";
  comment.innerHTML =
    '<div class="plf-comment-avatar" style="background:rgb(76,175,80)">ML</div>' +
    '<div style="flex:1 1 0%"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px">' +
    '<span style="font-size:14px;font-weight:700">Mina L.</span>' +
    '<span style="font-size:11px;color:var(--plf-text-muted)">gerade eben</span></div>' +
    '<div style="font-size:14px;line-height:1.5">Mega erklärt. Heute direkt umgesetzt! 🚀</div></div>';
  commentsRoot.insertBefore(comment, loadMoreEl);
  showToast("💬 Weitere Kommentare geladen");
});
