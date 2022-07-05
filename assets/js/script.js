// Wait for the DOM to finish loading before proceeding
// Add event listener to the initial buttons

document.addEventListener('DOMContentLoaded', controls);

/** 
 * This function is called when the DOM finishes loading
 * adds event listener to the four initial buttons.
*/
function controls() {

    let buttons = document.getElementsByTagName('button');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            
            // gets the button's id
            let id = this.getAttribute('id');
            
            //call the specific function for the button depending on the id
            switch(id) {
                case 'submit':
                    captureUser();
                    break;
                case 'sound-btn':
                    soundButton();
                    break;
                case 'instructions-btn':
                    instructionsButton();
                    break;
                case 'instructions-close':
                    instructionsButton();
                    break;
                default:
                    throw 'Unknown button';
            }
        })
    }

    // Event listener for the enter key on the username input field.
    document.getElementById('username').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            captureUser();
        }
    })

}

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
 * Open and close the instructions.
 */
function instructionsButton() {

    let buttons = document.querySelectorAll('[data-button="instructions"]');
    let instructions = document.getElementById('instructions');

    for (let button of buttons) {
        if (button.value == 'hidden') {
            button.value = "visible";
            instructions.style.visibility = "visible";
        } else {
            button.value = "hidden";
            instructions.style.visibility = "hidden";
        }
    }

}

// Higher scope variables to be used in different functions
let quizArea = document.getElementById('quiz-area');
let user;
let level;
let quizQuestions;

/**
 * Captures the username before calling the chooseLevel().
 */
function captureUser() {

    user = document.getElementById('username').value;

    if (testPattern()) {
        chooseLevel();
    } else {
        document.getElementById('empty-username').style.visibility = "visible";
    }

}

/**
 * Tests the pattern of the username input agains the regular expression.
 */
function testPattern() {

    // Allow uppercase, lowercase, numbers and underline, must have at least one alphabet and min 2 character
    // regular expression made with https://regex101.com
    let regExp = /^(?=.*[a-zA-Z]{1,})(?=.*[\d]{0,})[a-zA-Z0-9_]{2,15}$/;

    return regExp.test(user);

}

/**
 * Get the username and if empty display a warning message,
 * if username is completed load the choose level template literals.
 */
function chooseLevel() {

    quizArea.innerHTML = `
    <h2>${user}, select your level of difficulty!</h2>
    <button data-level="group-stage" class="btn-green">Group stage</button>
    <br>
    <button data-level="cup-final" class="btn-green">Cup final</button>
    `;

    // Add event listeners to the level selection buttons
    // and pass level to the generateQuestions().
    let levelButtons = document.querySelectorAll('[data-level]');

    for (let button of levelButtons) {
        button.addEventListener('click', function() {
            level = this.getAttribute('data-level');
            generateQuestions(level);
        });
    }

}

/**
 * Generates the quiz questions by retrieving the corresponding level array,
 * shuffling the order with the shuffle function and selecting only the first 10 questions.
 */
function generateQuestions(level) {

    switch(level) {
        case 'group-stage':
            quizQuestions = shuffle(groupStageArray).slice(0, 10);
            break;
        case 'cup-final':
            quizQuestions = shuffle(cupFinalArray).slice(0, 10);
            break;
        default:
            throw 'Unknown level';
    }

    shuffleAnswers();
}

/**
 * Shuffles the order of the answers of each question by calling the shuffle functions.
 */
function shuffleAnswers() {

    for (let answersArray of quizQuestions) {
        shuffle(answersArray.answers);
    }

    runQuiz();

}

/**
 * This will shuffle the input array and return a randomized order array.
 * The code for this function follows the Fisher Yates method.
 */
function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;

}

// Initial score and round count.
let score = 0;
let round = 1;

/**
 * Displays the question and answers with a next button that calls the nextRound().
 */
function runQuiz() {

    let question = quizQuestions[round -1].question;
    let answer = quizQuestions[round -1].answers;

    // Template literals for the question and answers display.
    quizArea.innerHTML = `
    <div id="game-info">
        <div><span>${user}</span></div>
        <div><span id="score">Score: ${score}</span></div>
        <div><span>Round: ${round} / 10</span></div>
    </div>
    <p id="question">${question}</p>
    <div id="answers">
        <button class="btn-answer" data-answer="${answer[0][1]}">${answer[0][0]}</button>
        <button class="btn-answer" data-answer="${answer[1][1]}">${answer[1][0]}</button>
        <button class="btn-answer" data-answer="${answer[2][1]}">${answer[2][0]}</button>
        <button class="btn-answer" data-answer="${answer[3][1]}">${answer[3][0]}</button>
    </div>
    <button id="next" class="btn-green-medium" value="no-click">Next round</button>
    `;

    // Add event listeners to the answers button.
    let answerButtons = document.querySelectorAll('[data-answer]');

    for (let button of answerButtons) {
        button.addEventListener('click', function() {
            let answerClicked = this.getAttribute('data-answer');
            checkAnswer(answerClicked, button, answerButtons);
            buttonStyles(button, answerButtons);
        })
    }

}

