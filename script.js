"use strict";

/*
 * FMP Radiology Challenge
 * Static HTML/CSS/JavaScript application.
 *
 * Before launch:
 * 1. Confirm the Q6 and Q7 wording / answer keys.
 * 2. Confirm Q8's answer key against the real radiograph.
 * 3. Add the real registration-form URL.
 * 4. Configure PostHog analytics in index.html.
 */

const REGISTRATION_URL = "";
const Q8_KEY_CONFIRMED = false;
const QUIZ_VERSION = "1.0.0";

const questions = [
  {
    id: "Q1",
    category: "ANATOMIE",
    type: "choice",
    image: "images/image1.jpg",
    imageLabel: "IMAGE 01",
    imageAlt: "Radiographie annotée pour le repérage d'une structure anatomique",
    title: "Le numéro 11 correspond à quelle structure ?",
    prompt: "",
    choices: [
      { letter: "A", text: "Auricule gauche" },
      { letter: "B", text: "Atrium gauche" },
      { letter: "C", text: "Trachée" },
      { letter: "D", text: "Hile pulmonaire gauche" },
      { letter: "E", text: "Aorte descendante" },
      { letter: "F", text: "Artère pulmonaire gauche" },
      { letter: "G", text: "Thymus" },
      { letter: "H", text: "Veine pulmonaire gauche" }
    ],
    correctAnswer: "F"
  },

  {
    id: "Q2",
    category: "ANATOMIE",
    type: "numeric",
    image: "images/image2.jpg",
    imageLabel: "IMAGE 02",
    imageAlt: "Radiographie annotée pour repérer l'atrium gauche",
    title: "Quel est le numéro de l'atrium gauche ?",
    prompt: "Saisissez uniquement le numéro correspondant à cette structure.",
    correctAnswer: "7"
  },

  {
    id: "Q3",
    category: "SÉMIOLOGIE",
    type: "choice",
    image: "images/image3.jpg",
    imageLabel: "IMAGE 03",
    imageAlt: "Radiographie thoracique de face",
    title: "Sans tenir compte du contexte clinique, quelle est la principale anomalie radiologique visible sur ce cliché ?",
    prompt: "Un patient se présente aux urgences ! Vous analysez sa radiographie thoracique de face.",
    choices: [
      { letter: "A", text: "Une opacité nodulaire se projetant sur le hile pulmonaire gauche." },
      { letter: "B", text: "Une accentuation pathologique de la trame interstitielle au niveau de l'apex droit." },
      { letter: "C", text: "Une opacité alvéolaire masquant une structure anatomique à la base droite." },
      { letter: "D", text: "Un émoussement du cul-de-sac costo-diaphragmatique gauche témoignant d'un épanchement." },
      { letter: "E", text: "Une opacité nodulaire se projetant sur le hile pulmonaire droit." }
    ],
    correctAnswer: "C"
  },

  {
    id: "Q4",
    category: "LOCALISATION",
    type: "choice",
    image: "images/image3.jpg",
    imageLabel: "IMAGE 03 · MÊME CLICHÉ",
    imageAlt: "Même radiographie thoracique que pour la question précédente",
    title: "Dans quel lobe pulmonaire se situe cette opacité ?",
    prompt: "En utilisant exclusivement les signes sémiologiques visibles sur ce seul cliché de face :",
    choices: [
      {
        letter: "A",
        text: "Dans le lobe moyen droit, car l'opacité se projette en regard de la région cardio-phrénique."
      },
      {
        letter: "B",
        text: "Dans le lobe inférieur droit, car l'opacité efface la coupole diaphragmatique mais respecte l'arc inférieur droit du cœur."
      },
      {
        letter: "C",
        text: "Dans le lobe moyen droit, car l'opacité efface le bord droit de la silhouette cardiaque."
      },
      {
        letter: "D",
        text: "Il est strictement impossible de différencier une atteinte du lobe moyen d'une atteinte du lobe inférieur sans un cliché de profil."
      }
    ],
    correctAnswer: "B"
  },

  {
    id: "Q5",
    category: "RECONNAISSANCE DE PATTERNS",
    type: "choice",
    image: "images/image4.jpg",
    imageLabel: "IMAGE 04",
    imageAlt: "Radiographie thoracique illustrant un aspect en lâcher de ballons",
    title: "Quelle métaphore classique décrit cet aspect diffus et redouté ?",
    prompt: "Face à cette présentation radiologique foudroyante, quelle métaphore classique est utilisée par les radiologues pour décrire cet aspect ?",
    choices: [
      { letter: "A", text: "Un aspect en « graines de mil » (ou miliaire)." },
      { letter: "B", text: "Un aspect en « ailes de papillon » (ou chauve-souris)." },
      { letter: "C", text: "Un aspect en « lâcher de ballons »." },
      { letter: "D", text: "Un aspect en « verre dépoli »." },
      { letter: "E", text: "Un aspect en « nid d'abeilles »." }
    ],
    correctAnswer: "C"
  },

  {
    id: "Q6",
    category: "ÉTIOLOGIE",
    type: "choice",
    image: "images/image4.jpg",
    imageLabel: "IMAGE 04 · MÊME CAS",
    imageAlt: "Même radiographie thoracique que pour la question précédente",
    title: "Quelle est l'étiologie la plus probable de cette image ?",
    prompt: "Derrière ce terme poétique se cache en réalité une urgence diagnostique au pronostic souvent très sombre. Quelle est l'étiologie (la cause) presque exclusive de cette image terrifiante ?",
    choices: [
      { letter: "A", text: "Une tuberculose pulmonaire hématogène disséminée." },
      { letter: "B", text: "Un œdème aigu du poumon (OAP) massif cardiogénique." },
      { letter: "C", text: "Une métastase pulmonaire diffuse issue d'un cancer solide très vascularisé (ex. : rein, testicule)." },
      { letter: "D", text: "Une fibrose pulmonaire idiopathique en phase terminale." },
      { letter: "E", text: "Une pneumonie virale atypique sévère (SDRA)." }
    ],
    correctAnswer: "C"
  },

  {
    id: "Q7",
    category: "RAISONNEMENT CLINIQUE",
    type: "choice",
    image: "images/image5.jpg",
    imageLabel: "IMAGE 05 · INSPIRATION",
    imageAlt: "Radiographie thoracique de face en inspiration chez un enfant",
    title: "Quel examen complémentaire permet de confirmer le diagnostic et de préciser la localisation du corps étranger ?",
    prompt: "Un enfant est admis aux urgences après un syndrome de pénétration, marqué par un accès brutal de suffocation d'installation soudaine.\n\nLa radiographie thoracique de face en inspiration montre une hyperclarté pulmonaire gauche par rapport au côté droit, faisant suspecter un piégeage aérien secondaire à un corps étranger bronchique.",
    choices: [
      { letter: "A", text: "Radiographie thoracique en expiration." },
      { letter: "B", text: "Scanner thoracique systématique en première intention." },
      { letter: "C", text: "Fibroscopie bronchique." },
      { letter: "D", text: "Échographie thoracique." },
      { letter: "E", text: "Radiographie thoracique en inspiration profonde." }
    ],
    correctAnswer: "A"
  },

  {
    id: "Q8",
    category: "RAISONNEMENT CLINIQUE",
    type: "choice",
    image: "images/image5.jpg",
    imageLabel: "IMAGE 05 · EXPIRATION",
    imageAlt: "Radiographie thoracique complémentaire en expiration",
    title: "Quel est le diagnostic le plus probable ?",
    prompt: "Une radiographie complémentaire de face en expiration est réalisée.",
    choices: [
      { letter: "A", text: "Atélectasie obstructive du poumon gauche par corps étranger bronchique." },
      { letter: "B", text: "Emphysème obstructif du poumon gauche secondaire à un corps étranger bronchique de la bronche principale gauche." },
      { letter: "C", text: "Pneumothorax compressif gauche." },
      { letter: "D", text: "Hyperinflation pulmonaire bilatérale secondaire à une bronchiolite aiguë." },
      { letter: "E", text: "Épanchement pleural gauche compressif." }
    ],
    correctAnswer: "B",
    provisional: true
  }
];

