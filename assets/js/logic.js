var timeDisplay = document.getElementById("time")
let highScoreData = []

if (!localStorage.getItem("highScoreDataLocal")){

}

if (!localStorage.getItem("questionNumber")){
  questionNumber = 0
  localStorage.setItem("questionNumber", questionNumber)
  console.log("New question number created")
}

/* If saved state is already beyond the final question */
if (localStorage.getItem("questionNumber") >= questions.length){
  questionNumber = 0
  localStorage.setItem("questionNumber", questionNumber)

}

var questionNumber = localStorage.getItem("questionNumber")

if (!localStorage.getItem("saveTime")){
  var savedTime = questions.length*30
  saveTime()
} 
else {
  var savedTime = localStorage.getItem("savedTime")
}

function startQuiz(){

  questionNumber = localStorage.getItem("questionNumber")
  console.log(`question number: ${questionNumber}`)


  timeCounter = setInterval(function (){
    timeDisplay.innerText = savedTime  
    savedTime --
    saveTime()
  }, 1000)

  var startScreen = document.getElementById("start-screen")
  console.log(startScreen)
  startScreen.classList.add("hide")

  var  questionScren = document.getElementById("questions")
  questionScren.classList.remove("hide")
  questionScren.classList.add("start")
  showQuestion(questionNumber)
  }

function showQuestion(index){
  console.log(index)
  var questionTitle = document.getElementById("question-title")
  console.log(questions[index].question)
  questionTitle.innerText = questions[index].question
  var choices = document.getElementById("choices")
  document.getElementById("choices").innerHTML = ""

  var c1 = document.createElement("BUTTON");
  var c2 = document.createElement("BUTTON");
  var c3 = document.createElement("BUTTON");
  var c4 = document.createElement("BUTTON");

  choices.appendChild(c1)
  choices.appendChild(c2)
  choices.appendChild(c3)
  choices.appendChild(c4)

  c1.innerText = questions[index].answers[0]
  c2.innerText = questions[index].answers[1]
  c3.innerText = questions[index].answers[2]
  c4.innerText = questions[index].answers[3]

}

if (savedTime<0){
  clearInterval(timeCounter)
  console.log("You ran out of time.")
}

function saveTime (){
  localStorage.setItem("savedTime", savedTime)
}

function saveQuestionNumber (){
  localStorage.setItem("questionNumber", questionNumber)
}

function saveScore() {
  /* Prompts for the user to enter their name */
  var username = prompt("Please enter your name")
  
  /* Creates highScoreData variable, turns it into JSON format and saves it to local storage. */

  var currentHighScore = {
    username: username,
    currentTime: new Date(),
    score: savedTime
  }

  console.log(currentHighScore)

  /* Reads in previous highScoreData so it can later append it. */
  if (!localStorage.getItem("highScoreDataLocal")){
    var highScoreData = []
  }

  else{
    highScoreData = JSON.parse(localStorage.getItem("highScoreDataLocal"))
  }

  highScoreData.push(currentHighScore)

  localStorage.setItem("highScoreDataLocal", JSON.stringify(highScoreData))

  questionNumber = 0
  saveQuestionNumber()
  savedTime = null

  var startScreen = document.getElementById("start-screen")
  console.log(startScreen)
  startScreen.classList.add("start")
  startScreen.classList.remove("hide")

  var  questionScren = document.getElementById("questions")
  questionScren.classList.add("hide")


}

function resetQuiz() {
  questionNumber = 0
  saveQuestionNumber()
  savedTime = null

  var startScreen = document.getElementById("start-screen")
  console.log(startScreen)
  startScreen.classList.add("start")
  startScreen.classList.remove("hide")

  var  questionScren = document.getElementById("questions")
  questionScren.classList.add("hide")
}


document.getElementById("start").addEventListener("click", startQuiz);

choices.addEventListener('click', (event) => {
  const isButton = event.target.nodeName === 'BUTTON';
  if (!isButton) {
    return;
  }
  console.log(event.target.innerText);
  if (event.target.innerText === questions[questionNumber].correctAnswer){
    console.log("Correct answer chosen.")
    questionNumber ++
    localStorage.setItem("questionNumber", questionNumber)
    if (questionNumber>= questions.length){
      console.log("Well done you have finished the game!")
      
      clearInterval(timeCounter) /* Stops timer */
      timeDisplay.innerText = savedTime  /* To show actual final time. */

    /* Show end quiz text */
    document.getElementById("question-title").innerHTML = ""
    document.getElementById("choices").innerHTML = ""
    var questionsArea = document.getElementById("questions")
    var h1 = document.createElement('H1')
    h1.innerText = `Well done, you have completed the quiz with ${savedTime}s to spare.`
    questionsArea.appendChild(h1)
    var h1 = document.createElement('H1')
    h1.innerText = `Would you like to save your score?`
    questionsArea.appendChild(h1)
    var saveButton = document.createElement("button")
    saveButton.innerText = "Why, yes I would indeed!"
    saveButton.setAttribute("id", "saveButton")
    questionsArea.appendChild(saveButton)
    var noSaveButton = document.createElement("button")
    noSaveButton.innerText = "No thanks, I am ashamed of it."
    noSaveButton.setAttribute("id", "noSaveButton")
    questionsArea.appendChild(noSaveButton)
    
    document.getElementById("saveButton").addEventListener("click", saveScore)
    document.getElementById("noSaveButton").addEventListener("click", resetQuiz)

    }
    else{
      showQuestion(questionNumber)
    }
    
  }
  else{
    console.log("You have chosen the wrong answer. Now face the consequences.")
    savedTime = savedTime -20
    timeDisplay.innerText = savedTime  
    
  }

})




