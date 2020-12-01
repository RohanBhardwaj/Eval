var questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question");
const optionContainer = document.querySelector(".option-container");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const StartBox = document.querySelector(".box1");
const tq= document.querySelector(".total-question")
const noOfQues = document.querySelector(".noOfQues");
const timer = document.querySelector(".timer");

let questionCounter =0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAmswers = 0;
let attempt =0;
let startingMinutes = 15;
let time = startingMinutes*60;
setInterval(updateTimer,1000);
function updateTimer(){
    let minutes =Math.floor(time/60);
    let seconds = time%60;
    minutes = minutes<10 ? '0'+minutes : minutes;
    seconds = seconds <10 ? '0'+seconds : seconds;
    timer.innerHTML = `${minutes}:${seconds}`;
    time--;
    if(time==0){
        quizOver();
    }
}



function setAvailableQuestions(){
const totalQuestion = quiz.length;
for(let i=0;i<totalQuestion;i++){
    availableQuestions.push(quiz[i]);
}
}

function getNewQuestion(){
    //setting question no.
    questionNumber.innerHTML="Question " + (questionCounter+1) + " of "+ quiz.length;
    currentQuestion=availableQuestions[questionCounter];
    //setting question text
    questionText.innerHTML = availableQuestions[questionCounter].q;
    // console.log(availableQuestions[questionCounter].options);
    const optionLen = availableQuestions[questionCounter].options.length;
    //pushing Options in availableOptions Array
    optionContainer.innerHTML="";
    for(let i=0;i<optionLen;i++){
        const option = document.createElement("div");
        option.innerHTML = availableQuestions[questionCounter].options[i];
        option.id =i;
        option.className = "option";
        optionContainer.appendChild(option);
        option.setAttribute("onclick","getResult(this)");
    }

    
    questionCounter++;
}


function getResult(element){
    const id = element.id;
    
    if(id == currentQuestion.answer){
        console.log("answ corr");
        element.classList.add("correct");
        correctAmswers++;
    }
    else{
        element.classList.add("wrong");
        const optionLen = optionContainer.children.length;
        for(let i=0;i<optionLen;i++){
            if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }




    }
    attempt++;
    unclickableOptions();
}

function unclickableOptions(){
    const optionLen = optionContainer.children.length;
    for(let i=0;i<optionLen;i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

function quizOver(){
    quizBox.classList.add("hide");
    resultBox.classList.remove("hide");
    quizResult();
}

function quizResult(){
    tq.innerHTML = quiz.length;
    document.querySelector(".total-attempt").innerHTML = attempt;
    document.querySelector(".total-correct").innerHTML = correctAmswers;
    const wrong = attempt - correctAmswers;
    document.querySelector(".total-wrong").innerHTML = wrong;
    document.querySelector(".total-score").innerHTML = (correctAmswers-wrong*0.5) +" / " + quiz.length;

}
function resetQuiz(){
    questionCounter =0;
    correctAmswers = 0;
    attempt =0;
    startingMinutes = 15;
    time = startingMinutes*60;
    getNewQuestion();
    //  availableQuestions = [];
    // availableOptions = [];

}




function tryAgainQuiz(){
    resetQuiz();
    resultBox.classList.add("hide");
    quizBox.classList.remove("hide");
    
}


function startQuiz(){
    questionCounter =0;
    correctAmswers = 0;
    attempt =0;
     startingMinutes = 15;
    time = startingMinutes*60;
    setAvailableQuestions();
    getNewQuestion();
    StartBox.classList.toggle("hide");
    quizBox.classList.remove("hide");
}

window.onload = function(){
    noOfQues.innerHTML = quiz.length;
}