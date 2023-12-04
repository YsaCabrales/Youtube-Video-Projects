const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
timeText = document.querySelector(".time b"),
inputField = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word"),
startBtn = document.querySelector(".start-game");

let correctWord, timer;

const gameTimer = maxTime => {
    clearInterval(timer);
    timer = setInterval(() => {
        if(maxTime > 0) {
            maxTime--;
            return timeText.innerText = maxTime;
        }
        alert(`Time's up'! ${correctWord.toUpperCase()} was the correct word.`);
        startGame();
    }, 1000);
}

const startGame = () => {
    gameTimer(30);
    let randomObj = words[Math.floor(Math.random() * words.length)];
    let wordArray = randomObj.word.split("");
    for (let i = wordArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
    }
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    correctWord = randomObj.word.toLowerCase();;
    inputField.value = "";
    inputField.setAttribute("maxlength", correctWord.length);
}

const checkWord = () => {
    let userWord = inputField.value.toLowerCase();
    if(!userWord) return alert("Please enter the word to check!");
    if(userWord !== correctWord) return alert(`Oops! ${userWord} is not a correct word`);
    alert(`Yey! ${correctWord.toUpperCase()} is the correct word.`);
    startGame();
}

refreshBtn.addEventListener("click", startGame);
startBtn.addEventListener("click", () => {
    const contentDiv = document.querySelector(".content");
    const welcomeDiv = document.querySelector(".welcome");

    contentDiv.style.visibility = "visible";
    welcomeDiv.remove();
    
    startGame();
});
checkBtn.addEventListener("click", checkWord);