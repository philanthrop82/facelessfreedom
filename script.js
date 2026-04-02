const words = [
  {
    word: "resilient",
    meaning: "able to recover quickly from stress or setbacks",
    example: "She stayed resilient after every tough exam.",
    level: "Known"
  },
  {
    word: "meticulous",
    meaning: "showing careful attention to detail",
    example: "He kept meticulous notes for each chapter.",
    level: "Learning"
  },
  {
    word: "insight",
    meaning: "a clear understanding of a complex topic",
    example: "The case study gave us real market insight.",
    level: "Known"
  },
  {
    word: "novice",
    meaning: "a person new to a skill or subject",
    example: "Every novice improves with structured practice.",
    level: "Learning"
  }
];

const cardStack = document.getElementById("cardStack");
let index = 0;

function makeCard(item, offset = 0) {
  const card = document.createElement("article");
  card.className = "swipe-card";
  card.style.transform = `translateY(${offset}px) scale(${1 - offset * 0.0025})`;

  const tagClass = item.level === "Known" ? "known" : "learning";
  card.innerHTML = `
    <div>
      <span class="tag ${tagClass}">${item.level}</span>
      <h3>${item.word}</h3>
      <p>${item.meaning}</p>
    </div>
    <p><strong>Example:</strong> ${item.example}</p>
  `;

  return card;
}

function renderStack() {
  cardStack.innerHTML = "";
  const current = words[index % words.length];
  const next = words[(index + 1) % words.length];

  const nextCard = makeCard(next, 12);
  const topCard = makeCard(current, 0);

  cardStack.append(nextCard, topCard);
  enableDrag(topCard);
}

function advance(direction) {
  const topCard = cardStack.querySelector(".swipe-card:last-child");
  if (!topCard) return;

  const x = direction === "right" ? 420 : -420;
  const rot = direction === "right" ? 16 : -16;
  topCard.style.transform = `translate(${x}px, -30px) rotate(${rot}deg)`;
  topCard.style.opacity = "0";

  setTimeout(() => {
    index += 1;
    renderStack();
  }, 160);
}

function enableDrag(card) {
  let startX = 0;
  let currentX = 0;
  let dragging = false;

  card.addEventListener("pointerdown", (e) => {
    dragging = true;
    startX = e.clientX;
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    currentX = e.clientX - startX;
    const rot = currentX * 0.05;
    card.style.transform = `translateX(${currentX}px) rotate(${rot}deg)`;
  });

  function endDrag() {
    if (!dragging) return;
    dragging = false;

    if (Math.abs(currentX) > 100) {
      advance(currentX > 0 ? "right" : "left");
      currentX = 0;
      return;
    }

    card.style.transform = "translateX(0) rotate(0deg)";
    currentX = 0;
  }

  card.addEventListener("pointerup", endDrag);
  card.addEventListener("pointercancel", endDrag);
}

document.getElementById("leftBtn").addEventListener("click", () => advance("left"));
document.getElementById("rightBtn").addEventListener("click", () => advance("right"));

renderStack();

const quotes = [
  {
    text: '"I finally stuck with language practice because swiping feels effortless."',
    meta: "- Anna, beginner learner"
  },
  {
    text: '"The review timing is great. I remember more without forcing long sessions."',
    meta: "- David, busy professional"
  },
  {
    text: '"Seeing examples with each word made vocabulary click faster for me."',
    meta: "- Lena, intermediate learner"
  }
];

const quoteText = document.getElementById("quoteText");
const quoteMeta = document.getElementById("quoteMeta");
const quoteDots = document.getElementById("quoteDots");
let quoteIndex = 0;
let quoteTimer = null;

function renderDots() {
  quoteDots.innerHTML = "";
  quotes.forEach((_, i) => {
    const dot = document.createElement("button");
    if (i === quoteIndex) dot.classList.add("active");
    dot.addEventListener("click", () => {
      quoteIndex = i;
      renderQuote();
      restartQuoteTimer();
    });
    quoteDots.appendChild(dot);
  });
}

function renderQuote() {
  quoteText.textContent = quotes[quoteIndex].text;
  quoteMeta.textContent = quotes[quoteIndex].meta;
  renderDots();
}

function restartQuoteTimer() {
  clearInterval(quoteTimer);
  quoteTimer = setInterval(() => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    renderQuote();
  }, 4500);
}

renderQuote();
restartQuoteTimer();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("in");
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
document.getElementById("year").textContent = new Date().getFullYear();
