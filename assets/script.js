
const allCards = [
  { name: "A220", rarity: "common" },
  { name: "A320", rarity: "common" },
  { name: "A330", rarity: "common" },
  { name: "A350", rarity: "common" },
  { name: "A380", rarity: "rare" },
  { name: "A400M", rarity: "rare" },
  { name: "BelugaXL", rarity: "epic" },
  { name: "Concorde", rarity: "legendary" }
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
  div.className = "card";
  const img = document.createElement("img");
  img.src = isUnlocked
    ? `assets/cards/${card.name}.jpg`
    : `assets/cards/${card.name}_locked.jpg`;
  div.appendChild(img);

  if (isUnlocked) {
    div.classList.add("shine");
    setTimeout(() => div.classList.remove("shine"), 1500);
    div.addEventListener("click", () => {
      div.classList.remove("shine");
      void div.offsetWidth; // trigger reflow
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
