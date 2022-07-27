//  ! variables to grab elements by their ID
var main = document.getElementsByTagName('main')[0]
var viewHighscoreLink = document.getElementById('view_highscore_link')
var timeDisplay = document.getElementById('time_display')
var startQuizButton = document.getElementById('start_quiz_button')
var questionNumbersBox = document.getElementById('question_numbers_box')
var questionDisplay = document.getElementById('question_display')
var answersList = document.getElementById('answer_list')
var answerFeedback = document.getElementById('feedback')
var scoreDisplay = document.getElementById('score_display')
var initialsInput = document.getElementById('initials_input')
var submitInitialsButton = document.getElementById('submit_initials_button')
var highscoreList = document.getElementById('highscore_list')
var goToStartingPageButton = document.getElementById('go_to_starting_page_button')
var clearHighscoresButton = document.getElementById('clear_highscores_button')
   

const questions = [{
        'question': 'This is a non relational type of database',
        'answers': ['SQL', 'Javascript', 'MongoDB', 'Node.js'],
        'correct_index': 2
    },
    {
        'question': 'React was created by which company?',
        'answers': ['Facebook', 'Google', 'Apple', 'Netflix'],
        'correct_index': 0
    },
    {
        'question': 'Which of these would NOT be part of a CRUD application',
        'answers': ['post', 'put', 'get', 'produce'],
        'correct_index': 3
    },
    {
        'question': 'What is the script language within react?',
        'answers': ['XFL', 'LAX', 'JSX', 'Doug'],
        'correct_index': 2
    },
    {
        'question': 'Which of these is a programming language',
        'answers': ['Coffee', 'Cafe', 'Java', 'Tea'],
        'correct_index': 2
    }
]



const startTime = questions.length * 8
const penalty = 10
var timeRemaining
var timer
var score

//  !  funtion to initialize the quiz
function initialize() {
    //  event listener for start button
    startQuizButton.addEventListener('click', event => {
        // when the button is clicked this keeps it from going back to last page
        event.preventDefault()
        //  calls the question page
        displayQuestionPage()
    })
    // *event listener for answers list
    answersList.addEventListener('click', event => {
        // when the button is clicked this keeps it from going back to last page
        event.preventDefault()
        // If/else statements to display correct or wrong choices
        if (event.target.matches('button')) {
            var button = event.target
            if (button.classList.contains('correct')) {
                //  questionbox on top displays correct or wrong choices
                answerFeedback.textContent = "Correct!"
                questionNumbersBox.children[nextQuestion - 1].classList.add('correct')
                score++
            } else {
                //  questionbox on top displays correct or wrong choices
                answerFeedback.textContent = "Wrong!"
                questionNumbersBox.children[nextQuestion - 1].classList.add('wrong')
                timeRemaining -= penalty
            }
            if (timeRemaining > 0) displayNextQuestion()
            else displayGetNamePage()
        }
    })
    submitInitialsButton.addEventListener('click', event => {
        event.preventDefault()
        let initials = initialsInput.value.toUpperCase()
        if (initials) {
            let highscores = JSON.parse(localStorage.getItem('highscores')) || []
            timestamp = Date.now()
            highscores.push({
                'timestamp': timestamp,
                'score': score,
                'initials': initials,
                'timeRemaining': timeRemaining
            })
            highscores = highscores.sort((a, b) => {
                if (a.score != b.score) return b.score - a.score
                if (a.timeRemaining != b.timeRemaining) return b.timeRemaining - a.timeRemaining
                if (a.timestamp != b.timestamp) return a.timestamp - b.timestamp
                return 0
            })
            localStorage.setItem('highscores', JSON.stringify(highscores))
            displayHighscorePage()
            initialsInput.value = ""
        }
    })
    goToStartingPageButton.addEventListener('click', event => {
        event.preventDefault()
        displayStartingPage()
    })
    clearHighscoresButton.addEventListener('click', event => {
        var confirmed = confirm("Do you want to clear highscores?")
        if (confirmed) {
            event.preventDefault()
            localStorage.setItem('highscores', "[]")
            displayHighscorePage()
        }
    })
    viewHighscoreLink.addEventListener('click', event => {
        event.preventDefault()
        displayHighscorePage()
    })
    displayStartingPage()
}


