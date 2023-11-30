// Adding Event Listeners to a Button:
const danceButton = document.getElementById('danceButton');
const audio = document.getElementById('myAudio');
const moves = document.getElementById('danceMoves')
danceButton.addEventListener('click', function() {
    console.log("Let's Dance!");
    moves.innerHTML = "Let's Dance!";
    audio.play();
});

const stopButton = document.getElementById('stopButton');
stopButton.addEventListener('click', pauseSound);

function pauseSound() {
    audio.pause();
    moves.innerHTML = "Stop!";
}

document.addEventListener('keydown', function(event) {
    // Check which key was pressed
    const key = event.key; // Convert to lowercase for case-insensitivity

    // Perform your dance routine accordingly
    switch (key) {
        case 'a':
            moves.innerHTML = "Moonwalk";
            break;

        case 's':
            moves.innerHTML = "Robot";
            break;

        case 'd':
            moves.innerHTML = "Shuffle";
            break;

        case 'w':
            moves.innerHTML = "Spin";
            break;

        case 'q':
            pauseSound()
            break; 

        default:
            moves.innerHTML = "Freestyle!";
            break;
    }

    moves.style.transition = 'transform 0.5s ease-in-out';
    moves.style.transform = 'scale(1.2)';

    setTimeout(function() {
        moves.style.transition = 'transform 0.5s ease-in-out';
        moves.style.transform = 'scale(1)';
    }, 500);
});



