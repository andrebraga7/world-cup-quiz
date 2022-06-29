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
var quizArea = document.getElementById('quiz-area');

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
        <button id="group-stage" data-type="level-selection" class="btn-green">Group stage</button>
        <br>
        <button id="cup-final" data-type="level-selection" class="btn-green">Cup final</button>
        `;
    }

    // Add event listeners only to the level buttons.
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        if (button.getAttribute('data-type') === 'level-selection') {
            this.addEventListener('click', runQuiz);
        }
    }

}

function runQuiz() {

    
    console.log('running');

}

function checkAnswer() {}

function incrementScore() {}

function nextRound() {}

function endQuiz() {}