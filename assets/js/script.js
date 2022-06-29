// Wait for the DOM to finish loading before proceeding
// Add event listener to the initial buttons

document.addEventListener('DOMContentLoaded', controls);

/** 
 * The function that is called when the DOM finishes loading
 * adds event listener to the four initial buttons.
*/
function controls() {

    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            
            // gets the button's id
            let id = this.getAttribute('id');
            
            //run the specific function for the button depending on the id
            switch(id) {
                case 'submit':
                    chooseLevel();
                    break;
                case 'sound-btn':
                    soundButton();
                    break;
                case 'instructions-btn':
                    instructionsButton();
                    break;
                case 'instructions-close':
                    instructionsCloseButton();
                    break;
                default:
                    throw 'Unknown button';
            }
        })
    }

    // Event listener for the enter key on the username input field.
    document.getElementById('username').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            chooseLevel();
        }
    })

}

// Global variable for the quiz area.
let quizArea = document.getElementById('quiz-area');

/**
 * Changes the sound button icon from ON to OFF
 * and stops playing sound in the DOM back and forth.
 */
function soundButton() {

    let icon = document.getElementById('sound-btn');

    if (icon.value == 'on') {
        icon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        icon.value = "off";
    } else {
        icon.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        icon.value = "on";
    }

}

/**
 * Open the instructions.
 */
function instructionsButton() {

    let instructions = document.getElementById('instructions');
    instructions.style.visibility = "visible";

}

/**
 * Close the instructions.
 */
function instructionsCloseButton() {

    let instructions = document.getElementById('instructions');
    instructions.style.visibility = "hidden";

}

/**
 * Get the username and if empty display a warning message,
 * if username is completed load the choose level template literals.
 */
function chooseLevel() {

    let user = document.getElementById('username').value;
    
    if (user == '') {
        document.getElementById('empty-username').style.visibility = "visible";
    } else {
        quizArea.innerHTML = `
        <h2>${user}, select your level of difficulty!</h2>
        <button data-level="group-stage" class="btn-green">Group stage</button>
        <br>
        <button data-level="cup-final" class="btn-green">Cup final</button>
        `;
    }

    // Add event listeners only to the level selection buttons
    // and pass user and level to the runQuiz().
    let levelButtons = document.querySelectorAll('[data-level');

    for (let button of levelButtons) {
        button.addEventListener('click', function() {
            let level = this.getAttribute('data-level');
            runQuiz(user, level);
        });
    }

}

function runQuiz(user, level) {

    let score = 0;
    let round = 0;
    let question = "A random question from an Array?"
    let answer = [1,2,3,4];

    quizArea.innerHTML = `
    <div id="game-info">
        <div><span>${user}</span></div>
        <div><span>Score: ${score} </span></div>
        <div><span>Round: ${round} / 7</span></div>
    </div>
    <p id="question">${question}</p>
    <div id="answers">
        <button class="btn-answer" id="answer1">${answer[0]}</button>
        <button class="btn-answer" id="answer2">${answer[1]}</button>
        <button class="btn-answer" id="answer3">${answer[2]}</button>
        <button class="btn-answer" id="answer4">${answer[3]}</button>
    </div>
    <button id="next">Next round</button>
    `;

}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function checkAnswer() {}

function incrementScore() {}

function nextRound() {}

function endQuiz() {}