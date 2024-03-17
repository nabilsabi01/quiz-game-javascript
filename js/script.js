const btnStart = document.querySelector(".btn-start");
const homeSection = document.querySelector(".home-section");
const sectionRules = document.querySelector(".section-rules");
const exitRules = document.querySelector(".exit-rules");
const sectionQuiz = document.querySelector(".section-quiz");
const startQuiz = document.querySelector(".start-quiz");

btnStart.addEventListener('click', showRules); 

exitRules.addEventListener('click', backHome);

startQuiz.addEventListener('click', showQuiz);


function backHome(){
    sectionRules.style.display = "none";
    homeSection.style.display = "block";
}

function showRules(){
    homeSection.style.display = "none";
    sectionRules.style.display = "flex";
}

function showQuiz(){
    sectionRules.style.display = "none";
    sectionQuiz.style.display = "flex";
}


