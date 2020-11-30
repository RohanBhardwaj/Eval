var questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question");
const optionContainer = document.querySelector(".option-container");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const StartBox = document.querySelector(".box1");

let questionCounter =0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];

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
    
}


function startQuiz(){
  StartBox.classList.toggle("hide");
  quizBox.classList.toggle("hide");
}

window.onload = function(){
    setAvailableQuestions();
    getNewQuestion();
}
