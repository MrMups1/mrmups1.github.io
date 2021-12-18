
let mistakes = 10  // start the game with 0 mistakes
let currentQuestion = 0// start at question number 0
let correct = 0 //counter for correct answers

//sorts scaling
var scale = 'scale(1)';

 document.body.style.msTransform = scale;       
 document.body.style.transform = scale; 


// the answers array should contain all possible combinations from the 10 times table including repeated value 
let answers = [];
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        answers.push(i*j)
    }
}

// this code randomises the order of the answers array
answers = answers.sort(() => Math.random() - 0.5)

function showQuestion() {
        document.getElementById('Question').innerHTML = (answers[currentQuestion])//sets the array entry to be the question
    }

showQuestion(); //runs function on page load


function showMistakes() {

    document.getElementById('errors').innerHTML = mistakes; //updates the number of mistakes, called when a mistake is made
 
}

showMistakes();//updates the health on page refresh, starting at 10

function addEventListeners() {
    
    for (let n = 1; n <= 100; n++) {
        
        document.getElementById(n).addEventListener("click", function(){checkAnswer(n)}); //adds event listeners to each grid button
        
    }
}
//function to toggle the hint modal
function toggleHintmodal() {
    hintmodal.classList.toggle("show-modal");
    hint.play();
    closeButton2.addEventListener("click", function(){toggleHintmodal()});
}


document.getElementById('hint1').addEventListener("click", function(){toggleHintmodal()}); //adds event listener to hint button


//defines sounds for howler.js to control
var coin = new Howl({
    src: ['../sounds/coin.mp3']
  })

var hurt = new Howl({
    src: ['../sounds/hurt.wav']
  })

var victory = new Howl({
    src: ['../sounds/smw_course_clear.wav']
  })

var defeat = new Howl({
    src: ['../sounds/smw_game_over.wav']
  })

var hint = new Howl({
    src: ['../sounds/smw_pause.wav']
})

var bgm = new Howl({
    src: ['../sounds/bgm.mp3'],
    volume: 0.8
})

var letsago = new Howl({
    src: ['../sounds/sm64_mario_lets_go.wav']
})

addEventListeners()//adds event listeners to all the buttons on page load

//modals

// setup of constants for modal control
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close-button");
const modal1 = document.querySelector(".modal1");
const closeButton1 = document.querySelector(".close-button1");
const hintmodal = document.querySelector(".hintmodal");
const closeButton2 = document.querySelector(".close-button2");
const intromodal = document.querySelector(".intromodal");
const closeButton3 = document.querySelector(".close-button3");

//reload page function
function reload() {
    document.location.reload(true);
}

//win modal

function toggleModal() {
    modal.classList.toggle("show-modal");
    closeButton.addEventListener("click", function(){reload()});
}

//lose modal

function toggleModal1() {
    modal1.classList.toggle("show-modal");
    closeButton1.addEventListener("click", function(){reload()});
}

//introduction modal, for closing intro modal
function toggleintromodal() {
    intromodal.classList.toggle("show-modal");
    letsago.play();
    bgm.play();
    closeButton3.addEventListener("click",function(){toggleintromodal()})
}
//pulls up the intro modal on page refresh without starting sounds
function refresh() {
    intromodal.classList.toggle("show-modal");
    bgm.stop();
    closeButton3.addEventListener("click",function(){toggleintromodal()})
}
refresh();//calls the refresh function to pull up the intro modal

// show the first question
function checkAnswer(n) {
    
    // get the current question
    let question = (answers[currentQuestion])
    
    
    // these three lines use the id of the button, i, to work out 
    // which row and column the button was
    let I = n - 1
    let row = (I % 10) + 1
    let col = (Math.floor(I / 10)) + 1

    // check if row*col == question
    // if yes the user was correct
    if (row*col == question) {
        document.getElementById(n).parentElement.innerHTML = row*col //show the row*col multiplication in place of the button
        currentQuestion ++ // move on to the next question
        correct ++ //add a correct answer
        showQuestion() // show the next question  
        Score() //runs the score function to update the score
        coin.play(); //baDING!

    } else {
        mistakes -- // lose 1 health
        showMistakes() // update the mistakes html
        hurt.play();//owwwww!
    }

    if (correct == 10) {//when the win condition is reached
        toggleModal();//pull up the win modal
        bgm.stop();//stop the background music
        victory.play();//play the victory music
        
    }
    
    if (mistakes == 0) {//when the lose condition is reached
        toggleModal1();//pull up the lose modal
        bgm.stop();//stop the background music
        defeat.play();//play the defeat music
 
    }
}

function Score() { //updates the coins html
        document.getElementById("scorehere").innerHTML = correct;
}

Score()//updates score on refresh to start at 0


