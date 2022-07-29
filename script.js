var startBtn = document.getElementById("startbtn");
var time = 90;
var questionDisplay = document.getElementById('quiz-header') 
var scoreDisplay = document.getElementById('score')
var answer1 =document.getElementById('question1')
var answer2 =document.getElementById('question2')
var answer3 =document.getElementById('question3')
var answer4 =document.getElementById('question4')
var timer = document.getElementById('timer')
var answerCorrectness = document.getElementById('right-wrong')
var initials = document.getElementById('initials')
var score = 0
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
    correctAnswer: 0,
  },
  {
    question: "Which of these is an HTML element?",
    answers: ["<div>", "<dark>", "<jedi>", "<mindtrick>"],
    correctAnswer: 0,
  },
  {
    question: "What can be used to insert data into an array?",
    answers: ["kick", "shove", "push", "force"],
    correctAnswer: 2,
  },
  {
    question: "Who created react?",
    answers: ["google", "facebook", "jeff bezos", "apple"],
    correctAnswer: 1,
  },
];

var questionNumber = 0

function loadQuestion(question) {
    questionDisplay.textContent = question.question

    for (var i = 0; i < question.answers.length; i ++) {
        questionAnswers[i].textContent = question.answers[i]
    }
}

function clickHandler(e) {
    var clicked = e.target;
    var answer = clicked.getAttribute('data-answer')
    if(answer == questions[questionNumber].correctAnswer) {
        answerCorrectness.textContent = 'Correct'
        answeredCorrect()
    } else {
        answerCorrectness.textContent = 'Wrong'
        answeredWrong()
    }
    questionNumber++;
    if(questionNumber >= questions.length) {
        time = 0
    } else {
    scoreDisplay.textContent = score
    loadQuestion(questions[questionNumber])
    }
}

function answeredCorrect() {
    score = score + 10
}

function answeredWrong() {
    time = time - 10
}

function start() {
  const timerCountdown = setInterval(function () {
    time = time - 1;
    if (time <= 0) {
      clearInterval(timerCountdown);
    } else {
        timer.textContent = time
    }
  }, 1000);

  loadQuestion(questions[questionNumber])
}

function end() {
    
}

function clickListeners() {
    for (var i = 0; i < questionAnswers.length; i++) {
        questionAnswers[i].addEventListener('click', clickHandler)
    }
}

clickListeners()
startBtn.addEventListener("click", start);
