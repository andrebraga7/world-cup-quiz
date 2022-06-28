// Wait for the DOM to finish loading before proceeding
// Add event listeners to the initial buttons

document.addEventListener('DOMContentLoaded', controls);

/** 
 * The function that is called when the DOM finishes loading
 * adds event listeners to the four initial buttons
*/
function controls() {
    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            let id = this.getAttribute('id');
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
}

function soundButton() {
    console.log('sound-btn');
}

function instructionsButton() {
    console.log('instructions-btn');
}

function instructionsCloseButton() {
    console.log('instructions-close');
}

function chooseLevel() {
    console.log('submit');
}

function runQuiz() {}

function checkAnswer() {}

function incrementScore() {}

function nextRound() {}

function endQuiz() {}