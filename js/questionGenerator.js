const difficultyLabel = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

const questionTemplates = {
  easy: [
    "Solve: {a} + {b}",
    "Find the value of {a} - {b}",
    "Calculate: {a} × {b}",
  ],
  medium: [
    "A school has {a} rows of chairs with {b} chairs each. How many chairs in total?",
    "Find the perimeter of a rectangle with length {a} cm and width {b} cm.",
    "A shopkeeper bought {a} items at ₹{b} each. What is the total cost?",
  ],
  hard: [
    "A tank is filled {a}% with water. If the tank holds {b} liters, how much water is in the tank?",
    "The sum of three consecutive integers is {a}. What are the integers?",
    "A train travels {a} km in {b} hours. What is its average speed?",
  ],
};

function createSampleQuestions({ topic, subtopic, difficulty, count, type }) {
  const questions = [];
  const templatePool = questionTemplates[difficulty];

  for (let i = 0; i < count; i += 1) {
    const a = Math.floor(Math.random() * 30) + 5;
    const b = Math.floor(Math.random() * 20) + 2;
    const template = templatePool[i % templatePool.length];
    const questionText = template.replace("{a}", a).replace("{b}", b);

    questions.push({
      id: i + 1,
      topic,
      subtopic,
      difficulty,
      type,
      question: questionText,
      solution: [
        `Step 1: Identify the key data in the problem (${a} and ${b}).`,
        "Step 2: Apply the relevant formula or operation.",
        `Step 3: Compute the result for the ${difficultyLabel[difficulty]} level.`,
      ],
      answer: "(Sample answer generated)",
      hints: ["Break the problem into smaller steps."],
    });
  }

  return questions;
}

function renderQuestions(questions, container) {
  container.innerHTML = "";

  if (!questions.length) {
    container.innerHTML = "<p>No questions generated yet. Choose a topic and generate.</p>";
    return;
  }

  questions.forEach((question) => {
    const questionEl = document.createElement("div");
    questionEl.className = "question-container";

    questionEl.innerHTML = `
      <div class="question-header">
        <h4>Question ${question.id}</h4>
        <span class="difficulty-badge difficulty-${question.difficulty}">
          ${difficultyLabel[question.difficulty]}
        </span>
      </div>
      <p>${question.question}</p>
      <button class="btn-outline toggle-solution" type="button">Show Solution</button>
      <div class="solution-section">
        <strong>Solution</strong>
        <ul>
          ${question.solution.map((step) => `<li>${step}</li>`).join("")}
        </ul>
        <p><strong>Answer:</strong> ${question.answer}</p>
        <p><strong>Hint:</strong> ${question.hints[0]}</p>
      </div>
      <div class="question-actions">
        <button class="btn-secondary copy-question" type="button">Copy Question</button>
        <button class="btn-outline regenerate-question" type="button">Regenerate</button>
      </div>
    `;

    container.appendChild(questionEl);
  });
}
