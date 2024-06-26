const category = document.getElementById("category");
const startButton = document.getElementById("start-btn");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const categoryButtons = document.getElementById("categories");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-btn");
const questionTitle = document.getElementById("question-title");
const intro = document.getElementById("intro");
const difficultyDiv = document.getElementById("difficulty");
const difficultyButtons = document
  .getElementById("difficulty")
  .querySelectorAll("button");
const showResultButton = document.getElementById("submit-btn");
const accessibility = document.getElementById("accessibility");

let currentQuestionIndex, score, difficulty, categoryName, questions;

// Accessibility feature to change font-family to 'Oswald'. Source (https://stackoverflow.com/a/28930990)
accessibility.addEventListener("change", function () {
  if (accessibility.checked) {
    // Create the <style> tag
    let style = document.createElement("style");
    // WebKit hack
    style.appendChild(document.createTextNode(""));
    // Add the <style> element to the page
    document.head.appendChild(style);
    // insert the rule
    style.sheet.insertRule("* { font-family: 'Oswald', cursive !important; }");
  } else {
    // Remove the <style> element from the page
    document.head.removeChild(document.head.lastChild);
  }
});

startButton.addEventListener("click", async () => {
  category.classList.remove("hide");
  difficultyDiv.classList.remove("hide");
  intro.classList.add("hide");
  await fetchCategories().then((categories) => setCategories(categories));
});

difficultyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    difficulty = button.id;
    difficultyButtons.forEach((btn) => {
      btn.classList.remove("selected");
    });
    button.classList.add("selected");
  });
});

async function fetchCategories() {
  const response = await fetch("https://opentdb.com/api_category.php");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.trivia_categories;
}

function setCategories(categories) {
  categories.forEach((category) => {
    const button = document.createElement("button");
    button.innerText = category.name;
    button.classList.add("btn");
    button.id = category.id;
    categoryButtons.appendChild(button);
  });
}

async function fetchQuestions(category, difficulty) {
  const response = await fetch(
    `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.results;
}

categoryButtons.addEventListener("click", async (e) => {
  if (!difficulty) {
    alert("Please select a difficulty level!");
    return;
  }
  if (e.target.tagName === "BUTTON") {
    category.classList.add("hide");
    difficultyDiv.classList.add("hide");
    quizContainer.classList.remove("hide");
    categoryName = e.target.innerText;
    questions = await fetchQuestions(e.target.id, difficulty);
    // If no questions are found for the selected category and difficulty, reset the quiz
    if (questions.length === 0) {
      alert("No questions found for this category and difficulty!");
      resetQuiz();
      return;
    }
    startGame();
  }
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

// i've converted addEventListener to a function so that i can use it in 'no questions found' scenario
function resetQuiz() {
  category.classList.remove("hide");
  difficultyDiv.classList.remove("hide");
  quizContainer.classList.add("hide");
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
  difficultyButtons.forEach((button) => {
    button.classList.remove("selected");
  });
  difficulty = null;
}

restartButton.addEventListener("click", resetQuiz);

async function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  showQuestion(questions[currentQuestionIndex]);
}

// Function to decode HTML entities (e.g. &quot; to ") (source: https://stackoverflow.com/a/34064434)
function htmlDecode(input) {
  var doc = new DOMParser().parseFromString(input, "text/html");
  return doc.documentElement.textContent;
}

function showQuestion(question) {
  questionTitle.innerText = `Question ${currentQuestionIndex + 1}`;
  questionElement.innerText = htmlDecode(question.question);
  let answers = question.incorrect_answers;
  answers.push(question.correct_answer);
  answers = answers.sort(() => Math.random() - 0.5);
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = htmlDecode(answer);
    button.classList.add("btn");
    if (answer === question.correct_answer) {
      button.dataset.correct = true;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  selectedButton.classList.add("selected-answer");
  const correct = selectedButton.dataset.correct === "true";
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.removeEventListener("click", selectAnswer);
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
      button.innerHTML += " ✔️";
    } else {
      button.classList.add("wrong");
      button.innerHTML += " ✖️";
    }
  });
  if (correct) {
    score++;
  }
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    submitButton.classList.remove("hide");
  }
}

showResultButton.addEventListener("click", function () {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  submitButton.classList.add("hide");
  if (score === 10) {
    scoreElement.innerText = `Congratulations! You got a perfect score on ${categoryName} at ${difficulty} level! 🎉`;
  } else if (score >= 7) {
    scoreElement.innerText = `Well done! You scored ${score} out of 10 on ${categoryName} at ${difficulty} level! 🎉`;
  } else if (score >= 4) {
    scoreElement.innerText = `Not bad! You scored ${score} out of 10 on ${categoryName} at ${difficulty} level! 👏`;
  } else {
    scoreElement.innerText = `Better luck next time! You scored ${score} out of 10 on ${categoryName} at ${difficulty} level! 👍`;
  }
});

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    document.title = "Hey! Stop cheating 🤨";
  } else {
    document.title = "Quiz Game";
  }
});
