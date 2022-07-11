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
        question: 'How many groups are there in the 2022 Qatar World Cup?',
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
        question: 'Which animal correctly predicted 7 results in the 2010 World Cup?',
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
        question: 'What is the maximun number of players each team can take to the 2022 World Cup?',
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
        question: 'Which was the biggest win in a world cup game?',
        answers: [
            ['Hungary 10 x 1 El Salvador (1982)', 'correct'],
            ['Sweden 8 x 0 Cuba (1938)', 'wrong'],
            ['Germany 8 x 0 Saudi Arabia (2002)', 'wrong'],
            ['Uruguay 7 x 0 Scotland (1954)', 'wrong'],
        ]
    },
    {
        question: 'When was the first FIFA World Cup tournament?',
        answers: [
            ['1930 in Uruguay', 'correct'],
            ['1934 in Italy', 'wrong'],
            ['1938 in France', 'wrong'],
            ['1936 in Switzerland', 'wrong'],
        ]
    },
    {
        question: 'Which player has the most World Cup titles?',
        answers: [
            ['Pelé with 3 titles', 'correct'],
            ['Maradona with 2 titles', 'wrong'],
            ['Zidane with 2 titles', 'wrong'],
            ['Buffon with 3 titles', 'wrong'],
        ]
    },
    {
        question: 'Which team has the most matches in the World Cup?',
        answers: [
            ['Germany with 106', 'correct'],
            ['Brazil with 110', 'wrong'],
            ['Italy with 98', 'wrong'],
            ['Argentina with 102', 'wrong'],
        ]
    },
    {
        question: 'Which team reached the most finals?',
        answers: [
            ['Germanu 8 times', 'correct'],
            ['Brazil 7 times', 'wrong'],
            ['Italy 8 times', 'wrong'],
            ['Netherlands 6 times', 'wrong'],
        ]
    },
    {
        question: 'Which team scored the first World Cup goal?',
        answers: [
            ['France', 'correct'],
            ['England', 'wrong'],
            ['Argentina', 'wrong'],
            ['Uruguay', 'wrong'],
        ]
    },
    {
        question: 'Who is the oldest world champion?',
        answers: [
            ['Dino Zoff (Italy) 40 years', 'correct'],
            ['Maradona (Argentina) 36 years', 'wrong'],
            ['Klinsmann (Germany) 38 years', 'wrong'],
            ['Buffon (Italy) 39 years', 'wrong'],
        ]
    },
    {
        question: 'Which team has had the most penalty shootouts?',
        answers: [
            ['Argentina 5 times', 'correct'],
            ['Netherlands 4 times', 'wrong'],
            ['Spain 5 times', 'wrong'],
            ['France 6 times', 'wrong'],
        ]
    },
    {
        question: 'Which World Cup edition had the most goals?',
        answers: [
            ['France 1998 with 171', 'correct'],
            ['Brazil 1950 with 158', 'wrong'],
            ['Sweden 1958 with 202', 'wrong'],
            ['South Africa 2010 with 196', 'wrong'],
        ]
    },
    {
        question: 'Which turnament was the first to use goal line technology?',
        answers: [
            ['Brazil 2014', 'correct'],
            ['Russia 2018', 'wrong'],
            ['South Africa 2010', 'wrong'],
            ['Germany 2006', 'wrong'],
        ]
    },
    {
        question: 'Which game had the largest crowd?',
        answers: [
            ['Brazil x Uruguay (1950)', 'correct'],
            ['Italy x Czechoslovakia (1934)', 'wrong'],
            ['Spain x Netherland (2010)', 'wrong'],
            ['Germany x Hungary (1954)', 'wrong'],
        ]
    },
    {
        question: 'What was the first edition to award 3 points to the winner?',
        answers: [
            ['USA 1994', 'correct'],
            ['Italy 1990', 'wrong'],
            ['Mexico 1986', 'wrong'],
            ['Spain 1982', 'wrong'],
        ]
    },
    {
        question: 'Which tournament had the first penalty shootout?',
        answers: [
            ['Spain 1982', 'correct'],
            ['Urugay 1930', 'wrong'],
            ['Chile 1962', 'wrong'],
            ['Englan 1966', 'wrong'],
        ]
    },
    {
        question: 'Which team has played in every edition?',
        answers: [
            ['Brazil', 'correct'],
            ['Italy', 'wrong'],
            ['Cameroon', 'wrong'],
            ['France', 'wrong'],
        ]
    },
    {
        question: "When was the first FIFA Women's World Cup held?",
        answers: [
            ['1991 in China', 'correct'],
            ['1995 in Sweden', 'wrong'],
            ['1987 in Portugal', 'wrong'],
            ['1999 in USA', 'wrong'],
        ]
    },
    {
        question: 'Which team has scored the most goals all together?',
        answers: [
            ['Brazil 224', 'correct'],
            ['Germany 220', 'wrong'],
            ['Italy 231', 'wrong'],
            ['France 226', 'wrong'],
        ]
    },
    {
        question: 'Which player scored the most goals in a single tournament?',
        answers: [
            ['Fontaine 13 goals', 'correct'],
            ['Pelé 15 goals', 'wrong'],
            ['Maradona 14 goals', 'wrong'],
            ['Messi 12 goals', 'wrong'],
        ]
    },
    {
        question: 'Who was the only goalkeeper to have ever won the Golden Ball trophy?',
        answers: [
            ['Oliver Kahn', 'correct'],
            ['Buffon', 'wrong'],
            ['Gordon Banks', 'wrong'],
            ['Iker Casillas', 'wrong'],
        ]
    },
    {
        question: 'What is the offical pitch dimensions?',
        answers: [
            ['105m x 68m', 'correct'],
            ['100m x 70m', 'wrong'],
            ['90m x 60m', 'wrong'],
            ['110m x 70', 'wrong'],
        ]
    },
    {
        question: 'How manny different teams have won the World Cup?',
        answers: [
            ['8 teams', 'correct'],
            ['15 teams', 'wrong'],
            ['12 teams', 'wrong'],
            ['10 teams', 'wrong'],
        ]
    },
];