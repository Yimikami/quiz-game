const category = document.getElementById("category");
const restartButton = document.getElementById("restart-btn");
const questionContainer = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const resultContainer = document.getElementById("result-container");
const scoreElement = document.getElementById("score");
const categoryButtons = document.querySelectorAll("#category button");
const nextButton = document.getElementById("next-btn");
const quizContainer = document.getElementById("quiz-container");
const submitButton = document.getElementById("submit-btn");
const questionTitle = document.getElementById("question-title");

let shuffledQuestions, currentQuestionIndex, score;

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    category.classList.add("hide");
    quizContainer.classList.remove("hide");
    switch (button.id) {
      case "movie":
        questions = movieQuestions;
        break;
      case "music":
        questions = musicQuestions;
        break;
      case "sports":
        questions = sportsQuestions;
        break;
      case "history":
        questions = historyQuestions;
        break;
      case "science":
        questions = scienceQuestions;
        break;
      case "geography":
        questions = geographyQuestions;
        break;
      case "politics":
        questions = politicsQuestions;
        break;
    }
    startGame();
  });
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

restartButton.addEventListener("click", () => {
  category.classList.remove("hide");
  quizContainer.classList.add("hide");
  resultContainer.classList.add("hide");
  questionContainer.classList.remove("hide");
});

function startGame() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  nextButton.classList.add("hide");
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionTitle.innerText = `Question ${currentQuestionIndex + 1}`;
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";
  Array.from(answerButtonsElement.children).forEach((button) => {
    button.removeEventListener("click", selectAnswer);
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    } else {
      button.classList.add("wrong");
    }
  });
  if (correct) {
    score++;
  }
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    submitButton.classList.remove("hide");
  }
}

function showResult() {
  questionContainer.classList.add("hide");
  resultContainer.classList.remove("hide");
  submitButton.classList.add("hide");
  if (score === 10) {
    scoreElement.innerText = `Congratulations! You got a perfect score! 🎉`;
  } else if (score >= 7) {
    scoreElement.innerText = `Well done! You scored ${score} out of 10! 🎉`;
  } else if (score >= 4) {
    scoreElement.innerText = `Not bad! You scored ${score} out of 10! 👏`;
  } else {
    scoreElement.innerText = `Better luck next time! You scored ${score} out of 10! 👍`;
  }
}

const movieQuestions = [
  {
    question: "Who directed the movie 'Inception'?",
    answers: [
      { text: "Christopher Nolan", correct: true },
      { text: "Steven Spielberg", correct: false },
      { text: "James Cameron", correct: false },
      { text: "Quentin Tarantino", correct: false },
    ],
  },
  {
    question:
      "Who played the role of 'Forrest Gump' in the movie 'Forrest Gump'?",
    answers: [
      { text: "Brad Pitt", correct: false },
      { text: "Tom Hanks", correct: true },
      { text: "Leonardo DiCaprio", correct: false },
      { text: "Johnny Depp", correct: false },
    ],
  },
  {
    question: "Which movie won the Best Picture Oscar in 2020?",
    answers: [
      { text: "1917", correct: false },
      { text: "Joker", correct: false },
      { text: "Once Upon a Time in Hollywood", correct: false },
      { text: "Parasite", correct: true },
    ],
  },
  {
    question: "Who is the main character in 'The Matrix'?",
    answers: [
      { text: "Morpheus", correct: false },
      { text: "Trinity", correct: false },
      { text: "Neo", correct: true },
      { text: "Agent Smith", correct: false },
    ],
  },
  {
    question: "Which film features the song 'My Heart Will Go On'?",
    answers: [
      { text: "The Bodyguard", correct: false },
      { text: "Titanic", correct: true },
      { text: "Pretty Woman", correct: false },
      { text: "Dirty Dancing", correct: false },
    ],
  },
  {
    question:
      "Who played the role of 'Joker' in the 2008 movie 'The Dark Knight'?",
    answers: [
      { text: "Heath Ledger", correct: true },
      { text: "Joaquin Phoenix", correct: false },
      { text: "Jack Nicholson", correct: false },
      { text: "Jared Leto", correct: false },
    ],
  },
  {
    question: "In which year was 'The Godfather' released?",
    answers: [
      { text: "1974", correct: false },
      { text: "1972", correct: true },
      { text: "1976", correct: false },
      { text: "1978", correct: false },
    ],
  },
  {
    question: "What is the highest-grossing film of all time (as of 2023)?",
    answers: [
      { text: "Avatar", correct: false },
      { text: "Avengers: Endgame", correct: true },
      { text: "Titanic", correct: false },
      { text: "Star Wars: The Force Awakens", correct: false },
    ],
  },
  {
    question: "Who directed 'Pulp Fiction'?",
    answers: [
      { text: "Martin Scorsese", correct: false },
      { text: "Francis Ford Coppola", correct: false },
      { text: "Quentin Tarantino", correct: true },
      { text: "Steven Spielberg", correct: false },
    ],
  },
  {
    question: "Who directed the 'Lord of the Rings' trilogy?",
    answers: [
      { text: "Christopher Nolan", correct: false },
      { text: "Steven Spielberg", correct: false },
      { text: "Peter Jackson", correct: true },
      { text: "James Cameron", correct: false },
    ],
  },
];

