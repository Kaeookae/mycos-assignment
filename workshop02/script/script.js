let currentBet = 0;
let betType = '';
let balance = 100; // Initial balance

function placeBet(type) {
    const betAmount = parseInt(document.getElementById('betAmount').value) || 0;

    if (betAmount <= 0) {
        alert("Please enter a valid bet amount before placing a bet.");
        return; // Exit the function if no valid bet amount is entered
    }

    // Clear active class from all buttons
    const buttons = document.querySelectorAll('.bet-options button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Set the active class on the selected button
    betType = type; // Set the bet type
    const selectedButton = document.querySelector(`.bet-options button[onclick="placeBet('${type}')"]`);
    selectedButton.classList.add('active');
}

function rollDice() {
    const betAmount = parseInt(document.getElementById('betAmount').value) || 0;
    if (betAmount <= 0) {
        alert("Please enter a bet amount before rolling the dice.");
        return; // Exit the function if no bet is placed
    }

    // Roll three dice
    const dice1 = Math.floor(Math.random() * 6) + 1;
    const dice2 = Math.floor(Math.random() * 6) + 1;
    const dice3 = Math.floor(Math.random() * 6) + 1;

    // Update the dice images
    document.getElementById('dice1').src = `images/Dice${dice1}.png`;
    document.getElementById('dice2').src = `images/Dice${dice2}.png`;
    document.getElementById('dice3').src = `images/Dice${dice3}.png`;

    // Calculate the total of the rolled dice
    const total = dice1 + dice2 + dice3;

    // Determine the result based on the bet type
    let resultMessage = '';
    if (betType === 'high' && total >= 12) {
        resultMessage = `You win! Total: ${total}`;
        updateBalance(betAmount * 2); // Double the bet amount
    } else if (betType === 'mid' && total === 11) {
        resultMessage = `You win! Total: ${total}`;
        updateBalance(betAmount * 5); // 5x reward for Mid
    } else if (betType === 'low' && total <= 10) {
        resultMessage = `You win! Total: ${total}`;
        updateBalance(betAmount * 2); // Double the bet amount
    } else {
        resultMessage = `You lose! Total: ${total}`;
        updateBalance(-betAmount); // Decrease balance
    }

    // Display the result message
    document.getElementById('resultMessage').innerText = resultMessage;
}

function updateBalance(amount) {
    balance += amount;
    updateBalanceDisplay();
}

function updateBalanceDisplay() {
    document.getElementById('balance').innerText = balance;
}

function resetBalance() {
    balance = 100;
    updateBalanceDisplay();
    alert("Your balance has been reset to $100.");
}

function increaseBet() {
    const betAmountInput = document.getElementById('betAmount');
    currentBet = parseInt(betAmountInput.value) || 0;
    currentBet += 10;
    betAmountInput.value = currentBet;
}

function resetBet() {
    currentBet = 0;
    document.getElementById('betAmount').value = '';
    document.getElementById('resultMessage').innerText = "Bet amount has been reset.";
    betType = ''; // Reset bet type
}