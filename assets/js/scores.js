document.getElementById("clear").addEventListener("click", function() {
    currentHighScore = []
    localStorage.setItem("highScoreDataLocal", currentHighScore)
  })

  let highScoreData = JSON.parse(localStorage.getItem("highScoreDataLocal"))

  for (let index = 0; index< highScoreData.length; index++){
    console.log(highScoreData[index])
    var ol = document.getElementById('highscores')
    var li = document.createElement("LI")
    li.textContent = `${highScoreData[index].username} -- ${highScoreData[index].currentTime}-- ${highScoreData[index].score}`
    console.log(li.innerHTML)
    ol.appendChild(li)
  }