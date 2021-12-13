
let mistakes = 0  // start the game with 0 mistakes
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


document.getElementById('hint1').addEventListener("click", function(){hintme()}); //adds event listener to hint button

function hintme() {
    alert("The position in the grid corresponds to the factors of the hidden number!"); //creates an alert when hint button is
}


addEventListeners()
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
        index = answers.indexOf(currentQuestion) // indexes the answer
        showQuestion() // show the next question  
        Score()
    } else {
        mistakes ++ // add one to mistakes
        showMistakes() // show the mistakes
    }

    if (correct == 10) {
        alert("Congratulations, you defeated the Goomba!")
    }
    
}

function Score() { 
        document.getElementById("scorehere").innerHTML = correct;
}

Score()
//todolist ?blocks, fail threshold, reset win/fail, sounds, splash/victory screen, hint button, pedagogy