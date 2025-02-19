let currentBet = 0;
let betType = '';
let balance = 100; // Initial balance

function placeBet(type) {
    const betAmountInput = document.getElementById('betAmount');
    currentBet = parseInt(betAmountInput.value);

    if (isNaN(currentBet) || currentBet <= 0) {
        alert("Please enter a valid bet amount!");
        return;
    }

    if (currentBet > balance) {
        alert("You cannot bet more than your current balance!");
        return;
    }

    balance -= currentBet; // Deduct the bet amount from balance
    betType = type;
    document.getElementById('resultMessage').innerText = `You bet $${currentBet} on ${type}. Roll the dice!`;
    updateBalanceDisplay(); // Update balance display

    // Change button color
    const buttons = document.querySelectorAll('.bet-options button');
    buttons.forEach(button => {
        button.style.backgroundColor = ''; // Reset color
    });
    event.target.style.backgroundColor = '#707b7c'; // Change color to a highlight color
}

function rollDice() {

    if (isNaN(currentBet) || currentBet <= 0) {
        alert("Please enter a valid bet amount!");
        return;
    }

    if (currentBet > balance) {
        alert("You cannot bet more than your current balance!");
        return;
    }

    if (currentBet <= 0) {
        alert("Please place a bet first!");
        return;
    }

    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;
    const sum = dice1 + dice2 + dice3;

    document.getElementById('dice1').src = `images/dice${dice1}.png`;
    document.getElementById('dice2').src = `images/dice${dice2}.png`;
    document.getElementById('dice3').src = `images/dice${dice3}.png`;

    let resultMessage = `You rolled: ${sum}. `;

    if (betType === 'high' && sum >= 12) {
        balance += currentBet * 2; // Win
        resultMessage += `You win! Total: $${currentBet * 2}`;
    } else if (betType === 'mid' && sum === 11) {
        balance += currentBet * 5; // Win
        resultMessage += `You win! Total: $${currentBet * 5}`;
    } else if (betType === 'low' && sum <= 10) {
        balance += currentBet * 2; // Win
        resultMessage += `You win! Total: $${currentBet * 2}`;
    } else {
        resultMessage += "You lose!";
    }

    document.getElementById('resultMessage').innerText = resultMessage;
    updateBalanceDisplay(); // Update balance display
}

function updateBalanceDisplay() {
    document.getElementById('balance').innerText = balance;
}

function resetBalance() {
    balance = 100; // Reset balance to initial amount
    updateBalanceDisplay(); // Update balance display
    alert("Your balance has been reset to $100.");
}
function increaseBet() {
    const betAmountInput = document.getElementById('betAmount');
    currentBet = parseInt(betAmountInput.value) || 0; // Get current bet amount or default to 0
    currentBet += 10; // Increase bet amount by $10
    betAmountInput.value = currentBet; // Update input field
}

function resetBet() {
    currentBet = 0; // Reset current bet
    document.getElementById('betAmount').value = ''; // Clear the input field
    document.getElementById('resultMessage').innerText = "Bet amount has been reset.";
}