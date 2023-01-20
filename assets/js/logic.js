function startQuiz(){
  
var time = setInterval(function (){
  var timeDisplay = document.getElementById("time")
  timeDisplay.innerText = time  
  time ++
}, 1000)

var startScreen = document.getElementById("start-screen")
console.log(startScreen)
startScreen.classList.add("hide")

var  questionScren = document.getElementById("questions")
questionScren.classList.remove("hide")
questionScren.classList.add("start")
showQuestion(0)
}

function showQuestion(index){
  var questionTitle = document.getElementById("question-title")
  questionTitle.innerText = questions.questions[index]
  var choices = document.getElementById("choices")
  var c1 = document.createElement("BUTTON");
  var c2 = document.createElement("BUTTON");
  var c3 = document.createElement("BUTTON");
  var c4 = document.createElement("BUTTON");

  choices.appendChild(c1)
  choices.appendChild(c2)
  choices.appendChild(c3)
  choices.appendChild(c4)

  c1.innerText = questions.answer1
  c2.innerText = questions.answer2
  c3.innerText = questions.answer3
  c4.innerText = questions.answer4

  


}

/* function quizLogic(){
  for (var index = 0; index<questions.questions.length; index++){
    while (true){
      console.log(index)
      showQuestion(index)
    }

  }

} */

document.getElementById("start").addEventListener("click", startQuiz);

