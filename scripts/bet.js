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

function updateBalance() {
    balanceHTML.innerHTML = `$${playerBalance}`
}

document.getElementById('newGame').addEventListener('click', function() {
    let betInput = document.getElementById('bet').value;
    placeBet(parseInt(betInput));
});