var startQuizButton = document.getElementById("start-quiz-button");
var quizScreen = document.querySelector("#quiz-screen");
var scoreScreen = document.getElementById("score-screen");
var hsScreen = document.getElementById("hs-screen");
var startingTime = 75;
var timer = 0;
var timerCountdown = document.getElementById("timer-text");
var i = 0;
var questionNumber = 0;
var answer = " ";


var questions = [
    {
        question:"The condition in an if/else statement is enclosed with ________.",
        answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
        correctAnswer: "parenthesis"
    },
    {
        question:"Commonly used data types DO Not include:",
        answers: ["strings", "booleans", "alerts", "numbers"],
        correctAnswer: "alerts"
    },
    {
        question:"Arrays in JavaScript can be used to store ________.",
        answers: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        correctAnswer: "all of the above"
    },
    {
        question:"A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        correctAnswer: "console.log"
    },
    {
        question:"String values must be enclosed within ________ when being assigned to variables.",
        answers: ["commas", "curly brackets", "quotes", "parenthesis"],
        correctAnswer: "quotes"
    },
]

function startQuiz() {
    var startScreen = document.getElementById("start-screen");
    clock();
    showQuestions();
    questionNumber = 0;
    startingTime = 75;
    index = 0;
    startScreen.setAttribute("hidden", " ");
    quizScreen.removeAttribute("hidden", " ");
}

function showQuestions() {
    var question = questions[questionNumber];
    var quizScreen = document.querySelector("#quiz-screen");
    quizScreen.innerHTML = 
        `<section><h2>${question.question}</h2>`
    
    for(var i=0; i < question.answers.length; i++) {
        var answer = question.answers[i]
        quizScreen.innerHTML += 
        `<button onClick="clickAnswer('${answer}')">${answer}</button>`
    }
}

function clickAnswer(answer) {
    if (answer == questions[questionNumber].correctAnswer) {
        console.log("Correct!")
    } else {
        startingTime -= 10;
    }
    questionNumber += 1
    if(questionNumber<questions.length) {
        showQuestions()
    } else {
        endQuiz()
    }
}

function clock() {
    var timer = setInterval(function() {
        if(startingTime <= 0) {
            clearInterval(timer);
            endQuiz()
        } else if(questionNumber >= questions.length) {
            clearInterval(timer);
            endQuiz()
        } else {
            timerCountdown.innerHTML = "Time: " + startingTime; 
        }
        startingTime -= 1;
    }, 1000);
}

function endQuiz() {
    clearInterval(timer);
    localStorage.setItem("score", startingTime)
    quizScreen.setAttribute("hidden", " ");
    scoreScreen.removeAttribute("hidden");
    scoreScreen.innerHTML =
    `<section>
        <h2>Your score is: "${startingTime}" </h2>
        <input id="initials" type="text" placeholder="Enter Initials"></input>
        <button value="Submit" type="submit" id="submitInitials" onclick="submitScore()">Submit</button>
    </section>`
}

function submitScore() {
    var initials = document.getElementById("initials").ariaValueMax;
    var score = localStorage.getItem("score");
    var hs = JSON.parse(localStorage.getItem("Scores")) || []
    var submission = {
        score: score,
        initials: initials
    };
    hs.push(submission);
    localStorage.setItem("Scores", JSON.stringify(hs));
    hsList = JSON.parse(localStorage.getItem("Scores"))
    scoreScreen.innerHTML = 
    `<section>
        <h2>Scores</h2>
        <div class="scores"></div>
        <button onclick="startQuiz()">Play Again</button>
        <button onclick="clearHs()">Clear HighScores</button>
    </section>`
    var scores = document.querySelector(".scores");
    for(var i = 0; i < submission.length; i++) {
        var score = submission[i].score;
        var scores = document.querySelector(".scores");
        var initials = submission[i].initials;
        var ul = document.createElement("ul");
        var li = document.createElement("li");
        var listDiv = document.createElement("div");
        listDiv.innerHTML = 
        `<div class="listItem">Score: ${score} Initials: ${initials}</div>`
        ul.appendChild(li);
        li.appendChild(listDiv);
        scores.appendChild(listDiv);
    }
}

function clearHs() {
    localStorage.clear();
}