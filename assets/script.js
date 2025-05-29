
const allCards = [
  { name: "A220", rarity: "teal" },
  { name: "A320", rarity: "teal" },
  { name: "A330", rarity: "teal" },
  { name: "A350", rarity: "teal" },
  { name: "A380", rarity: "green" },
  { name: "BelugaXL", rarity: "green" },
  { name: "A400M", rarity: "purple" },
  { name: "Concorde", rarity: "gold" }
];

const cardContainer = document.getElementById("card-container");

function getUnlockedCards() {
  const urlParams = new URLSearchParams(window.location.search);
  const unlocked = urlParams.getAll("unlocked");
  const stored = JSON.parse(localStorage.getItem("unlockedCards") || "[]");
  const combined = Array.from(new Set([...stored, ...unlocked]));
  localStorage.setItem("unlockedCards", JSON.stringify(combined));
  return combined;
}

function createCardElement(card, isUnlocked) {
  const div = document.createElement("div");
  div.className = `card ${card.rarity}`;
  const img = document.createElement("img");
  img.src = isUnlocked
    ? `assets/cards/${card.name}.png`
    : `assets/cards/${card.name}_locked.png`;
  div.appendChild(img);

  if (!isUnlocked) {
    const overlay = document.createElement("img");
    overlay.src = "assets/lock_icon.png";
    overlay.className = "lock-overlay";
    div.appendChild(overlay);
  } else {
    div.classList.add("shine");
    div.addEventListener("click", () => {
      div.classList.remove("shine");
      void div.offsetWidth;
      div.classList.add("shine");
      setTimeout(() => div.classList.remove("shine"), 1500);
    });
  }

  return div;
}

function renderCards() {
  const unlocked = getUnlockedCards();
  allCards.forEach(card => {
    const isUnlocked = unlocked.includes(card.name);
    const cardElement = createCardElement(card, isUnlocked);
    cardContainer.appendChild(cardElement);
  });
}

window.onload = renderCards;
