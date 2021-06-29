const player = document.querySelector('.player');
const block = document.querySelector('.block');
const playBtn = document.querySelector('.btn');
const background = document.querySelector('.game-area');
const displayScore = document.getElementById('score');
let score;
var checkScore;
var checkCollision;
var varGameSpeed;

// Begin the game
playBtn.addEventListener('click', e => {
    playBtn.classList.add('play');
    player.classList.add('play');
    block.classList.add('play');
    background.classList.add('play');
    checkCollision = setInterval(collide, 10);
    score = 0;
    checkScore = setInterval(addScore, 10);
    checkGameSpeed = setInterval(gameSpeed, 10);
})


// Make the player jump
function jump() {
    if (!player.classList.contains('jump')) {
        player.classList.add('jump');
    }
    setTimeout(function(){
        player.classList.remove('jump');
    }, 450);
}

//By clicking
document.body.addEventListener('click', e => {
    if (player.classList.contains('play')) {
        jump();
    }
})

//By pressing spacebar
document.body.addEventListener('keypress', e => {
    if (e.code === "Space" && player.classList.contains('play')){
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
    background.classList.remove('play');
    clearInterval(checkScore);
    clearInterval(checkCollision);
    clearInterval(checkGameSpeed);
    block.style.animationPlayState = 'paused';
    block.style.animation = "none";
    displayScore.innerHTML = score + "<br><br> Game Over !"
}

// Speed up the game over time
//(I wanted to speed up the walking animation but for some reason it would make the character unable to jump)
function gameSpeed() {
    let blockSpeed = 2 - (score / 10000);
    //let animSpeed = 0.8 - (score / 15000);
    if (blockSpeed > 0.6) {
        block.style.animation = "move linear infinite " + blockSpeed + "s";
        //console.log(blockSpeed);
        //player.style.animation = "walk steps(6) infinite " + animSpeed + "s";
    }

}