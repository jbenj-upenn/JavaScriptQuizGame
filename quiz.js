// /* Round 3
//select elements
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var questionImg = document.getElementById("questionImg");
var answerA = document.getElementById("a");
var answerB = document.getElementById("b");
var answerC = document.getElementById("c");
var counter = document.getElementById("counter");
var timer = document.getElementById("timer");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");

// create questions
var questions = [
    {
        question : "Vexillology is the study of what?",
        imgSrc :  "https://www.dailydot.com/wp-content/uploads/f10/f1/686bf45f96ce06af9dd5324453868273-1024x512.jpg",
        answerA : "Flag Design",
        answerB : "Causes of Intense Anger",
        answerC : "Small Earthquakes",
        correct : "A"
    },
    {   question : "In Poker, what beats a Full House?",
        imgSrc : "https://analyzepoker.com/wp-content/uploads/2019/05/pocket-aces-1024x576.jpg",
        answerA : "An Ace-High Flush",
        answerB : "A Five-High Straight Flush",
        answerC : "A Straight to the Ace",
        correct : "B"
    },
    {   question : "What is the southernmost capital city in the world?",
        imgSrc : "https://www.kids-world-travel-guide.com/images/xgeography-2.png.pagespeed.ic.Vio9YBkxe7.jpg",
        answerA : "Buenos Aires, Argentina",
        answerB : "Wellington, New Zealand",
        answerC : "Pretoria, South Africa",
        correct : "B"
    }
];

// create variables

var lastQuestion = questions.length - 1;
var  runningQuestion = 0;
var count = 0;
var questionTime = 15; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / questionTime; //trying to give users score based on correct answers and time taken
var TIMER;
var score = 0;

// create a question
function createQuestion(){
    var q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    questionImg.innerHTML = "<img src="+ q.imgSrc +">";
    answerA.innerHTML = q.answerA;
    answerB.innerHTML = q.answerB;
    answerC.innerHTML = q.answerC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    createQuestion();
    quiz.style.display = "block";
    showProgress();
    displayCounter();
    TIMER = setInterval(displayCounter,1000); // 1000ms = 1s
}

// show that progress
function showProgress(){
    for(var qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// green or red counter

function displayCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timer.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // show red for wrong answers
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            createQuestion();
        }else{
            // end the quiz and show the score or percentage correct
            clearInterval(TIMER);
            showScore();
        }
    }
}

// right or wrong

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // green (totally optional) for correct answers 
        answerIsCorrect();
    }
        // answer is wrong
        // red (also optional) for incorrect answers 
    else{
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        createQuestion();
    }
    // end quiz and show  score
    else{
        clearInterval(TIMER);
        showScore();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score 
function showScore(){
    scoreDiv.style.display = "block";
    
    //  percent correct answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent; unable to figure out how to size pictures down
    var img = (scorePerCent >= 80) ? "https://media.wired.com/photos/5db0965e60047600090d3a68/125:94/w_2038,h_1532,c_limit/Culture_jokerstairs_rev-1-JOK-19666_High_Res_JPEG.jpg" :
              (scorePerCent >= 60) ? "https://i.kym-cdn.com/photos/images/facebook/000/071/862/happycat.jpg" :
              (scorePerCent >= 40) ? "https://media.makeameme.org/created/im-skeptical-sh28ps.jpg" :
              (scorePerCent >= 20) ? "https://i.imgflip.com/15p9ii.jpg?a440184" :
              "https://i.scdn.co/image/ab67706c0000da84e1fa5e074035d6d7a7328184";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

//timer under construction

/*function startTimer() {
    var timeLimit = 15;
    remainingTime.innerHTML = timeLimit;
    remainingTime.classList.remove("less-time");
    interval = setInterval(() => {
        timeLimit--;
        if (timeLimit < 10) {
            timeLimit = "0" + timeLimit;
        }
        if (timeLimit < 6) {
            remainingTime.classList.add("less-time");
        }
        remainingTime.innerHTML = timeLimit;
        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}
function stopTimer() {
    clearInterval(interval);
}*/