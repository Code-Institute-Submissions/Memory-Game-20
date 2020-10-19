/*
This javascript is only for the cards game page
*/

// cards array holds all cards
let card = document.getElementsByClassName("card");
let cards = [...card];

// deck of all cards in game
const deck = document.getElementById("deck-block");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedCards
let matchedCard = document.getElementsByClassName("match");

 // stars list
let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
let closeicon = document.querySelector(".close");

// declare modals
let firstOverlay = document.getElementById("popup-name");
let modal = document.getElementById("popup-win");
let timeoutModal = document.getElementById("popup-timeout");

 // array for opened cards
let openedCards = [];

// count the complete games
let countWin = 0;

// game timer
let second = 0; 
let timer = document.querySelector(".timer");
let interval;

//game timeout variable
let gameOver;

// shuffles cards array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

// require user to input player name
function username(){
    var pname = document.getElementById("pname").value;
    if (pname == ""){
        alert("Name must be filled out");
        return false;
    } else {
        document.getElementById("player-name").innerHTML = pname;
        firstOverlay.classList.remove('visible');
    }
}


//shuffles cards when page is refreshed / loads
document.body.onload = startGame();


//function to start a new play 
function startGame(){
    //if 3rd successful game 0 the count - go back to level 1 
    if(countWin==3){
        countWin == 0;
    }
    openedCards = [];

    // shuffle deck
    cards = shuffle(cards);
    // remove all exisiting classes from each card
    for (var i = 0; i < cards.length; i++){
        deck.innerHTML = "";
        [].forEach.call(cards, function(item) {
            deck.appendChild(item);
        });
        cards[i].classList.remove("open", "match", "disabled");
    }
    // reset moves
    moves = 0;
    counter.innerHTML = moves;
    // reset rating
    for (var i= 0; i < stars.length; i++){
        stars[i].style.color = "#FFD700";
        stars[i].style.visibility = "visible";
    }
    //reset timer
    second = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0  secs";
    clearInterval(interval);
    clearTimeout(gameOver);
}


//toggles open class to display cards
var displayCard = function (){
    this.classList.toggle("open");
};


//add opened cards to OpenedCards list and check if cards are match or not
function cardOpen() {
    // add disable to prevent double clicking on the same card
    this.classList.add("disabled");
    openedCards.push(this);
    var len = openedCards.length;

    if(len === 2){
        moveCounter();
        if(openedCards[0].dataset.peak === openedCards[1].dataset.peak){
            matched();
        } else {
            unmatched();
        }
    }
};


//when cards match
function matched(){
    openedCards[0].classList.add("match", "disabled");
    openedCards[1].classList.add("match", "disabled");
    openedCards = [];
}


//when cards don't match
function unmatched(){
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedCards[0].classList.remove("open");
        openedCards[1].classList.remove("open");
        enable();
        openedCards = [];
    },1100);
}


//disable cards temporarily
function disable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}


//enable cards and disable matched cards
function enable(){
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for(var i = 0; i < matchedCard.length; i++){
            matchedCard[i].classList.add("disabled");
        }
    });
}


//count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = moves;
    //start timer  and timeout checking on first click
    if(moves == 1){
        second = 0;
        startTimer();
        lostGame();
    }
    // setting rates based on moves
    if (moves > 8 && moves < 12){
        for( i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves > 13){
        for( i= 0; i < 3; i++){
            if(i > 0){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

// seconds timer function
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = second+" secs";
        second++;
    },1000);
}

// set timeout for each level
function lostGame(){
    //level 1
    if(countWin === 0){
        gameOver = setTimeout( function(){
            if(matchedCard.length !== 16){
                document.getElementById("game-level").innerHTML = "1";
                document.getElementById("seconds-timeout").innerHTML = "60";
                timeoutModal.classList.add("show");
                startGame();
            } 
        }, 62000);
    } else if(countWin === 1){
        //level 2
        gameOver = setTimeout( function doThis(){
            if(matchedCard.length !== 16){
                document.getElementById("game-level").innerHTML = "2";
                document.getElementById("seconds-timeout").innerHTML = "55";
                timeoutModal.classList.add("show");
                startGame();
            } else {
                return
            }
        }, 57000);
    } else {
        //level 3
        gameOver = setTimeout( function doThis(){
            if(matchedCard.length !== 16){
                document.getElementById("game-level").innerHTML = "3";
                document.getElementById("seconds-timeout").innerHTML = "50";
                timeoutModal.classList.add("show");
                startGame();
            } else {
                return
            }
        }, 52000);
    }
}

//congratulations when all cards match, show modal with name, level, moves, time and rating
function congratulations(){
    if (matchedCard.length == 16){
        countWin++
        //clearTimeout(lostGame);
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".stars").innerHTML;

        //showing name, level, move, rating, time on modal
        document.getElementById("gamer").innerHTML = document.getElementById("pname").value;
        document.getElementById("level-number").innerHTML = countWin;
        document.getElementById("finalMove").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //define the modal button value depending on the level
        if(countWin==3){
            document.getElementById("check-level").innerHTML = "again";
        }else{
            document.getElementById("check-level").innerHTML = " next level";
        }

        //close icon on modal
        closeModal();
    };
}


//close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        startGame();
    });
}


//for user to play next level
function playNext(){
    modal.classList.remove("show");
    startGame();
}

// for user to play again
function playAgain(){
    timeoutModal.classList.remove("show");
    startGame();
}


// loop to add event listeners to each card
for (var i = 0; i < cards.length; i++){
    card = cards[i];
    card.addEventListener("click", displayCard);
    card.addEventListener("click", cardOpen);
    card.addEventListener("click", congratulations);
};

