const player = document.querySelector('.player');
const block = document.querySelector('.block');
const playBtn = document.querySelector('.btn');
const displayScore = document.getElementById('score');
let score;
var checkScore;
var checkCollision;

// Begin the game
playBtn.addEventListener('click', e => {
    playBtn.classList.add('play');
    player.classList.add('play');
    block.classList.add('play');
    checkCollision = setInterval(collide, 10);
    score = 0;
    checkScore = setInterval(addScore, 10);
})


// Make the player jump
function jump() {
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
    }
    setTimeout(function(){
        player.classList.remove('jump');
    }, 600);
}

//By clicking
document.body.addEventListener('click', e => {
    jump();
})

//By pressing spacebar
document.body.addEventListener('keyup', e => {
    if (e.code === "Space") {
        jump();
    }
})


// Test collisions between block and player
function collide() {
    if ((block.getBoundingClientRect().left - player.getBoundingClientRect().left) <= (96-16) && block.getBoundingClientRect().bottom == player.getBoundingClientRect().bottom) {
        console.log('PERDU');
        gameOver();
    }
}

// Adding score
function addScore() {
    score = score + 1;
    displayScore.innerHTML = score;
}

// Game over
function gameOver() {
    playBtn.classList.remove('play');
    player.classList.remove('play');
    block.classList.remove('play');
    clearInterval(checkScore);
    clearInterval(checkCollision);
    displayScore.innerHTML = score + "<br><br> Game Over !"
}

// TO DO NEXT : SPEED UP THE GAME OVER TIME