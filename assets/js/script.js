// Wait for the DOM to finish loading before proceeding
// Add event listener to the initial buttons

document.addEventListener('DOMContentLoaded', controls);

// Link audios for the quiz
let audioClick = document.getElementById('audio-click');
let audioCorrect = document.getElementById('audio-correct');
let audioWrong = document.getElementById('audio-wrong');
let audioSuccess = document.getElementById('audio-success');
let audioFailure = document.getElementById('audio-failure');


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
    let audioElements = document.getElementsByTagName('audio');

    if (icon.value == 'on') {
        icon.innerHTML = `<i class="fa-solid fa-volume-xmark"></i>`;
        icon.value = "off";
        for (let audio of audioElements) {
            audio.muted = true;
        }
    } else {
        icon.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
        icon.value = "on";
        for (let audio of audioElements) {
            audio.muted = false;
        }
    }

    audioClick.play();

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

    audioClick.play();

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

    audioClick.play();

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
            audioClick.play();
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
        audioCorrect.play();
    } else {
        button.style.backgroundColor = "lightcoral";
        audioWrong.play();
    }

    // call nextRound when next round button is clicked.
    let nextButton = document.getElementById('next');

    nextButton.addEventListener('click', function() {
        audioClick.play();
        nextRound();
    });
    document.addEventListener('keydown', eventEnter);

}

/**
 * The eventHandler for the Enter keydown
 */
