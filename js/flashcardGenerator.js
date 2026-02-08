function createSampleFlashcards({ topic, count, includeVisuals }) {
  const baseConcepts = [
    {
      front: "Key Definition",
      back: `A core idea in ${topic} that students must remember.`,
      example: "Example: Provide a simple numeric illustration.",
      relatedConcepts: ["Prerequisite skill", "Next chapter"],
    },
    {
      front: "Important Formula",
      back: `Formula used often in ${topic}.`,
      example: "Example: Substitute values into the formula.",
      relatedConcepts: ["Application", "Word problems"],
    },
    {
      front: "Common Misconception",
      back: "Clarify a mistake students usually make and the correct approach.",
      example: "Example: Show the correct step.",
      relatedConcepts: ["Error analysis"],
    },
  ];

  return Array.from({ length: count }, (_, index) => {
    const base = baseConcepts[index % baseConcepts.length];
    return {
      id: index + 1,
      topic,
      front: `${base.front}: ${topic}`,
      back: base.back,
      example: includeVisuals ? base.example : "(Visual aid disabled)",
      relatedConcepts: base.relatedConcepts,
    };
  });
}

function renderFlashcard(card, stage) {
  stage.innerHTML = "";

  if (!card) {
    stage.innerHTML = "<p>No flashcards generated yet.</p>";
    return;
  }

  const cardEl = document.createElement("div");
  cardEl.className = "flashcard";
  cardEl.innerHTML = `
    <div class="flashcard-inner">
      <div class="flashcard-face flashcard-front">
        <div>
          <h4>${card.front}</h4>
          <p>${card.example}</p>
        </div>
        <p><strong>Click to flip</strong></p>
      </div>
      <div class="flashcard-face flashcard-back">
        <div>
          <h4>${card.back}</h4>
          <p><strong>Related:</strong> ${card.relatedConcepts.join(", ")}</p>
        </div>
        <p><strong>Click to flip</strong></p>
      </div>
    </div>
  `;

  cardEl.addEventListener("click", () => {
    cardEl.classList.toggle("flip");
  });

  stage.appendChild(cardEl);
}
