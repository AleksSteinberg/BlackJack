let playerHTML = document.querySelector('#playerScore');
let dealerHTML = document.querySelector('#dealerScore');

function initDeck() {
    deck = [];
    for (let suit of suits) {
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