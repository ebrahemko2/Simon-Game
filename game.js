let buttonsColor = ['green', 'red', 'yellow', 'blue'];
let level = 1;
let gamePattern = [];
let userPattern = [];
started = false;


$(document).on('keydown', function () {
    if (!started) {
        started = true;
        $('#level-title').text('Level ' + level);
        nextSequence();
    }
});


function nextSequence() {
    userPattern = [];
    $('#level-title').text('Level ' + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonsColor[randomNumber];
    $('#' + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    gamePattern.push(randomChosenColor);
    let chosenColorSound = new Audio('sounds/' + randomChosenColor + '.mp3');
    chosenColorSound.play();
}

$('.btn').on('click', function () {
    let userChosenColor = $(this).attr('id');
    userPattern.push(userChosenColor);
    $('#' + userChosenColor).addClass('pressed');
    setTimeout(function () {
        $('#' + userChosenColor).removeClass('pressed');
    }, 200);
    let chosenColorSound = new Audio('sounds/' + userChosenColor + '.mp3');
    chosenColorSound.play();
    checkAnswer();
});


function checkAnswer() {
    if (gamePattern.length === userPattern.length) {
        if(gamePattern[gamePattern.length - 1] === userPattern[userPattern.length - 1]) {
            started = true;
            level += 1;
            setTimeout(nextSequence, 1000);
        } else {
            gameOver();
        }
    }
}


function gameOver() {
    level = 1;
    started = false;
    gamePattern = [];
    userPattern = [];
    $('body').addClass('game-over');
    setTimeout(function () {
        $('body').removeClass('game-over');
    }, 200);
    $('#level-title').text('Game Over');
    setTimeout(function () {
        $('#level-title').text('Press A Key to Start');
    }, 1000);
}


