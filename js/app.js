/* ========================
 ! - Important DOM Elements
 ==========================*/
const rulesOpenBtn = document.getElementById("condition-rules-btn");
const rulesContainer = document.querySelector(".quiz-rules-container");
const rulesConditionBox = rulesContainer.querySelector(".quiz-rules-condition");
const exitrules = rulesConditionBox.querySelector(".exit-rules");
const startQuizBtn = rulesConditionBox.querySelector(".start-quiz");
const questionSection = document.querySelector(".question-section");
const questionText = questionSection.querySelector(".question-text");
const questionOptionContainer =
  questionSection.querySelector(".question-options");
const questionProgressText = questionSection.querySelector(
  ".question-progress-text"
);
const timeText = questionSection.querySelector(".time-count");
const nextQuiz = questionSection.querySelector(".next-question");
const scoreElement = questionSection.querySelector(".score");
const timelineElement = questionSection.querySelector(".timeline");
const questionProgressbar = questionSection.querySelector(".question-progress");
const resultSection = document.querySelector(".result-section");
const resultExpression = resultSection.querySelector(".result-expression");
const resultText = resultSection.querySelector(".result-text");
const resultFeedback = resultSection.querySelector(".feedback");
const restart = resultSection.querySelector(".restart");
const backHome = resultSection.querySelector(".back-to-home");
const loadingContainer = document.querySelector(".loading-container");

/* =====================
 ! - Important Variables - *
 =======================*/
 
let questionIndex = 0;
let timeCount;
let userScore = 0;
let counter;
let timelineCounter;

/* ===================
 ! - Important Elements - *
 =====================*/

// tick icon
const tick = document.createElement("div");
tick.classList.add("tick-icon");
tick.innerHTML = `<i class="fa-solid fa-check"></i>`;

// cross icon
const cross = document.createElement("div");
cross.classList.add("cross-icon");
cross.innerHTML = `<i class="fa-solid fa-xmark"></i>`;

/* ========================
 ! - Important Functions - *
 ==========================*/

/*
 ! - rules Open/Close Fuction - *
 */

const rulesFunc = (condition) => {
  if (condition === "open") {
    rulesConditionBox.classList.add("active");
    document.body.style.overflow = "hidden";
    rulesContainer.classList.add("active");
  } else {
    rulesConditionBox.classList.remove("active");
    document.body.style.overflow = "auto";
    rulesContainer.classList.remove("active");
  }
};

/*
! - Initial show Function
 */

const initialShowQuestion = () => {
  resultSection.classList.remove("active");
  questionIndex = 0;
  userScore = 0;
  scoreElement.textContent = userScore;
};

/*
 ! - Show Question Function - *
 */

const showQuestion = () => {
  questionSection.classList.add("active");
  timer();
  timelineFunc();
  if (document.querySelectorAll(".single-option")) {
    document
      .querySelectorAll(".single-option")
      .forEach((element) => element.remove());
  }
  questionText.textContent = `${questionIndex + 1}. ${
    quizArr[questionIndex].question
  }`;

  const options = quizArr[questionIndex].options;
  for (let option in options) {
    let singleQuestionElement = document.createElement("div");
    singleQuestionElement.classList.add("single-option");
    singleQuestionElement.innerHTML = `
    <span class="single-option-text"> ${option}.  ${options[option]}</span>`;
    singleQuestionElement.addEventListener("click", (e) =>
      selectedAnswer(option, e)
    );
    questionOptionContainer.append(singleQuestionElement);
  }
  questionProgress();
  nextQuiz.style.display = "none";
};

/*
 ! - Timeline Fuction - *
 */

const timelineFunc = () => {
  timelineElement.style.width = `100%`;
  timeText.textContent = 10;
  timelineCounter = setInterval(() => {
    const getTime = Number(timeText.textContent);
    timelineElement.style.width = `${getTime * 10}%`;
  }, 1000);
};

const selectedAnswer = (option, e) => {
  clearInterval(counter);
  clearInterval(timelineCounter);
  const selectedOption = option;
  const correctOption = quizArr[questionIndex].answer;
  if (selectedOption === correctOption) {
    userScore += 5;
    scoreElement.textContent = userScore;
    showIconTick(e, true);
  } else {
    showIconTick(e, false);
    showCorrectAnswer();
  }
  const singleOption = document.querySelectorAll(".single-option");
  singleOption.forEach((element) => element.classList.add("disabled"));
  nextQuizBtnChange();
};

/*
! - Show Icon Tick Function
*/

const showIconTick = (e, isTick) => {
  if (e.target.classList.contains("single-option")) {
    e.target.children[0].insertAdjacentElement(
      "afterend",
      isTick === true ? tick : cross
    );
    e.target.classList.add(isTick === true ? "correct" : "incorrect");
  } else {
    e.target.insertAdjacentElement("afterend", isTick === true ? tick : cross);
    e.target.parentNode.classList.add(
      isTick === true ? "correct" : "incorrect"
    );
  }
};

