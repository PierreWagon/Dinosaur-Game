const player = document.querySelector('.player');
const block = document.querySelector('.block');
const playBtn = document.querySelector('.btn');
const background = document.querySelector('.game-area');
const displayScore = document.getElementById('score');
const dinoSkins = document.querySelectorAll('.skin');
let score;
var checkScore;
var checkCollision;
var varGameSpeed;
let levelTheme;
//These two variables are used to manage the death by drowning
let deathTimer;
let deathTimerGameOver;

// Launch a new game with click or spacebar
playBtn.addEventListener('click', e => {
    newGame();
})
document.body.addEventListener('keypress', e => {
    if (e.code === "Space" && !(playBtn.classList.contains('play'))){
        newGame();
    }
})

// Set up new game
function newGame() {
    playBtn.classList.add('play');
    player.classList.add('play');
    block.classList.add('play');
    player.classList.remove('death');
    document.getElementById('death-msg').classList.remove('death');
    background.classList.add('play');
    checkCollision = setInterval(collide, 10);
    score = 0;
    checkScore = setInterval(addScore, 10);
    checkGameSpeed = setInterval(gameSpeed, 10);
    //Displays oxygen bar if you selected aquatic skin
    if (levelTheme == "aqua") {
        document.querySelector('#breathe-bar').style.display = 'block';
        deathTimer = setTimeout( e => {
            player.classList.add('death');
        },10000)
        deathTimerGameOver = setTimeout(e => {
            gameOver();
            document.getElementById('death-msg').classList.add('death');
        }, 11000);
    }
    else {
        document.querySelector('#breathe-bar').style.display = 'none';
        player.classList.remove('death');
        document.getElementById('death-msg').classList.remove('death');
    }
}


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
    document.querySelector('#breathe-bar').style.display = 'none';
    clearTimeout(deathTimer);
    clearTimeout(deathTimerGameOver);
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

// Let's try adding some skins
// Open/close skin menu
const skinBtn = document.getElementById('skin-btn');
const skinMenu = document.querySelector('.skin-menu');
skinBtn.addEventListener('click', e => {
    skinMenu.classList.toggle('active');
})

// Choose a skin
// It might be a cheesy way to do it, but each skin has a class number, so I'm just checking out this number
// and displaying the matching skin
dinoSkins.forEach(e => {
    e.addEventListener('click', e => {     
        switch( true ){
            case e.target.classList.contains('one'):
                player.style.background = "url('gaming_DinoSprites_walk_small.png') 0px 0px no-repeat";
                player.style.height = "84px";
                background.style.background = "url('bg2.png')";
                levelTheme = "normal";
                player.classList.remove('death');
                break;
            case e.target.classList.contains('two'):
                player.style.background = "url('dino_aristo.png') 0px 0px no-repeat";
                player.style.height = "184px";
                background.style.background = "url('bg2.png')";
                levelTheme = "rich";
                player.classList.remove('death');
                break;
            case e.target.classList.contains('three'):
                player.style.background = "url('dino_aquatique.png') 0px 0px no-repeat";
                player.style.height = "184px";
                background.style.background = "url('bg_water2.png')";
                levelTheme = "aqua";
                break; 
            case e.target.classList.contains('four'):
                player.style.background = "url('dino_pirate.png') 0px 0px no-repeat";
                player.style.height = "184px";
                background.style.background = "url('bg2.png')";
                levelTheme = "pirate";
                player.classList.remove('death');
                break; 
            case e.target.classList.contains('five'):
                player.style.background = "url('sanic.png') 0px 0px no-repeat";
                player.style.height = "134px";
                background.style.background = "url('bg2.png')";
                levelTheme = "sanic";
                player.classList.remove('death');
                break; 
        }
        skinMenu.classList.remove('active');
    })
})