/* DOM elements */

const welcomeScreen = document.getElementById("welcomeScreen");
const quizScreen = document.getElementById("quizScreen");
const resultsScreen = document.getElementById("resultsScreen");

const startButton = document.getElementById("startButton");
const previousButton = document.getElementById("previousButton");
const nextButton = document.getElementById("nextButton");
const restartButton = document.getElementById("restartButton");

const questionHeading = document.getElementById("questionHeading");
const questionNumber = document.getElementById("questionNumber");
const progressTrack = document.getElementById("progressTrack");
const progressBar = document.getElementById("progressBar");

const questionImage = document.getElementById("questionImage");
const imageFallback = document.getElementById("imageFallback");
const imageTag = document.getElementById("imageTag");
const questionCategory = document.getElementById("questionCategory");
const questionType = document.getElementById("questionType");
const questionTitle = document.getElementById("questionTitle");
const questionPrompt = document.getElementById("questionPrompt");
const answerArea = document.getElementById("answerArea");
const answerError = document.getElementById("answerError");

const scoreValue = document.getElementById("scoreValue");
const scoreBar = document.getElementById("scoreBar");
const scorePercent = document.getElementById("scorePercent");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const reviewSummary = document.getElementById("reviewSummary");
const reviewList = document.getElementById("reviewList");
const registrationLink = document.getElementById("registrationLink");

