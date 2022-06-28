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
}

function soundButton() {
    console.log('sound-btn');
}

function instructionsButton() {

    let instructions = document.getElementById('instructions');
    instructions.style.visibility = "visible";
}

function instructionsCloseButton() {

    let instructions = document.getElementById('instructions');
    instructions.style.visibility = "hidden";
}

function chooseLevel() {
    console.log('submit');
}

function runQuiz() {}

function checkAnswer() {}

function incrementScore() {}

function nextRound() {}

function endQuiz() {}