/**
 * Check the answer and changes the button background color to green or red.
 */
function checkAnswer(answerClicked, button, answerButtons,) {

    if (answerClicked === 'correct') {
        button.style.backgroundColor = "lightgreen";
        incrementScore();
    } else {
        button.style.backgroundColor = "lightcoral";
    }

    // Change the value to clicked and
    // call nextRound when next round button is clicked.
    let nextButton = document.getElementById('next');
    nextButton.value = "clicked";

    nextButton.addEventListener('click', nextRound);
    document.addEventListener('keydown', eventEnter);

}

/**
 * The eventHandler for the Enter keydown
 */
function eventEnter(event) {
    if (event.key === 'Enter') {
        nextRound();
    }
}

/**
 * Adds a bborder to the correct answer and disables the buttons.
 */
function buttonStyles(button, answerButtons) {

    // Set the left border of the correct answer to a solid green
    let correctAnswer = document.querySelector('[data-answer="correct"]');
    correctAnswer.style.borderLeft = "solid 10px green";

    // Disables the answer buttons and removes event listeners.
    for (button of answerButtons) {
    button.style.pointerEvents = "none";
    button.setAttribute('disabled', '');       
}

}

/**
 * Increment the score by one.
 */
function incrementScore() {
    ++score;
    let oldScore = document.getElementById('score');
    oldScore.innerHTML = `Score: ${score}`;
}

/**
 * Increment the round and call runQuiz() if round <= to 10.
 * Also removes the Enter eventHandler from the document
 */
function nextRound() {

    // Remove the Enter key eventListener for the next round.
    document.removeEventListener('keydown', eventEnter);

    if (round < 10) {
        ++round;
        runQuiz();
    } else {
        endQuiz();
    }
}

/**
 * Display the result of the quiz and gives options to the user to play again or exit.
 */
function endQuiz() {

    let icon;
    let message;

    // Displays three different messages depending on the score
    if (score < 4) {
        icon = `<i class="fa-solid fa-futbol"></i>`;
        message = "Here's a football so you can practice!";
    } else if (score > 3 && score < 8) {
        icon = `<i class="fa-solid fa-plane-departure"></i>`;
        message = "You didn't qualify for the final, time to go home!";
    } else {
        icon = `<i class="gold fa-solid fa-trophy"></i>`;
        message = "Congratulations, you won the world cup!";
    }
    
    quizArea.innerHTML = `
    <h2 id="end-game-h2">${user} you scored <span>${score}</span>!</h2>
    <div id="result">
        <span>${icon}</span>
        <h2>${message}</h2>
    </div>
    <button class="btn-green-medium" data-options="play-again">Play again</button>
    <br>
    <button class="btn-green-medium" data-options="new-level">Choose level</button>
    <br>
    <button class="btn-green-medium" data-options="exit">End game</button>
    `;


    // Add event listeners to the option buttons
    let buttons = document.querySelectorAll('[data-options]');

    for (let button of buttons) {
        button.addEventListener('click', function() {
            
            // Get the button id
            let id = this.getAttribute('data-options');

            switch(id) {
                case 'play-again':
                    score = 0;
                    round = 1;
                    generateQuestions(level);
                    break;
                case 'new-level':
                    score = 0;
                    round = 1;
                    chooseLevel();
                    break;
                case 'exit':
                    location.reload();
                    break;
                default:
                    throw 'Unknown button at endQuiz()';
            }

        })
    }

}

// Array of questions and answers for the group stage level
let groupStageArray = [
    {
        question: 'What is the answer 1?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 2?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 3?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 4?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 5?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 6?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 7?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 8?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 9?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 10?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 11?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 12?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 13?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 14?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 15?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 16?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 17?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 18?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 19?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 20?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
];

// Array of questions and answers for the cup final level

let cupFinalArray = [
    {
        question: 'What is the answer 1?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 2?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 3?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 4?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 5?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 6?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 7?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 8?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 9?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 10?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 11?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 12?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 13?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 14?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 15?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 16?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 17?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 18?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 19?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
    {
        question: 'What is the answer 20?',
        answers: [
            ['answer1', 'correct'],
            ['answer2', 'wrong'],
            ['answer3', 'wrong'],
            ['answer4', 'wrong'],
        ]
    },
];