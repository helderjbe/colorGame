// Get required elements
var grid = document.getElementsByClassName("option");
var guess = document.querySelector("h1 span:nth-of-type(1)");
var playAgain = document.querySelector("table tr td:nth-of-type(1)");
var instructions = document.querySelector("table tr td:nth-of-type(2)");
var difficulty = document.querySelector("table tr td:nth-of-type(3)");
var header = document.querySelector("#title");
var winnerText = document.querySelector("h1 span:nth-of-type(2)");

// Params
var hardMode = false;
var hardModeBefore = false;
var count = 0;

// Event handlers
playAgain.addEventListener("click", reload);
difficulty.addEventListener("click", function() {
    if (hardMode) {
        hardMode = false;
        difficulty.textContent = "Harder pls!";
    } else {
        hardMode = true;
        difficulty.textContent = "Easier pls!";
    }
    
    reload();
});
instructions.addEventListener("click", function(){
    winnerText.innerHTML = " Combine the RGB(Red, Green, Blue)<br>Colors go from 0(none) to 255(a lot)";
});

// First start
reload();

function clickAction() {
    if (guess.textContent == this.style.backgroundColor) { // Win
        if (count == 2) return; // If lost do not allow execution
        if (hardMode) {
            setBackgroundColor(grid.length, this.style.backgroundColor);
        } else {
            setBackgroundColor(grid.length/2, this.style.backgroundColor);
        }
        header.style.backgroundColor = this.style.backgroundColor;
        playAgain.textContent = "Play Again?";
        winnerText.textContent = "Awesome, I'm proud of you";
    }
    else {
        if (count == 0) {
            // Remove the option
            this.style.backgroundColor = "#1a1a1a";
            this.removeEventListener("click", clickAction);
            winnerText.textContent = "Nope! One more try, don't disappoint me";
            count = 1;
        } else {
            // Lose
            header.style.backgroundColor = guess.textContent;
            playAgain.textContent = "Play Again?";
            winnerText.textContent = "*Facepalm* This was the right color";
            count = 2;
        }
        
    }
}

// Reset the game
function reload() {
    header.style.backgroundColor = "steelblue";
    winnerText.textContent = "What color is this one?";
    playAgain.textContent = "New colors";
    count = 0;

    if (hardMode) {
        updater(grid.length, random(5));
    } else {
        updater(grid.length/2, random(2));
    }

    if(hardModeBefore && !hardMode) {
        // Remove the other options
        for(var i = grid.length/2; i < grid.length; i++) {
            grid[i].removeEventListener("click", clickAction);
            grid[i].style.backgroundColor = "#1a1a1a";
        }
        hardModeBefore = false;
    } else if(!hardModeBefore && hardMode) {
        hardModeBefore = true;
    }
}

// Update the colors
function updater(len, winnerOption) {
    for(var i = 0; i < len; i++) {
        // Set random colors for the bgs in options
        grid[i].style.backgroundColor = "rgb(" + random(255) + ", " + random(255) + ", " + random(255) + ")";
        // Set the winner option in the span in h2
        if (winnerOption == i) {guess.textContent = grid[i].style.backgroundColor;}
        grid[i].addEventListener("click", clickAction);
    }
}

// Set background colors of the options
function setBackgroundColor(len, bg) {
    for(var i = 0; i < len; i++) {
        grid[i].style.backgroundColor = bg;
    }
}

// Randomize the number
function random(num) {
    return Math.floor(Math.random() * (num+1));
}