/* State */

let questionIndex = 0;
let selectedAnswers = [];
let viewedQuestions = new Set();
let attemptId = "";
let attemptStartTime = 0;
let quizCompleted = false;

/* Analytics.
   These events are sent only after the PostHog SDK is configured.
   We do not collect names, emails, or other direct identifiers.
*/

function trackEvent(eventName, properties = {}) {
  try {
    if (window.posthog && typeof window.posthog.capture === "function") {
      window.posthog.capture(eventName, {
        ...properties,
        quiz_version: QUIZ_VERSION
      });
    }
  } catch (error) {
    // Analytics must never prevent the quiz from working.
    console.warn("Analytics event could not be sent:", eventName);
  }
}

function createAttemptId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }

  return "attempt-" + Date.now() + "-" + Math.random().toString(36).slice(2, 10);
}

function showScreen(screenToShow) {
  [welcomeScreen, quizScreen, resultsScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* Start / restart */

function startQuiz() {
  questionIndex = 0;
  selectedAnswers = Array(questions.length).fill(null);
  viewedQuestions = new Set();
  attemptId = createAttemptId();
  attemptStartTime = Date.now();
  quizCompleted = false;

  trackEvent("quiz_started", {
    attempt_id: attemptId,
    question_count: questions.length
  });

  showScreen(quizScreen);
  renderQuestion();
}

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", startQuiz);

/* Render question */

function renderQuestion() {
  const question = questions[questionIndex];
  const displayNumber = questionIndex + 1;

  questionHeading.textContent = "Analysez le cliché.";
  questionNumber.textContent = String(displayNumber).padStart(2, "0");

  progressBar.style.width = `${(displayNumber / questions.length) * 100}%`;
  progressTrack.setAttribute("aria-valuenow", String(displayNumber));

  imageTag.textContent = question.imageLabel;
  questionImage.alt = question.imageAlt;
  questionImage.hidden = false;
  imageFallback.hidden = true;
  questionImage.src = question.image;

  questionCategory.textContent = question.category;
  questionType.textContent = question.type === "numeric"
    ? "SAISIE NUMÉRIQUE"
    : "QCM À RÉPONSE UNIQUE";

  questionTitle.textContent = question.title;
  questionPrompt.textContent = question.prompt;
  questionPrompt.hidden = !question.prompt;

  answerError.hidden = true;
  answerArea.replaceChildren();

  if (question.type === "numeric") {
    renderNumericAnswer(question);
  } else {
    renderChoices(question);
  }

  previousButton.disabled = questionIndex === 0;

  nextButton.innerHTML = questionIndex === questions.length - 1
    ? 'Voir mes résultats <span class="button-arrow" aria-hidden="true">→</span>'
    : 'Suivant <span class="button-arrow" aria-hidden="true">→</span>';

  // Capture first arrival at each question in the current attempt.
  if (!viewedQuestions.has(question.id)) {
    viewedQuestions.add(question.id);

    trackEvent("question_viewed", {
      attempt_id: attemptId,
      question_id: question.id,
      question_number: displayNumber
    });
  }
}

questionImage.addEventListener("error", () => {
  questionImage.hidden = true;
  imageFallback.hidden = false;
});

function renderChoices(question) {
  question.choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.setAttribute("aria-pressed", String(selectedAnswers[questionIndex] === choice.letter));

    const letter = document.createElement("span");
    letter.className = "option-letter";
    letter.textContent = choice.letter;

    const text = document.createElement("span");
    text.textContent = choice.text;

    button.append(letter, text);

    button.addEventListener("click", () => {
      selectedAnswers[questionIndex] = choice.letter;

      answerArea.querySelectorAll(".answer-option").forEach((option) => {
        option.setAttribute("aria-pressed", "false");
      });

      button.setAttribute("aria-pressed", "true");
      answerError.hidden = true;
    });

    answerArea.appendChild(button);
  });
}

