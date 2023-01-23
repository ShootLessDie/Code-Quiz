document.getElementById("clear").addEventListener("click", function() {
    currentHighScore = []
    localStorage.setItem("highScoreDataLocal", currentHighScore)
  })