function eventEnter(event) {
    if (event.key === 'Enter') {
        audioClick.play();
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
        audioFailure.play();
    } else if (score > 3 && score < 8) {
        icon = `<i class="fa-solid fa-plane-departure"></i>`;
        message = "You didn't qualify for the final, time to go home!";
        audioFailure.play();
    } else {
        icon = `<i class="gold fa-solid fa-trophy"></i>`;
        message = "Congratulations, you won the world cup!";
        audioSuccess.play();
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
                    audioClick.play();
                    generateQuestions(level);
                    break;
                case 'new-level':
                    score = 0;
                    round = 1;
                    audioClick.play();
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
        question: 'What was the official 2010 World Cup song?',
        answers: [
            ['Waka Waka (This Time For Africa) by Shakira', 'correct'],
            ["Livin' La Vida Loca by Ricky Martin", 'wrong'],
            ['We Are One (Ole Ola) by Pitbull', 'wrong'],
            ['Seven Nation Army by The White Stripes', 'wrong'],
        ],
    },
    {
        question: 'How many teams will the 2022 Qatar World Cup have?',
        answers: [
            ['32', 'correct'],
            ['64', 'wrong'],
            ['24', 'wrong'],
            ['48', 'wrong'],
        ],
    },
    {
        question: "What happens if there's a draw in the knockout stage?",
        answers: [
            ['Extra time and then penalty shootout', 'correct'],
            ['Straight to penalty shootout', 'wrong'],
            ['Golden goal', 'wrong'],
            ['Golden goal and then penalty shootout', 'wrong'],
        ],
    },
    {
        question: 'How many teams are in each group?',
        answers: [
            ['4', 'correct'],
            ['6', 'wrong'],
            ['3', 'wrong'],
            ['8', 'wrong'],
        ],
    },
    {
        question: 'How many groups are are there in the 2022 Qatar World Cup?',
        answers: [
            ['8 groups', 'correct'],
            ['16 groups', 'wrong'],
            ['12 groups', 'wrong'],
            ['6 groups', 'wrong'],
        ],
    },
    {
        question: "How many substitutions we're allowed in the 2014 Brazil World Cup?",
        answers: [
            ['3', 'correct'],
            ['5', 'wrong'],
            ['4', 'wrong'],
            ['6', 'wrong'],
        ],
    },
    {
        question: 'Which teams played the 2010 South Africa World Cup Final?',
        answers: [
            ['Spain and Netherlands', 'correct'],
            ['Argentina and Germany', 'wrong'],
            ['France and Croatia', 'wrong'],
            ['Brazil and Germany', 'wrong'],
        ],
    },
    {
        question: 'Which team has the most World Cup titles?',
        answers: [
            ['Brazil', 'correct'],
            ['Germany', 'wrong'],
            ['Italy', 'wrong'],
            ['France', 'wrong'],
        ],
    },
    {
        question: 'Which country hosted the 2006 World Cup?',
        answers: [
            ['Germany', 'correct'],
            ['France', 'wrong'],
            ['USA', 'wrong'],
            ['Russia', 'wrong'],
        ],
    },
    {
        question: 'What happened to Zinedine Zidane in the 2006 World Cup final?',
        answers: [
            ['He was sent of with a red card', 'correct'],
            ['Won the title with France', 'wrong'],
            ['Scored 4 goals', 'wrong'],
            ['Missed the last penalty shot', 'wrong'],
        ],
    },
    {
        question: 'How many titles did Pelé win with Brazil?',
        answers: [
            ['3', 'correct'],
            ['2', 'wrong'],
            ['1', 'wrong'],
            ['4', 'wrong'],
        ],
    },
    {
        question: 'How many matches does a team play to win the title?',
        answers: [
            ['7 games', 'correct'],
            ['6 games', 'wrong'],
            ['8 games', 'wrong'],
            ['5 games', 'wrong'],
        ],
    },
    {
        question: 'Which animal correctly predicted 7 games in the 2010 World Cup?',
        answers: [
            ['Paul the octopus', 'correct'],
            ['Sally the salamander', 'wrong'],
            ['Mike the monkey', 'wrong'],
            ['Emily the elephant', 'wrong'],
        ],
    },
    {
        question: 'How many players of each team start a match?',
        answers: [
            ['11', 'correct'],
            ['12', 'wrong'],
            ['10', 'wrong'],
            ['9', 'wrong'],
        ],
    },
    {
        question: 'How many stadiums will the 2022 Qatar World Cup have?',
        answers: [
            ['8 stadiums', 'correct'],
            ['6 stadiums', 'wrong'],
            ['4 stadiums', 'wrong'],
            ['3 stadiums', 'wrong'],
        ],
    },
    {
        question: 'Which player is the highest goalscorer in the World Cup tournaments?',
        answers: [
            ['Klose', 'correct'],
            ['Ronaldo', 'wrong'],
            ['Pelé', 'wrong'],
            ['Klinsmann', 'wrong'],
        ],
    },
    {
        question: 'How many minutes is the regular time?',
        answers: [
            ['90 minutes', 'correct'],
            ['80 minutes', 'wrong'],
            ['70 minutes', 'wrong'],
            ['60 minutes', 'wrong'],
        ],
    },
    {
        question: 'What is the maximun number of player each team can take to the 2022 World Cup?',
        answers: [
            ['26 players', 'correct'],
            ['24 players', 'wrong'],
            ['23 players', 'wrong'],
            ['20 players', 'wrong'],
        ],
    },
    {
        question: 'How many games does each team play in the group stage?',
        answers: [
            ['3 games', 'correct'],
            ['4 games', 'wrong'],
            ['6 games', 'wrong'],
            ['5 games', 'wrong'],
        ],
    },
    {
        question: 'How often does the World Cup happen?',
        answers: [
            ['Every 4 years', 'correct'],
            ['Every 3 years', 'wrong'],
            ['Every 2 years', 'wrong'],
            ['Every 5 years', 'wrong'],
        ],
    },
];

// Array of questions and answers for the cup final level

let cupFinalArray = [
    {
        question: 'What is the biggest win in a world cup game?',
        answers: [
            ['Yugoslavia 9 x 0 Zaire (1974)', 'correct'],
            ['Sweden 8 x 0 Cuba (1938)', 'wrong'],
            ['Germany 8 x 0 Saudi Arabia (2002)', 'wrong'],
            ['Uruguay 7 x 0 Scotland (1954)', 'wrong'],
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