function renderNumericAnswer(question) {
  const input = document.createElement("input");
  input.className = "numeric-answer";
  input.type = "number";
  input.inputMode = "numeric";
  input.step = "1";
  input.autocomplete = "off";
  input.placeholder = "Votre réponse";
  input.setAttribute("aria-label", "Numéro de l'atrium gauche");

  const existingAnswer = selectedAnswers[questionIndex];

  if (existingAnswer !== null && existingAnswer !== undefined) {
    input.value = existingAnswer;
  }

  input.addEventListener("input", () => {
    selectedAnswers[questionIndex] = input.value.trim();
    answerError.hidden = true;
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      advanceQuestion();
    }
  });

  const hint = document.createElement("p");
  hint.className = "numeric-hint";
  hint.textContent = "Entrez le numéro uniquement.";

  answerArea.append(input, hint);
}

/* Navigation and validation */

function currentAnswerIsValid() {
  const answer = selectedAnswers[questionIndex];

  return answer !== null
    && answer !== undefined
    && String(answer).trim() !== "";
}

function advanceQuestion() {
  if (!currentAnswerIsValid()) {
    answerError.hidden = false;

    if (questions[questionIndex].type === "numeric") {
      answerError.textContent = "Saisissez un numéro avant de continuer.";
    } else {
      answerError.textContent = "Choisissez une réponse avant de continuer.";
    }

    return;
  }

  answerError.hidden = true;

  if (questionIndex < questions.length - 1) {
    questionIndex += 1;
    renderQuestion();
  } else {
    finishQuiz();
  }
}

nextButton.addEventListener("click", advanceQuestion);

previousButton.addEventListener("click", () => {
  if (questionIndex > 0) {
    questionIndex -= 1;
    renderQuestion();
  }
});

/* Scoring */

function isCorrect(question, answer) {
  return String(answer).trim().toUpperCase()
    === String(question.correctAnswer).trim().toUpperCase();
}

function readableAnswer(question, answer) {
  if (answer === null || answer === undefined || String(answer).trim() === "") {
    return "Sans réponse";
  }

  if (question.type === "numeric") {
    return String(answer);
  }

  const selectedChoice = question.choices.find((choice) => choice.letter === answer);

  return selectedChoice
    ? `${selectedChoice.letter} — ${selectedChoice.text}`
    : String(answer);
}

