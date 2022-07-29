var startBtn = document.getElementById("startbtn");
var time = 90;
var questionDisplay = document.getElementById('quiz-header') 
var answer1 =document.getElementById('question1')
var answer2 =document.getElementById('question2')
var answer3 =document.getElementById('question3')
var answer4 =document.getElementById('question4')

var questionAnswers = [
    answer1,
    answer2,
    answer3,
    answer4
]

var questions = [
  {
    question: "Which of these is a coding language?",
    answers: ["java", "coffee", "cafe", "tea"],
    answerIndex: 0,
  },
  {
    question: "Which of these is an HTML element?",
    answers: ["<div>", "<dark>", "<jedi>", "<mindtrick>"],
    answerIndex: 0,
  },
  {
    question: "What can be used to insert data into an array?",
    answers: ["kick", "shove", "push", "force"],
    answerIndex: 2,
  },
  {
    question: "Who created react?",
    answers: ["google", "facebook", "jeff bezos", "apple"],
    answerIndex: 1,
  },
];

let questionNumber = [0]

function loadQuestion(question) {
    questionDisplay.textContent = question.question

    for (var i = 0; i < question.answers.length; i ++) {
        questionAnswers[i].textContent = question.answers[i]
    }
}



function start() {
  var timer = setInterval(function () {
    time = time - 1;
    if (time <= 0) {
      clearInterval(timer);
    } else {
    }
  }, 1000);

  loadQuestion(questions[questionNumber])
}

startBtn.addEventListener("click", start);