function displayPage(id) {
    main.querySelectorAll('.page').forEach(page => {
        if (page.id == id) {
            page.classList.remove('hidden')
        } else {
            page.classList.add('hidden')
        }
    })
    return 4
}

function displayStartingPage() {
    displayPage('starting_page')

    clearInterval(timer)
    timeRemaining = 0

    timeDisplay.textContent - formatSeconds(timeRemaining)
}


var nextQuestion
var randomizedQuestions
function displayQuestionPage() {
    displayPage('question_page')
    questionNumbersBox.innerHTML = ""
    for (let i = 0; i < questions.length; i++) {
        const element = questions[i];
        var el = document.createElement('span')
        el.textContent = i + 1
        questionNumbersBox.appendChild(el)
    }
    randomizedQuestions = randomizeArray(questions)
    nextQuestion = 0
    score = 0

    startTimer()
    displayNextQuestion()
}

function displayNextQuestion() {
    if (nextQuestion < questions.length) {
        const question = randomizedQuestions[nextQuestion].question
        const answers = randomizedQuestions[nextQuestion].answers
        const randomizedAnswers = randomizeArray(answers)
        const correctAnswer = answers[randomizedQuestions[nextQuestion].correct_index]
        questionDisplay.textContent = question
        answersList.innerHTML = ""
        answerFeedback.textContent = ""

        for (let i = 0; i < randomizedAnswers.length; i++) {
            let answer = randomizedAnswers[i]
            let button = document.createElement("button")
            button.classList.add('answer')
            if (answer == correctAnswer)
                button.classList.add('correct')
            button.textContent = `${i +1}. ${answer}`
            answersList.appendChild(button)
        }

        nextQuestion++
    } else {
        clearInterval(timer)
        displayGetNamePage()
    }
}

function displayGetNamePage() {
    displayPage('get_name_page')
    
    if (timeRemaining < 0) timeRemaining = 0
    timeDisplay.textContent = formatSeconds(timeRemaining)
    scoreDisplay.textContent = score
}


function displayHighscorePage() {
    displayPage('highscore_page')

    questionNumbersBox.innerHTML = ""
    highscoreList.innerHTML = ""

    clearInterval(timer)

    let highscores = JSON.parse(localStorage.getItem('highscores'))
  
    let i = 0
    for (const key in highscores) {
        i++
        let highscore = highscores[key]
        var el = document.createElement('div')
        let initials = highscore.initials.padEnd(3, ' ')
        let playerScore = highscore.score.toString().padStart(3, ' ')
        let timeRemaining = formatSeconds(highscore.timeRemaining)
        el.textContent = `${i}. ${initials} - Score: ${playerScore} - Time: ${timeRemaining}`
        highscoreList.appendChild(el)
    }
}


function randomizeArray(array) {
    clone = [...array]
    output = []

    while (clone.length > 0) {
        let r = Math.floor(Math.random() * clone.length);
        let i = clone.splice(r, 1)[0]
        output.push(i)
    }
    return output
}

function startTimer() {
    timeRemaining = startTime
    timeDisplay.textContent = formatSeconds(timeRemaining)
    timer = setInterval(function () {
        timeRemaining--

        if (timeRemaining < 0) {
            clearInterval(timer)
            displayGetNamePage()
        } else {
            timeDisplay.textContent = formatSeconds(timeRemaining)
        }
    }, 1000)
}

function formatSeconds(seconds) {
    let m = Math.floor(seconds / 60).toString().padStart(2, ' ')
    let s = (seconds % 60).toString().padStart(2, '0')
    return `${m}:${s}`
}

initialize()