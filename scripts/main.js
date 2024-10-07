let playerCards = [];
let dealerCards = [];

let playerScore = 0;
let dealerScore = 0;
let playerHTML = document.querySelector('#playerScore');
let dealerHTML = document.querySelector('#dealerScore');

let status = document.querySelector('#status');

let deck = [];
const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const repeatSuits = Array(6).fill(suits).flat();

let playerBalance = 1000;
let betAmount = 0;

let balanceHTML = document.querySelector('#money')

function placeBet(amount) {
    if (amount > playerBalance) {
        alert('Недостаточно средств');
    }
    else {
        betAmount = amount;
        playerBalance -= amount;
        updateBalance();
    }
}
function initDeck() {
    deck = [];
    for (let suit of repeatSuits) {
        for (let rank of ranks) {
            let cardValue = parseInt(rank);
            if (['J', 'Q', 'K'].includes(rank)) cardValue = 10;
            if (rank === 'A') cardValue = 11;
            deck.push({ suit, rank, value: cardValue})
        }
    }
    return deck
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomCard(deck) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    return deck[randomIndex];
}

function drawCard(player) {
    let card = deck.pop();
    let cardValue = card.value;

    // Путь к изображению карты
    let cardImagePath = `images/cards/${card.rank}_of_${card.suit}.png`;
    let cardSprite = document.createElement('img');
    cardSprite.src = cardImagePath;
    cardSprite.style.width = 'auto'; // Укажите нужный размер
    cardSprite.style.height = 'auto'; // Сохраняйте пропорции
        if (player === 'player') {
            document.querySelector('.player_cards').appendChild(cardSprite);
            playerCards.push(card);
            playerScore += cardValue;
            checkAce(playerCards, 'player');
        } else {
            document.querySelector('.dealer_cards').appendChild(cardSprite);
            dealerCards.push(card);
            dealerScore += cardValue;
            checkAce(dealerCards, 'dealer');
        }  
    playerHTML.innerHTML = playerScore;
    dealerHTML.innerHTML = dealerScore;
}

function checkAce(cards, player) {
    let score = player === 'player' ? playerScore : dealerScore;
    if (score > 21) {
        for (let card of cards) {
            if (card.rank === 'A' && card.value === 11) {
                card.value = 1;
                if (player === 'player') {
                    playerScore -= 10;
                } else {
                    dealerScore -= 10;
                }
                break;
            }
        }
    }
}


function checkWinner() {
    if (playerCards[0].value === 10 && playerCards[1].rank === 'A' || playerCards[1].value === 10 && playerCards[0].rank === 'A' ) {
        status.innerHTML = 'Blackjack'
        playerBalance += betAmount * 2.5;
        betAmount = 0;
        updateBalance();
        endGame();
    } else if (playerScore > 21) {        
        status.innerHTML = 'Loser';
        betAmount = 0;

        endGame();
    }
}

function dealerTurn() {
    while (dealerScore < 17) {
        drawCard('dealer');
    }
    if (dealerScore > 21 || playerScore > dealerScore) {
        playerBalance += betAmount * 2;
        betAmount = 0;
        updateBalance();
        status.innerHTML = "Вы выиграли!";
    } else if (playerScore === dealerScore) {
        playerBalance += betAmount;
        betAmount = 0;
        updateBalance();
        status.innerHTML = "Ничья!";
    } else {
        betAmount = 0;
        status.innerHTML = "Вы проиграли!";
    }
    endGame();
}
function updateBalance() {
    balanceHTML.innerHTML = `$${playerBalance}`
}
document.getElementById('newGame').addEventListener('click', function() {
    let betInput = document.getElementById('bet').value;
    placeBet(parseInt(betInput));
});

function endGame() {
    document.getElementById('newCard').setAttribute('disabled', '')
    document.getElementById('stop').setAttribute('disabled', '')

}

function startGame() {
    const div = document.querySelector('main');
    const image = div.querySelectorAll('img');
    image.forEach(img => img.remove());
    status.innerHTML = 'Игра в процессе';

    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;

    document.getElementById('newCard').removeAttribute('disabled', '');
    document.getElementById('stop').removeAttribute('disabled', '');

    initDeck();
    shuffle(deck);
    drawCard('player');
    drawCard('player');
    drawCard('dealer');
    checkWinner();
}
function newPart() {
    const div = document.querySelector('main');
    const image = div.querySelectorAll('img');
    image.forEach(img => img.remove());
    status.innerHTML = 'Игра в процессе';

    playerCards = [];
    dealerCards = [];
    playerScore = 0;
    dealerScore = 0;

    document.getElementById('newCard').removeAttribute('disabled', '');
    document.getElementById('stop').removeAttribute('disabled', '');

    drawCard('player');
    drawCard('player');
    drawCard('dealer');
    checkWinner();
}
document.getElementById('newCard').addEventListener('click', function() {
    drawCard('player');
    checkWinner();
});

document.getElementById('newCard').setAttribute('disabled', '')
document.getElementById('stop').setAttribute('disabled', '')
document.getElementById('stop').addEventListener('click', dealerTurn);
document.getElementById('newGame').addEventListener('click', startGame);
document.getElementById('newPart').addEventListener('click', newPart)