/*
! - Show Correct Answer Function
*/
const showCorrectAnswer = () => {
  const singleOption = document.getElementsByClassName("single-option");
  const correctOption = quizArr[questionIndex].answer;
  for (let option of singleOption) {
    if (option.textContent.trim().slice(0, 1) == correctOption) {
      option.children[0].insertAdjacentElement("afterend", tick);
      option.classList.add("correct");
    }
    option.classList.add("disabled");
  }
};

/*
! -  Question Progress Function
*/

const questionProgress = () => {
  questionProgressbar.style.width = `${
    ((questionIndex + 1) / quizArr.length) * 100
  }%`;
  questionProgressText.innerHTML = `<span class="bold">${
    questionIndex + 1
  } </span> of  <span class="bold">${quizArr.length}</span> Questions`;
};

/*
! - Timer Function
*/
const timer = () => {
  timeCount = 10;
  timeText.textContent = timeCount;
  counter = setInterval(() => {
    timeCount--;
    timeText.textContent = timeCount;
    if (timeCount == 0) {
      timeText.textContent = "0" + timeCount;
      timelineElement.style.width = `0%`;
      clearInterval(counter);
      clearInterval(timelineCounter);
      showCorrectAnswer();
      nextQuizBtnChange();
    } else {
      timeText.textContent = "0" + timeCount;
    }
  }, 1000);
};

/*
! - Next Quiz Button Change function
*/

const nextQuizBtnChange = () => {
  nextQuiz.style.display = "block";
  if (questionIndex === quizArr.length - 1) {
    nextQuiz.textContent = "Show Result";
  } else {
    nextQuiz.textContent = "Next Question";
  }
};

/*
! - Show Result Function
*/

const showResult = () => {
  questionSection.classList.remove("active");
  resultSection.classList.add("active");
  resultText.textContent = `You scored ${userScore} points`;
  scoreFeedback(userScore);
};

/*
! - Score Feedback Function
*/

const scoreFeedback = (userScore) => {
  if (userScore >= 80 && userScore <= 100) {
    resultFeedback.textContent = `You are an expert in JavaScript, well done on your outstanding performance. Keep up the good work and continue to showcase your skills.`;
  } else if (userScore >= 60 && userScore < 80) {
    resultFeedback.textContent = `You have a solid understanding of JavaScript, keep working to improve your skills and understanding. Your performance is good, but with additional practice and focus, you can excel in this subject. `;
  } else if (userScore >= 40 && userScore < 60) {
    resultFeedback.textContent = `You have a fair understanding of JavaScript, but there is room for improvement. It's important to continue practicing and reviewing the material to solidify your understanding and skills. I suggest seeking additional resources and assistance to help you improve in this subject.`;
  } else {
    confetti.clear();
    resultExpression.textContent = `Needs Improvement!!!`;
    resultFeedback.textContent = `The result of this quiz is not satisfactory, it's clear that you have a limited understanding of JavaScript. It's important to put in extra effort and seek assistance to improve your understanding and skills in this subject. I suggest reviewing the material and practicing regularly in order to improve your performance.`;
  }
};


/* ==========================
! - Event Listeners
============================*/

// rules Open Button Event listener
rulesOpenBtn.addEventListener("click", () => {
  rulesFunc("open");
});

// Exit rules Button Event Listener
exitrules.addEventListener("click", () => {
  rulesFunc("close");
});

//When Click on the rules container, the rules will be closed
rulesContainer.addEventListener("click", (e) => {
  if (e.target == rulesContainer) {
    rulesFunc("close");
  }
});

// Start Quiz Event Listener
startQuizBtn.addEventListener("click", () => {
  rulesFunc("close");
  if (questionIndex === 0) {
    loadingContainer.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      loadingContainer.style.display = "none";
      showQuestion();
    }, 2500);
  } else {
    showQuestion();
  }
  scoreElement.textContent = 0;
});

// Next Quiz Event listener
nextQuiz.addEventListener("click", () => {
  questionIndex++;
  if (questionIndex > quizArr.length - 1) {
    showResult();
  } else {
    showQuestion();
  }
});

// Restart Event functionality
restart.addEventListener("click", () => {
  initialShowQuestion();
  if (questionIndex === 0) {
    loadingContainer.style.display = "flex";
    document.body.style.overflow = "hidden";
    setTimeout(() => {
      loadingContainer.style.display = "none";
      showQuestion();
    }, 2500);
  } else {
    showQuestion();
  }
});

// Back To Home Event listner
backHome.addEventListener("click", () => {
  initialShowQuestion();
});
