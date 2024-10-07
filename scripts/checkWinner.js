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