let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-app .quiz-area");
let answersArea = document.querySelector(".quiz-app .answers-area");
let submitButton = document.querySelector(".quiz-app .submit-button");
let bullets = document.querySelector(".bullets");
let resultssContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown ");
let select = document.querySelectorAll(".quiz-app .category div");
let category = document.querySelector(".quiz-app .category");
let categoryhtml = document.querySelector(".quiz-app .category .html");
let categorycss = document.querySelector(".quiz-app .category .css");
let categoryjs = document.querySelector(".quiz-app .category .js");
let restar = document.querySelector(".quiz-app .restart");
let ditles = document.querySelector(".details");

let currentIndex = 0;
let rightAnswer = 0;
let countdownInterval;

function getQuestionhtml() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      createBullets(qCount);

      addQustionData(questionsObject[currentIndex], qCount);
      countdown(5, qCount);

      submitButton.onclick = () => {
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        currentIndex++;

        checkAnswer(theRightAnswer, qCount);

        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        addQustionData(questionsObject[currentIndex], qCount);

        handleBullets();
        clearInterval(countdownInterval);
        countdown(5, qCount);
        showResults(qCount);
      };
    }
  };
  myRequest.open("GET", "json/html_questions.json", true);
  myRequest.send();
}
function getQuestioncss() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      createBullets(qCount);

      addQustionData(questionsObject[currentIndex], qCount);
      countdown(5, qCount);

      submitButton.onclick = () => {
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        currentIndex++;

        checkAnswer(theRightAnswer, qCount);

        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        addQustionData(questionsObject[currentIndex], qCount);

        handleBullets();

        clearInterval(countdownInterval);
        countdown(5, qCount);
        showResults(qCount);
      };
    }
  };
  myRequest.open("GET", "json/css_questions.json", true);
  myRequest.send();
}
function getQuestionjs() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      createBullets(qCount);

      addQustionData(questionsObject[currentIndex], qCount);
      countdown(5, qCount);

      submitButton.onclick = () => {
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        currentIndex++;

        checkAnswer(theRightAnswer, qCount);

        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        addQustionData(questionsObject[currentIndex], qCount);

        handleBullets();

        clearInterval(countdownInterval);
        countdown(5, qCount);
        showResults(qCount);
      };
    }
  };
  myRequest.open("GET", "json/js.questions.json", true);
  myRequest.send();
}

function selsctCategory() {
  select.forEach(function (categoryDiv) {
    categoryDiv.addEventListener("click", function () {
      if (categoryDiv.className === "html") {
        getQuestionhtml();
        category.remove();
        ditles.remove();
      } else if (categoryDiv.className === "css") {
        getQuestioncss();
        category.remove();
        ditles.remove();
      } else if (categoryDiv.className === "js") {
        getQuestionjs();
        category.remove();
        ditles.remove();
      }
    });
  });
}
selsctCategory();

function createBullets(num) {
  countSpan.innerHTML = num;
  for (let i = 0; i < num; i++) {
    let theBullet = document.createElement("span");
    if (i === 0) {
      theBullet.className = "on";
    }
    bulletsSpanContainer.appendChild(theBullet);
  }
}
function addQustionData(obj, count) {
  if (currentIndex < count) {
    let questionTitle = document.createElement("h2");
    let questionText = document.createTextNode(obj.title);
    questionTitle.appendChild(questionText);
    quizArea.appendChild(questionTitle);
    for (let i = 1; i <= 4; i++) {
      let mainDiv = document.createElement("div");
      mainDiv.className = "answer";
      let radioInput = document.createElement("input");
      radioInput.name = "questions";
      radioInput.type = "radio";
      radioInput.id = `answer_${i}`;
      radioInput.dataset.answer = obj[`answer_${i}`];

      if (i === 1) {
        radioInput.checked = true;
      }

      let theLabel = document.createElement("label");
      theLabel.htmlFor = `answer_${i}`;
      let theLabelText = document.createTextNode(obj[`answer_${i}`]);
      theLabel.appendChild(theLabelText);
      mainDiv.appendChild(radioInput);
      mainDiv.appendChild(theLabel);
      answersArea.appendChild(mainDiv);
    }
  }
}
function checkAnswer(rAnswer, count) {
  let answers = document.getElementsByName("questions");
  let theChosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      theChosenAnswer = answers[i].dataset.answer;
    }
  }
  if (rAnswer === theChosenAnswer) {
    rightAnswer++;
  }
}
function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}
function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    restar.style.display = "block";
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();
    if (rightAnswer > count / 2 && rightAnswer < count) {
      theResults = `<span class="good">Good</span>, ${rightAnswer} From ${count} `;
    } else if (rightAnswer === count) {
      theResults = `<span class="perfect">Perfect</span>, All Answers IS Correct`;
    } else {
      theResults = `<span class="bad">Bad</span>, ${rightAnswer} From ${count} `;
    }
    resultssContainer.innerHTML = theResults;
    resultssContainer.style.padding = "10px";
    resultssContainer.style.backgroundColor = "white";
    resultssContainer.style.marginTop = "10px";
  }
}
restar.onclick = () => {
  window.location.reload();
};

function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, seconds;
    countdownInterval = setInterval(() => {
      minutes = parseInt(duration / 60);
      seconds = parseInt(duration % 60);
      minutes = minutes < 10 ? `0${minutes}` : minutes;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      countdownElement.innerHTML = `${minutes}:${seconds}`;
      if (--duration < 0) {
        clearInterval(countdownInterval);
        submitButton.click();
      }
    }, 1000);
  }
}
