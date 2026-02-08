const state = {
  topic: "Integers",
  subtopic: "Operations on integers",
  difficulty: "easy",
  questionCount: 5,
  questionType: "mixed",
  flashcardCount: 5,
  includeVisuals: true,
  questions: [],
  flashcards: [],
  currentCard: 0,
};

const topicTree = document.getElementById("topicTree");
const selectedTopic = document.getElementById("selectedTopic");
const selectedSubtopic = document.getElementById("selectedSubtopic");
const questionList = document.getElementById("questionList");
const questionStatus = document.getElementById("questionStatus");
const flashcardStatus = document.getElementById("flashcardStatus");
const flashcardStage = document.getElementById("flashcardStage");
const cardCounter = document.getElementById("cardCounter");
const toast = document.getElementById("toast");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2200);
}

function updateSelectedTopic() {
  selectedTopic.textContent = state.topic;
  selectedSubtopic.textContent = state.subtopic;
}

function renderTopicTree() {
  topicTree.innerHTML = "";

  topicData.forEach((topic, topicIndex) => {
    const section = document.createElement("div");
    section.className = "topic-section";

    const header = document.createElement("button");
    header.className = "topic-header";
    header.type = "button";
    header.innerHTML = `<span>${topic.title}</span><span>▾</span>`;

    const list = document.createElement("div");
    list.className = "topic-list";
    list.style.display = topicIndex === 0 ? "grid" : "none";

    header.addEventListener("click", () => {
      list.style.display = list.style.display === "grid" ? "none" : "grid";
    });

    topic.subtopics.forEach((subtopic) => {
      const item = document.createElement("div");
      item.className = "topic-item";
      if (topic.title === state.topic && subtopic === state.subtopic) {
        item.classList.add("active");
      }
      item.textContent = subtopic;
      item.addEventListener("click", () => {
        state.topic = topic.title;
        state.subtopic = subtopic;
        document.querySelectorAll(".topic-item").forEach((el) => el.classList.remove("active"));
        item.classList.add("active");
        updateSelectedTopic();
      });
      list.appendChild(item);
    });

    section.appendChild(header);
    section.appendChild(list);
    topicTree.appendChild(section);
  });
}

function updateQuestionStatus(message) {
  questionStatus.textContent = message;
}

function updateFlashcardStatus(message) {
  flashcardStatus.textContent = message;
}

function attachQuestionHandlers() {
  questionList.querySelectorAll(".toggle-solution").forEach((button) => {
    button.addEventListener("click", () => {
      const solution = button.nextElementSibling;
      solution.classList.toggle("open");
      button.textContent = solution.classList.contains("open") ? "Hide Solution" : "Show Solution";
    });
  });

  questionList.querySelectorAll(".copy-question").forEach((button) => {
    button.addEventListener("click", () => {
      const questionText = button.closest(".question-container").querySelector("p").textContent;
      navigator.clipboard.writeText(questionText).then(() => showToast("Question copied!"));
    });
  });

  questionList.querySelectorAll(".regenerate-question").forEach((button) => {
    button.addEventListener("click", () => {
      showToast("Regenerated sample question.");
    });
  });
}

function updateFlashcardStage() {
  const card = state.flashcards[state.currentCard];
  renderFlashcard(card, flashcardStage);
  cardCounter.textContent = `Card ${state.currentCard + 1} of ${state.flashcards.length || 1}`;
}

function generateQuestions() {
  updateQuestionStatus("Generating...");
  state.questions = createSampleQuestions({
    topic: state.topic,
    subtopic: state.subtopic,
    difficulty: state.difficulty,
    count: state.questionCount,
    type: state.questionType,
  });
  renderQuestions(state.questions, questionList);
  attachQuestionHandlers();
  updateQuestionStatus("Ready");
}

function generateFlashcards() {
  updateFlashcardStatus("Generating...");
  state.flashcards = createSampleFlashcards({
    topic: state.topic,
    count: state.flashcardCount,
    includeVisuals: state.includeVisuals,
  });
  state.currentCard = 0;
  updateFlashcardStage();
  updateFlashcardStatus("Ready");
}

function shuffleFlashcards() {
  state.flashcards.sort(() => Math.random() - 0.5);
  state.currentCard = 0;
  updateFlashcardStage();
  showToast("Flashcards shuffled.");
}

function handleExport() {
  const exportContent = {
    topic: state.topic,
    subtopic: state.subtopic,
    questions: state.questions,
    flashcards: state.flashcards,
  };
  const blob = new Blob([JSON.stringify(exportContent, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "grade7-math-content.json";
  link.click();
  URL.revokeObjectURL(url);
  showToast("Exported content as JSON.");
}

function attachControls() {
  document.getElementById("difficultyGroup").addEventListener("change", (event) => {
    state.difficulty = event.target.value;
  });

  document.getElementById("questionCount").addEventListener("change", (event) => {
    state.questionCount = Number(event.target.value);
  });

  document.getElementById("questionType").addEventListener("change", (event) => {
    state.questionType = event.target.value;
  });

  document.getElementById("flashcardCount").addEventListener("change", (event) => {
    state.flashcardCount = Number(event.target.value);
  });

  document.getElementById("visualAidToggle").addEventListener("change", (event) => {
    state.includeVisuals = event.target.checked;
  });

  document.getElementById("generateQuestions").addEventListener("click", generateQuestions);
  document.getElementById("generateFlashcards").addEventListener("click", generateFlashcards);
  document.getElementById("shuffleCards").addEventListener("click", shuffleFlashcards);
  document.getElementById("exportButton").addEventListener("click", handleExport);
  document.getElementById("printButton").addEventListener("click", () => window.print());

  document.getElementById("prevCard").addEventListener("click", () => {
    if (!state.flashcards.length) return;
    state.currentCard = (state.currentCard - 1 + state.flashcards.length) % state.flashcards.length;
    updateFlashcardStage();
  });

  document.getElementById("nextCard").addEventListener("click", () => {
    if (!state.flashcards.length) return;
    state.currentCard = (state.currentCard + 1) % state.flashcards.length;
    updateFlashcardStage();
  });

  document.getElementById("demoDataButton").addEventListener("click", () => {
    generateQuestions();
    generateFlashcards();
    showToast("Sample data loaded.");
  });
}

renderTopicTree();
updateSelectedTopic();
renderQuestions(state.questions, questionList);
renderFlashcard(null, flashcardStage);
attachControls();
