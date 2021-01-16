let squareColors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];
let lvl = 0;
let throwbackSpeed = 1000

$("html").keydown(function(event){
  if(event.key === "a"){
    $("h1").text("Level " + lvl);
    $("p").remove();
    setTimeout(nextSequence(), 500);
  }
  $("html").off("keydown");
})



function checkPlayerInput(currentLvl){
  
    if(userPattern[currentLvl] === gamePattern[currentLvl]){
        console.log("success");
        if(userPattern.length === gamePattern.length){
          if(lvl === 5){
            throwbackSpeed = 800;
          } else if(lvl === 10){
            throwbackSpeed = 600;
          } else if(lvl >= 15){
            throwbackSpeed = 400;
          };
          setTimeout(nextSequence, throwbackSpeed);
        }
    } else {
      console.log("wrong");
      playSound("wrong");
      $("body").addClass("animationWrong");
      setTimeout(function(){
        $("body").removeClass("animationWrong")
      }, 100);
      $("h1").text("Game Over");
      $("h1").after("<p>Press any key to restart.</p>");
      reload();
    }

  
}

function reload(){
  $("html").keydown(function(){
    $("p").remove();
    gamePattern = [];
    lvl = 0;
    throwbackSpeed = 1000;
    nextSequence();
    $("html").off("keydown");
  })
}

function nextSequence(){
  userPattern = [];
  let randomNum = Math.floor(Math.random()*4);
  let randomColor = squareColors[randomNum];
  gamePattern.push(randomColor);
  let i = 0;
  if(i < gamePattern.length){
    setInterval(function() {
      animationFlash(gamePattern[i]);
      playSound(gamePattern[i]);
      i++;
    }, throwbackSpeed);
  };
    
  
  lvl++;
  $("h1").text("Level " + lvl);
}

function animationFlash(currentColor){
  $("#" + currentColor).addClass("animationFlash");
  setTimeout(function(){
    $("#" + currentColor).removeClass("animationFlash");
  }, 100);
}


function playSound(name){
  let sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

$(".square").click(function(){
  let userColor = $(this).attr("id");
  userPattern.push(userColor);
  playSound(userColor);
  animationFlash(userColor);
  checkPlayerInput(userPattern.length-1);
})