const musicQuestions = [
  {
    question: "Who is known as the 'King of Pop'?",
    answers: [
      { text: "Prince", correct: false },
      { text: "Elvis Presley", correct: false },
      { text: "Madonna", correct: false },
      { text: "Michael Jackson", correct: true },
    ],
  },
  {
    question: "Which band is known for the song 'Bohemian Rhapsody'?",
    answers: [
      { text: "Queen", correct: true },
      { text: "The Beatles", correct: false },
      { text: "The Rolling Stones", correct: false },
      { text: "Led Zeppelin", correct: false },
    ],
  },
  {
    question: "Who is the lead singer of the band 'U2'?",
    answers: [
      { text: "The Edge", correct: false },
      { text: "Bono", correct: true },
      { text: "Adam Clayton", correct: false },
      { text: "Larry Mullen Jr.", correct: false },
    ],
  },
  {
    question: "Which artist released the album 'Thriller'?",
    answers: [
      { text: "Prince", correct: false },
      { text: "Michael Jackson", correct: true },
      { text: "Whitney Houston", correct: false },
      { text: "Madonna", correct: false },
    ],
  },
  {
    question: "Who is known as the 'Queen of Pop'?",
    answers: [
      { text: "Madonna", correct: true },
      { text: "Whitney Houston", correct: false },
      { text: "Celine Dion", correct: false },
      { text: "Janet Jackson", correct: false },
    ],
  },
  {
    question: "Which band released the song 'Stairway to Heaven'?",
    answers: [
      { text: "Led Zeppelin", correct: true },
      { text: "Pink Floyd", correct: false },
      { text: "The Beatles", correct: false },
      { text: "The Rolling Stones", correct: false },
    ],
  },
  {
    question: "Which artist is known for the hit song 'Shape of You'?",
    answers: [
      { text: "Bruno Mars", correct: false },
      { text: "Ed Sheeran", correct: true },
      { text: "Justin Bieber", correct: false },
      { text: "Shawn Mendes", correct: false },
    ],
  },
  {
    question: "Who is the lead vocalist of the band 'Nirvana'?",
    answers: [
      { text: "Kurt Cobain", correct: true },
      { text: "Chris Cornell", correct: false },
      { text: "Eddie Vedder", correct: false },
      { text: "Layne Staley", correct: false },
    ],
  },
  {
    question: "Which singer is known for the song 'Rolling in the Deep'?",
    answers: [
      { text: "Adele", correct: true },
      { text: "Beyoncé", correct: false },
      { text: "Taylor Swift", correct: false },
      { text: "Rihanna", correct: false },
    ],
  },
  {
    question: "Which artist is known for the hit single 'Firework'?",
    answers: [
      { text: "Lady Gaga", correct: false },
      { text: "Katy Perry", correct: true },
      { text: "Ariana Grande", correct: false },
      { text: "Britney Spears", correct: false },
    ],
  },
];

