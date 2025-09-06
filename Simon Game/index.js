var gamePattern=[];

var buttonColors= ["red", "blue", "green", "yellow"];

var started=false;
var level=0

$(document).keypress(function()
{
    if(!started)
    {
        $("#level-title").text("Level "+ level);
        nextSequence();
        started=true;
    }
})

function nextSequence()
{
    userClickedPattern=[]
    level++;
    $("#level-title").text("Level " + level);
    let randomnumber=Math.floor((Math.random()*4));
    let randomChoosenColor=buttonColors[randomnumber];
    gamePattern.push(randomChoosenColor);
    $("#" + randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChoosenColor)
    animatePress(randomChoosenColor)
}

var userClickedPattern=[]
$(".btn").on("click",function()
{
    var userChoosenColor=$(this).attr("id");
    userClickedPattern.push(userChoosenColor);
    playSound(userChoosenColor)
    animatePress(userChoosenColor)
    checkAnswer(userClickedPattern.length-1);

});

function playSound(name)
{
   const audio = new Audio("sounds/"+name+".mp3");
    audio.play(); 
}

function animatePress(currentColor)
{
    $("#"+currentColor).addClass("pressed");
    setTimeout(function() {
    $("#"+currentColor).removeClass("pressed");
}, 100);
}

function checkAnswer(currentlevel)
{
  if(userClickedPattern[currentlevel]==gamePattern[currentlevel])
  {
    if(userClickedPattern.length==gamePattern.length)
    {
        setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  }
  else
  {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function () {
          $("body").removeClass("game-over");
        }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver()
{
    level=0;
    gamePattern=[];
    started=false

}