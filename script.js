// PERSONALIZE AQUI: altere perguntas, opções, presente e carta para combinar com vocês.
const questions = [
  {
    question: "Qual série me lembra você?",
    subtitle: "Dica: Alce e Esquilo",
    answers: ["Stranger Things", "Supernatural", "Peaky Blinders"],
    correct: 1,
    feedback: "O negócio da familia"
  },
  {
    question: "Qual filme me lembra você?",
    subtitle: "Dica: Uma casa branca",
    answers: ["Homem Aranha", "Meu Primeiro Amor", "Diário de uma Paixão"],
    correct: 2,
    feedback: "Filmaço. ❤️"
  },
  {
    question: "Qual a nossa lembrança mais especial juntos?",
    subtitle: "Dica: Você tava linda nesse dia.",
    answers: ["Apresentação - Eu Também", "Ver Mcqueen no cinema (hehe)", "Primeiro abraço"],
    correct: 0,
    feedback: "Esse dia foi sensacional. ❤️"
  },
  {
    question: "Qual música me lembra você?",
    subtitle: "Dica: ∞",
    answers: ["Infinity", "Hino do Santos", "Lisboa"],
    correct: 0,
    feedback: "Cause I love you for infinity."
  },
  {
    question: "O que eu mais admiro em você?",
    subtitle: "Dica: tudo",
    answers: ["Tudo", "Primeira Alternativa", "Primeira Alternativa"],
    correct: 0,
    feedback: "Acertou. Agora vem a surpresa! ❤️"
  }
];

const screens = [...document.querySelectorAll(".screen")];
const startBtn = document.getElementById("startBtn");
const answersEl = document.getElementById("answers");
const questionCount = document.getElementById("questionCount");
const questionTitle = document.getElementById("quiz-title");
const questionSub = document.getElementById("questionSub");
const feedback = document.getElementById("feedback");
const nextQuestion = document.getElementById("nextQuestion");
const progressFill = document.getElementById("progressFill");
const scoreDisplay = document.getElementById("scoreDisplay");
const scratchCard = document.getElementById("scratchCard");
const scratchHint = document.getElementById("scratchHint");
const toLetter = document.getElementById("toLetter");
const finalBtn = document.getElementById("finalBtn");
const finalNote = document.getElementById("finalNote");
const toast = document.getElementById("toast");
let currentQuestion = 0;
let selectedCount = 0;
let score = 0;
let toastTimer;

function showScreen(id) {
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}

function renderQuestion() {
  const q = questions[currentQuestion];
  questionCount.textContent = `PERGUNTA ${String(currentQuestion + 1).padStart(2, "0")} DE ${String(questions.length).padStart(2, "0")}`;
  questionTitle.textContent = q.question;
  questionSub.textContent = q.subtitle;
  progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  feedback.textContent = "";
  nextQuestion.classList.add("hidden");
  nextQuestion.innerHTML = currentQuestion === questions.length - 1
    ? 'Ver minha surpresa <span>→</span>'
    : 'Próxima pergunta <span>→</span>';
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => {
      if (answersEl.dataset.locked === "true") return;
      answersEl.dataset.locked = "true";
      [...answersEl.children].forEach((child, i) => {
        child.disabled = true;
        if (i === index) child.classList.add("chosen");
      });
      selectedCount++;
      if (index === q.correct) {
        score++;
        feedback.textContent = `+1 ponto! ${q.feedback}`;
      } else {
        feedback.textContent = "Alternativa errada. Você não ganhou um ponto.";
      }
      scoreDisplay.textContent = `PONTUAÇÃO: ${score} / ${questions.length}`;
      if (currentQuestion === questions.length - 1) {
        nextQuestion.innerHTML = score === questions.length
          ? 'Desbloquear minha surpresa <span>→</span>'
          : 'Tentar novamente <span>↻</span>';
      }
      nextQuestion.classList.remove("hidden");
    });
    answersEl.appendChild(button);
  });
  answersEl.dataset.locked = "false";
}

startBtn.addEventListener("click", () => {
  currentQuestion = 0;
  selectedCount = 0;
  score = 0;
  renderQuestion();
  showScreen("quiz");
});

nextQuestion.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else if (score === questions.length) {
    showScreen("recompensa");
    burstHearts(18);
  } else {
    showToast(`Você fez ${score}/${questions.length} pontos. Tente novamente para liberar a cartinha! ❤️`);
    currentQuestion = 0;
    selectedCount = 0;
    score = 0;
    renderQuestion();
  }
});

scratchCard.addEventListener("click", () => {
  if (scratchCard.classList.contains("revealed")) return;
  scratchCard.classList.add("revealed");
  scratchHint.textContent = "Presente revelado! Espero que você goste. ❤️";
  toLetter.classList.remove("hidden");
  burstHearts(24);
});

toLetter.addEventListener("click", () => showScreen("carta"));

finalBtn.addEventListener("click", () => {
  finalNote.classList.remove("hidden");
  finalBtn.innerHTML = 'Momento guardado <span>♥</span>';
  finalBtn.disabled = true;
  finalBtn.style.opacity = ".7";
  burstHearts(35);
});

function burstHearts(amount) {
  const layer = document.getElementById("confettiLayer");
  const symbols = ["♥", "✦", "✧", "•"];
  for (let i = 0; i < amount; i++) {
    const item = document.createElement("span");
    item.className = "confetti";
    item.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    item.style.left = `${Math.random() * 100}%`;
    item.style.animationDuration = `${2.4 + Math.random() * 2.8}s`;
    item.style.animationDelay = `${Math.random() * .6}s`;
    item.style.fontSize = `${10 + Math.random() * 16}px`;
    item.style.opacity = `${.45 + Math.random() * .55}`;
    layer.appendChild(item);
    setTimeout(() => item.remove(), 6000);
  }
}

// A página já está pronta para abrir; edite os textos no HTML e as perguntas acima.
