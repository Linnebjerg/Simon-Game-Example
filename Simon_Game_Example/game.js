// We create an array to store each of our four colors
var buttonColours = ["red", "blue", "green", "yellow"];


// We create a new empty array called 'gamePattern', to store each instance of 'randomChosenColor' we puch into the array.
var gamePattern = [];


// We create a new empty array that will be used to store the
var userClickedPattern = [];


// We declare a variable called 'started', as a way of keeping track of whether if the game has started or not,
// and set this variable to be a Boolean with a vlaue of 'false' so you only call nextSequence() on the first keypress.
var started = false;


// We create a new variable called 'level' and start at level 0, in order to keep track of our levels.
var level = 0;


//Here, we use jQuery ('$') to detect when a keyboard key has been pressed, and we're using the selector of 'document'.
// means that our website will detect for any keypress that occures on the 'document' element - Which essentially means the entire webpage.
// The webpage will detect if the game has alleady been started, by deploying an 'if-statement' that says; "If our game is not started
// (..determined by the variable called 'started' and using the 'not-operator', placing an exclamation mark right in from of 'started')
// then the part contained inside the 'if-statement' will be executed".
$(document).keypress(function() {
  if (!started) {


// Whenever the state of the game is set as 'not-started', the 'ID called 'level'title' willl have it's text-property altereted indication
// the String of "level" + the value contained inside the variable called 'level'
// Additionally, the function 'nextSequence' is being called. Also, the variable 'started' is re-assigned the value of 'true'. (..meaning that the game is in process).
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// We use jQuery to target the element of class 'btn', add the 'click'-method to it, and make it take the input of an anonymous function
$(".btn").click(function() {


// We declare a new variable called 'userChosenColor' and assign it the value of 'this' (refering back to the element of class 'btn') and use the
// 'attr' (attribute)-method with just a single parameter, to return the 'ID' of the corresponding button. The return will will be the 'ID' associated with
// the button that's been clicked
  var userChosenColour = $(this).attr("id");


// We push the value of the variable 'userChosenColor' into the empty array called 'userClickedPattern'.
  userClickedPattern.push(userChosenColour);

  //In the same way we played sound in nextSequence() , when a user clicks on a button, the corresponding sound will be played.
  //The input of the method 'playSound', which is the value of  'userChosenColor', will then determine what specific sound is played.
  playSound(userChosenColour);


  // Just like when a sound is playing depending on the button presse, whenever a user clicks on a button, the corresponding button will
  // call the 'animatePress'-function and display the flashing animation when it adds the 'pressed'-class and then removes that class again.
  animatePress(userChosenColour);


  // We call the function called 'checkAnswer', after a user has clicked and chosen their answer. Then we're passing in the index of the last answer in the user's sequence.
  //The reason why we use the '.lenght' -1, is because we're dealing with an array and because we have an array, we count from 0 when comparing arrays. What that means is
  // that if the sequence-lenght is at 8, we would actually have 9 element-postions (..since we start from postion '0').
  checkAnswer(userClickedPattern.length-1);
});


// We Create a new function called 'checkAnswer', that takes one input with the name of 'currentLevel'
function checkAnswer(currentLevel) {


  // We create an 'if-statement' inside the function called 'checkAnswer', in order to check if the most recent user-answer, is the exact same as the 'gamePattern'-array.
  // If so, then our log will output "success". Otherwise the log will output "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {


  // If the user got the most recent answer right, then check that they have finished their sequence with another 'if-statement-. What is checked here is what the user has inputted
  // in the variable called 'userClickPattern', has the same lenght-property as the variable 'gamePatter'. Thus, the 'userClickedPattern' has to be the same lenght
  // as the 'gamePattern'.
      if (userClickedPattern.length === gamePattern.length){


//If 'userClickedPattern' has the same lenght-property as 'gamePattern', the a 'setTimeout'-fuction is called, with a timer of a 1000 millisecond delay.
// When the deplay ends, the 'nextSequence'-function is called again
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }


// An 'if-statement that will occure if 'gamePattern' and 'userClickedPattern' is
// not either exact matches to each other, and if the lenght of them are not equally long.
    } else {


// First, we use the 'playSound'-function and give it the name-input of "wrong".
      playSound("wrong");


// Next, we manipulate the <body-element and add the class called 'game-over'.
      $("body").addClass("game-over");


// Finally, we manipulate the text of the <h1> into the following String: "Game Over, Press Any Key to Restart".
      $("#level-title").text("Game Over, Press Any Key to Restart");


  // The 'setTimeout'-method is called, set to last for 200 miliseconds.
  // When the timeout-delay is over, the class 'gave-over' is removed from the <body>-element.
            $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);


// We call the function 'startOver' whenever the 'else' part of the 'if-statement' is triggered.
      startOver();
    }
}

//  New a new function called nextSequence()
function nextSequence() {


// Each time the 'nextSequence'-function is called and triggered, the 'userClickedPattern'-array is reset to an empty array, in to make it ready for the next level.
// (otherwise, whatever the user had allready clicked would be stored, thus, making the game way too easy).
  userClickedPattern = [];


  //Each time we call the 'nextSequence'-function, we increase the value of the variable called 'level' by 1.
  level++;


//Each time we call the 'nextSequence'-function, we also have to update the 'ID' called #level-titel. This will set the text-value of the <h1>
// to be in accordance with whatever the value of our variable 'level' is currently at.
  $("#level-title").text("Level " + level);


//Inside the new function generate a new random number between 0 and 3, and store it in a variable called randomNumber
  var randomNumber = Math.floor(Math.random() * 4);


// We create a new variable called randomChosenColour and use the the variable 'randomNumber' to select the appropriate color from the 'buttonColours'-array.
  var randomChosenColour = buttonColours[randomNumber];


// We add the new randomChosenColour to the end of the gamePattern, taken from the variable 'randomChosenColor (..generated ny the variable 'random number').
  gamePattern.push(randomChosenColour);


// First, we use jQuery to select the button with the same id as the randomChosenColour. We first have a string of "#" to indicate that we're
// targeting an ID. Then, we use a '+'-symbol to combine the ID-tag with the value contained inside the variable called "randomChosenColor".
// Next, we use the 'fadeIn' and 'fadeOut'-methods to first make it appear as the button is fading in, then fading out and then fading in again.
// Each 'fade' only lasts 100 milliseconds, which results in a 'flashing'-animation of the targeted button.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);


// Just like we've done right before the 'nextSequence'-function, when a user clicked a button we've refactored the code in playSound()
// so that it will work for both playing sound in nextSequence() and when the user clicks a button.
  playSound(randomChosenColour);
}


// We change and alter the function 'playSound' to take a specific input of 'name'. This is not a defined variable, but just an indication to the function,
// that when the method is being called, it needs to take a certain parameter ()
function playSound(name) {


//We alter the code to take the 'name' as an input, when determining what sound-file should be played
// when the  'playSound'-.method is being called. Thus, by reqiering an input of 'name' when calling it function, we've
// actually made it a lot more flexible and able to acceptable a lot of different variables as inputs.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


// We create a new function called 'animatePress', and make it take a single input parameter called 'currentColour'.
function animatePress(currentColor) {


// We use jQuery ('$') to add the class called 'pressed' pressed to the button that gets clicked inside 'animatePress'-function.
// The way we access the button has been pressed, is by selecting the 'ID'-tag and combining it with the value of the variable 'currentColor'
// The 'currentColor' is the argument that's being passed in, whenever the function is being called and used.
// Finally, we use the 'addClass'-method to add the class called 'pressed' to the selected button.
  $("#" + currentColor).addClass("pressed");


//We use the 'setTimeout'-method to make what's kept inside the sepsequent function execute,
// when the timeout has suppsed. The duration of the timeout is defined in the last part of the code (the '100'), which is measured in milisecond.
//When the duration of the timeout occurs, the function inside will remove the class called 'pressed'.
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// This function called 'startOver' will reset the value of variable 'level' bnack to '0',
// the value of 'gamePattern' back to an empty array ( [] ) and the Boolean value of the
// variable 'started' back to 'false'.
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