function getResultFeedback(score) {
  if (score <= 3) {
    return {
      title: "Des bases à consolider.",
      message: "Ce résultat suggère que plusieurs repères anatomiques ou sémiologiques méritent d'être retravaillés. Une méthode systématique et des cas pratiques peuvent vous aider à progresser."
    };
  }

  if (score <= 5) {
    return {
      title: "Un socle en construction.",
      message: "Vous reconnaissez certains éléments, mais des difficultés persistent sur plusieurs items. Continuez à travailler l'observation, la localisation et la démarche de raisonnement."
    };
  }

  if (score <= 7) {
    return {
      title: "Un bon début, à affiner.",
      message: "Vous avez de bons repères sur ce mini-test. La pratique guidée permet de renforcer les automatismes et de gagner en rigueur devant des clichés variés."
    };
  }

  return {
    title: "Un très bon résultat.",
    message: "Vous avez réussi les huit items de ce mini-test. Continuez à confronter vos interprétations à des cas variés et à une démarche radiologique rigoureuse."
  };
}

function finishQuiz() {
  if (quizCompleted) return;

  quizCompleted = true;

  let score = 0;

  questions.forEach((question, index) => {
    if (isCorrect(question, selectedAnswers[index])) {
      score += 1;
    }
  });

  const durationSeconds = Math.max(
    0,
    Math.round((Date.now() - attemptStartTime) / 1000)
  );

  trackEvent("quiz_completed", {
    attempt_id: attemptId,
    score: score,
    max_score: questions.length,
    score_percent: Math.round((score / questions.length) * 100),
    duration_seconds: durationSeconds,
    q8_key_confirmed: Q8_KEY_CONFIRMED
  });

  // Answer details are sent only on completion.
  questions.forEach((question, index) => {
    trackEvent("question_answered", {
      attempt_id: attemptId,
      question_id: question.id,
      question_number: index + 1,
      selected_answer: String(selectedAnswers[index]),
      is_correct: isCorrect(question, selectedAnswers[index]),
      answer_key_provisional: Boolean(question.provisional && !Q8_KEY_CONFIRMED)
    });
  });

  renderResults(score);
  showScreen(resultsScreen);
}

function renderResults(score) {
  const percentage = Math.round((score / questions.length) * 100);
  const feedback = getResultFeedback(score);

  scoreValue.textContent = String(score);
  scorePercent.textContent = `${percentage} % de bonnes réponses`;
  resultTitle.textContent = feedback.title;
  resultMessage.textContent = feedback.message;
  reviewSummary.textContent = `${score}/${questions.length} bonnes réponses`;

  // Let the results screen render before animating the score bar.
  scoreBar.style.width = "0%";
  requestAnimationFrame(() => {
    scoreBar.style.width = `${percentage}%`;
  });

  reviewList.replaceChildren();

  questions.forEach((question, index) => {
    const answer = selectedAnswers[index];
    const correct = isCorrect(question, answer);

    const item = document.createElement("article");
    item.className = "review-item";

    const status = document.createElement("span");
    status.className = `review-status ${correct ? "correct" : "incorrect"}`;
    status.textContent = correct ? "✓" : "×";
    status.setAttribute("aria-label", correct ? "Bonne réponse" : "Réponse incorrecte");

    const content = document.createElement("div");
    content.className = "review-content";

    const title = document.createElement("strong");
    title.textContent = `${question.id} · ${question.title}`;

    const yourAnswer = document.createElement("p");
    yourAnswer.textContent = `Votre réponse : ${readableAnswer(question, answer)}`;

    const correctAnswer = document.createElement("p");
    correctAnswer.className = "review-correct-answer";
    correctAnswer.textContent = `Réponse attendue : ${readableAnswer(question, question.correctAnswer)}`;

    content.append(title, yourAnswer, correctAnswer);

    if (question.provisional && !Q8_KEY_CONFIRMED) {
      const note = document.createElement("span");
      note.className = "review-provisional";
      note.textContent = "Correction provisoire — à valider avant diffusion";
      content.appendChild(note);
    }

    item.append(status, content);
    reviewList.appendChild(item);
  });

  if (
    REGISTRATION_URL
    && /^https?:\/\//i.test(REGISTRATION_URL)
    && !REGISTRATION_URL.includes("REPLACE_WITH")
  ) {
    registrationLink.href = REGISTRATION_URL;
    registrationLink.hidden = false;
  } else {
    registrationLink.hidden = true;
  }
}
