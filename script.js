var startBtn = document.getElementById("startbtn");
var time = 90;
var questionDisplay = document.getElementById('quiz-header') 
var questions = [
  {
    question: "Which of these is a coding language",
    answers: ["java", "coffee", "cafe", "tea"],
    answerIndex: 0,
  },
  {
    question: "Which of these is an HTML element?",
    answers: ["<div>", "<dark>", "<jedi>", "<mindtrick>"],
    answerIndex: 0,
  },
  {
    question: "What can be used to insert data into an array",
    answers: ["kick", "shove", "push", "force"],
    answerIndex: 2,
  },
  {
    question: "Who created react?",
    answers: ["google", "facebook", "jeff bezos", "apple"],
    answerIndex: 1,
  },
];

function start() {
  var timer = setInterval(function () {
    time = time - 1;
    if (time <= 0) {
      clearInterval(timer);
    } else {
    }
  });
}

startBtn.addEventListener("click", start);
