let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();

function pickComputerMove () {
    const randNumber = Math.random();
    let computerChoice = '';

    if (randNumber < 1/3) {
        computerChoice = 'rock';
    } else if (randNumber < 2/3) {
        computerChoice = 'paper';
    } else {
        computerChoice = 'scissors';
    }
    return computerChoice;
}

let isAutoPlaying = false;
let intervalID;
let buttonElem = document.querySelector('.auto-play-button');

function autoPlay() {
    if (!isAutoPlaying) {
       intervalID = setInterval(function() {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1500);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalID);
        isAutoPlaying = false;
    }

    if (buttonElem.innerText === 'Auto play') {
        buttonElem.innerHTML = 'Stop';
    } else {
        buttonElem.innerHTML = 'Auto play';
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {
        playGame('rock');
    })
document.querySelector('.js-paper-button')
    .addEventListener('click', () => {
        playGame('paper');
    })
document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {
        playGame('scissors');
    })

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock');
    } else if (event.key === 'p') {
        playGame('paper');
    } else if (event.key === 's') {
        playGame('scissors');
    }
})

function playGame (playerChoise) {
    const computerChoice = pickComputerMove();

    let result = '';
    if (playerChoise === 'scissors') {
        if (computerChoice === 'scissors') {
            result = 'Tie';
        } else if (computerChoice === 'rock') {
            result = 'You lost';
        } else {
            result = 'You won';
        }
    } else if (playerChoise === 'paper') {
        if (computerChoice === 'paper') {
            result = 'Tie';
        } else if (computerChoice === 'scissors') {
            result = 'You lost';
        } else {
            result = 'You won';
        }
    } else {
        if (computerChoice === 'rock') {
            result = 'Tie';
        } else if (computerChoice === 'paper') {
            result = 'You lost';
        } else {
            result = 'You won';
        }
    }

    if (result === 'You won') {
        score.wins++;
    } else if (result === 'You lost') {
        score.losses++;
    } else if (result === 'Tie') {
        score.ties++;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result')
        .innerHTML = result;

    document.querySelector('.js-moves')
        .innerHTML = `You
            <img src="images/${playerChoise}-emoji.png" class="move-icon">
            <img src="images/${computerChoice}-emoji.png" class="move-icon">
            Computer`;

    /*
    alert(`You chose ${playerChoise} and the computer chose ${computerChoice}. ${result}!
    Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`);
    */
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
