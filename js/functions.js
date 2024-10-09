let guessCount = 0;
const guessCountElement = document.querySelector('#guess-count'); 
const input = document.querySelector('input');
const output = document.querySelector('output');

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
];

let randomizedWord = '';
let maskedWord = '';

const newGame = () => {
    const random = Math.floor(Math.random() * words.length);
    randomizedWord = words[random];
    maskedWord = "*".repeat(randomizedWord.length);
    console.log(randomizedWord);
    output.innerHTML = maskedWord;
    guessCount = 0; 
    guessCountElement.textContent = guessCount; 
};

const replaceFoundChars = (guess) => {
    let newString = maskedWord.split(''); 
    for (let i = 0; i < randomizedWord.length; i++) {
        const char = randomizedWord.charAt(i);
        if (char.toLowerCase() === guess.toLowerCase()) {
            newString[i] = char; 
        }
    }
    maskedWord = newString.join(''); 
    output.innerHTML = maskedWord; 
};

const win = () => {
    alert(`You have guessed right, the word is ${randomizedWord}. You needed ${guessCount} guesses!`);
    newGame(); 
};

newGame();

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 

        const guess = input.value.trim();
        if (guess) { 
            guessCount++; 
            guessCountElement.textContent = guessCount; 

            if (guess.toLowerCase() === randomizedWord.toLowerCase()) {
                win(); 
            } else if (guess.length === 1) {
                replaceFoundChars(guess);
                if (maskedWord.toLowerCase() === randomizedWord.toLowerCase()) {
                    win();
                }
            } else {
                alert("You guessed wrong!"); 
            }
        } else {
            alert("Please enter a letter or word.");
        }

        input.value = ''; 
    }
});
