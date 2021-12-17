
let mistakes = 10  // start the game with 0 mistakes
let currentQuestion = 0// start at question number 0
let correct = 0 //counter for correct answers




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

showQuestion();


function showMistakes() {

    document.getElementById('errors').innerHTML = mistakes; //updates the number of mistakes, called when a mistake is made
 
}

showMistakes();

function addEventListeners() {
    
    for (let n = 1; n <= 100; n++) {
        
        document.getElementById(n).addEventListener("click", function(){checkAnswer(n)}); //adds event listeners to each grid button
        
    }
}
function toggleHintmodal() {
    hintmodal.classList.toggle("show-modal");
    hint.play();
    closeButton2.addEventListener("click", function(){toggleHintmodal()});
}


document.getElementById('hint1').addEventListener("click", function(){toggleHintmodal()}); //adds event listener to hint button


//sounds
var coin = new Howl({
    src: ['../sounds/coin.mp3']
  });

var hurt = new Howl({
    src: ['../sounds/hurt.wav']
  });

var victory = new Howl({
    src: ['../sounds/smw_course_clear.wav']
  });

var defeat = new Howl({
    src: ['../sounds/smw_game_over.wav']
  });

var hint = new Howl({
    src: ['../sounds/smw_pause.wav']
})

var bgm = new Howl({
    src: ['../sounds/bgm.mp3']
})

var letsago = new Howl({
    src: ['../sounds/sm64_mario_lets_go.wav']
})

addEventListeners()

//modals

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

function toggleintromodal() {
    intromodal.classList.toggle("show-modal");
    letsago.play();
    bgm.play();
    closeButton3.addEventListener("click",function(){toggleintromodal()} )
}

toggleintromodal();
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
        //index = answers.indexOf(currentQuestion) // indexes the answer (now redundant due to coding misadventure)
        showQuestion() // show the next question  
        Score()
        coin.play(); //baDING!

    } else {
        mistakes -- // lose health
        showMistakes() // show the mistakes
        hurt.play();//owwwww!
    }

    if (correct == 10) {
        toggleModal();
        //alert("Congratulations, you defeated the Goomba!");
        victory.play();
        //run a function to pull up a win modal
    }
    
    if (mistakes == 0) {
        toggleModal1();
        //alert("Oh dear, the Goomba Emerges victorious!");
        defeat.play();
        //run a function to pull up a lose modal
    }
}

function Score() { 
        document.getElementById("scorehere").innerHTML = correct;
}

Score()


//todolist  reset win/fail, sounds, modals, hint button, pedagogy, ? separate page with difficulty selection that changes required correct answers to win