const sportsQuestions = [
  {
    question: "How many players are there in a soccer team?",
    answers: [
      { text: "10", correct: false },
      { text: "11", correct: true },
      { text: "9", correct: false },
      { text: "12", correct: false },
    ],
  },
  {
    question: "Which country won the FIFA World Cup in 2018?",
    answers: [
      { text: "Croatia", correct: false },
      { text: "Germany", correct: false },
      { text: "Brazil", correct: false },
      { text: "France", correct: true },
    ],
  },
  {
    question: "Who holds the record for the most goals in a single World Cup?",
    answers: [
      { text: "Pele", correct: false },
      { text: "Just Fontaine", correct: true },
      { text: "Miroslav Klose", correct: false },
      { text: "Ronaldo", correct: false },
    ],
  },
  {
    question: "In which sport would you perform a slam dunk?",
    answers: [
      { text: "Basketball", correct: true },
      { text: "Volleyball", correct: false },
      { text: "Tennis", correct: false },
      { text: "Soccer", correct: false },
    ],
  },
  {
    question: "Which country hosted the Summer Olympics in 2012?",
    answers: [
      { text: "China", correct: false },
      { text: "Brazil", correct: false },
      { text: "United Kingdom", correct: true },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "Who is considered the greatest basketball player of all time?",
    answers: [
      { text: "Michael Jordan", correct: true },
      { text: "LeBron James", correct: false },
      { text: "Kobe Bryant", correct: false },
      { text: "Magic Johnson", correct: false },
    ],
  },
  {
    question: "Which country won the most gold medals in the 2016 Olympics?",
    answers: [
      { text: "China", correct: false },
      { text: "Great Britain", correct: false },
      { text: "Russia", correct: false },
      { text: "United States", correct: true },
    ],
  },
  {
    question: "Who won the Wimbledon Men's Singles title in 2021?",
    answers: [
      { text: "Roger Federer", correct: false },
      { text: "Rafael Nadal", correct: false },
      { text: "Novak Djokovic", correct: true },
      { text: "Andy Murray", correct: false },
    ],
  },
  {
    question: "Which sport is known as the 'king of sports'?",
    answers: [
      { text: "Basketball", correct: false },
      { text: "Baseball", correct: false },
      { text: "Soccer", correct: true },
      { text: "Cricket", correct: false },
    ],
  },
  {
    question:
      "What is the highest score possible in a single frame of bowling?",
    answers: [
      { text: "10", correct: false },
      { text: "20", correct: false },
      { text: "30", correct: true },
      { text: "40", correct: false },
    ],
  },
];

const historyQuestions = [
  {
    question: "Who was the first President of the United States?",
    answers: [
      { text: "Thomas Jefferson", correct: false },
      { text: "John Adams", correct: false },
      { text: "Abraham Lincoln", correct: false },
      { text: "George Washington", correct: true },
    ],
  },
  {
    question:
      "Which war was fought between the North and South regions in the United States?",
    answers: [
      { text: "World War I", correct: false },
      { text: "American Revolutionary War", correct: false },
      { text: "American Civil War", correct: true },
      { text: "Vietnam War", correct: false },
    ],
  },
  {
    question: "Who discovered America?",
    answers: [
      { text: "Christopher Columbus", correct: true },
      { text: "Vasco da Gama", correct: false },
      { text: "Ferdinand Magellan", correct: false },
      { text: "James Cook", correct: false },
    ],
  },
  {
    question:
      "Which empire was known as the 'Empire on which the sun never sets'?",
    answers: [
      { text: "British Empire", correct: true },
      { text: "Roman Empire", correct: false },
      { text: "Ottoman Empire", correct: false },
      { text: "Mongol Empire", correct: false },
    ],
  },
  {
    question: "Who was the main author of the Declaration of Independence?",
    answers: [
      { text: "John Adams", correct: false },
      { text: "Benjamin Franklin", correct: false },
      { text: "Thomas Jefferson", correct: true },
      { text: "Alexander Hamilton", correct: false },
    ],
  },
  {
    question: "Which country was responsible for the Holocaust?",
    answers: [
      { text: "Italy", correct: false },
      { text: "Germany", correct: true },
      { text: "Japan", correct: false },
      { text: "Russia", correct: false },
    ],
  },
  {
    question: "Who was the leader of the Soviet Union during World War II?",
    answers: [
      { text: "Vladimir Lenin", correct: false },
      { text: "Leon Trotsky", correct: false },
      { text: "Joseph Stalin", correct: true },
      { text: "Nikita Khrushchev", correct: false },
    ],
  },
  {
    question: "Which ancient civilization built the pyramids?",
    answers: [
      { text: "Aztec", correct: false },
      { text: "Inca", correct: false },
      { text: "Maya", correct: false },
      { text: "Egyptian", correct: true },
    ],
  },
  {
    question: "Who was the first woman to fly solo across the Atlantic Ocean?",
    answers: [
      { text: "Amelia Earhart", correct: true },
      { text: "Sally Ride", correct: false },
      { text: "Bessie Coleman", correct: false },
      { text: "Harriet Quimby", correct: false },
    ],
  },
  {
    question:
      "Which country gifted the Statue of Liberty to the United States?",
    answers: [
      { text: "United Kingdom", correct: false },
      { text: "France", correct: true },
      { text: "Germany", correct: false },
      { text: "Spain", correct: false },
    ],
  },
];

const scienceQuestions = [
  {
    question: "What is the chemical symbol for water?",
    answers: [
      { text: "CO2", correct: false },
      { text: "O2", correct: false },
      { text: "NaCl", correct: false },
      { text: "H2O", correct: true },
    ],
  },
  {
    question: "What planet is known as the Red Planet?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What gas do plants absorb from the atmosphere?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: false },
      { text: "Carbon Dioxide", correct: true },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: [
      { text: "Iron", correct: false },
      { text: "Gold", correct: false },
      { text: "Diamond", correct: true },
      { text: "Platinum", correct: false },
    ],
  },
  {
    question: "Which planet is closest to the sun?",
    answers: [
      { text: "Mars", correct: false },
      { text: "Venus", correct: false },
      { text: "Earth", correct: false },
      { text: "Mercury", correct: true },
    ],
  },
  {
    question: "What is the speed of light?",
    answers: [
      { text: "300,000 km/s", correct: true },
      { text: "150,000 km/s", correct: false },
      { text: "450,000 km/s", correct: false },
      { text: "600,000 km/s", correct: false },
    ],
  },
  {
    question: "What is the powerhouse of the cell?",
    answers: [
      { text: "Nucleus", correct: false },
      { text: "Ribosome", correct: false },
      { text: "Mitochondria", correct: true },
      { text: "Golgi apparatus", correct: false },
    ],
  },
  {
    question: "What is the process by which plants make their food?",
    answers: [
      { text: "Respiration", correct: false },
      { text: "Digestion", correct: false },
      { text: "Photosynthesis", correct: true },
      { text: "Transpiration", correct: false },
    ],
  },
  {
    question: "What is the main gas found in the air we breathe?",
    answers: [
      { text: "Oxygen", correct: false },
      { text: "Nitrogen", correct: true },
      { text: "Carbon Dioxide", correct: false },
      { text: "Hydrogen", correct: false },
    ],
  },
  {
    question: "What is the largest planet in our solar system?",
    answers: [
      { text: "Saturn", correct: false },
      { text: "Uranus", correct: false },
      { text: "Neptune", correct: false },
      { text: "Jupiter", correct: true },
    ],
  },
];
const geographyQuestions = [
  {
    question: "What is the capital of Australia?",
    answers: [
      { text: "Sydney", correct: false },
      { text: "Melbourne", correct: false },
      { text: "Canberra", correct: true },
      { text: "Brisbane", correct: false },
    ],
  },
  {
    question: "Which country has the largest population?",
    answers: [
      { text: "United States", correct: false },
      { text: "India", correct: false },
      { text: "China", correct: true },
      { text: "Indonesia", correct: false },
    ],
  },
  {
    question: "Which river is the longest in the world?",
    answers: [
      { text: "Amazon River", correct: false },
      { text: "Yangtze River", correct: false },
      { text: "Mississippi River", correct: false },
      { text: "Nile River", correct: true },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
      { text: "Southern Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which continent is known as the 'Dark Continent'?",
    answers: [
      { text: "South America", correct: false },
      { text: "Australia", correct: false },
      { text: "Africa", correct: true },
      { text: "Antarctica", correct: false },
    ],
  },
  {
    question: "What is the smallest country in the world?",
    answers: [
      { text: "Monaco", correct: false },
      { text: "San Marino", correct: false },
      { text: "Vatican City", correct: true },
      { text: "Liechtenstein", correct: false },
    ],
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: [
      { text: "China", correct: false },
      { text: "South Korea", correct: false },
      { text: "Thailand", correct: false },
      { text: "Japan", correct: true },
    ],
  },
  {
    question: "Which desert is the largest in the world?",
    answers: [
      { text: "Gobi Desert", correct: false },
      { text: "Sahara Desert", correct: true },
      { text: "Kalahari Desert", correct: false },
      { text: "Arabian Desert", correct: false },
    ],
  },
  {
    question: "Which city is known as the Big Apple?",
    answers: [
      { text: "Chicago", correct: false },
      { text: "Los Angeles", correct: false },
      { text: "San Francisco", correct: false },
      { text: "New York", correct: true },
    ],
  },
  {
    question: "Which mountain is the highest in the world?",
    answers: [
      { text: "K2", correct: false },
      { text: "Kangchenjunga", correct: false },
      { text: "Lhotse", correct: false },
      { text: "Mount Everest", correct: true },
    ],
  },
];
const politicsQuestions = [
  {
    question: "Who is the current President of the United States?",
    answers: [
      { text: "Donald Trump", correct: false },
      { text: "Barack Obama", correct: false },
      { text: "George W. Bush", correct: false },
      { text: "Joe Biden", correct: true },
    ],
  },
  {
    question: "Which political party is symbolized by an elephant?",
    answers: [
      { text: "Republican Party", correct: true },
      { text: "Democratic Party", correct: false },
      { text: "Libertarian Party", correct: false },
      { text: "Green Party", correct: false },
    ],
  },
  {
    question: "Who was the first female Prime Minister of the United Kingdom?",
    answers: [
      { text: "Margaret Thatcher", correct: true },
      { text: "Theresa May", correct: false },
      { text: "Angela Merkel", correct: false },
      { text: "Indira Gandhi", correct: false },
    ],
  },
  {
    question:
      "Who was the leader of the Soviet Union during the Cuban Missile Crisis?",
    answers: [
      { text: "Nikita Khrushchev", correct: true },
      { text: "Leonid Brezhnev", correct: false },
      { text: "Joseph Stalin", correct: false },
      { text: "Mikhail Gorbachev", correct: false },
    ],
  },
  {
    question: "Which country is the largest democracy in the world?",
    answers: [
      { text: "United States", correct: false },
      { text: "Indonesia", correct: false },
      { text: "Brazil", correct: false },
      { text: "India", correct: true },
    ],
  },
  {
    question:
      "Which document is known as the supreme law of the United States?",
    answers: [
      { text: "Declaration of Independence", correct: false },
      { text: "Bill of Rights", correct: false },
      { text: "Federalist Papers", correct: false },
      { text: "Constitution", correct: true },
    ],
  },
  {
    question: "Who was the US President during World War I?",
    answers: [
      { text: "Theodore Roosevelt", correct: false },
      { text: "Woodrow Wilson", correct: true },
      { text: "Franklin D. Roosevelt", correct: false },
      { text: "Harry S. Truman", correct: false },
    ],
  },
  {
    question: "Which country has a federal system of government?",
    answers: [
      { text: "United Kingdom", correct: false },
      { text: "France", correct: false },
      { text: "China", correct: false },
      { text: "United States", correct: true },
    ],
  },
  {
    question: "Who was the primary author of the Declaration of Independence?",
    answers: [
      { text: "George Washington", correct: false },
      { text: "John Adams", correct: false },
      { text: "Benjamin Franklin", correct: false },
      { text: "Thomas Jefferson", correct: true },
    ],
  },
  {
    question: "Which country was led by Nelson Mandela?",
    answers: [
      { text: "Nigeria", correct: false },
      { text: "Kenya", correct: false },
      { text: "South Africa", correct: true },
      { text: "Zimbabwe", correct: false },
    ],
  },
];

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState === "hidden") {
    document.title = "Hey! Stop cheating 🤨";
  } else {
    document.title = "Quiz Game";
  }
});
